import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('sjmedex_cart') || '{}'));
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [editQty, setEditQty] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/products').then(r => { setProducts(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { localStorage.setItem('sjmedex_cart', JSON.stringify(cart)); }, [cart]);

  const filtered = products.filter(p =>
    (cat === 'all' || p.category === cat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || (p.manufacturer || '').toLowerCase().includes(search.toLowerCase()))
  );

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((s, [id, qty]) => {
    const p = products.find(p => p.id == id);
    return s + (p ? parseFloat(p.price) * qty : 0);
  }, 0);

  function addToCart(id, minOrder) {
    setCart(c => ({ ...c, [id]: minOrder }));
  }

  function changeQty(id, d, minOrder) {
    setCart(c => {
      const next = (c[id] || minOrder) + d;
      if (next < minOrder) { const n = { ...c }; delete n[id]; return n; }
      return { ...c, [id]: next };
    });
  }

  function setQtyDirect(id, val, minOrder) {
    const num = parseInt(val);
    if (!val) { setEditQty(e => ({ ...e, [id]: val })); return; }
    if (isNaN(num) || num < minOrder) return;
    setCart(c => ({ ...c, [id]: num }));
    setEditQty(e => ({ ...e, [id]: undefined }));
  }

  function removeFromCart(id) {
    setCart(c => { const n = { ...c }; delete n[id]; return n; });
  }

  const cats = [
    { k: 'all', l: 'All Products' },
    { k: 'surgical', l: 'Surgical' },
    { k: 'injectable', l: 'Injectable' },
    { k: 'medicine', l: 'Medicine' },
  ];

  const catStyle = {
    surgical: { bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', icon: '🩺', color: '#0369a1', border: '#7dd3fc' },
    injectable: { bg: 'linear-gradient(135deg,#fef9c3,#fde68a)', icon: '💉', color: '#92400e', border: '#fcd34d' },
    medicine: { bg: 'linear-gradient(135deg,#dcfce7,#bbf7d0)', icon: '💊', color: '#15803d', border: '#6ee7b7' },
  };

  function getInitials(name) {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa', fontFamily: "'Inter',-apple-system,sans-serif", paddingBottom: cartCount > 0 ? 80 : 20 }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        a{text-decoration:none}
        .prod-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:10px}
        @media(min-width:600px){.prod-grid{grid-template-columns:repeat(3,1fr)}}
        @media(min-width:900px){.prod-grid{grid-template-columns:repeat(4,1fr);padding:16px}}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}
        input[type=number]{-moz-appearance:textfield}
      `}</style>

      {/* TOP NAV */}
      <div style={{ background: '#0a5c47', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link to="/dashboard" style={{ color: '#6ee7b7', fontSize: 22, lineHeight: 1, padding: '4px 6px' }}>←</Link>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px' }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>🔍</span>
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: 13, color: '#fff' }} />
            {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 16 }}>×</button>}
          </div>
          <button onClick={() => setShowCart(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: '4px 6px' }}>
            <span style={{ fontSize: 24 }}>🛒</span>
            {cartCount > 0 && <span style={{ position: 'absolute', top: 0, right: 0, background: '#ef4444', color: '#fff', borderRadius: '50%', width: 17, height: 17, fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
          </button>
        </div>
        <div style={{ display: 'flex', overflowX: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingBottom: 1 }}>
          {cats.map(c => (
            <button key={c.k} onClick={() => setCat(c.k)} style={{ padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: cat === c.k ? 700 : 400, color: cat === c.k ? '#fff' : 'rgba(255,255,255,0.55)', borderBottom: cat === c.k ? '2px solid #6ee7b7' : '2px solid transparent', whiteSpace: 'nowrap' }}>
              {c.l}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT COUNT BAR */}
      <div style={{ background: '#fff', padding: '8px 12px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>{loading ? 'Loading...' : `${filtered.length} products`}</span>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>Min order as per unit</span>
      </div>

      {/* PRODUCTS */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>⏳</div>Loading products...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>No products found
        </div>
      ) : (
        <div className="prod-grid">
          {filtered.map(p => {
            const inCart = cart[p.id] || 0;
            const minOrder = parseInt(p.min_order) || 1;
            const cs = catStyle[p.category] || catStyle.surgical;
            const discount = p.mrp ? Math.round((1 - parseFloat(p.price) / parseFloat(p.mrp)) * 100) : null;
            const isEditing = editQty[p.id] !== undefined;

            return (
              <div key={p.id} style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>

                {/* IMAGE AREA */}
                <div style={{ background: cs.bg, padding: '18px 12px 14px', textAlign: 'center', position: 'relative', minHeight: 110, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {discount && <div style={{ position: 'absolute', top: 7, left: 7, background: '#ef4444', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 5 }}>{discount}% OFF</div>}
                  {!p.in_stock && <div style={{ position: 'absolute', top: 7, right: 7, background: '#6b7280', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 5 }}>OUT OF STOCK</div>}

                  {/* PRODUCT ICON CIRCLE */}
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: `2px solid ${cs.border}` }}>
                    {cs.icon}
                  </div>

                  {/* PRODUCT INITIALS BADGE */}
                  <div style={{ background: 'rgba(255,255,255,0.85)', borderRadius: 6, padding: '2px 10px', fontSize: 10, fontWeight: 700, color: cs.color, letterSpacing: '0.5px' }}>
                    {getInitials(p.name)}
                  </div>
                </div>

                {/* PRODUCT DETAILS */}
                <div style={{ padding: '10px 10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontWeight: 600, fontSize: 12, color: '#0a1a14', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 34 }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 10, color: '#9ca3af' }}>{p.manufacturer}</div>
                  {p.description && <div style={{ fontSize: 10, color: '#6b7280', lineHeight: 1.4 }}>{p.description}</div>}

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: '#0a5c47' }}>₹{parseFloat(p.price).toLocaleString('en-IN')}</span>
                    {p.mrp && <span style={{ fontSize: 10, color: '#9ca3af', textDecoration: 'line-through' }}>₹{p.mrp}</span>}
                  </div>
                  <div style={{ fontSize: 10, color: '#9ca3af' }}>{p.unit} · Min: {minOrder}</div>

                  {p.expiry_date && (
                    <div style={{ fontSize: 9, color: '#6b7280', background: '#f9fafb', padding: '2px 7px', borderRadius: 5, display: 'inline-block', alignSelf: 'flex-start' }}>
                      Exp: {new Date(p.expiry_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </div>
                  )}

                  <div style={{ marginTop: 6 }}>
                    {!p.in_stock ? (
                      <div style={{ padding: '8px', background: '#f3f4f6', color: '#9ca3af', borderRadius: 8, fontSize: 11, fontWeight: 600, textAlign: 'center' }}>Out of Stock</div>
                    ) : inCart > 0 ? (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #1DB97A', borderRadius: 8, overflow: 'hidden', marginBottom: 5 }}>
                          <button onClick={() => changeQty(p.id, -minOrder, minOrder)} style={{ background: '#f0fdf9', border: 'none', cursor: 'pointer', fontSize: 18, color: '#0a5c47', fontWeight: 700, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>−</button>
                          <input
                            type="number"
                            value={isEditing ? editQty[p.id] : inCart}
                            onFocus={() => setEditQty(e => ({ ...e, [p.id]: inCart }))}
                            onChange={e => setEditQty(eq => ({ ...eq, [p.id]: e.target.value }))}
                            onBlur={e => {
                              const val = parseInt(e.target.value);
                              if (!val || val < minOrder) { removeFromCart(p.id); }
                              else { setCart(c => ({ ...c, [p.id]: val })); }
                              setEditQty(eq => { const n = { ...eq }; delete n[p.id]; return n; });
                            }}
                            onKeyDown={e => { if (e.key === 'Enter') e.target.blur(); }}
                            style={{ flex: 1, border: 'none', outline: 'none', textAlign: 'center', fontWeight: 800, fontSize: 14, color: '#0a5c47', background: '#fff', height: 36, minWidth: 0 }}
                          />
                          <button onClick={() => changeQty(p.id, minOrder, minOrder)} style={{ background: '#f0fdf9', border: 'none', cursor: 'pointer', fontSize: 18, color: '#0a5c47', fontWeight: 700, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>+</button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontSize: 10, color: '#0a5c47', fontWeight: 600 }}>₹{(parseFloat(p.price) * inCart).toLocaleString('en-IN')}</div>
                          <button onClick={() => removeFromCart(p.id)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: 10, cursor: 'pointer', fontWeight: 500 }}>Remove</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(p.id, minOrder)} style={{ width: '100%', padding: '9px', background: '#0a5c47', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontWeight: 700 }}>
                        + Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CART DRAWER */}
      {showCart && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowCart(false)}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '90%', maxWidth: 420, background: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 24px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <div style={{ background: '#0a5c47', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>🛒 My Cart ({cartCount} items)</div>
              <button onClick={() => setShowCart(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
              {cartCount === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9ca3af' }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>🛒</div>Cart is empty
                </div>
              ) : Object.entries(cart).map(([id, qty]) => {
                const p = products.find(p => p.id == id);
                if (!p) return null;
                const minOrder = parseInt(p.min_order) || 1;
                const isEdit = editQty['cart_' + id] !== undefined;
                return (
                  <div key={id} style={{ background: '#f9fafb', borderRadius: 12, padding: 12, marginBottom: 10, border: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, color: '#0a1a14', marginBottom: 2 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: '#9ca3af' }}>{p.unit} · ₹{p.price} each</div>
                      </div>
                      <button onClick={() => removeFromCart(id)} style={{ background: '#fee2e2', border: 'none', color: '#ef4444', fontSize: 11, cursor: 'pointer', borderRadius: 6, padding: '3px 8px', fontWeight: 600, flexShrink: 0 }}>Remove</button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                      {/* QTY CONTROL WITH DIRECT INPUT */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #1DB97A', borderRadius: 8, overflow: 'hidden', flex: 1 }}>
                        <button onClick={() => changeQty(id, -minOrder, minOrder)} style={{ background: '#f0fdf9', border: 'none', cursor: 'pointer', fontSize: 20, color: '#0a5c47', fontWeight: 700, width: 40, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>−</button>
                        <input
                          type="number"
                          value={isEdit ? editQty['cart_' + id] : qty}
                          onFocus={() => setEditQty(e => ({ ...e, ['cart_' + id]: qty }))}
                          onChange={e => setEditQty(eq => ({ ...eq, ['cart_' + id]: e.target.value }))}
                          onBlur={e => {
                            const val = parseInt(e.target.value);
                            if (!val || val < minOrder) removeFromCart(id);
                            else setCart(c => ({ ...c, [id]: val }));
                            setEditQty(eq => { const n = { ...eq }; delete n['cart_' + id]; return n; });
                          }}
                          onKeyDown={e => { if (e.key === 'Enter') e.target.blur(); }}
                          style={{ flex: 1, border: 'none', outline: 'none', textAlign: 'center', fontWeight: 800, fontSize: 15, color: '#0a5c47', background: '#fff', height: 38, minWidth: 0 }}
                        />
                        <button onClick={() => changeQty(parseInt(id), minOrder, minOrder)} style={{ background: '#f0fdf9', border: 'none', cursor: 'pointer', fontSize: 20, color: '#0a5c47', fontWeight: 700, width: 40, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>+</button>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: 14, color: '#0a5c47' }}>₹{(parseFloat(p.price) * qty).toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 4 }}>Tap number to type exact quantity · Min: {minOrder}</div>
                  </div>
                );
              })}
            </div>

            {cartCount > 0 && (
              <div style={{ padding: '14px 16px', borderTop: '1px solid #f0f0f0', flexShrink: 0, background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: '#6b7280' }}>{cartCount} items</span>
                  <span style={{ fontWeight: 800, fontSize: 18, color: '#0a5c47' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 12 }}>🚚 Free delivery · GST invoice included</div>
                <button onClick={() => { setShowCart(false); navigate('/cart'); }} style={{ width: '100%', padding: 13, background: '#0a5c47', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Proceed to Place Order →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STICKY BOTTOM BAR */}
      {cartCount > 0 && !showCart && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, padding: '10px 14px', background: '#fff', borderTop: '1px solid #e5e7eb', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => setShowCart(true)} style={{ flex: 1, background: '#f0fdf9', border: '1.5px solid #1DB97A', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: '#0a5c47', color: '#fff', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{cartCount} items</span>
                <span style={{ fontSize: 13, color: '#0a5c47', fontWeight: 700 }}>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>View ↑</span>
            </button>
            <button onClick={() => navigate('/cart')} style={{ background: '#0a5c47', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Order →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
