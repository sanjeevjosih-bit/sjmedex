import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.status === 'approved') navigate('/dashboard');
      else navigate('/pending');
    }
  }, [user]);

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <nav style={{ background: '#0F6E56', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: '#1D9E75', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>💊</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 18 }}>SJ Medex</div>
            <div style={{ color: '#9FE1CB', fontSize: 10 }}>Wholesale Medical Platform</div>
          </div>
        </div>
        <Link to="/admin/login" style={{ color: '#9FE1CB', fontSize: 12 }}>Admin →</Link>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ width: 96, height: 96, background: '#0F6E56', borderRadius: 24, margin: '0 auto 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>💊</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#0F6E56', marginBottom: 8 }}>SJ Medex</h1>
        <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.7, marginBottom: 10 }}>Wholesale medicines & surgical supplies — directly to your pharmacy at the best rates.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36, fontSize: 13, color: '#0F6E56', fontWeight: 500 }}>
          <span>✓ Verified Distributors</span>
          <span>✓ Best Wholesale Rates</span>
          <span>✓ Fast Delivery</span>
        </div>
        <Link to="/login" className="btn btn-primary" style={{ marginBottom: 12, display: 'flex', maxWidth: 360, margin: '0 auto 12px' }}>Login to your pharmacy</Link>
        <Link to="/register" className="btn btn-outline" style={{ display: 'flex', maxWidth: 360, margin: '0 auto 24px' }}>Register new pharmacy</Link>
        <div style={{ background: '#E1F5EE', borderRadius: 10, padding: '14px 18px', fontSize: 12, color: '#085041', display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', maxWidth: 360, margin: '0 auto' }}>
          <span style={{ fontSize: 20 }}>📱</span>
          <span>Add SJ Medex to your home screen — tap <strong>Share → Add to Home Screen</strong> on your phone for instant access.</span>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: '#f9fafb', padding: '48px 24px', marginTop: 48 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Built for licensed pharmacies</h2>
          <p style={{ color: '#6b7280', marginBottom: 36 }}>Upload your Drug License once. Browse and order instantly after approval.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              { icon: '🔒', title: 'Verified access', desc: 'Only licensed pharmacies can see wholesale pricing' },
              { icon: '💰', title: 'Best rates', desc: 'Direct from distributor — no middlemen' },
              { icon: '📦', title: 'Full catalogue', desc: 'Medicines, surgical items & injectables' },
              { icon: '🚚', title: 'Free delivery', desc: 'On orders above ₹5,000' },
            ].map(f => (
              <div key={f.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '20px 16px' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
