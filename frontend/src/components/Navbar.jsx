import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

  function handleLogout() { logout(); navigate('/'); }

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/products', label: 'Products' },
    { to: '/cart', label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}` },
    { to: '/orders', label: 'Orders' },
    { to: '/profile', label: 'Profile' },
  ];

  return (
    <nav style={{background:'#0a5c47',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 12px rgba(0,0,0,0.15)'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 20px',display:'flex',alignItems:'center',height:56}}>
        <Link to="/" style={{display:'flex',alignItems:'center',gap:9,textDecoration:'none',marginRight:28}}>
          <Logo />
          <div>
            <div style={{color:'#fff',fontWeight:800,fontSize:16,letterSpacing:'-0.3px',lineHeight:1.1}}>SJ Medex</div>
            <div style={{color:'#6ee7b7',fontSize:9,letterSpacing:'0.8px',fontWeight:500}}>WHOLESALE PLATFORM</div>
          </div>
        </Link>

        {user && user.role !== 'admin' && (
          <div style={{display:'flex',gap:2,flex:1,overflowX:'auto'}}>
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} style={{
                color: location.pathname === l.to ? '#fff' : '#9FE1CB',
                fontWeight: location.pathname === l.to ? 600 : 400,
                fontSize: 13, padding: '6px 12px', borderRadius: 6,
                background: location.pathname === l.to ? 'rgba(255,255,255,0.15)' : 'transparent',
                textDecoration: 'none', whiteSpace: 'nowrap'
              }}>{l.label}</Link>
            ))}
          </div>
        )}

        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:10}}>
          {user && (
            <>
              <div style={{background:'rgba(255,255,255,0.1)',borderRadius:6,padding:'4px 10px',display:'flex',alignItems:'center',gap:6}}>
                <span style={{width:7,height:7,background:'#6ee7b7',borderRadius:'50%',display:'inline-block'}}></span>
                <span style={{color:'#e0f2fe',fontSize:12,fontWeight:500,maxWidth:140,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{user.pharmacy_name||'Admin'}</span>
              </div>
              <button onClick={handleLogout} style={{background:'rgba(255,255,255,0.1)',color:'#fff',border:'1px solid rgba(255,255,255,0.2)',padding:'6px 14px',borderRadius:6,cursor:'pointer',fontSize:12,fontWeight:500}}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
