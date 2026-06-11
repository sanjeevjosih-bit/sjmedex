import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar({ cartCount = 0 }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/');
  }

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/products', label: 'Products' },
    { to: '/cart', label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}` },
    { to: '/orders', label: 'Orders' },
    { to: '/profile', label: 'Profile' },
  ];

  return (
    <nav style={{ background: '#0F6E56', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', height: 56 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginRight: 32 }}>
          <div style={{ width: 34, height: 34, background: '#1D9E75', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>💊</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 16, lineHeight: 1.2 }}>SJ Medex</div>
            <div style={{ color: '#9FE1CB', fontSize: 10 }}>Wholesale Platform</div>
          </div>
        </Link>

        {user && user.role !== 'admin' && (
          <div style={{ display: 'flex', gap: 4, flex: 1 }} className="nav-links-desktop">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} style={{
                color: location.pathname === l.to ? '#fff' : '#9FE1CB',
                fontWeight: location.pathname === l.to ? 600 : 400,
                fontSize: 13, padding: '6px 12px', borderRadius: 6,
                background: location.pathname === l.to ? 'rgba(255,255,255,0.15)' : 'transparent',
                textDecoration: 'none'
              }}>{l.label}</Link>
            ))}
          </div>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          {user && (
            <>
              <span style={{ color: '#9FE1CB', fontSize: 12 }}>{user.pharmacy_name || 'Admin'}</span>
              <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
