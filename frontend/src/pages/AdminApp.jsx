import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function AdminApp() {
  const [tab, setTab] = useState('registrations');
  const [pharmacies, setPharmacies] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [newProd, setNewProd] = useState({name:'',manufacturer:'',category:'medicine',price:'',unit:'',min_order:1});
  const [showAddProd, setShowAddProd] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/admin/pharmacies').then(r=>setPharmacies(r.data)).catch(()=>{});
    api.get('/admin/orders').then(r=>setOrders(r.data)).catch(()=>{});
    api.get('/admin/products').then(r=>setProducts(r.data)).catch(()=>{});
    api.get('/admin/analytics').then(r=>setAnalytics(r.data)).catch(()=>{});
  },[]);

  async function updatePharmacyStatus(id, status) {
    await api.patch(`/admin/pharmacies/${id}/status`, {status});
    setPharmacies(ps=>ps.map(p=>p.id===id?{...p,status}:p));
  }

  async function updateOrderStatus(id, status) {
    await api.patch(`/admin/orders/${id}/status`, {status});
    setOrders(os=>os.map(o=>o.id===id?{...o,status}:o));
  }

  async function addProduct() {
    if(!newProd.name||!newProd.price) return;
    const res = await api.post('/admin/products', newProd);
    setProducts(ps=>[...ps,res.data]);
    setNewProd({name:'',manufacturer:'',category:'medicine',price:'',unit:'',min_order:1});
    setShowAddProd(false);
  }

  async function toggleStock(id, cur) {
    const res = await api.patch(`/admin/products/${id}`, {in_stock:!cur});
    setProducts(ps=>ps.map(p=>p.id===id?res.data:p));
  }

  async function deleteProduct(id) {
    if(!confirm('Delete this product?')) return;
    await api.delete(`/admin/products/${id}`);
    setProducts(ps=>ps.filter(p=>p.id!==id));
  }

  const statusClass = {pending:'badge-pending',processing:'badge-processing',shipped:'badge-processing',delivered:'badge-approved',cancelled:'badge-rejected',approved:'badge-approved',rejected:'badge-rejected'};
  const pendingCount = pharmacies.filter(p=>p.status==='pending').length;

  const navItems = [
    {k:'registrations',l:'Registrations',badge:pendingCount},
    {k:'products',l:'Products'},
    {k:'orders',l:'Orders'},
    {k:'analytics',l:'Analytics'},
  ];

  return (
    <div style={{display:'grid',gridTemplateColumns:'200px 1fr',minHeight:'calc(100vh - 56px)'}}>
      <div style={{background:'#085041',paddingTop:16}}>
        <div style={{padding:'8px 16px 16px',borderBottom:'1px solid rgba(255,255,255,0.1)',marginBottom:8}}>
          <div style={{fontSize:24,marginBottom:4}}>💊</div>
          <div style={{color:'#fff',fontWeight:600,fontSize:14}}>SJ Medex</div>
          <div style={{color:'#9FE1CB',fontSize:10}}>Admin Panel</div>
        </div>
        {navItems.map(it=>(
          <div key={it.k} onClick={()=>setTab(it.k)} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 16px',cursor:'pointer',fontSize:13,color:tab===it.k?'#fff':'#9FE1CB',background:tab===it.k?'#1D9E75':'transparent',fontWeight:tab===it.k?500:400}}>
            {it.l}
            {it.badge>0&&<span style={{marginLeft:'auto',background:'#dc2626',color:'#fff',fontSize:10,padding:'1px 6px',borderRadius:10}}>{it.badge}</span>}
          </div>
        ))}
        <div onClick={()=>{logout();navigate('/');}} style={{padding:'10px 16px',cursor:'pointer',fontSize:13,color:'#9FE1CB',marginTop:40}}>Logout</div>
      </div>

      <div style={{padding:24,overflow:'auto'}}>

        {tab==='registrations'&&(
          <>
            <div className="page-title">Pharmacy Registrations</div>
            <div className="page-sub">{pendingCount} pending · {pharmacies.filter(p=>p.status==='approved').length} approved</div>
            <div className="card" style={{padding:0,overflow:'hidden'}}>
              <table>
                <thead><tr><th>Pharmacy</th><th>Owner</th><th>Mobile</th><th>Drug License</th><th>Expiry</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {pharmacies.map(p=>(
                    <tr key={p.id}>
                      <td style={{fontWeight:500}}>{p.pharmacy_name}</td>
                      <td>{p.owner_name}</td>
                      <td>+91 {p.mobile}</td>
                      <td style={{fontFamily:'monospace',fontSize:12}}>{p.drug_license_number}</td>
                      <td style={{fontSize:12}}>{p.drug_license_expiry?new Date(p.drug_license_expiry).toLocaleDateString('en-IN'):'—'}</td>
                      <td><span className={`badge ${statusClass[p.status]}`}>{p.status}</span></td>
                      <td>
                        {p.status==='pending'&&(
                          <div style={{display:'flex',gap:6}}>
                            <button onClick={()=>updatePharmacyStatus(p.id,'approved')} style={{padding:'4px 10px',background:'#f0fdf4',color:'#15803d',border:'1px solid #86efac',borderRadius:5,fontSize:11,cursor:'pointer',fontWeight:500}}>Approve</button>
                            <button onClick={()=>updatePharmacyStatus(p.id,'rejected')} style={{padding:'4px 10px',background:'#fee2e2',color:'#dc2626',border:'1px solid #fca5a5',borderRadius:5,fontSize:11,cursor:'pointer'}}>Reject</button>
                          </div>
                        )}
                        {p.drug_license_photo_url&&<a href={p.drug_license_photo_url} target="_blank" rel="noreferrer" style={{fontSize:11,color:'#0F6E56',marginLeft:4}}>View doc</a>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab==='products'&&(
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
              <div className="page-title">Products</div>
              <button onClick={()=>setShowAddProd(!showAddProd)} style={{padding:'8px 16px',background:'#0F6E56',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:500}}>+ Add product</button>
            </div>
            <div className="page-sub">{products.length} products</div>
            {showAddProd&&(
              <div className="card" style={{marginBottom:16}}>
                <div style={{fontWeight:600,marginBottom:14}}>Add new product</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  {[['name','Product name'],['manufacturer','Manufacturer'],['unit','Unit (e.g. strip of 10)']].map(([k,pl])=>(
                    <div key={k} className="form-group" style={{marginBottom:0}}><label className="form-label">{pl}</label><input className="form-input" value={newProd[k]} onChange={e=>setNewProd(p=>({...p,[k]:e.target.value}))} /></div>
                  ))}
                  <div className="form-group" style={{marginBottom:0}}><label className="form-label">Price (₹)</label><input className="form-input" type="number" value={newProd.price} onChange={e=>setNewProd(p=>({...p,price:e.target.value}))} /></div>
                  <div className="form-group" style={{marginBottom:0}}><label className="form-label">Category</label><select className="form-input" value={newProd.category} onChange={e=>setNewProd(p=>({...p,category:e.target.value}))}><option value="medicine">Medicine</option><option value="surgical">Surgical</option><option value="injectable">Injectable</option></select></div>
                  <div className="form-group" style={{marginBottom:0}}><label className="form-label">Min order qty</label><input className="form-input" type="number" value={newProd.min_order} onChange={e=>setNewProd(p=>({...p,min_order:parseInt(e.target.value)}))} /></div>
                </div>
                <div style={{display:'flex',gap:8,marginTop:14}}>
                  <button onClick={addProduct} style={{padding:'8px 16px',background:'#0F6E56',color:'#fff',border:'none',borderRadius:6,cursor:'pointer',fontSize:13}}>Add to catalogue</button>
                  <button onClick={()=>setShowAddProd(false)} style={{padding:'8px 16px',background:'#f9fafb',color:'#6b7280',border:'1px solid #e5e7eb',borderRadius:6,cursor:'pointer',fontSize:13}}>Cancel</button>
                </div>
              </div>
            )}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:14}}>
              {products.map(p=>(
                <div key={p.id} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,padding:16}}>
                  <span className={`badge badge-${p.category}`} style={{marginBottom:8,display:'inline-block',fontSize:10}}>{p.category}</span>
                  <div style={{fontWeight:500,fontSize:13,marginBottom:2}}>{p.name}</div>
                  <div style={{fontSize:11,color:'#6b7280',marginBottom:6}}>{p.manufacturer}</div>
                  <div style={{fontWeight:600,color:'#0F6E56',marginBottom:8}}>₹{p.price} <span style={{fontSize:11,fontWeight:400,color:'#9ca3af'}}>/{p.unit}</span></div>
                  <div style={{display:'flex',gap:6}}>
                    <button onClick={()=>toggleStock(p.id,p.in_stock)} style={{flex:1,padding:'5px',fontSize:11,cursor:'pointer',border:'1px solid #e5e7eb',borderRadius:5,background:p.in_stock?'#f0fdf4':'#fffbeb',color:p.in_stock?'#15803d':'#d97706'}}>{p.in_stock?'In stock':'Out of stock'}</button>
                    <button onClick={()=>deleteProduct(p.id)} style={{padding:'5px 8px',fontSize:11,cursor:'pointer',border:'1px solid #fca5a5',borderRadius:5,background:'#fee2e2',color:'#dc2626'}}>🗑</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab==='orders'&&(
          <>
            <div className="page-title">All Orders</div>
            <div className="page-sub">{orders.length} orders total</div>
            <div className="card" style={{padding:0,overflow:'hidden'}}>
              <table>
                <thead><tr><th>Order ID</th><th>Pharmacy</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th><th>Update</th></tr></thead>
                <tbody>
                  {orders.map(o=>{
                    const items = typeof o.items==='string'?JSON.parse(o.items):o.items;
                    return (
                      <tr key={o.id}>
                        <td style={{fontFamily:'monospace',fontSize:12}}>{o.order_number}</td>
                        <td><div style={{fontWeight:500}}>{o.pharmacy_name}</div><div style={{fontSize:11,color:'#6b7280'}}>+91 {o.mobile}</div></td>
                        <td style={{fontSize:12,color:'#6b7280'}}>{items?.length} items</td>
                        <td style={{fontWeight:600}}>₹{parseFloat(o.total).toLocaleString('en-IN')}</td>
                        <td style={{fontSize:12,color:'#6b7280'}}>{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                        <td><span className={`badge ${statusClass[o.status]}`}>{o.status}</span></td>
                        <td>
                          <select value={o.status} onChange={e=>updateOrderStatus(o.id,e.target.value)} style={{padding:'4px 8px',fontSize:12,border:'1px solid #e5e7eb',borderRadius:5,background:'#fff',cursor:'pointer'}}>
                            {['pending','processing','shipped','delivered','cancelled'].map(s=><option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab==='analytics'&&analytics&&(
          <>
            <div className="page-title">Analytics</div>
            <div className="page-sub">Platform overview</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:14,marginBottom:24}}>
              {[
                {icon:'💰',label:'Total Revenue',val:'₹'+parseFloat(analytics.total_revenue).toLocaleString('en-IN')},
                {icon:'🏥',label:'Active Pharmacies',val:analytics.approved_pharmacies},
                {icon:'📦',label:'Total Orders',val:analytics.total_orders},
                {icon:'⏳',label:'Pending Approvals',val:analytics.pending_approvals},
              ].map(s=>(
                <div key={s.label} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,padding:16}}>
                  <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
                  <div style={{fontSize:11,color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.4px',marginBottom:4}}>{s.label}</div>
                  <div style={{fontSize:22,fontWeight:600}}>{s.val}</div>
                </div>
              ))}
            </div>
            <div className="card">
              <div style={{fontWeight:600,marginBottom:14}}>Orders by status</div>
              {analytics.orders_by_status.map(s=>{
                const pct = analytics.total_orders>0?Math.round(s.count/analytics.total_orders*100):0;
                const colors = {delivered:'#15803d',processing:'#2563eb',shipped:'#0369a1',pending:'#d97706',cancelled:'#dc2626'};
                return (
                  <div key={s.status} style={{marginBottom:12}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:5}}>
                      <span style={{textTransform:'capitalize'}}>{s.status}</span>
                      <span style={{color:'#6b7280'}}>{s.count} ({pct}%)</span>
                    </div>
                    <div style={{height:6,background:'#f3f4f6',borderRadius:4,overflow:'hidden'}}>
                      <div style={{height:'100%',width:pct+'%',background:colors[s.status]||'#6b7280',borderRadius:4}} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
