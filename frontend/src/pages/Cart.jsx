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
  const total = cartItems.reduce((s,p)=>s+parseFloat(p.price)*p.qty,0);
  const cartCount = Object.values(cart).reduce((a,b)=>a+b,0);

  function changeQty(id, d, minOrder) {
    setCart(c => {
      const next = (c[id]||minOrder) + d;
      if(next < minOrder) return c;
      return {...c, [id]: next};
    });
  }

  async function placeOrder() {
    if(cartItems.length===0) return;
    setLoading(true); setError('');
    try {
      const items = cartItems.map(p=>({product_id:p.id, qty:p.qty}));
      await api.post('/orders', {items});
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
            <div style={{fontSize:48,marginBottom:12}}>🛒</div>
            <div style={{fontSize:15,marginBottom:16}}>Your cart is empty</div>
            <button onClick={()=>navigate('/products')} style={{padding:'10px 24px',background:'#0F6E56',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontSize:14,fontWeight:500}}>Browse Products</button>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:20}}>
            <div>
              {cartItems.map(p=>{
                const minOrder = parseInt(p.min_order)||1000;
                return (
                  <div key={p.id} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:16,marginBottom:12}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                      <div>
                        <div style={{fontWeight:600,fontSize:14}}>{p.name}</div>
                        <div style={{fontSize:12,color:'#6b7280',marginTop:2}}>{p.manufacturer}</div>
                        <div style={{fontSize:12,color:'#6b7280',marginTop:2}}>₹{p.price}/{p.unit} · Min {minOrder} units</div>
                      </div>
                      <button onClick={()=>{const n={...cart};delete n[p.id];setCart(n);}} style={{background:'none',border:'none',color:'#9ca3af',cursor:'pointer',fontSize:18}}>×</button>
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div style={{display:'flex',alignItems:'center',gap:12,background:'#f9fafb',borderRadius:8,padding:'6px 12px',border:'1px solid #e5e7eb'}}>
                        <button onClick={()=>changeQty(p.id,-minOrder,minOrder)} style={{width:30,height:30,border:'1px solid #e5e7eb',borderRadius:6,background:'#fff',cursor:'pointer',fontSize:16,fontWeight:700,color:'#0F6E56'}}>−</button>
                        <div style={{textAlign:'center',minWidth:60}}>
                          <div style={{fontWeight:700,fontSize:16}}>{p.qty}</div>
                          <div style={{fontSize:10,color:'#9ca3af'}}>units</div>
                        </div>
                        <button onClick={()=>changeQty(p.id,minOrder,minOrder)} style={{width:30,height:30,border:'1px solid #e5e7eb',borderRadius:6,background:'#fff',cursor:'pointer',fontSize:16,fontWeight:700,color:'#0F6E56'}}>+</button>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div style={{fontSize:12,color:'#9ca3af'}}>Item total</div>
                        <div style={{fontWeight:700,fontSize:18,color:'#0F6E56'}}>₹{(parseFloat(p.price)*p.qty).toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:20,alignSelf:'start',position:'sticky',top:70}}>
              <div style={{fontWeight:600,fontSize:15,marginBottom:16}}>Order Summary</div>
              <div style={{background:'#f0fdf4',borderRadius:8,padding:14,marginBottom:16}}>
                {cartItems.map(p=>(
                  <div key={p.id} style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#6b7280',marginBottom:6}}>
                    <span>{p.name} ×{p.qty}</span>
                    <span>₹{(parseFloat(p.price)*p.qty).toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div style={{borderTop:'1px solid #bbf7d0',paddingTop:10,marginTop:8,display:'flex',justifyContent:'space-between',fontWeight:700,fontSize:16,color:'#0F6E56'}}>
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div style={{textAlign:'center',marginTop:8,fontSize:11,color:'#15803d',fontWeight:500}}>🚚 FREE Delivery on all orders</div>
              </div>
              <button onClick={placeOrder} disabled={loading} style={{width:'100%',padding:13,background:'#0F6E56',color:'#fff',border:'none',borderRadius:8,fontSize:15,fontWeight:600,cursor:'pointer'}}>
                {loading?'Placing order...':'Place Order ✓'}
              </button>
              <p style={{fontSize:11,color:'#9ca3af',textAlign:'center',marginTop:10}}>Payment on delivery · No hidden charges</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
