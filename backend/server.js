require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const pool = require('./db');
const { verifyGoogleToken } = require('./googleAuthService');
const { uploadDrugLicense } = require('./uploadService');
const { authMiddleware, adminMiddleware } = require('./middleware');
const { syncSwipeProductsToDatabase } = require('./swipeSync');

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

app.use(cors());
app.use(express.json());

// ─── Helper ──────────────────────────────────────────────────────────────────
function generateOrderNumber() {
  return 'ORD-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100);
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUTH ROUTES — Google Sign-In
// ═══════════════════════════════════════════════════════════════════════════════

// Google login — verifies Google ID token, logs in existing pharmacy or signals new user
app.post('/api/auth/google', async (req, res) => {
  const { id_token } = req.body;
  if (!id_token) return res.status(400).json({ error: 'Google ID token required' });

  try {
    const googleUser = await verifyGoogleToken(id_token);

    // Check if pharmacy exists by email
    const result = await pool.query('SELECT * FROM pharmacies WHERE email = $1', [googleUser.email]);

    if (result.rows.length === 0) {
      // New user — signal frontend to redirect to registration, carrying Google info
      return res.json({
        status: 'new_user',
        email: googleUser.email,
        name: googleUser.name,
        google_id: googleUser.google_id,
      });
    }

    const pharmacy = result.rows[0];
    if (pharmacy.status === 'rejected') {
      return res.status(403).json({ error: 'Your application was rejected. Please contact support.' });
    }

    // Backfill google_id if missing (e.g. account created before Google auth was added)
    if (!pharmacy.google_id) {
      await pool.query('UPDATE pharmacies SET google_id = $1 WHERE id = $2', [googleUser.google_id, pharmacy.id]);
    }

    const token = jwt.sign(
      { id: pharmacy.id, email: pharmacy.email, status: pharmacy.status, role: 'pharmacy' },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      token,
      pharmacy: {
        id: pharmacy.id,
        pharmacy_name: pharmacy.pharmacy_name,
        owner_name: pharmacy.owner_name,
        mobile: pharmacy.mobile,
        email: pharmacy.email,
        status: pharmacy.status,
      }
    });
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(401).json({ error: 'Invalid Google token' });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// PHARMACY REGISTRATION
// ═══════════════════════════════════════════════════════════════════════════════

// Register pharmacy (with file upload) — after Google sign-in confirms new user
app.post('/api/pharmacy/register', upload.single('drug_license_photo'), async (req, res) => {
  const { mobile, pharmacy_name, owner_name, email, google_id, address, drug_license_number, drug_license_expiry } = req.body;

  if (!email || !pharmacy_name || !owner_name || !drug_license_number || !mobile) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  try {
    // Check if already registered by email
    const existing = await pool.query('SELECT id FROM pharmacies WHERE email = $1', [email]);
    if (existing.rows.length > 0) return res.status(400).json({ error: 'This Google account is already registered' });

    // Upload drug license photo if provided
    let photoUrl = null;
    if (req.file && process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        photoUrl = await uploadDrugLicense(req.file.buffer, req.file.mimetype, mobile);
      } catch (uploadErr) {
        console.error('Upload error:', uploadErr);
        // Continue without photo — admin can request it later
      }
    }

    const result = await pool.query(
      `INSERT INTO pharmacies (mobile, pharmacy_name, owner_name, email, google_id, address, drug_license_number, drug_license_expiry, drug_license_photo_url, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'pending') RETURNING *`,
      [mobile, pharmacy_name, owner_name, email, google_id || null, address || null, drug_license_number, drug_license_expiry || null, photoUrl]
    );

    const token = jwt.sign(
      { id: result.rows[0].id, email: result.rows[0].email, status: 'pending', role: 'pharmacy' },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Registration submitted. Awaiting approval.',
      pharmacy_id: result.rows[0].id,
      token,
      pharmacy: {
        id: result.rows[0].id,
        pharmacy_name: result.rows[0].pharmacy_name,
        owner_name: result.rows[0].owner_name,
        mobile: result.rows[0].mobile,
        email: result.rows[0].email,
        status: 'pending',
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Get my profile
app.get('/api/pharmacy/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, pharmacy_name, owner_name, mobile, email, address, drug_license_number, drug_license_expiry, status, created_at FROM pharmacies WHERE id = $1', [req.pharmacy.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCTS (pharmacy view — only approved pharmacies)
// ═══════════════════════════════════════════════════════════════════════════════

app.get('/api/products', authMiddleware, async (req, res) => {
  if (req.pharmacy.status !== 'approved') {
    return res.status(403).json({ error: 'Account pending approval' });
  }

  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (name ILIKE $${params.length} OR manufacturer ILIKE $${params.length})`;
    }

    query += ' ORDER BY category, name';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════════════════════════════════════════════

// Place order
app.post('/api/orders', authMiddleware, async (req, res) => {
  if (req.pharmacy.status !== 'approved') {
    return res.status(403).json({ error: 'Account pending approval' });
  }

  const { items } = req.body; // [{product_id, qty}]
  if (!items || items.length === 0) return res.status(400).json({ error: 'No items in order' });

  try {
    // Fetch product details and calculate total
    const productIds = items.map(i => i.product_id);
    const products = await pool.query('SELECT * FROM products WHERE id = ANY($1)', [productIds]);
    const productMap = {};
    products.rows.forEach(p => productMap[p.id] = p);

    const orderItems = items.map(i => {
      const p = productMap[i.product_id];
      if (!p) throw new Error('Product not found: ' + i.product_id);
      if (!p.in_stock) throw new Error(p.name + ' is out of stock');
      return { product_id: p.id, name: p.name, qty: i.qty, price: parseFloat(p.price), total: parseFloat(p.price) * i.qty };
    });

    const subtotal = orderItems.reduce((s, i) => s + i.total, 0);
    const deliveryCharge = subtotal >= 5000 ? 0 : 199;
    const total = subtotal + deliveryCharge;
    const orderNumber = generateOrderNumber();

    const result = await pool.query(
      `INSERT INTO orders (order_number, pharmacy_id, items, subtotal, delivery_charge, total, status)
       VALUES ($1,$2,$3,$4,$5,$6,'pending') RETURNING *`,
      [orderNumber, req.pharmacy.id, JSON.stringify(orderItems), subtotal, deliveryCharge, total]
    );

    res.json({ message: 'Order placed!', order: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Order failed' });
  }
});

// My orders
app.get('/api/orders/mine', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE pharmacy_id = $1 ORDER BY created_at DESC',
      [req.pharmacy.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN ROUTES
// ═══════════════════════════════════════════════════════════════════════════════

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid admin password' });
  }
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// Get all registrations
app.get('/api/admin/pharmacies', adminMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM pharmacies';
    const params = [];
    if (status) { params.push(status); query += ' WHERE status = $1'; }
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Approve / reject pharmacy
app.patch('/api/admin/pharmacies/:id/status', adminMiddleware, async (req, res) => {
  const { status } = req.body;
  if (!['approved', 'rejected', 'pending'].includes(status)) return res.status(400).json({ error: 'Invalid status' });

  try {
    const result = await pool.query(
      'UPDATE pharmacies SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Pharmacy not found' });
    res.json({ message: `Pharmacy ${status}`, pharmacy: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: all orders
app.get('/api/admin/orders', adminMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.*, p.pharmacy_name, p.mobile FROM orders o
       JOIN pharmacies p ON o.pharmacy_id = p.id
       ORDER BY o.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: update order status
app.patch('/api/admin/orders/:id/status', adminMiddleware, async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status' });

  try {
    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: products CRUD
app.get('/api/admin/products', adminMiddleware, async (req, res) => {
  const result = await pool.query('SELECT * FROM products ORDER BY category, name');
  res.json(result.rows);
});

app.post('/api/admin/products', adminMiddleware, async (req, res) => {
  const { name, manufacturer, category, price, unit, min_order, description } = req.body;
  if (!name || !price) return res.status(400).json({ error: 'Name and price required' });
  try {
    const result = await pool.query(
      'INSERT INTO products (name, manufacturer, category, price, unit, min_order, description) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [name, manufacturer, category, price, unit, min_order || 1, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.patch('/api/admin/products/:id', adminMiddleware, async (req, res) => {
  const { name, manufacturer, category, price, unit, min_order, in_stock, description } = req.body;
  try {
    const result = await pool.query(
      `UPDATE products SET name=COALESCE($1,name), manufacturer=COALESCE($2,manufacturer),
       category=COALESCE($3,category), price=COALESCE($4,price), unit=COALESCE($5,unit),
       min_order=COALESCE($6,min_order), in_stock=COALESCE($7,in_stock), description=COALESCE($8,description)
       WHERE id=$9 RETURNING *`,
      [name, manufacturer, category, price, unit, min_order, in_stock, description, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/admin/products/:id', adminMiddleware, async (req, res) => {
  await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
  res.json({ message: 'Deleted' });
});

// Admin: trigger Swipe inventory sync manually
app.post('/api/admin/sync-swipe', adminMiddleware, async (req, res) => {
  try {
    const result = await syncSwipeProductsToDatabase(pool);
    let message = `Synced ${result.total} products: ${result.created} created, ${result.updated} updated, ${result.errors} errors`;
    if (result.firstErrorDetail) {
      message += ` | First error: ${result.firstErrorDetail.error} (product: ${result.firstErrorDetail.name})`;
    }
    res.json({
      success: true,
      message,
      ...result
    });
  } catch (err) {
    console.error('Swipe sync error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// TEMPORARY DEBUG ROUTE — shows raw Swipe data for first 3 products
app.get('/api/admin/debug-swipe-raw', adminMiddleware, async (req, res) => {
  try {
    const axios = require('axios');
    const response = await axios.get('https://app.getswipe.in/api/partner/v2/product/list', {
      headers: { Authorization: `Bearer ${process.env.SWIPE_API_KEY}` },
      params: { page: 1, num_records: 3 },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message, details: err.response?.data });
  }
});

// Admin analytics
app.get('/api/admin/analytics', adminMiddleware, async (req, res) => {
  try {
    const [pharmacies, orders, revenue, pending] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM pharmacies WHERE status='approved'"),
      pool.query('SELECT COUNT(*) FROM orders'),
      pool.query("SELECT COALESCE(SUM(total),0) as total FROM orders WHERE status != 'cancelled'"),
      pool.query("SELECT COUNT(*) FROM pharmacies WHERE status='pending'"),
    ]);

    const byStatus = await pool.query("SELECT status, COUNT(*) as count FROM orders GROUP BY status");

    res.json({
      approved_pharmacies: parseInt(pharmacies.rows[0].count),
      total_orders: parseInt(orders.rows[0].count),
      total_revenue: parseFloat(revenue.rows[0].total),
      pending_approvals: parseInt(pending.rows[0].count),
      orders_by_status: byStatus.rows,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── Serve React frontend in production ──────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SJ Medex server running on port ${PORT}`));

// ─── Automatic Swipe sync every 6 hours ──────────────────────────────────────
setInterval(async () => {
  if (!process.env.SWIPE_API_KEY) return;
  try {
    console.log('Running scheduled Swipe sync...');
    const result = await syncSwipeProductsToDatabase(pool);
    console.log(`Swipe sync complete: ${result.created} created, ${result.updated} updated, ${result.errors} errors`);
  } catch (err) {
    console.error('Scheduled Swipe sync failed:', err.message);
  }
}, 6 * 60 * 60 * 1000); // every 6 hours
