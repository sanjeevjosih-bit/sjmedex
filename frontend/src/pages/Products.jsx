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

  function removeFromCart(id) {
    setCart(c => { const n = { ...c }; delete n[id]; return n; });
  }

  const cats = [
    { k: 'all', l: 'All products' },
    { k: 'surgical', l: 'Surgical' },
    { k: 'injectable', l: 'Injectable' },
    { k: 'medicine', l: 'Medicine' },
  ];

  // Calm, professional category accents — muted rather than candy-bright
  const catStyle = {
    surgical:   { bg: '#EEF3FB', icon: '🩺', accent: '#3B6FA8', border: '#D7E3F3' },
    injectable: { bg: '#FBF3E8', icon: '💉', accent: '#A8732E', border: '#F0E0C7' },
    medicine:   { bg: '#EAF5EE', icon: '💊', accent: '#1F7A4D', border: '#CFEADA' },
  };

  function getInitials(name) {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: "'Inter',-apple-system,sans-serif", paddingBottom: cartCount > 0 ? 88 : 24 }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        a{text-decoration:none}
        .prod-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;padding:16px}
        @media(min-width:600px){.prod-grid{grid-template-columns:repeat(3,1fr);gap:16px;padding:20px}}
        @media(min-width:900px){.prod-grid{grid-template-columns:repeat(4,1fr);gap:18px;padding:24px;max-width:1280px;margin:0 auto}}
        @media(min-width:1280px){.prod-grid{grid-template-columns:repeat(5,1fr)}}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}
        input[type=number]{-moz-appearance:textfield}
        .cat-pill{transition:background 0.15s,color 0.15s}
        .prod-card{transition:box-shadow 0.18s,transform 0.18s}
        .prod-card:hover{box-shadow:0 8px 24px rgba(17,24,39,0.08);transform:translateY(-2px)}
        .qty-btn{transition:background 0.12s}
        .add-btn{transition:background 0.15s}
        .add-btn:hover{background:#0d6e54}
        .toolbar-inner{max-width:1280px;margin:0 auto}
      `}</style>

      {/* TOP NAV */}
      <div style={{ background: '#0E4D3B', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.10)' }}>
        <div className="toolbar-inner" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/dashboard" aria-label="Back to dashboard" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 20, lineHeight: 1, padding: '6px', display: 'flex', alignItems: 'center' }}>←</Link>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 9, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>⌕</span>
            <input type="text" placeholder="Search by product or manufacturer" value={search} onChange={e => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: 13.5, color: '#fff' }} />
            {search && <button onClick={() => setSearch('')} aria-label="Clear search" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: 17, lineHeight: 1 }}>×</button>}
          </div>
          <button onClick={() => setShowCart(true)} aria-label="Open cart" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, cursor: 'pointer', position: 'relative', padding: '9px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 42 }}>
            <span style={{ fontSize: 18 }}>🧺</span>
            {cartCount > 0 && <span style={{ position: 'absolute', top: -5, right: -5, background: '#E0623D', color: '#fff', borderRadius: '50%', width: 19, height: 19, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #0E4D3B' }}>{cartCount > 99 ? '99+' : cartCount}</span>}
          </button>
        </div>
        <div className="toolbar-inner" style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '0 12px 10px' }}>
          {cats.map(c => (
            <button key={c.k} className="cat-pill" onClick={() => setCat(c.k)} style={{
              padding: '7px 16px', borderRadius: 20, cursor: 'pointer', fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap',
              border: cat === c.k ? '1px solid transparent' : '1px solid rgba(255,255,255,0.18)',
              background: cat === c.k ? '#fff' : 'transparent',
              color: cat === c.k ? '#0E4D3B' : 'rgba(255,255,255,0.75)',
            }}>
              {c.l}
            </button>
          ))}
        </div>
      </div>

      {/* RESULT COUNT */}
      <div className="toolbar-inner" style={{ padding: '14px 16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>
          {loading ? 'Loading catalogue…' : `${filtered.length} ${filtered.length === 1 ? 'product' : 'products'}`}
        </span>
        <span style={{ fontSize: 11.5, color: '#9CA3AF' }}>Wholesale rates · GST included</span>
      </div>

      {/* PRODUCTS */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9CA3AF' }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>⌛</div>
          <div style={{ fontSize: 14 }}>Loading catalogue…</div>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9CA3AF' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⌕</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 4 }}>No products match your search</div>
          <div style={{ fontSize: 12.5 }}>Try a different name or clear the search box</div>
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
              <div key={p.id} className="prod-card" style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid #ECECE7', display: 'flex', flexDirection: 'column' }}>

                {/* IMAGE / ICON AREA */}
                <div style={{ background: cs.bg, padding: '20px 14px 16px', textAlign: 'center', position: 'relative', minHeight: 104, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {discount && <div style={{ position: 'absolute', top: 8, left: 8, background: '#fff', color: '#B5402A', fontSize: 9.5, fontWeight: 700, padding: '3px 7px', borderRadius: 5, border: '1px solid #F3D9D1' }}>{discount}% OFF</div>}
                  {!p.in_stock && <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 9.5, fontWeight: 600, padding: '3px 7px', borderRadius: 5 }}>Out of stock</div>}

                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: `1.5px solid ${cs.border}` }}>
                    {cs.icon}
                  </div>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: cs.accent, letterSpacing: '0.4px' }}>
                    {getInitials(p.name)}
                  </div>
                </div>

                {/* DETAILS */}
                <div style={{ padding: '12px 12px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#16201C', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 35 }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>{p.manufacturer}</div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 5 }}>
                    <span style={{ fontSize: 17, fontWeight: 700, color: '#0E4D3B' }}>₹{parseFloat(p.price).toLocaleString('en-IN')}</span>
                    {p.mrp && <span style={{ fontSize: 11, color: '#B0B0A8', textDecoration: 'line-through' }}>₹{p.mrp}</span>}
                  </div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>{p.unit} · Min {minOrder}</div>

                  {p.expiry_date && (
                    <div style={{ fontSize: 10, color: '#7A7A72', marginTop: 1 }}>
                      Exp {new Date(p.expiry_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </div>
                  )}

                  <div style={{ marginTop: 8 }}>
                    {!p.in_stock ? (
                      <div style={{ padding: '9px', background: '#F4F4F1', color: '#9CA3AF', borderRadius: 8, fontSize: 11.5, fontWeight: 600, textAlign: 'center' }}>Currently unavailable</div>
                    ) : inCart > 0 ? (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #0E4D3B', borderRadius: 8, overflow: 'hidden', marginBottom: 6 }}>
                          <button className="qty-btn" onClick={() => changeQty(p.id, -minOrder, minOrder)} style={{ background: '#F2F8F5', border: 'none', cursor: 'pointer', fontSize: 17, color: '#0E4D3B', fontWeight: 600, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>−</button>
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
                            style={{ flex: 1, border: 'none', outline: 'none', textAlign: 'center', fontWeight: 700, fontSize: 13.5, color: '#0E4D3B', background: '#fff', height: 34, minWidth: 0 }}
                          />
                          <button className="qty-btn" onClick={() => changeQty(p.id, minOrder, minOrder)} style={{ background: '#F2F8F5', border: 'none', cursor: 'pointer', fontSize: 17, color: '#0E4D3B', fontWeight: 600, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>+</button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 11, color: '#0E4D3B', fontWeight: 600 }}>₹{(parseFloat(p.price) * inCart).toLocaleString('en-IN')}</span>
                          <button onClick={() => removeFromCart(p.id)} style={{ background: 'none', border: 'none', color: '#B0463A', fontSize: 11, cursor: 'pointer', fontWeight: 500 }}>Remove</button>
                        </div>
                      </div>
                    ) : (
                      <button className="add-btn" onClick={() => addToCart(p.id, minOrder)} style={{ width: '100%', padding: '10px', background: '#0E4D3B', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12.5, cursor: 'pointer', fontWeight: 600 }}>
                        Add to cart
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
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15,20,18,0.45)' }} onClick={() => setShowCart(false)}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '92%', maxWidth: 440, background: '#FAFAF8', display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 32px rgba(0,0,0,0.18)' }} onClick={e => e.stopPropagation()}>
            <div style={{ background: '#0E4D3B', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>Your order</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 1 }}>{cartCount} {cartCount === 1 ? 'item' : 'items'}</div>
              </div>
              <button onClick={() => setShowCart(false)} aria-label="Close cart" style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
              {cartCount === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9CA3AF' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>🧺</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 4 }}>Your cart is empty</div>
                  <div style={{ fontSize: 12.5 }}>Browse the catalogue to start an order</div>
                </div>
              ) : Object.entries(cart).map(([id, qty]) => {
                const p = products.find(p => p.id == id);
                if (!p) return null;
                const minOrder = parseInt(p.min_order) || 1;
                const isEdit = editQty['cart_' + id] !== undefined;
                return (
                  <div key={id} style={{ background: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, border: '1px solid #ECECE7' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <div style={{ flex: 1, paddingRight: 8 }}>
                        <div style={{ fontWeight: 600, fontSize: 13.5, color: '#16201C', marginBottom: 2 }}>{p.name}</div>
                        <div style={{ fontSize: 11.5, color: '#9CA3AF' }}>{p.unit} · ₹{p.price} each</div>
                      </div>
                      <button onClick={() => removeFromCart(id)} style={{ background: 'none', border: 'none', color: '#B0463A', fontSize: 11.5, cursor: 'pointer', fontWeight: 500, flexShrink: 0 }}>Remove</button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #0E4D3B', borderRadius: 8, overflow: 'hidden', flex: 1 }}>
                        <button onClick={() => changeQty(id, -minOrder, minOrder)} style={{ background: '#F2F8F5', border: 'none', cursor: 'pointer', fontSize: 19, color: '#0E4D3B', fontWeight: 600, width: 38, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>−</button>
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
                          style={{ flex: 1, border: 'none', outline: 'none', textAlign: 'center', fontWeight: 700, fontSize: 14, color: '#0E4D3B', background: '#fff', height: 36, minWidth: 0 }}
                        />
                        <button onClick={() => changeQty(parseInt(id), minOrder, minOrder)} style={{ background: '#F2F8F5', border: 'none', cursor: 'pointer', fontSize: 19, color: '#0E4D3B', fontWeight: 600, width: 38, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>+</button>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 14.5, color: '#0E4D3B', flexShrink: 0 }}>₹{(parseFloat(p.price) * qty).toLocaleString('en-IN')}</div>
                    </div>
                    <div style={{ fontSize: 10.5, color: '#B0B0A8', marginTop: 6 }}>Tap the number to enter an exact quantity · Min {minOrder}</div>
                  </div>
                );
              })}
            </div>

            {cartCount > 0 && (
              <div style={{ padding: '16px 20px', borderTop: '1px solid #ECECE7', flexShrink: 0, background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13.5, color: '#6b7280' }}>{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
                  <span style={{ fontWeight: 700, fontSize: 19, color: '#0E4D3B' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ fontSize: 11.5, color: '#9CA3AF', marginBottom: 14 }}>Free delivery · GST invoice included with every order</div>
                <button onClick={() => { setShowCart(false); navigate('/cart'); }} style={{ width: '100%', padding: 14, background: '#0E4D3B', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14.5, fontWeight: 600, cursor: 'pointer' }}>
                  Review and place order →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STICKY BOTTOM BAR */}
      {cartCount > 0 && !showCart && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, padding: '12px 16px', background: '#fff', borderTop: '1px solid #ECECE7', boxShadow: '0 -6px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setShowCart(true)} style={{ flex: 1, background: '#F2F8F5', border: '1.5px solid #0E4D3B', borderRadius: 10, padding: '11px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ background: '#0E4D3B', color: '#fff', borderRadius: 6, padding: '3px 9px', fontSize: 11.5, fontWeight: 700 }}>{cartCount}</span>
                <span style={{ fontSize: 13.5, color: '#0E4D3B', fontWeight: 600 }}>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <span style={{ fontSize: 11.5, color: '#9CA3AF' }}>View cart</span>
            </button>
            <button onClick={() => navigate('/cart')} style={{ background: '#0E4D3B', color: '#fff', border: 'none', borderRadius: 10, padding: '13px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Place order →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
