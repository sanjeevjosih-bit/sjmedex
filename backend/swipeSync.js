const axios = require('axios');

const SWIPE_API_BASE = 'https://app.getswipe.in/api/partner';

async function fetchSwipeProducts(pool) {
  const apiKey = process.env.SWIPE_API_KEY;
  if (!apiKey) {
    throw new Error('SWIPE_API_KEY not configured');
  }

  let allItems = [];
  let page = 1;
  let totalRecords = 0;

  do {
    const response = await axios.get(`${SWIPE_API_BASE}/v2/product/list`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      params: { page, num_records: 100 },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch products from Swipe');
    }

    const items = response.data.data.items || [];
    totalRecords = response.data.data.total_records || items.length;
    allItems = allItems.concat(items);
    page++;
  } while (allItems.length < totalRecords && page < 50); // safety cap at 50 pages

  return allItems;
}

// Map Swipe category to our category enum (surgical / injectable / medicine)
function mapCategory(swipeCategory, itemName) {
  const name = (itemName || '').toLowerCase();
  const cat = (swipeCategory || '').toLowerCase();

  if (name.includes('ns ') || name.includes('rl ') || name.includes('dns') ||
      name.includes('d5%') || name.includes('iv fluid') || name.includes('saline') ||
      cat.includes('injectable') || cat.includes('iv fluid')) {
    return 'injectable';
  }
  if (cat.includes('medicine') || cat.includes('tablet') || cat.includes('syrup')) {
    return 'medicine';
  }
  return 'surgical'; // default
}

async function syncSwipeProductsToDatabase(pool) {
  const swipeItems = await fetchSwipeProducts(pool);

  let created = 0, updated = 0, errors = 0;
  const log = [];

  for (const item of swipeItems) {
    try {
      const swipeId = item.id || item.swipe_id;
      const name = item.name;
      const price = parseFloat(item.price_with_tax || item.unit_price || 0);
      const qty = parseFloat(item.quantity || 0);
      const hsnCode = item.hsn_code || '3005';
      const gstRate = parseFloat(item.tax_rate || 5);
      const unit = item.unit || 'pc';
      const category = mapCategory(item.category, name);
      const inStock = qty > 0;

      // Check if product already exists by swipe_id
      const existing = await pool.query('SELECT id FROM products WHERE swipe_id = $1', [swipeId]);

      if (existing.rows.length > 0) {
        // Update existing product
        await pool.query(
          `UPDATE products 
           SET name = $1, price = $2, hsn_code = $3, gst_rate = $4, 
               unit = $5, category = $6, in_stock = $7, stock_qty = $8,
               last_synced_at = NOW()
           WHERE swipe_id = $9`,
          [name, price, hsnCode, gstRate, unit, category, inStock, qty, swipeId]
        );
        updated++;
      } else {
        // Create new product
        await pool.query(
          `INSERT INTO products (name, manufacturer, category, price, unit, min_order, in_stock, description, swipe_id, hsn_code, gst_rate, stock_qty, last_synced_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())`,
          [name, 'SJ Medex', category, price, unit, 1, inStock, item.description || '', swipeId, hsnCode, gstRate, qty]
        );
        created++;
      }
      log.push({ name, swipeId, status: existing.rows.length > 0 ? 'updated' : 'created' });
    } catch (err) {
      errors++;
      log.push({ name: item.name, error: err.message });
    }
  }

  return { total: swipeItems.length, created, updated, errors, log };
}

module.exports = { syncSwipeProductsToDatabase, fetchSwipeProducts };
