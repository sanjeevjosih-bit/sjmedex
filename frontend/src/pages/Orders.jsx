import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 38 38" fill="none">
    <rect width="38" height="38" rx="9" fill="#1DB97A"/>
    <rect x="17" y="6" width="4" height="26" rx="2" fill="white"/>
    <rect x="6" y="17" width="26" height="4" rx="2" fill="white"/>
  </svg>
);

export default function Orders() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    api.get('/orders/mine').then(r => { setOrders(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  function handleLogout() { logout(); navigate('/'); }

  const statusColors = {
    pending: { bg: '#fef9c3', text: '#92400e' },
    processing: { bg: '#dbeafe', text: '#1d4ed8' },
    shipped: { bg: '#dbeafe', text: '#1d4ed8' },
    delivered: { bg: '#dcfce7', text: '#15803d' },
    cancelled: { bg: '#fee2e2', text: '#dc2626' },
  };
  const statusIcon = { pending: '⏳', processing: '⚙️', shipped: '🚚', delivered: '✅', cancelled: '❌' };

  const navLinks = [
    { to: '/products', label: 'Browse Products', icon: '📦' },
    { to: '/orders', label: 'My Orders', icon: '🧾' },
    { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { to: '/cart', label: 'Cart', icon: '🛒' },
    { to: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: "'Inter',-apple-system,sans-serif" }}>
      <style>{`
        *{box-sizing:border-box}
        a{text-decoration:none}
        .nav-desktop{display:flex}
        .nav-toggle{display:none}
        .nav-mobile{display:none}
        @media(max-width:768px){
          .nav-desktop{display:none!important}
          .nav-toggle{display:flex!important}
          .nav-mobile.open{display:flex!important}
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ background: '#0a5c47', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', height: 56 }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 9, marginRight: 24 }}>
            <Logo />
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 15, lineHeight: 1.1 }}>SJ Medex</div>
              <div style={{ color: '#6ee7b7', fontSize: 8, letterSpacing: '0.5px' }}>WHOLESALE PLATFORM</div>
            </div>
          </Link>

          <div className="nav-desktop" style={{ gap: 4, flex: 1 }}>
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} style={{
                color: l.to === '/orders' ? '#fff' : '#9FE1CB',
                fontWeight: 600, fontSize: 13, padding: '7px 14px', borderRadius: 7,
                background: l.to === '/orders' ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap'
              }}>
                <span>{l.icon}</span>{l.label}
              </Link>
            ))}
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 7, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Logout</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="nav-toggle" style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', borderRadius: 7, width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        <div className={`nav-mobile ${menuOpen ? 'open' : ''}`} style={{ flexDirection: 'column', background: '#085041', padding: menuOpen ? '8px 16px 12px' : 0 }}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} style={{
              color: l.to === '/orders' ? '#fff' : '#9FE1CB',
              fontWeight: l.to === '/orders' ? 700 : 500,
              fontSize: 14, padding: '12px 10px', borderRadius: 8,
              background: l.to === '/orders' ? 'rgba(255,255,255,0.12)' : 'transparent',
              display: 'flex', alignItems: 'center', gap: 10,
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
              <span style={{ fontSize: 16 }}>{l.icon}</span>{l.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#0a1a14', marginBottom: 4 }}>My Orders</div>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>Complete order history</div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>Loading...</div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <div style={{ marginBottom: 14 }}>No orders yet.</div>
            <Link to="/products" style={{ color: '#0a5c47', fontWeight: 700 }}>Browse Products →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {orders.map(o => {
              const items = typeof o.items === 'string' ? JSON.parse(o.items) : o.items;
              const sc = statusColors[o.status] || statusColors.pending;
              return (
                <div key={o.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 10 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'monospace', color: '#0a1a14' }}>{o.order_number}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </div>
                    <span style={{ background: sc.bg, color: sc.text, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap', flexShrink: 0, textTransform: 'capitalize' }}>
                      {statusIcon[o.status]} {o.status}
                    </span>
                  </div>

                  <div style={{ background: '#f9fafb', borderRadius: 8, padding: '10px 12px', marginBottom: 10, maxHeight: 130, overflowY: 'auto' }}>
                    {items.map((it, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#374151', padding: '4px 0', borderBottom: i < items.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                        <span style={{ flex: 1, paddingRight: 8 }}>{it.name}</span>
                        <span style={{ color: '#6b7280', whiteSpace: 'nowrap', fontWeight: 600 }}>×{it.qty}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 14, fontSize: 12, color: '#6b7280', flexWrap: 'wrap' }}>
                      <span>Subtotal: <strong style={{ color: '#374151' }}>₹{parseFloat(o.subtotal).toLocaleString('en-IN')}</strong></span>
                      <span>Delivery: <strong style={{ color: parseFloat(o.delivery_charge || 0) === 0 ? '#15803d' : '#374151' }}>{parseFloat(o.delivery_charge || 0) === 0 ? 'Free' : '₹' + o.delivery_charge}</strong></span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: '#0a5c47' }}>₹{parseFloat(o.total).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
