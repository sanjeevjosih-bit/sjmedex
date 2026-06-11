import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders/mine').then(r => setOrders(r.data)).catch(() => {});
  }, []);

  const total = orders.reduce((s, o) => s + parseFloat(o.total || 0), 0);
  const statusMap = { pending:'badge-pending', processing:'badge-processing', delivered:'badge-approved', cancelled:'badge-rejected', shipped:'badge-processing' };

  return (
    <>
      <Navbar />
      <div style={{maxWidth:1100,margin:'0 auto',padding:24}}>
        <div style={{marginBottom:20}}>
          <div className="page-title">Good day, {user?.pharmacy_name} 👋</div>
          <div className="page-sub">Here's your account overview</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:14,marginBottom:28}}>
          {[
            {icon:'📦',label:'Total Orders',val:orders.length},
            {icon:'💰',label:'Total Spent',val:'₹'+total.toLocaleString('en-IN')},
            {icon:'🚚',label:'In Transit',val:orders.filter(o=>o.status==='shipped'||o.status==='processing').length},
            {icon:'✅',label:'Delivered',val:orders.filter(o=>o.status==='delivered').length},
          ].map(s=>(
            <div key={s.label} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,padding:16}}>
              <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
              <div style={{fontSize:11,color:'#6b7280',fontWeight:500,textTransform:'uppercase',letterSpacing:'0.4px',marginBottom:4}}>{s.label}</div>
              <div style={{fontSize:24,fontWeight:600}}>{s.val}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div style={{fontWeight:600,fontSize:15}}>Recent orders</div>
          <Link to="/orders" style={{fontSize:12}}>View all →</Link>
        </div>
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          {orders.length===0 ? (
            <div style={{padding:32,textAlign:'center',color:'#9ca3af'}}>No orders yet. <Link to="/products">Browse products →</Link></div>
          ) : (
            <table>
              <thead><tr><th>Order ID</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {orders.slice(0,5).map(o=>(
                  <tr key={o.id}>
                    <td style={{fontWeight:500}}>{o.order_number}</td>
                    <td style={{color:'#6b7280'}}>{Array.isArray(o.items)?o.items.length:JSON.parse(o.items||'[]').length} items</td>
                    <td style={{fontWeight:500}}>₹{parseFloat(o.total).toLocaleString('en-IN')}</td>
                    <td style={{color:'#6b7280'}}>{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                    <td><span className={`badge badge-${o.status}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginTop:20}}>
          <Link to="/products" style={{background:'#0F6E56',color:'#fff',padding:16,borderRadius:10,textDecoration:'none',display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:24}}>📦</span><div><div style={{fontWeight:600}}>Browse Products</div><div style={{fontSize:12,opacity:0.8}}>View full catalogue</div></div>
          </Link>
          <Link to="/orders" style={{background:'#E1F5EE',color:'#0F6E56',padding:16,borderRadius:10,textDecoration:'none',display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:24}}>🧾</span><div><div style={{fontWeight:600}}>My Orders</div><div style={{fontSize:12,opacity:0.7}}>Track your orders</div></div>
          </Link>
        </div>
      </div>
    </>
  );
}
