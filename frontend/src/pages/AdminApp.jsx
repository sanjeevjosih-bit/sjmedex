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
  const [newProd, setNewProd] = useState({name:'',manufacturer:'',category:'medicine',price:'',mrp:'',unit:'',min_order:1000,expiry_date:''});
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
    if(!newProd.name||!newProd.price) return alert('Name and price required');
    const res = await api.post('/admin/products', newProd);
    setProducts(ps=>[...ps,res.data]);
    setNewProd({name:'',manufacturer:'',category:'medicine',price:'',mrp:'',unit:'',min_order:1000,expiry_date:''});
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

  const inputStyle = {width:'100%',padding:'9px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:13,outline:'none'};

  return (
    <div style={{display:'grid',gridTemplateColumns:'200px 1fr',minHeight:'calc(100vh - 0px)'}}>
      <div style={{background:'#085041',paddingTop:16,position:'sticky',top:0,height:'100vh',overflowY:'auto'}}>
        <div style={{padding:'8px 16px 16px',borderBottom:'1px solid rgba(255,255,255,0.1)',marginBottom:8}}>
          <div style={{fontSize:22,marginBottom:4}}>💊</div>
          <div style={{color:'#fff',fontWeight:700,fontSize:14}}>SJ Medex</div>
          <div style={{color:'#9FE1CB',fontSize:10}}>Admin Panel</div>
        </div>
        {navItems.map(it=>(
          <div key={it.k} onClick={()=>setTab(it.k)} style={{display:'flex',alignItems:'center',gap:8,padding:'11px 16px',cursor:'pointer',fontSize:13,color:tab===it.k?'#fff':'#9FE1CB',background:tab===it.k?'#1D9E75':'transparent',fontWeight:tab===it.k?600:400,borderLeft:tab===it.k?'3px solid #6ee7b7':'3px solid transparent'}}>
            {it.l}
            {it.badge>0&&<span style={{marginLeft:'auto',background:'#dc2626',color:'#fff',fontSize:10,padding:'1px 6px',borderRadius:10}}>{it.badge}</span>}
          </div>
        ))}
        <div onClick={()=>{logout();navigate('/');}} style={{padding:'11px 16px',cursor:'pointer',fontSize:13,color:'#9FE1CB',marginTop:20,borderTop:'1px solid rgba(255,255,255,0.1)'}}>← Logout</div>
      </div>

      <div style={{padding:24,overflowY:'auto',background:'#f9fafb'}}>

        {/* REGISTRATIONS */}
        {tab==='registrations'&&(
          <>
            <div className="page-title">Pharmacy Registrations</div>
            <div className="page-sub">{pendingCount} pending · {pharmacies.filter(p=>p.status==='approved').length} approved</div>
            <div style={{background:'#fff',borderRadius:12,border:'1px solid #e5e7eb',overflow:'hidden'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
                <thead><tr style={{background:'#f9fafb'}}><th style={{padding:'10px 14px',textAlign:'left',fontSize:11,color:'#6b7280',fontWeight:600,borderBottom:'1px solid #e5e7eb'}}>Pharmacy</th><th style={{padding:'10px 14px',textAlign:'left',fontSize:11,color:'#6b7280',fontWeight:600,borderBottom:'1px solid #e5e7eb'}}>Owner</th><th style={{padding:'10px 14px',textAlign:'left',fontSize:11,color:'#6b7280',fontWeight:600,borderBottom:'1px solid #e5e7eb'}}>Mobile</th><th style={{padding:'10px 14px',textAlign:'left',fontSize:11,color:'#6b7280',fontWeight:600,borderBottom:'1px solid #e5e7eb'}}>Drug License</th><th style={{padding:'10px 14px',textAlign:'left',fontSize:11,color:'#6b7280',fontWeight:600,borderBottom:'1px solid #e5e7eb'}}>Expiry</th><th style={{padding:'10px 14px',textAlign:'left',fontSize:11,color:'#6b7280',fontWeight:600,borderBottom:'1px solid #e5e7eb'}}>Status</th><th style={{padding:'10px 14px',textAlign:'left',fontSize:11,color:'#6b7280',fontWeight:600,borderBottom:'1px solid #e5e7eb'}}>Action</th></tr></thead>
                <tbody>
                  {pharmacies.map(p=>(
                    <tr key={p.id} style={{borderBottom:'1px solid #f3f4f6'}}>
                      <td style={{padding:'12px 14px',fontWeight:500}}>{p.pharmacy_name}</td>
                      <td style={{padding:'12px 14px'}}>{p.owner_name}</td>
                      <td style={{padding:'12px 14px'}}>+91 {p.mobile}</td>
                      <td style={{padding:'12px 14px',fontFamily:'monospace',fontSize:11}}>{p.drug_license_number}</td>
                      <td style={{padding:'12px 14px',fontSize:12}}>{p.drug_license_expiry?new Date(p.drug_license_expiry).toLocaleDateString('en-IN'):'—'}</td>
                      <td style={{padding:'12px 14px'}}><span className={`badge ${statusClass[p.status]}`}>{p.status}</span></td>
                      <td style={{padding:'12px 14px'}}>
                        {p.status==='pending'&&(
                          <div style={{display:'flex',gap:6}}>
                            <button onClick={()=>updatePharmacyStatus(p.id,'approved')} style={{padding:'5px 12px',background:'#f0fdf4',color:'#15803d',border:'1px solid #86efac',borderRadius:6,fontSize:11,cursor:'pointer',fontWeight:600}}>✓ Approve</button>
                            <button onClick={()=>updatePharmacyStatus(p.id,'rejected')} style={{padding:'5px 12px',background:'#fee2e2',color:'#dc2626',border:'1px solid #fca5a5',borderRadius:6,fontSize:11,cursor:'pointer'}}>✕ Reject</button>
                          </div>
                        )}
                        {p.drug_license_photo_url&&<a href={p.drug_license_photo_url} target="_blank" rel="noreferrer" style={{fontSize:11,color:'#0F6E56'}}>View doc</a>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* PRODUCTS */}
        {tab==='products'&&(
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
              <div className="page-title">Products</div>
              <button onClick={()=>setShowAddProd(!showAddProd)} style={{padding:'9px 18px',background:'#0F6E56',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:600}}>+ Add Product</button>
            </div>
            <div className="page-sub">{products.length} products in catalogue</div>

            {showAddProd&&(
              <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:20,marginBottom:20}}>
                <div style={{fontWeight:600,fontSize:15,marginBottom:16}}>Add New Product</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>PRODUCT NAME *</label><input style={inputStyle} placeholder="e.g. Paracetamol 500mg" value={newProd.name} onChange={e=>setNewProd(p=>({...p,name:e.target.value}))} /></div>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>MANUFACTURER</label><input style={inputStyle} placeholder="e.g. Cipla Ltd" value={newProd.manufacturer} onChange={e=>setNewProd(p=>({...p,manufacturer:e.target.value}))} /></div>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>CATEGORY</label><select style={inputStyle} value={newProd.category} onChange={e=>setNewProd(p=>({...p,category:e.target.value}))}><option value="medicine">Medicine</option><option value="surgical">Surgical</option><option value="injectable">Injectable</option></select></div>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>WHOLESALE PRICE (₹) *</label><input style={inputStyle} type="number" placeholder="0.00" value={newProd.price} onChange={e=>setNewProd(p=>({...p,price:e.target.value}))} /></div>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>MRP (₹)</label><input style={inputStyle} type="number" placeholder="0.00" value={newProd.mrp} onChange={e=>setNewProd(p=>({...p,mrp:e.target.value}))} /></div>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>UNIT</label><input style={inputStyle} placeholder="e.g. strip of 10" value={newProd.unit} onChange={e=>setNewProd(p=>({...p,unit:e.target.value}))} /></div>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>MIN ORDER QTY</label><input style={inputStyle} type="number" value={newProd.min_order} onChange={e=>setNewProd(p=>({...p,min_order:parseInt(e.target.value)}))} /></div>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>EXPIRY DATE</label><input style={inputStyle} type="date" value={newProd.expiry_date} onChange={e=>setNewProd(p=>({...p,expiry_date:e.target.value}))} /></div>
                </div>
                <div style={{display:'flex',gap:8,marginTop:16}}>
                  <button onClick={addProduct} style={{padding:'9px 20px',background:'#0F6E56',color:'#fff',border:'none',borderRadius:7,cursor:'pointer',fontSize:13,fontWeight:600}}>Add to Catalogue</button>
                  <button onClick={()=>setShowAddProd(false)} style={{padding:'9px 16px',background:'#f9fafb',color:'#6b7280',border:'1px solid #e5e7eb',borderRadius:7,cursor:'pointer',fontSize:13}}>Cancel</button>
                </div>
              </div>
            )}

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:14}}>
              {products.map(p=>(
                <div key={p.id} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:16}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                    <span className={`badge badge-${p.category}`} style={{fontSize:10}}>{p.category}</span>
                    <span style={{fontSize:10,padding:'2px 8px',borderRadius:10,background:p.in_stock?'#f0fdf4':'#fffbeb',color:p.in_stock?'#15803d':'#d97706',fontWeight:500}}>{p.in_stock?'In stock':'Out of stock'}</span>
                  </div>
                  <div style={{fontWeight:600,fontSize:14,marginBottom:2}}>{p.name}</div>
                  <div style={{fontSize:11,color:'#6b7280',marginBottom:8}}>{p.manufacturer}</div>
                  <div style={{display:'flex',gap:12,marginBottom:4}}>
                    <div><div style={{fontSize:10,color:'#9ca3af'}}>Wholesale</div><div style={{fontWeight:700,color:'#0F6E56',fontSize:15}}>₹{p.price}</div></div>
                    {p.mrp&&<div><div style={{fontSize:10,color:'#9ca3af'}}>MRP</div><div style={{fontWeight:500,color:'#6b7280',fontSize:14,textDecoration:'line-through'}}>₹{p.mrp}</div></div>}
                  </div>
                  <div style={{fontSize:11,color:'#6b7280',marginBottom:4}}>📦 Min: {p.min_order} · {p.unit}</div>
                  {p.expiry_date&&<div style={{fontSize:11,color:'#6b7280',marginBottom:10}}>📅 Exp: {new Date(p.expiry_date).toLocaleDateString('en-IN',{month:'short',year:'numeric'})}</div>}
                  <div style={{display:'flex',gap:6,marginTop:8}}>
                    <button onClick={()=>toggleStock(p.id,p.in_stock)} style={{flex:1,padding:'6px',fontSize:11,cursor:'pointer',border:'1px solid #e5e7eb',borderRadius:6,background:'#f9fafb',color:'#374151',fontWeight:500}}>Toggle Stock</button>
                    <button onClick={()=>deleteProduct(p.id)} style={{padding:'6px 10px',fontSize:11,cursor:'pointer',border:'1px solid #fca5a5',borderRadius:6,background:'#fee2e2',color:'#dc2626'}}>🗑</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ORDERS */}
        {tab==='orders'&&(
          <>
            <div className="page-title">All Orders</div>
            <div className="page-sub">{orders.length} orders total</div>
            <div style={{background:'#fff',borderRadius:12,border:'1px solid #e5e7eb',overflow:'hidden'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
                <thead><tr style={{background:'#f9fafb'}}>{['Order ID','Pharmacy','Items','Total','Date','Status','Update'].map(h=><th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:11,color:'#6b7280',fontWeight:600,borderBottom:'1px solid #e5e7eb'}}>{h}</th>)}</tr></thead>
                <tbody>
                  {orders.map(o=>{
                    const items = typeof o.items==='string'?JSON.parse(o.items):o.items;
                    return (
                      <tr key={o.id} style={{borderBottom:'1px solid #f3f4f6'}}>
                        <td style={{padding:'12px 14px',fontFamily:'monospace',fontSize:11,fontWeight:600}}>{o.order_number}</td>
                        <td style={{padding:'12px 14px'}}><div style={{fontWeight:500}}>{o.pharmacy_name}</div><div style={{fontSize:11,color:'#6b7280'}}>+91 {o.mobile}</div></td>
                        <td style={{padding:'12px 14px',fontSize:12,color:'#6b7280'}}>{items?.length} items</td>
                        <td style={{padding:'12px 14px',fontWeight:600,color:'#0F6E56'}}>₹{parseFloat(o.total).toLocaleString('en-IN')}</td>
                        <td style={{padding:'12px 14px',fontSize:12,color:'#6b7280'}}>{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                        <td style={{padding:'12px 14px'}}><span className={`badge ${statusClass[o.status]}`}>{o.status}</span></td>
                        <td style={{padding:'12px 14px'}}>
                          <select value={o.status} onChange={e=>updateOrderStatus(o.id,e.target.value)} style={{padding:'5px 8px',fontSize:12,border:'1px solid #e5e7eb',borderRadius:6,background:'#fff',cursor:'pointer'}}>
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

        {/* ANALYTICS */}
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
                <div key={s.label} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:18}}>
                  <div style={{fontSize:24,marginBottom:8}}>{s.icon}</div>
                  <div style={{fontSize:11,color:'#6b7280',textTransform:'uppercase',letterSpacing:'0.4px',marginBottom:4,fontWeight:600}}>{s.label}</div>
                  <div style={{fontSize:24,fontWeight:700}}>{s.val}</div>
                </div>
              ))}
            </div>
            <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:20}}>
              <div style={{fontWeight:600,fontSize:15,marginBottom:16}}>Orders by status</div>
              {analytics.orders_by_status.map(s=>{
                const pct = analytics.total_orders>0?Math.round(s.count/analytics.total_orders*100):0;
                const colors = {delivered:'#15803d',processing:'#2563eb',shipped:'#0369a1',pending:'#d97706',cancelled:'#dc2626'};
                return (
                  <div key={s.status} style={{marginBottom:14}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}>
                      <span style={{textTransform:'capitalize',fontWeight:500}}>{s.status}</span>
                      <span style={{color:'#6b7280'}}>{s.count} orders ({pct}%)</span>
                    </div>
                    <div style={{height:7,background:'#f3f4f6',borderRadius:4,overflow:'hidden'}}>
                      <div style={{height:'100%',width:pct+'%',background:colors[s.status]||'#6b7280',borderRadius:4,transition:'width 0.3s'}} />
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
