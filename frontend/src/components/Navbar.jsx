import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Logo = () => (
  <svg width="34" height="34" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="38" rx="10" fill="#1DB97A"/>
    <rect x="17" y="6" width="4" height="26" rx="2" fill="white"/>
    <rect x="6" y="17" width="26" height="4" rx="2" fill="white"/>
    <circle cx="19" cy="19" r="7" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4"/>
  </svg>
);

export default function Navbar({ cartCount = 0 }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() { logout(); navigate('/'); }

  const navLinks = [
    { to: '/products', label: 'Browse Products', icon: '📦' },
    { to: '/orders', label: 'My Orders', icon: '🧾' },
    { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { to: '/cart', label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}`, icon: '🛒' },
    { to: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav style={{ background: '#0a5c47', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
      <style>{`
        .navbar-desktop-links{display:flex}
        .navbar-hamburger{display:none}
        .navbar-mobile-panel{display:none}
        @media(max-width:860px){
          .navbar-desktop-links{display:none!important}
          .navbar-hamburger{display:flex!important}
          .navbar-mobile-panel.open{display:flex!important}
          .navbar-username{display:none!important}
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', height: 56 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', marginRight: 28 }}>
          <Logo />
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 16, letterSpacing: '-0.3px', lineHeight: 1.1 }}>SJ Medex</div>
            <div style={{ color: '#6ee7b7', fontSize: 9, letterSpacing: '0.8px', fontWeight: 500 }}>WHOLESALE PLATFORM</div>
          </div>
        </Link>

        {user && user.role !== 'admin' && (
          <div className="navbar-desktop-links" style={{ gap: 2, flex: 1, overflowX: 'auto' }}>
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} style={{
                color: location.pathname === l.to ? '#fff' : '#9FE1CB',
                fontWeight: location.pathname === l.to ? 600 : 400,
                fontSize: 13, padding: '6px 12px', borderRadius: 6,
                background: location.pathname === l.to ? 'rgba(255,255,255,0.15)' : 'transparent',
                textDecoration: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6
              }}>
                <span>{l.icon}</span>{l.label}
              </Link>
            ))}
          </div>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          {user && (
            <>
              <div className="navbar-username" style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, background: '#6ee7b7', borderRadius: '50%', display: 'inline-block' }}></span>
                <span style={{ color: '#e0f2fe', fontSize: 12, fontWeight: 500, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.pharmacy_name || 'Admin'}</span>
              </div>
              <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>Logout</button>
              {user.role !== 'admin' && (
                <button onClick={() => setMenuOpen(!menuOpen)} className="navbar-hamburger" style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', borderRadius: 6, width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                  {menuOpen ? '✕' : '☰'}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* MOBILE DROPDOWN — Browse Products & My Orders shown first, at top */}
      {user && user.role !== 'admin' && (
        <div className={`navbar-mobile-panel ${menuOpen ? 'open' : ''}`} style={{ flexDirection: 'column', background: '#085041', padding: menuOpen ? '8px 16px 12px' : 0, borderTop: menuOpen ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} style={{
              color: location.pathname === l.to ? '#fff' : '#9FE1CB',
              fontWeight: location.pathname === l.to ? 700 : 500,
              fontSize: 14, padding: '12px 10px', borderRadius: 8,
              background: location.pathname === l.to ? 'rgba(255,255,255,0.14)' : 'transparent',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10,
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
              <span style={{ fontSize: 16 }}>{l.icon}</span>{l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
