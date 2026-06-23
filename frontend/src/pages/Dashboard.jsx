import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/mine').then(r => { setOrders(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const total = orders.reduce((s, o) => s + parseFloat(o.total || 0), 0);

  const statusStyle = {
    pending:    { bg: '#FBF3E8', text: '#A8732E' },
    processing: { bg: '#EEF3FB', text: '#3B6FA8' },
    shipped:    { bg: '#EEF3FB', text: '#3B6FA8' },
    delivered:  { bg: '#EAF5EE', text: '#1F7A4D' },
    cancelled:  { bg: '#FAEAE7', text: '#B0463A' },
  };

  const firstName = (user?.pharmacy_name || '').split(' ')[0] || user?.pharmacy_name;

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: "'Inter',-apple-system,sans-serif" }}>
        <style>{`
          *{box-sizing:border-box}
          a{text-decoration:none}
          .stat-card{transition:box-shadow 0.18s, transform 0.18s}
          .stat-card:hover{box-shadow:0 8px 24px rgba(17,24,39,0.07);transform:translateY(-1px)}
          .quick-link{transition:box-shadow 0.18s, transform 0.18s}
          .quick-link:hover{box-shadow:0 10px 28px rgba(17,24,39,0.1);transform:translateY(-1px)}
          .order-row{transition:background 0.12s}
          .order-row:hover{background:#FAFAF8}
        `}</style>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 40px' }}>

          {/* HEADER */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 23, fontWeight: 700, color: '#16201C', letterSpacing: '-0.3px' }}>
              Good day, {firstName}
            </div>
            <div style={{ fontSize: 13.5, color: '#9CA3AF', marginTop: 4 }}>Here's how your account is doing</div>
          </div>

          {/* STATS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 14, marginBottom: 32 }}>
            {[
              { icon: '📦', label: 'Total orders', val: orders.length, accent: '#0E4D3B' },
              { icon: '💳', label: 'Total spent', val: '₹' + total.toLocaleString('en-IN'), accent: '#0E4D3B' },
              { icon: '🚚', label: 'In transit', val: orders.filter(o => o.status === 'shipped' || o.status === 'processing').length, accent: '#3B6FA8' },
              { icon: '✓', label: 'Delivered', val: orders.filter(o => o.status === 'delivered').length, accent: '#1F7A4D' },
            ].map(s => (
              <div key={s.label} className="stat-card" style={{ background: '#fff', border: '1px solid #ECECE7', borderRadius: 14, padding: '20px 18px' }}>
                <div style={{ fontSize: 20, marginBottom: 10, color: s.accent }}>{s.icon}</div>
                <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 25, fontWeight: 700, color: '#16201C', letterSpacing: '-0.3px' }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 32 }}>
            <Link to="/products" className="quick-link" style={{ background: '#0E4D3B', color: '#fff', padding: '20px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 26 }}>📦</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>Browse products</div>
                <div style={{ fontSize: 12, opacity: 0.75, marginTop: 1 }}>View the full catalogue</div>
              </div>
            </Link>
            <Link to="/orders" className="quick-link" style={{ background: '#fff', border: '1px solid #ECECE7', color: '#16201C', padding: '20px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 26 }}>🧾</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>My orders</div>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}>Track every order you've placed</div>
              </div>
            </Link>
          </div>

          {/* RECENT ORDERS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#16201C' }}>Recent orders</div>
            {orders.length > 0 && <Link to="/orders" style={{ fontSize: 12.5, color: '#0E4D3B', fontWeight: 600 }}>View all →</Link>}
          </div>

          <div style={{ background: '#fff', border: '1px solid #ECECE7', borderRadius: 14, overflow: 'hidden' }}>
            {loading ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#9CA3AF', fontSize: 13.5 }}>Loading your orders…</div>
            ) : orders.length === 0 ? (
              <div style={{ padding: '48px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>🧾</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 4 }}>No orders yet</div>
                <div style={{ fontSize: 12.5, color: '#9CA3AF', marginBottom: 14 }}>Place your first order to see it here</div>
                <Link to="/products" style={{ fontSize: 13, color: '#0E4D3B', fontWeight: 600 }}>Browse products →</Link>
              </div>
            ) : (
              <>
                {/* DESKTOP TABLE */}
                <table className="hide-mobile-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #ECECE7' }}>
                      {['Order ID', 'Items', 'Total', 'Date', 'Status'].map(h => (
                        <th key={h} style={{ padding: '12px 18px', textAlign: 'left', fontSize: 11, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(o => {
                      const itemCount = Array.isArray(o.items) ? o.items.length : JSON.parse(o.items || '[]').length;
                      const ss = statusStyle[o.status] || statusStyle.pending;
                      return (
                        <tr key={o.id} className="order-row" style={{ borderBottom: '1px solid #F3F3EF' }}>
                          <td style={{ padding: '14px 18px', fontWeight: 600, fontSize: 13, color: '#16201C', fontFamily: 'monospace' }}>{o.order_number}</td>
                          <td style={{ padding: '14px 18px', color: '#6b7280', fontSize: 13 }}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</td>
                          <td style={{ padding: '14px 18px', fontWeight: 600, fontSize: 13, color: '#16201C' }}>₹{parseFloat(o.total).toLocaleString('en-IN')}</td>
                          <td style={{ padding: '14px 18px', color: '#9CA3AF', fontSize: 12.5 }}>{new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                          <td style={{ padding: '14px 18px' }}>
                            <span style={{ background: ss.bg, color: ss.text, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20, textTransform: 'capitalize' }}>{o.status}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
