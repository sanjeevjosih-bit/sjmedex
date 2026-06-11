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

  function addToCart(id) { setCart(c => ({...c,[id]:(c[id]||0)+1})); }
  function removeFromCart(id) { setCart(c => { const n={...c}; delete n[id]; return n; }); }

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
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))',gap:14}}>
            {filtered.map(p=>{
              const inCart=cart[p.id]||0;
              return (
                <div key={p.id} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,padding:16}}>
                  <span className={`badge badge-${p.category}`} style={{marginBottom:10,display:'inline-block'}}>{p.category}</span>
                  <div style={{fontWeight:500,fontSize:13,marginBottom:2}}>{p.name}</div>
                  <div style={{fontSize:11,color:'#6b7280',marginBottom:10}}>{p.manufacturer}</div>
                  <div style={{fontSize:18,fontWeight:600,color:'#0F6E56',marginBottom:2}}>₹{p.price}<span style={{fontSize:11,fontWeight:400,color:'#6b7280'}}>/{p.unit}</span></div>
                  <div style={{fontSize:11,color:'#9ca3af',marginBottom:12}}>Min. {p.min_order} units</div>
                  {!p.in_stock ? (
                    <div style={{padding:'7px',background:'#fffbeb',borderRadius:6,fontSize:11,color:'#d97706',textAlign:'center'}}>Out of stock</div>
                  ) : inCart>0 ? (
                    <button onClick={()=>removeFromCart(p.id)} style={{width:'100%',padding:'8px',background:'#f0fdf4',color:'#15803d',border:'1px solid #86efac',borderRadius:6,fontSize:12,cursor:'pointer',fontWeight:500}}>✓ Added ({inCart})</button>
                  ) : (
                    <button onClick={()=>addToCart(p.id)} style={{width:'100%',padding:'8px',background:'#0F6E56',color:'#fff',border:'none',borderRadius:6,fontSize:12,cursor:'pointer',fontWeight:500}}>Add to cart</button>
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
