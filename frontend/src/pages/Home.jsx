import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.status === 'approved') navigate('/dashboard');
      else navigate('/pending');
    }
  }, [user]);

  return (
    <div style={{minHeight:'100vh',background:'#fff',fontFamily:'Inter,sans-serif'}}>

      {/* NAV */}
      <nav style={{background:'#0a5c47',padding:'14px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 12px rgba(0,0,0,0.15)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:38,height:38,background:'linear-gradient(135deg,#1DB97A,#0a5c47)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}}>💊</div>
          <div>
            <div style={{color:'#fff',fontWeight:700,fontSize:18,letterSpacing:'-0.3px'}}>SJ Medex</div>
            <div style={{color:'#6ee7b7',fontSize:10,letterSpacing:'0.5px'}}>WHOLESALE PLATFORM</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Link to="/login" style={{color:'#6ee7b7',fontSize:13,textDecoration:'none',fontWeight:500}}>Login</Link>
          <Link to="/register" style={{background:'#1DB97A',color:'#fff',padding:'8px 18px',borderRadius:20,fontSize:13,fontWeight:600,textDecoration:'none',boxShadow:'0 2px 8px rgba(29,185,122,0.4)'}}>Register</Link>
          <Link to="/admin/login" style={{color:'rgba(255,255,255,0.4)',fontSize:11,textDecoration:'none'}}>Admin</Link>
        </div>
      </nav>

      {/* HERO */}
      <div style={{background:'linear-gradient(135deg,#0a5c47 0%,#0d7a5f 50%,#1DB97A 100%)',padding:'80px 24px 100px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-60,right:-60,width:300,height:300,background:'rgba(255,255,255,0.04)',borderRadius:'50%'}}/>
        <div style={{position:'absolute',bottom:-80,left:-40,width:250,height:250,background:'rgba(255,255,255,0.04)',borderRadius:'50%'}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:600,margin:'0 auto'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,255,255,0.15)',backdropFilter:'blur(10px)',padding:'6px 16px',borderRadius:20,marginBottom:24,border:'1px solid rgba(255,255,255,0.2)'}}>
            <span style={{width:6,height:6,background:'#6ee7b7',borderRadius:'50%',display:'inline-block'}}></span>
            <span style={{color:'#6ee7b7',fontSize:12,fontWeight:500,letterSpacing:'0.5px'}}>TRUSTED BY 500+ PHARMACIES ACROSS INDIA</span>
          </div>
          <h1 style={{fontSize:48,fontWeight:800,color:'#fff',lineHeight:1.15,marginBottom:20,letterSpacing:'-1px'}}>
            Wholesale Medicines<br/><span style={{color:'#6ee7b7'}}>at Your Fingertips</span>
          </h1>
          <p style={{fontSize:17,color:'rgba(255,255,255,0.8)',lineHeight:1.7,marginBottom:36,maxWidth:480,margin:'0 auto 36px'}}>
            India's fastest growing B2B platform for licensed pharmacies. Order medicines, surgical items & injectables at the best wholesale rates.
          </p>
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/register" style={{background:'#fff',color:'#0a5c47',padding:'14px 32px',borderRadius:30,fontSize:15,fontWeight:700,textDecoration:'none',boxShadow:'0 4px 20px rgba(0,0,0,0.15)',display:'inline-flex',alignItems:'center',gap:8}}>
              🏥 Register Pharmacy
            </Link>
            <Link to="/login" style={{background:'rgba(255,255,255,0.15)',color:'#fff',padding:'14px 32px',borderRadius:30,fontSize:15,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.3)',backdropFilter:'blur(10px)',display:'inline-flex',alignItems:'center',gap:8}}>
              Login →
            </Link>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{background:'#0a5c47',padding:'20px 32px'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20,textAlign:'center'}}>
          {[['500+','Licensed Pharmacies'],['10,000+','Products Available'],['₹2Cr+','Monthly Orders'],['24hr','Approval Time']].map(([n,l])=>(
            <div key={l}>
              <div style={{fontSize:24,fontWeight:800,color:'#6ee7b7'}}>{n}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,0.6)',marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{padding:'72px 24px',background:'#f8fffe'}}>
        <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:12,fontWeight:600,color:'#1DB97A',letterSpacing:'1.5px',marginBottom:10}}>HOW IT WORKS</div>
          <h2 style={{fontSize:32,fontWeight:800,color:'#0a3d2e',marginBottom:12,letterSpacing:'-0.5px'}}>Start ordering in 3 simple steps</h2>
          <p style={{color:'#6b7280',marginBottom:48,fontSize:15}}>Get verified and start buying wholesale in under 24 hours</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:24}}>
            {[
              {n:'01',icon:'📝',title:'Register & Upload',desc:'Sign up with your mobile number and upload your Drug License for verification.'},
              {n:'02',icon:'✅',title:'Get Approved',desc:'Our team verifies your license within 24 hours and activates your account.'},
              {n:'03',icon:'🛒',title:'Order & Save',desc:'Browse our full catalogue and place wholesale orders directly from your phone.'},
            ].map(s=>(
              <div key={s.n} style={{background:'#fff',borderRadius:16,padding:28,textAlign:'left',border:'1px solid #e5f5ef',boxShadow:'0 4px 20px rgba(0,0,0,0.05)',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:16,right:16,fontSize:40,fontWeight:900,color:'#e5f5ef',lineHeight:1}}>{s.n}</div>
                <div style={{fontSize:36,marginBottom:16}}>{s.icon}</div>
                <div style={{fontWeight:700,fontSize:16,color:'#0a3d2e',marginBottom:8}}>{s.title}</div>
                <div style={{fontSize:13,color:'#6b7280',lineHeight:1.6}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{padding:'72px 24px',background:'#fff'}}>
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div style={{fontSize:12,fontWeight:600,color:'#1DB97A',letterSpacing:'1.5px',marginBottom:10}}>WHY SJ MEDEX</div>
            <h2 style={{fontSize:32,fontWeight:800,color:'#0a3d2e',letterSpacing:'-0.5px'}}>Built for Indian pharmacies</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:20}}>
            {[
              {icon:'🔒',title:'Verified Access',desc:'Only licensed pharmacies with valid Drug License can access wholesale pricing',color:'#e5f5ef'},
              {icon:'💰',title:'Best Wholesale Rates',desc:'Direct from distributor — no middlemen, maximum savings on every order',color:'#e5f0ff'},
              {icon:'📦',title:'10,000+ Products',desc:'Complete range of medicines, surgical items and injectables in one place',color:'#fff5e5'},
              {icon:'🚚',title:'Free Delivery',desc:'Free delivery on all orders above ₹5,000. Fast and reliable logistics',color:'#e5f5ef'},
              {icon:'📱',title:'Mobile First',desc:'Install on your phone homescreen for instant access anytime, anywhere',color:'#ffe5e5'},
              {icon:'⚡',title:'Instant Orders',desc:'Place orders in seconds. Real-time stock updates and order tracking',color:'#e5f0ff'},
            ].map(f=>(
              <div key={f.title} style={{background:f.color,borderRadius:14,padding:'22px 20px'}}>
                <div style={{fontSize:28,marginBottom:10}}>{f.icon}</div>
                <div style={{fontWeight:700,fontSize:14,color:'#0a3d2e',marginBottom:6}}>{f.title}</div>
                <div style={{fontSize:12,color:'#6b7280',lineHeight:1.5}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{background:'linear-gradient(135deg,#0a5c47,#1DB97A)',padding:'72px 24px',textAlign:'center'}}>
        <div style={{maxWidth:500,margin:'0 auto'}}>
          <h2 style={{fontSize:32,fontWeight:800,color:'#fff',marginBottom:12,letterSpacing:'-0.5px'}}>Ready to save on every order?</h2>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:15,marginBottom:32,lineHeight:1.6}}>Join 500+ pharmacies already using SJ Medex for their wholesale needs.</p>
          <Link to="/register" style={{background:'#fff',color:'#0a5c47',padding:'16px 40px',borderRadius:30,fontSize:16,fontWeight:700,textDecoration:'none',display:'inline-block',boxShadow:'0 4px 20px rgba(0,0,0,0.2)'}}>
            Get Started — It's Free →
          </Link>
          <div style={{marginTop:20,fontSize:12,color:'rgba(255,255,255,0.6)'}}>No setup fees · Approval within 24 hours · Cancel anytime</div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:'#071f17',padding:'24px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:18}}>💊</span>
          <span style={{color:'#fff',fontWeight:600,fontSize:14}}>SJ Medex</span>
          <span style={{color:'rgba(255,255,255,0.3)',fontSize:12}}>· Wholesale Medical Platform</span>
        </div>
        <div style={{color:'rgba(255,255,255,0.4)',fontSize:12}}>© 2025 SJ Medex. All rights reserved.</div>
        <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,255,255,0.08)',padding:'6px 14px',borderRadius:20}}>
          <span style={{width:6,height:6,background:'#1DB97A',borderRadius:'50%',display:'inline-block'}}></span>
          <span style={{color:'rgba(255,255,255,0.6)',fontSize:11}}>Add to home screen for quick access</span>
        </div>
      </div>

    </div>
  );
}
