import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 38 38" fill="none">
    <rect width="38" height="38" rx="9" fill="#1DB97A"/>
    <rect x="17" y="6" width="4" height="26" rx="2" fill="white"/>
    <rect x="6" y="17" width="26" height="4" rx="2" fill="white"/>
  </svg>
);

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('sjmedex_cart') || '{}'));
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
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
    setCart(c => ({ ...c, [id]: c[id] || minOrder }));
  }

  function changeQty(id, d, minOrder) {
    setCart(c => {
      const next = (c[id] || minOrder) + d;
      if (next < minOrder) { const n = { ...c }; delete n[id]; return n; }
      return { ...c, [id]: next };
    });
  }

  const cats = [
    { k: 'all', l: 'All', icon: '💊' },
    { k: 'medicine', l: 'Medicines', icon: '🩺' },
    { k: 'surgical', l: 'Surgical', icon: '🔬' },
    { k: 'injectable', l: 'Injectable', icon: '💉' },
  ];

  const catColors = { medicine: { bg: '#e5f5ef', text: '#0a5c47' }, surgical: '#eff6ff', injectable: '#fffbeb' };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: "'Inter',-apple-system,sans-serif", paddingBottom: 80 }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        a{text-decoration:none}
        .prod-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
        @media(min-width:600px){.prod-grid{grid-template-columns:repeat(3,1fr);gap:12px}}
        @media(min-width:900px){.prod-grid{grid-template-columns:repeat(4,1fr);gap:14px}}
      `}</style>

      {/* TOP NAV */}
      <div style={{ background: '#0a5c47', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/dashboard" style={{ color: '#6ee7b7', fontSize: 20, lineHeight: 1 }}>←</Link>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px' }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>🔍</span>
            <input
              type="text"
              placeholder="Search medicines, surgical items..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: 13, color: '#fff' }}
            />
          </div>
          <button onClick={() => setShowCart(!showCart)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: 4 }}>
            <span style={{ fontSize: 22 }}>🛒</span>
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -2, right: -2, background: '#ef4444', color: '#fff', borderRadius: '50%', width: 16, height: 16, fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>
            )}
          </button>
        </div>

        {/* CATEGORY TABS */}
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {cats.map(c => (
            <button key={c.k} onClick={() => setCat(c.k)} style={{ padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: cat === c.k ? 700 : 500, color: cat === c.k ? '#fff' : 'rgba(255,255,255,0.6)', borderBottom: cat === c.k ? '2px solid #6ee7b7' : '2px solid transparent', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span>{c.icon}</span>{c.l}
            </button>
          ))}
        </div>
      </div>

      {/* MINI CART DRAWER */}
      {showCart && cartCount > 0 && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowCart(false)}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '85%', maxWidth: 380, background: '#fff', overflowY: 'auto', boxShadow: '-4px 0 20px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <div style={{ background: '#0a5c47', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>🛒 Cart ({cartCount} items)</div>
              <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', color: '#6ee7b7', fontSize: 20, cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ padding: 14 }}>
              {Object.entries(cart).map(([id, qty]) => {
                const p = products.find(p => p.id == id);
                if (!p) return null;
                const minOrder = parseInt(p.min_order) || 1000;
                return (
                  <div key={id} style={{ background: '#f9fafb', borderRadius: 10, padding: 12, marginBottom: 10, border: '1px solid #f0f0f0' }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#0a1a14', marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 8 }}>{p.manufacturer}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 7, padding: '4px 10px', border: '1px solid #e5e7eb' }}>
                        <button onClick={() => changeQty(p.id, -minOrder, minOrder)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#0a5c47', fontWeight: 700, lineHeight: 1 }}>−</button>
                        <span style={{ fontWeight: 700, fontSize: 13, minWidth: 40, textAlign: 'center' }}>{qty}</span>
                        <button onClick={() => changeQty(p.id, minOrder, minOrder)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#0a5c47', fontWeight: 700, lineHeight: 1 }}>+</button>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0a5c47' }}>₹{(parseFloat(p.price) * qty).toLocaleString('en-IN')}</div>
                        <div style={{ fontSize: 10, color: '#9ca3af' }}>₹{p.price}/{p.unit}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: '14px 16px', borderTop: '1px solid #f0f0f0', position: 'sticky', bottom: 0, background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: 16, color: '#0a5c47' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <button onClick={() => { setShowCart(false); navigate('/cart'); }} style={{ width: '100%', padding: 13, background: '#0a5c47', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                Proceed to Order →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT COUNT */}
      <div style={{ padding: '10px 14px', background: '#fff', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>
          {loading ? 'Loading...' : `${filtered.length} products`}
        </div>
        <div style={{ fontSize: 11, color: '#9ca3af' }}>Wholesale prices · GST included</div>
      </div>

      {/* PRODUCTS GRID */}
      <div style={{ padding: '10px 10px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>⏳</div>
            <div style={{ color: '#9ca3af', fontSize: 14 }}>Loading products...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🔍</div>
            <div style={{ color: '#9ca3af', fontSize: 14 }}>No products found</div>
          </div>
        ) : (
          <div className="prod-grid">
            {filtered.map(p => {
              const inCart = cart[p.id] || 0;
              const minOrder = parseInt(p.min_order) || 1000;
              const discount = p.mrp ? Math.round((1 - parseFloat(p.price) / parseFloat(p.mrp)) * 100) : null;
              const catBg = { medicine: '#e5f5ef', surgical: '#eff6ff', injectable: '#fffbeb' }[p.category] || '#f3f4f6';
              const catText = { medicine: '#0a5c47', surgical: '#1d4ed8', injectable: '#92400e' }[p.category] || '#374151';

              return (
                <div key={p.id} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0', position: 'relative' }}>
                  {/* PRODUCT IMAGE / ICON AREA */}
                  <div style={{ background: catBg, padding: '20px 12px 14px', textAlign: 'center', position: 'relative', minHeight: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {discount && (
                      <div style={{ position: 'absolute', top: 8, left: 8, background: '#ef4444', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>{discount}% OFF</div>
                    )}
                    {!p.in_stock && (
                      <div style={{ position: 'absolute', top: 8, right: 8, background: '#6b7280', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>OUT OF STOCK</div>
                    )}
                    <div style={{ fontSize: 44 }}>
                      {p.category === 'medicine' ? '💊' : p.category === 'surgical' ? '🔬' : '💉'}
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 600, color: catText, background: 'rgba(255,255,255,0.7)', padding: '2px 8px', borderRadius: 20, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {p.category}
                    </div>
                  </div>

                  {/* PRODUCT INFO */}
                  <div style={{ padding: '10px 10px 12px' }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: '#0a1a14', lineHeight: 1.4, marginBottom: 3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6 }}>{p.manufacturer}</div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 2 }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: '#0a5c47' }}>₹{parseFloat(p.price).toLocaleString('en-IN')}</span>
                      {p.mrp && <span style={{ fontSize: 11, color: '#9ca3af', textDecoration: 'line-through' }}>₹{p.mrp}</span>}
                    </div>
                    <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 8 }}>per {p.unit} · Min {minOrder} units</div>

                    {p.expiry_date && (
                      <div style={{ fontSize: 9, color: '#6b7280', background: '#f9fafb', padding: '3px 7px', borderRadius: 5, display: 'inline-block', marginBottom: 8 }}>
                        Exp: {new Date(p.expiry_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      </div>
                    )}

                    {!p.in_stock ? (
                      <div style={{ width: '100%', padding: '8px', background: '#f3f4f6', color: '#9ca3af', borderRadius: 8, fontSize: 11, fontWeight: 600, textAlign: 'center' }}>
                        Out of Stock
                      </div>
                    ) : inCart > 0 ? (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f0fdf9', border: '1.5px solid #1DB97A', borderRadius: 8, padding: '4px 8px', marginBottom: 5 }}>
                          <button onClick={() => changeQty(p.id, -minOrder, minOrder)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#0a5c47', fontWeight: 700, lineHeight: 1, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 800, fontSize: 13, color: '#0a5c47' }}>{inCart}</div>
                            <div style={{ fontSize: 8, color: '#6b7280' }}>units</div>
                          </div>
                          <button onClick={() => changeQty(p.id, minOrder, minOrder)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#0a5c47', fontWeight: 700, lineHeight: 1, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                        </div>
                        <div style={{ fontSize: 10, color: '#0a5c47', fontWeight: 600, textAlign: 'center' }}>
                          ₹{(parseFloat(p.price) * inCart).toLocaleString('en-IN')} total
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(p.id, minOrder)} style={{ width: '100%', padding: '9px', background: '#0a5c47', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontWeight: 700 }}>
                        + Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* BOTTOM CART BAR */}
      {cartCount > 0 && !showCart && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, padding: '10px 14px', background: '#fff', borderTop: '1px solid #e5e7eb', boxShadow: '0 -4px 20px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setShowCart(true)} style={{ flex: 1, background: '#f0fdf9', border: '1.5px solid #1DB97A', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: '#0a5c47', color: '#fff', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{cartCount} items</span>
                <span style={{ fontSize: 12, color: '#0a5c47', fontWeight: 600 }}>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <span style={{ fontSize: 12, color: '#9ca3af' }}>View cart ↑</span>
            </button>
            <button onClick={() => navigate('/cart')} style={{ background: '#0a5c47', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Order →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
