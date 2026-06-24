import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api';

export default function PaymentStatus() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get('order_id');
  const [status, setStatus] = useState('checking'); // checking | paid | failed | pending
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (!orderId) { setStatus('failed'); return; }

    let interval;
    async function check() {
      try {
        const res = await api.get(`/orders/${orderId}/payment-status`);
        const ps = res.data.payment_status;
        if (ps === 'paid') { setStatus('paid'); clearInterval(interval); }
        else if (ps === 'failed') { setStatus('failed'); clearInterval(interval); }
        else setAttempts(a => a + 1);
      } catch (err) {
        setAttempts(a => a + 1);
      }
    }

    check();
    interval = setInterval(check, 3000); // poll every 3s, webhook usually updates within seconds
    const timeout = setTimeout(() => { clearInterval(interval); if (status === 'checking') setStatus('pending'); }, 30000); // give up after 30s

    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [orderId]);

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ textAlign: 'center', maxWidth: 420 }}>
          {status === 'checking' && (
            <>
              <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Confirming your payment…</div>
              <p style={{ color: '#6b7280', fontSize: 13.5 }}>This usually takes a few seconds. Please don't close this page.</p>
            </>
          )}
          {status === 'paid' && (
            <>
              <div style={{ width: 64, height: 64, background: '#EAF5EE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 30 }}>✅</div>
              <div style={{ fontWeight: 700, fontSize: 19, marginBottom: 8, color: '#16201C' }}>Payment successful!</div>
              <p style={{ color: '#6b7280', fontSize: 13.5, marginBottom: 22 }}>Order <strong>{orderId}</strong> has been confirmed and is being processed.</p>
              <button onClick={() => navigate('/orders')} style={{ background: '#0E4D3B', color: '#fff', padding: '12px 28px', borderRadius: 9, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>View my orders →</button>
            </>
          )}
          {status === 'failed' && (
            <>
              <div style={{ width: 64, height: 64, background: '#FAEAE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 30 }}>✕</div>
              <div style={{ fontWeight: 700, fontSize: 19, marginBottom: 8, color: '#16201C' }}>Payment failed</div>
              <p style={{ color: '#6b7280', fontSize: 13.5, marginBottom: 22 }}>Your order was saved but payment didn't go through. You can try again or choose Cash on Delivery instead.</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <Link to="/orders" style={{ background: '#fff', border: '1px solid #e5e7eb', color: '#374151', padding: '12px 22px', borderRadius: 9, fontSize: 13.5, fontWeight: 600 }}>View orders</Link>
                <button onClick={() => navigate('/cart')} style={{ background: '#0E4D3B', color: '#fff', padding: '12px 22px', borderRadius: 9, border: 'none', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Try again</button>
              </div>
            </>
          )}
          {status === 'pending' && (
            <>
              <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Still confirming…</div>
              <p style={{ color: '#6b7280', fontSize: 13.5, marginBottom: 22 }}>This is taking longer than usual. Your order is saved — check My Orders shortly, or contact support if this persists.</p>
              <Link to="/orders" style={{ background: '#0E4D3B', color: '#fff', padding: '12px 28px', borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>View my orders →</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
