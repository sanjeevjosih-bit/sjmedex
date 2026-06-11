import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('sjmedex_cart')||'{}'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => { api.get('/products').then(r=>setProducts(r.data)).catch(()=>{}); }, []);
  useEffect(() => { localStorage.setItem('sjmedex_cart', JSON.stringify(cart)); }, [cart]);

  const cartItems = Object.entries(cart).map(([id,qty])=>({...products.find(p=>p.id==id),qty})).filter(p=>p.id);
  const subtotal = cartItems.reduce((s,p)=>s+p.price*p.qty,0);
  const delivery = subtotal>=5000?0:199;
  const total = subtotal+delivery;
  const cartCount = Object.values(cart).reduce((a,b)=>a+b,0);

  function changeQty(id, d) {
    setCart(c => { const n={...c}; n[id]=(n[id]||0)+d; if(n[id]<=0) delete n[id]; return n; });
  }

  async function placeOrder() {
    if(cartItems.length===0) return;
    setLoading(true); setError('');
    try {
      const items = cartItems.map(p=>({product_id:p.id, qty:p.qty}));
      const res = await api.post('/orders', {items});
      localStorage.removeItem('sjmedex_cart');
      setCart({});
      navigate('/orders');
    } catch(err) { setError(err.response?.data?.error||'Order failed'); }
    finally { setLoading(false); }
  }

  return (
    <>
      <Navbar cartCount={cartCount} />
      <div style={{maxWidth:1100,margin:'0 auto',padding:24}}>
        <div className="page-title">My Cart</div>
        <div className="page-sub">{cartItems.length} items</div>
        {error && <div className="error-msg">{error}</div>}
        {cartItems.length===0 ? (
          <div style={{textAlign:'center',padding:60,color:'#9ca3af'}}>
            <div style={{fontSize:40,marginBottom:12}}>🛒</div>
            <div>Your cart is empty</div>
            <button onClick={()=>navigate('/products')} style={{marginTop:14,padding:'8px 20px',background:'#0F6E56',color:'#fff',border:'none',borderRadius:8,cursor:'pointer'}}>Browse Products</button>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:20}}>
            <div>
              {cartItems.map(p=>(
                <div key={p.id} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,padding:16,marginBottom:12,display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:500}}>{p.name}</div>
                    <div style={{fontSize:12,color:'#6b7280',marginTop:2}}>{p.manufacturer} · ₹{p.price}/{p.unit}</div>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginTop:10}}>
                      <button onClick={()=>changeQty(p.id,-1)} style={{width:26,height:26,border:'1px solid #e5e7eb',borderRadius:5,background:'#f9fafb',cursor:'pointer',fontSize:14}}>−</button>
                      <span style={{fontWeight:500,minWidth:20,textAlign:'center'}}>{p.qty}</span>
                      <button onClick={()=>changeQty(p.id,1)} style={{width:26,height:26,border:'1px solid #e5e7eb',borderRadius:5,background:'#f9fafb',cursor:'pointer',fontSize:14}}>+</button>
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontWeight:600,color:'#0F6E56',fontSize:16}}>₹{(p.price*p.qty).toLocaleString('en-IN')}</div>
                    <button onClick={()=>changeQty(p.id,-999)} style={{background:'none',border:'none',color:'#9ca3af',cursor:'pointer',fontSize:12,marginTop:6}}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,padding:20,alignSelf:'start',position:'sticky',top:70}}>
              <div style={{fontWeight:600,fontSize:15,marginBottom:14}}>Order summary</div>
              <div style={{background:'#E1F5EE',borderRadius:8,padding:14}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13,color:'#6b7280',marginBottom:6}}><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13,color:'#6b7280',marginBottom:6}}><span>Delivery</span><span>{delivery===0?'FREE':'₹'+delivery}</span></div>
                {delivery>0&&<div style={{fontSize:11,color:'#0F6E56',marginBottom:6}}>Add ₹{(5000-subtotal).toLocaleString('en-IN')} for free delivery</div>}
                <div style={{display:'flex',justifyContent:'space-between',fontWeight:600,fontSize:16,color:'#085041',paddingTop:8,borderTop:'1px solid #9FE1CB'}}><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
              </div>
              <button onClick={placeOrder} disabled={loading} style={{width:'100%',padding:12,background:'#0F6E56',color:'#fff',border:'none',borderRadius:8,fontSize:14,fontWeight:500,cursor:'pointer',marginTop:14}}>
                {loading?'Placing order...':'Place Order'}
              </button>
              <p style={{fontSize:11,color:'#9ca3af',textAlign:'center',marginTop:8}}>Payment on delivery accepted</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
