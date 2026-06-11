import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/pharmacy/me').then(r=>setProfile(r.data)).catch(()=>{});
  },[]);

  const p = profile || user || {};
  const initials = (p.pharmacy_name||'').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();

  return (
    <>
      <Navbar />
      <div style={{maxWidth:600,margin:'0 auto',padding:24}}>
        <div className="page-title">My Profile</div>
        <div className="card" style={{marginBottom:16}}>
          <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:20}}>
            <div style={{width:56,height:56,borderRadius:'50%',background:'#E1F5EE',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:600,color:'#0F6E56'}}>{initials}</div>
            <div>
              <div style={{fontWeight:600,fontSize:17}}>{p.pharmacy_name}</div>
              <div style={{fontSize:12,color:'#6b7280',marginTop:2}}>{p.owner_name} · +91 {p.mobile}</div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,fontSize:13}}>
            {[['Email', p.email||'—'],['Address', p.address||'—'],['Member since', p.created_at?new Date(p.created_at).toLocaleDateString('en-IN'):'—'],['Account status', p.status]].map(([k,v])=>(
              <div key={k}><div style={{fontSize:11,color:'#6b7280',marginBottom:2}}>{k}</div><div style={{fontWeight:500}}>{v}</div></div>
            ))}
          </div>
          <div style={{marginTop:16,padding:'10px 14px',background:'#f0fdf4',border:'1px solid #86efac',borderRadius:8,fontSize:13,color:'#15803d',display:'inline-flex',alignItems:'center',gap:8}}>
            🛡️ {p.drug_license_number} · Expires {p.drug_license_expiry?new Date(p.drug_license_expiry).toLocaleDateString('en-IN'):'—'}
          </div>
        </div>
      </div>
    </>
  );
}
