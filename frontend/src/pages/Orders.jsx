import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/mine').then(r=>{setOrders(r.data);setLoading(false);}).catch(()=>setLoading(false));
  },[]);

  const statusClass = {pending:'badge-pending',processing:'badge-processing',shipped:'badge-processing',delivered:'badge-approved',cancelled:'badge-rejected'};

  return (
    <>
      <Navbar />
      <div style={{maxWidth:1100,margin:'0 auto',padding:24}}>
        <div className="page-title">My Orders</div>
        <div className="page-sub">Complete order history</div>
        {loading?<div style={{textAlign:'center',padding:40,color:'#6b7280'}}>Loading...</div>:
        orders.length===0?<div style={{textAlign:'center',padding:60,color:'#9ca3af'}}><div style={{fontSize:40,marginBottom:12}}>📋</div>No orders yet.</div>:(
          <div className="card" style={{padding:0,overflow:'hidden'}}>
            <table>
              <thead><tr><th>Order ID</th><th>Items</th><th>Subtotal</th><th>Delivery</th><th>Total</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {orders.map(o=>{
                  const items = typeof o.items==='string'?JSON.parse(o.items):o.items;
                  return (
                    <tr key={o.id}>
                      <td style={{fontWeight:500,fontFamily:'monospace'}}>{o.order_number}</td>
                      <td style={{fontSize:12,color:'#6b7280',maxWidth:200}}>{items.map(i=>i.name+' ×'+i.qty).join(', ')}</td>
                      <td>₹{parseFloat(o.subtotal).toLocaleString('en-IN')}</td>
                      <td>{parseFloat(o.delivery_charge)===0?<span style={{color:'#15803d',fontSize:12}}>Free</span>:'₹'+o.delivery_charge}</td>
                      <td style={{fontWeight:600}}>₹{parseFloat(o.total).toLocaleString('en-IN')}</td>
                      <td style={{color:'#6b7280'}}>{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                      <td><span className={`badge ${statusClass[o.status]||'badge-pending'}`}>{o.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
