import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('sjmedex_cart')||'{}'));
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products').then(r => { setProducts(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { localStorage.setItem('sjmedex_cart', JSON.stringify(cart)); }, [cart]);

  const filtered = products.filter(p =>
    (cat==='all'||p.category===cat) &&
    (p.name.toLowerCase().includes(search.toLowerCase())||p.manufacturer?.toLowerCase().includes(search.toLowerCase()))
  );

  function addToCart(id, minOrder) {
    setCart(c => ({...c, [id]: c[id] || minOrder}));
  }

  function changeQty(id, d, minOrder) {
    setCart(c => {
      const current = c[id] || minOrder;
      const next = current + d;
      if (next < minOrder) return c;
      return {...c, [id]: next};
    });
  }

  function removeFromCart(id) {
    setCart(c => { const n={...c}; delete n[id]; return n; });
  }

  const cartCount = Object.values(cart).reduce((a,b)=>a+b,0);
  const cats = [{k:'all',l:'All'},{k:'medicine',l:'Medicines'},{k:'surgical',l:'Surgical'},{k:'injectable',l:'Injectables'}];

  return (
    <>
      <Navbar cartCount={cartCount} />
      <div style={{maxWidth:1100,margin:'0 auto',padding:24}}>
        <div className="page-title">Product Catalogue</div>
        <div className="page-sub">{products.length} wholesale products · exclusive pharmacy pricing</div>

        <div style={{display:'flex',gap:8,background:'#fff',border:'1px solid #e5e7eb',borderRadius:8,padding:'9px 14px',marginBottom:14,alignItems:'center'}}>
          <span>🔍</span>
          <input style={{border:'none',outline:'none',flex:1,fontSize:13}} placeholder="Search products or manufacturer..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>

        <div style={{display:'flex',gap:8,marginBottom:18,flexWrap:'wrap'}}>
          {cats.map(c=>(
            <button key={c.k} onClick={()=>setCat(c.k)} style={{padding:'5px 16px',borderRadius:20,border:`1px solid ${cat===c.k?'#0F6E56':'#e5e7eb'}`,background:cat===c.k?'#0F6E56':'#fff',color:cat===c.k?'#fff':'#6b7280',cursor:'pointer',fontSize:12,fontWeight:500}}>{c.l}</button>
          ))}
        </div>

        {loading ? <div style={{textAlign:'center',padding:40,color:'#6b7280'}}>Loading products...</div> : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))',gap:16}}>
            {filtered.map(p=>{
              const inCart = cart[p.id] || 0;
              const minOrder = parseInt(p.min_order) || 1000;
              return (
                <div key={p.id} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:12,padding:16,display:'flex',flexDirection:'column',gap:6}}>
                  <span className={`badge badge-${p.category}`} style={{alignSelf:'flex-start'}}>{p.category}</span>
                  <div style={{fontWeight:600,fontSize:14,color:'#111'}}>{p.name}</div>
                  <div style={{fontSize:11,color:'#6b7280'}}>{p.manufacturer}</div>

                  <div style={{display:'flex',gap:12,alignItems:'flex-end',marginTop:4}}>
                    <div>
                      <div style={{fontSize:11,color:'#9ca3af'}}>Wholesale</div>
                      <div style={{fontSize:18,fontWeight:700,color:'#0F6E56'}}>₹{p.price}<span style={{fontSize:11,fontWeight:400,color:'#9ca3af'}}>/{p.unit}</span></div>
                    </div>
                    {p.mrp && (
                      <div>
                        <div style={{fontSize:11,color:'#9ca3af'}}>MRP</div>
                        <div style={{fontSize:14,fontWeight:500,color:'#6b7280',textDecoration:'line-through'}}>₹{p.mrp}</div>
                      </div>
                    )}
                  </div>

                  <div style={{display:'flex',gap:8,fontSize:11,color:'#6b7280',flexWrap:'wrap'}}>
                    <span>📦 Min: {minOrder} units</span>
                    {p.expiry_date && <span>📅 Exp: {new Date(p.expiry_date).toLocaleDateString('en-IN',{month:'short',year:'numeric'})}</span>}
                  </div>

                  {!p.in_stock ? (
                    <div style={{padding:'8px',background:'#fffbeb',borderRadius:6,fontSize:11,color:'#d97706',textAlign:'center',marginTop:4}}>Out of stock</div>
                  ) : inCart > 0 ? (
                    <div style={{marginTop:4}}>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'#f0fdf4',border:'1px solid #86efac',borderRadius:8,padding:'6px 10px',marginBottom:6}}>
                        <button onClick={()=>changeQty(p.id,-minOrder,minOrder)} style={{width:28,height:28,border:'1px solid #e5e7eb',borderRadius:6,background:'#fff',cursor:'pointer',fontSize:16,fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',color:'#0F6E56'}}>−</button>
                        <div style={{textAlign:'center'}}>
                          <div style={{fontWeight:700,fontSize:15,color:'#0F6E56'}}>{inCart}</div>
                          <div style={{fontSize:10,color:'#6b7280'}}>units</div>
                        </div>
                        <button onClick={()=>changeQty(p.id,minOrder,minOrder)} style={{width:28,height:28,border:'1px solid #e5e7eb',borderRadius:6,background:'#fff',cursor:'pointer',fontSize:16,fontWeight:600,display:'flex',alignItems:'center',justifyContent:'center',color:'#0F6E56'}}>+</button>
                      </div>
                      <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#6b7280',marginBottom:4}}>
                        <span>Subtotal</span>
                        <span style={{fontWeight:600,color:'#0F6E56'}}>₹{(p.price*inCart).toLocaleString('en-IN')}</span>
                      </div>
                      <button onClick={()=>removeFromCart(p.id)} style={{width:'100%',padding:'6px',background:'#fee2e2',color:'#dc2626',border:'1px solid #fca5a5',borderRadius:6,fontSize:11,cursor:'pointer'}}>Remove</button>
                    </div>
                  ) : (
                    <button onClick={()=>addToCart(p.id, minOrder)} style={{width:'100%',padding:'9px',background:'#0F6E56',color:'#fff',border:'none',borderRadius:8,fontSize:13,cursor:'pointer',fontWeight:600,marginTop:4}}>
                      + Add to Cart
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
