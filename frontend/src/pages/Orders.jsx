import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    api.get('/orders/mine').then(r => { setOrders(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const statusStyle = {
    pending:    { bg: '#FBF3E8', text: '#A8732E', label: 'Pending' },
    processing: { bg: '#EEF3FB', text: '#3B6FA8', label: 'Processing' },
    shipped:    { bg: '#EEF3FB', text: '#3B6FA8', label: 'Shipped' },
    delivered:  { bg: '#EAF5EE', text: '#1F7A4D', label: 'Delivered' },
    cancelled:  { bg: '#FAEAE7', text: '#B0463A', label: 'Cancelled' },
  };

  async function downloadInvoice(orderId, orderNumber) {
    setDownloading(orderId);
    try {
      const res = await api.get(`/orders/${orderId}/invoice`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice_${orderNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download invoice. Please try again.');
    } finally {
      setDownloading(null);
    }
  }

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: "'Inter',-apple-system,sans-serif" }}>
        <style>{`
          *{box-sizing:border-box}
          a{text-decoration:none}
          .order-card{transition:box-shadow 0.18s, transform 0.18s}
          .order-card:hover{box-shadow:0 8px 24px rgba(17,24,39,0.06);transform:translateY(-1px)}
          .invoice-btn{transition:background 0.15s, border-color 0.15s}
          .invoice-btn:hover:not(:disabled){background:#E9F3EE;border-color:#0E4D3B}
        `}</style>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px 40px' }}>

          {/* HEADER */}
          <div style={{ marginBottom: 26 }}>
            <div style={{ fontSize: 23, fontWeight: 700, color: '#16201C', letterSpacing: '-0.3px' }}>My orders</div>
            <div style={{ fontSize: 13.5, color: '#9CA3AF', marginTop: 4 }}>Complete history of every order you've placed</div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#9CA3AF', fontSize: 13.5 }}>Loading your orders…</div>
          ) : orders.length === 0 ? (
            <div style={{ background: '#fff', border: '1px solid #ECECE7', borderRadius: 14, textAlign: 'center', padding: '60px 24px' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🧾</div>
              <div style={{ fontSize: 14.5, fontWeight: 500, color: '#374151', marginBottom: 4 }}>No orders yet</div>
              <div style={{ fontSize: 12.5, color: '#9CA3AF', marginBottom: 16 }}>Browse the catalogue to place your first order</div>
              <Link to="/products" style={{ display: 'inline-block', background: '#0E4D3B', color: '#fff', padding: '10px 22px', borderRadius: 9, fontSize: 13.5, fontWeight: 600 }}>Browse products →</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {orders.map(o => {
                const items = typeof o.items === 'string' ? JSON.parse(o.items) : o.items;
                const ss = statusStyle[o.status] || statusStyle.pending;
                return (
                  <div key={o.id} className="order-card" style={{ background: '#fff', border: '1px solid #ECECE7', borderRadius: 14, padding: 20 }}>

                    {/* HEADER ROW */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, gap: 10 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14.5, fontFamily: 'monospace', color: '#16201C' }}>{o.order_number}</div>
                        <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 3 }}>{new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                      </div>
                      <span style={{ background: ss.bg, color: ss.text, fontSize: 11.5, fontWeight: 600, padding: '5px 12px', borderRadius: 20, whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {ss.label}
                      </span>
                    </div>

                    {/* ITEMS LIST */}
                    <div style={{ background: '#FAFAF8', borderRadius: 10, padding: '4px 14px', marginBottom: 14, maxHeight: 140, overflowY: 'auto', border: '1px solid #F3F3EF' }}>
                      {items.map((it, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: '#374151', padding: '9px 0', borderBottom: i < items.length - 1 ? '1px solid #ECECE7' : 'none' }}>
                          <span style={{ flex: 1, paddingRight: 8 }}>{it.name}</span>
                          <span style={{ color: '#9CA3AF', whiteSpace: 'nowrap', fontWeight: 500 }}>×{it.qty}</span>
                        </div>
                      ))}
                    </div>

                    {/* TOTALS ROW */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #F3F3EF' }}>
                      <div style={{ display: 'flex', gap: 18, fontSize: 12, color: '#9CA3AF', flexWrap: 'wrap' }}>
                        <span>Subtotal&nbsp;<strong style={{ color: '#374151' }}>₹{parseFloat(o.subtotal).toLocaleString('en-IN')}</strong></span>
                        <span>Delivery&nbsp;<strong style={{ color: parseFloat(o.delivery_charge || 0) === 0 ? '#1F7A4D' : '#374151' }}>{parseFloat(o.delivery_charge || 0) === 0 ? 'Free' : '₹' + o.delivery_charge}</strong></span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 18, color: '#0E4D3B' }}>₹{parseFloat(o.total).toLocaleString('en-IN')}</div>
                    </div>

                    {/* INVOICE DOWNLOAD */}
                    <button
                      className="invoice-btn"
                      onClick={() => downloadInvoice(o.id, o.order_number)}
                      disabled={downloading === o.id}
                      style={{
                        width: '100%', padding: '11px', background: downloading === o.id ? '#F4F4F1' : '#F2F8F5',
                        color: downloading === o.id ? '#9CA3AF' : '#0E4D3B', border: '1.5px solid ' + (downloading === o.id ? '#ECECE7' : '#CFEADA'),
                        borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: downloading === o.id ? 'default' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                      }}
                    >
                      {downloading === o.id ? 'Generating invoice…' : 'Download GST invoice'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
