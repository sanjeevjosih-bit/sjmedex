import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/mine').then(r => { setOrders(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const statusClass = { pending: 'badge-pending', processing: 'badge-processing', shipped: 'badge-processing', delivered: 'badge-approved', cancelled: 'badge-rejected' };
  const statusIcon = { pending: '⏳', processing: '⚙️', shipped: '🚚', delivered: '✅', cancelled: '❌' };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 16px' }}>
        <div className="page-title">My Orders</div>
        <div className="page-sub">Complete order history</div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>Loading...</div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <div style={{ marginBottom: 14 }}>No orders yet.</div>
            <Link to="/products" style={{ color: '#0F6E56', fontWeight: 600, textDecoration: 'none' }}>Browse Products →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {orders.map(o => {
              const items = typeof o.items === 'string' ? JSON.parse(o.items) : o.items;
              return (
                <div key={o.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  {/* HEADER ROW */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 10 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'monospace', color: '#0a1a14' }}>{o.order_number}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </div>
                    <span className={`badge ${statusClass[o.status] || 'badge-pending'}`} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {statusIcon[o.status]} {o.status}
                    </span>
                  </div>

                  {/* ITEMS LIST */}
                  <div style={{ background: '#f9fafb', borderRadius: 8, padding: '10px 12px', marginBottom: 10, maxHeight: 120, overflowY: 'auto' }}>
                    {items.map((it, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#374151', padding: '3px 0', borderBottom: i < items.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                        <span style={{ flex: 1, paddingRight: 8 }}>{it.name}</span>
                        <span style={{ color: '#6b7280', whiteSpace: 'nowrap' }}>×{it.qty}</span>
                      </div>
                    ))}
                  </div>

                  {/* TOTALS ROW */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#6b7280' }}>
                      <span>Subtotal: <strong style={{ color: '#374151' }}>₹{parseFloat(o.subtotal).toLocaleString('en-IN')}</strong></span>
                      <span>Delivery: <strong style={{ color: parseFloat(o.delivery_charge) === 0 ? '#15803d' : '#374151' }}>{parseFloat(o.delivery_charge) === 0 ? 'Free' : '₹' + o.delivery_charge}</strong></span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: '#0F6E56' }}>₹{parseFloat(o.total).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
