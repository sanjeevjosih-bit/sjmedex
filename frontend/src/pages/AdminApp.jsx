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
  const [editProd, setEditProd] = useState(null); // product being edited
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [showAddPharmacy, setShowAddPharmacy] = useState(false);
  const [newPharmacy, setNewPharmacy] = useState({pharmacy_name:'',owner_name:'',mobile:'',email:'',address:'',drug_license_number:'',drug_license_expiry:''});
  const [pharmacySaving, setPharmacySaving] = useState(false);
  const [pharmacyError, setPharmacyError] = useState('');
  const [editOrder, setEditOrder] = useState(null); // order being edited
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

  async function saveEditedProduct() {
    if(!editProd.name||!editProd.price) return alert('Name and price required');
    try {
      const res = await api.patch(`/admin/products/${editProd.id}`, {
        name: editProd.name,
        manufacturer: editProd.manufacturer,
        category: editProd.category,
        price: editProd.price,
        mrp: editProd.mrp || null,
        unit: editProd.unit,
        min_order: editProd.min_order,
        in_stock: editProd.in_stock,
        description: editProd.description,
      });
      setProducts(ps=>ps.map(p=>p.id===editProd.id?res.data:p));
      setEditProd(null);
    } catch(err) {
      alert(err.response?.data?.error || 'Failed to update product');
    }
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

  async function syncWithSwipe() {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await api.post('/admin/sync-swipe');
      setSyncResult(res.data);
      const productsRes = await api.get('/admin/products');
      setProducts(productsRes.data);
    } catch (err) {
      setSyncResult({ success: false, error: err.response?.data?.error || 'Sync failed. Check SWIPE_API_KEY is set correctly on Render.' });
    } finally {
      setSyncing(false);
    }
  }

  async function addPharmacy() {
    if(!newPharmacy.pharmacy_name || !newPharmacy.mobile || !newPharmacy.drug_license_number) {
      return setPharmacyError('Pharmacy name, mobile and drug license number are required');
    }
    setPharmacySaving(true); setPharmacyError('');
    try {
      const res = await api.post('/admin/pharmacies', newPharmacy);
      setPharmacies(ps=>[res.data.pharmacy, ...ps]);
      setNewPharmacy({pharmacy_name:'',owner_name:'',mobile:'',email:'',address:'',drug_license_number:'',drug_license_expiry:''});
      setShowAddPharmacy(false);
    } catch(err) {
      setPharmacyError(err.response?.data?.error || 'Failed to onboard pharmacy');
    } finally {
      setPharmacySaving(false);
    }
  }

  function openEditOrder(order) {
    const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
    setEditOrder({ ...order, items: items.map(i => ({...i})), delivery_charge: order.delivery_charge || 0 });
  }

  function updateEditOrderItem(idx, field, value) {
    setEditOrder(eo => {
      const items = [...eo.items];
      items[idx] = { ...items[idx], [field]: value };
      return { ...eo, items };
    });
  }

  function removeEditOrderItem(idx) {
    setEditOrder(eo => ({ ...eo, items: eo.items.filter((_, i) => i !== idx) }));
  }

  async function saveEditedOrder() {
    try {
      const res = await api.patch(`/admin/orders/${editOrder.id}/items`, {
        items: editOrder.items,
        delivery_charge: editOrder.delivery_charge,
      });
      setOrders(os => os.map(o => o.id === editOrder.id ? res.data : o));
      setEditOrder(null);
    } catch(err) {
      alert(err.response?.data?.error || 'Failed to update order');
    }
  }

  const editOrderSubtotal = editOrder ? editOrder.items.reduce((s,i)=>s+(parseFloat(i.qty)||0)*(parseFloat(i.price)||0),0) : 0;
  const editOrderTotal = editOrder ? editOrderSubtotal + (parseFloat(editOrder.delivery_charge)||0) : 0;

  const statusClass = {pending:'badge-pending',processing:'badge-processing',shipped:'badge-processing',delivered:'badge-approved',cancelled:'badge-rejected',approved:'badge-approved',rejected:'badge-rejected'};
  const pendingCount = pharmacies.filter(p=>p.status==='pending').length;
  const navItems = [
    {k:'registrations',l:'Registrations',badge:pendingCount},
    {k:'products',l:'Products'},
    {k:'orders',l:'Orders'},
    {k:'analytics',l:'Analytics'},
  ];

  const inputStyle = {width:'100%',padding:'9px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:13,outline:'none'};
  const modalOverlay = {position:'fixed',inset:0,background:'rgba(15,20,18,0.5)',zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:20};
  const modalCard = {background:'#fff',borderRadius:14,padding:24,maxWidth:520,width:'100%',maxHeight:'88vh',overflowY:'auto'};

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
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
              <div className="page-title">Pharmacy Registrations</div>
              <button onClick={()=>setShowAddPharmacy(true)} style={{padding:'9px 18px',background:'#0F6E56',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:600}}>+ Onboard Pharmacy</button>
            </div>
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

            {/* SWIPE SYNC CARD */}
            <div style={{background:'#f0fdf9',border:'1.5px solid #1DB97A',borderRadius:12,padding:16,marginBottom:20,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:'#0a5c47',marginBottom:3}}>🔄 Swipe Inventory Sync</div>
                <div style={{fontSize:12,color:'#6b7280'}}>Pull latest products, prices and stock directly from your Swipe account</div>
              </div>
              <button onClick={syncWithSwipe} disabled={syncing} style={{background:syncing?'#9ca3af':'#0a5c47',color:'#fff',border:'none',padding:'10px 20px',borderRadius:8,fontSize:13,fontWeight:700,cursor:syncing?'default':'pointer',whiteSpace:'nowrap'}}>
                {syncing ? '⏳ Syncing...' : '🔄 Sync Now'}
              </button>
            </div>
            {syncResult && (
              <div style={{background:syncResult.success?'#dcfce7':'#fee2e2',color:syncResult.success?'#15803d':'#dc2626',padding:'12px 16px',borderRadius:8,fontSize:13,marginBottom:16,fontWeight:600}}>
                {syncResult.success ? `✅ ${syncResult.message}` : `❌ ${syncResult.error}`}
              </div>
            )}

            {showAddProd&&(
              <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:20,marginBottom:20}}>
                <div style={{fontWeight:600,fontSize:15,marginBottom:16}}>Add New Product</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>PRODUCT NAME *</label><input style={inputStyle} placeholder="e.g. Paracetamol 500mg" value={newProd.name} onChange={e=>setNewProd(p=>({...p,name:e.target.value}))} /></div>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>MANUFACTURER</label><input style={inputStyle} placeholder="e.g. Cipla Ltd" value={newProd.manufacturer} onChange={e=>setNewProd(p=>({...p,manufacturer:e.target.value}))} /></div>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>CATEGORY</label><select style={inputStyle} value={newProd.category} onChange={e=>setNewProd(p=>({...p,category:e.target.value}))}><option value="medicine">Medicine</option><option value="surgical">Surgical</option><option value="injectable">Injectable</option></select></div>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>WHOLESALE PRICE (₹) *</label><input style={inputStyle} type="number" placeholder="0.00" value={newProd.price} onChange={e=>setNewProd(p=>({...p,price:e.target.value}))} /></div>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>MRP (₹)</label><input style={inputStyle} type="number" placeholder="0.00" value={newProd.mrp} onChange={e=>setNewProd(p=>({...p,mrp:e.target.value}))} /></div>
                  <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>UNIT (pieces per box etc.)</label><input style={inputStyle} placeholder="e.g. 1x100 PCS" value={newProd.unit} onChange={e=>setNewProd(p=>({...p,unit:e.target.value}))} /></div>
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
                  {p.expiry_date&&<div style={{fontSize:11,color:'#6b7280',marginBottom:6}}>📅 Exp: {new Date(p.expiry_date).toLocaleDateString('en-IN',{month:'short',year:'numeric'})}</div>}
                  {p.swipe_id&&<div style={{fontSize:10,color:'#1DB97A',marginBottom:10,fontWeight:600}}>🔄 Synced from Swipe</div>}
                  <div style={{display:'flex',gap:6,marginTop:8}}>
                    <button onClick={()=>setEditProd({...p})} style={{flex:1,padding:'6px',fontSize:11,cursor:'pointer',border:'1px solid #93c5fd',borderRadius:6,background:'#eff6ff',color:'#1d4ed8',fontWeight:600}}>✎ Edit</button>
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
                <thead><tr style={{background:'#f9fafb'}}>{['Order ID','Pharmacy','Items','Total','Date','Status','Update','Edit'].map(h=><th key={h} style={{padding:'10px 14px',textAlign:'left',fontSize:11,color:'#6b7280',fontWeight:600,borderBottom:'1px solid #e5e7eb'}}>{h}</th>)}</tr></thead>
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
                        <td style={{padding:'12px 14px'}}>
                          <button onClick={()=>openEditOrder(o)} style={{padding:'5px 12px',fontSize:11,cursor:'pointer',border:'1px solid #93c5fd',borderRadius:6,background:'#eff6ff',color:'#1d4ed8',fontWeight:600}}>✎ Edit</button>
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

      {/* EDIT PRODUCT MODAL */}
      {editProd && (
        <div style={modalOverlay} onClick={()=>setEditProd(null)}>
          <div style={modalCard} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>Edit Product</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div style={{gridColumn:'1 / -1'}}><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>PRODUCT NAME *</label><input style={inputStyle} value={editProd.name} onChange={e=>setEditProd(p=>({...p,name:e.target.value}))} /></div>
              <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>MANUFACTURER</label><input style={inputStyle} value={editProd.manufacturer||''} onChange={e=>setEditProd(p=>({...p,manufacturer:e.target.value}))} /></div>
              <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>CATEGORY</label><select style={inputStyle} value={editProd.category} onChange={e=>setEditProd(p=>({...p,category:e.target.value}))}><option value="medicine">Medicine</option><option value="surgical">Surgical</option><option value="injectable">Injectable</option></select></div>
              <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>WHOLESALE PRICE (₹) *</label><input style={inputStyle} type="number" value={editProd.price} onChange={e=>setEditProd(p=>({...p,price:e.target.value}))} /></div>
              <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>MRP (₹)</label><input style={inputStyle} type="number" value={editProd.mrp||''} onChange={e=>setEditProd(p=>({...p,mrp:e.target.value}))} /></div>
              <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>UNIT (pieces per box etc.)</label><input style={inputStyle} value={editProd.unit||''} onChange={e=>setEditProd(p=>({...p,unit:e.target.value}))} placeholder="e.g. 1x100 PCS" /></div>
              <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>MIN ORDER QTY</label><input style={inputStyle} type="number" value={editProd.min_order} onChange={e=>setEditProd(p=>({...p,min_order:parseInt(e.target.value)||1}))} /></div>
              <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>EXPIRY DATE</label><input style={inputStyle} type="date" value={editProd.expiry_date?editProd.expiry_date.split('T')[0]:''} onChange={e=>setEditProd(p=>({...p,expiry_date:e.target.value}))} /></div>
              <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>STOCK STATUS</label>
                <select style={inputStyle} value={editProd.in_stock?'yes':'no'} onChange={e=>setEditProd(p=>({...p,in_stock:e.target.value==='yes'}))}>
                  <option value="yes">In Stock</option>
                  <option value="no">Out of Stock</option>
                </select>
              </div>
              <div style={{gridColumn:'1 / -1'}}><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>DESCRIPTION</label><textarea style={{...inputStyle,minHeight:60,resize:'vertical'}} value={editProd.description||''} onChange={e=>setEditProd(p=>({...p,description:e.target.value}))} /></div>
            </div>
            <div style={{display:'flex',gap:8,marginTop:18}}>
              <button onClick={saveEditedProduct} style={{flex:1,padding:'10px',background:'#0F6E56',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:600}}>Save Changes</button>
              <button onClick={()=>setEditProd(null)} style={{padding:'10px 18px',background:'#f9fafb',color:'#6b7280',border:'1px solid #e5e7eb',borderRadius:8,cursor:'pointer',fontSize:13}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ONBOARD PHARMACY MODAL */}
      {showAddPharmacy && (
        <div style={modalOverlay} onClick={()=>setShowAddPharmacy(false)}>
          <div style={modalCard} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:4}}>Onboard Pharmacy Directly</div>
            <div style={{fontSize:12,color:'#6b7280',marginBottom:16}}>This pharmacy will be created as <strong>already approved</strong> — use this for pharmacies you've already verified offline.</div>
            {pharmacyError && <div style={{background:'#fee2e2',color:'#dc2626',padding:'10px 14px',borderRadius:8,fontSize:13,marginBottom:14}}>{pharmacyError}</div>}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div style={{gridColumn:'1 / -1'}}><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>PHARMACY / SHOP NAME *</label><input style={inputStyle} value={newPharmacy.pharmacy_name} onChange={e=>setNewPharmacy(p=>({...p,pharmacy_name:e.target.value}))} placeholder="e.g. Sharma Medical Store" /></div>
              <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>OWNER NAME</label><input style={inputStyle} value={newPharmacy.owner_name} onChange={e=>setNewPharmacy(p=>({...p,owner_name:e.target.value}))} /></div>
              <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>MOBILE NUMBER *</label><input style={inputStyle} value={newPharmacy.mobile} onChange={e=>setNewPharmacy(p=>({...p,mobile:e.target.value.replace(/\D/g,'').slice(0,10)}))} placeholder="10-digit number" /></div>
              <div style={{gridColumn:'1 / -1'}}><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>EMAIL (Google login ID — important)</label><input style={inputStyle} type="email" value={newPharmacy.email} onChange={e=>setNewPharmacy(p=>({...p,email:e.target.value}))} placeholder="their Gmail address for login" /></div>
              <div style={{gridColumn:'1 / -1'}}><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>ADDRESS</label><textarea style={{...inputStyle,minHeight:50,resize:'vertical'}} value={newPharmacy.address} onChange={e=>setNewPharmacy(p=>({...p,address:e.target.value}))} /></div>
              <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>DRUG LICENSE NUMBER *</label><input style={{...inputStyle,fontFamily:'monospace'}} value={newPharmacy.drug_license_number} onChange={e=>setNewPharmacy(p=>({...p,drug_license_number:e.target.value}))} /></div>
              <div><label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>LICENSE EXPIRY</label><input style={inputStyle} type="date" value={newPharmacy.drug_license_expiry} onChange={e=>setNewPharmacy(p=>({...p,drug_license_expiry:e.target.value}))} /></div>
            </div>
            <div style={{background:'#fffbeb',border:'1px solid #fde047',borderRadius:8,padding:'10px 14px',fontSize:11.5,color:'#854d0e',marginTop:14}}>
              💡 Without an email, this pharmacy can't log in via Google Sign-In yet. Collect their Gmail to enable login, or update it later from this same screen.
            </div>
            <div style={{display:'flex',gap:8,marginTop:16}}>
              <button onClick={addPharmacy} disabled={pharmacySaving} style={{flex:1,padding:'10px',background:'#0F6E56',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:600}}>{pharmacySaving?'Saving...':'Onboard Pharmacy'}</button>
              <button onClick={()=>setShowAddPharmacy(false)} style={{padding:'10px 18px',background:'#f9fafb',color:'#6b7280',border:'1px solid #e5e7eb',borderRadius:8,cursor:'pointer',fontSize:13}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT ORDER MODAL */}
      {editOrder && (
        <div style={modalOverlay} onClick={()=>setEditOrder(null)}>
          <div style={{...modalCard,maxWidth:560}} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:4}}>Edit Order {editOrder.order_number}</div>
            <div style={{fontSize:12,color:'#6b7280',marginBottom:16}}>{editOrder.pharmacy_name} · +91 {editOrder.mobile}</div>

            <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:14}}>
              {editOrder.items.map((item,idx)=>(
                <div key={idx} style={{background:'#f9fafb',border:'1px solid #e5e7eb',borderRadius:9,padding:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                    <div style={{fontWeight:600,fontSize:13}}>{item.name}</div>
                    <button onClick={()=>removeEditOrderItem(idx)} style={{background:'none',border:'none',color:'#dc2626',cursor:'pointer',fontSize:16,lineHeight:1}}>×</button>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                    <div>
                      <label style={{fontSize:10,color:'#9ca3af',display:'block',marginBottom:3}}>QUANTITY</label>
                      <input type="number" style={inputStyle} value={item.qty} onChange={e=>updateEditOrderItem(idx,'qty',e.target.value)} />
                    </div>
                    <div>
                      <label style={{fontSize:10,color:'#9ca3af',display:'block',marginBottom:3}}>PRICE PER UNIT (₹)</label>
                      <input type="number" style={inputStyle} value={item.price} onChange={e=>updateEditOrderItem(idx,'price',e.target.value)} />
                    </div>
                  </div>
                  <div style={{textAlign:'right',marginTop:6,fontSize:12,color:'#0F6E56',fontWeight:700}}>
                    ₹{((parseFloat(item.qty)||0)*(parseFloat(item.price)||0)).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,color:'#6b7280',display:'block',marginBottom:4,fontWeight:600}}>DELIVERY CHARGE (₹)</label>
              <input type="number" style={inputStyle} value={editOrder.delivery_charge} onChange={e=>setEditOrder(eo=>({...eo,delivery_charge:e.target.value}))} />
            </div>

            <div style={{background:'#f0fdf4',borderRadius:8,padding:14,marginBottom:16}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#6b7280',marginBottom:4}}>
                <span>Subtotal</span><span>₹{editOrderSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#6b7280',marginBottom:8}}>
                <span>Delivery</span><span>₹{(parseFloat(editOrder.delivery_charge)||0).toLocaleString('en-IN')}</span>
              </div>
              <div style={{borderTop:'1px solid #bbf7d0',paddingTop:8,display:'flex',justifyContent:'space-between',fontWeight:700,fontSize:16,color:'#0F6E56'}}>
                <span>New Total</span><span>₹{editOrderTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{display:'flex',gap:8}}>
              <button onClick={saveEditedOrder} style={{flex:1,padding:'10px',background:'#0F6E56',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:600}}>Save Order Changes</button>
              <button onClick={()=>setEditOrder(null)} style={{padding:'10px 18px',background:'#f9fafb',color:'#6b7280',border:'1px solid #e5e7eb',borderRadius:8,cursor:'pointer',fontSize:13}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
