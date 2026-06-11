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
      <style>{`
        * { box-sizing: border-box; }
        .nav-links { display: flex; align-items: center; gap: 12px; }
        .hero-title { font-size: 48px; }
        .hero-btns { flex-direction: row; }
        .stats-grid { grid-template-columns: repeat(4,1fr); }
        .steps-grid { grid-template-columns: repeat(3,1fr); }
        .features-grid { grid-template-columns: repeat(3,1fr); }
        .footer-inner { flex-direction: row; }
        @media (max-width: 768px) {
          .hero-title { font-size: 30px !important; }
          .hero-btns { flex-direction: column !important; align-items: stretch !important; }
          .hero-btns a { text-align: center; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: repeat(2,1fr) !important; }
          .footer-inner { flex-direction: column !important; text-align: center; gap: 10px !important; }
          .nav-links .reg-btn { padding: 7px 14px !important; font-size: 12px !important; }
          .hide-mobile { display: none !important; }
          .section-pad { padding: 48px 16px !important; }
          .hero-pad { padding: 56px 16px 72px !important; }
          .stat-bar { padding: 16px !important; }
          .cta-title { font-size: 24px !important; }
        }
        @media (max-width: 480px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{background:'#0a5c47',padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 12px rgba(0,0,0,0.15)'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:36,height:36,background:'linear-gradient(135deg,#1DB97A,#0a5c47)',borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,boxShadow:'0 2px 8px rgba(0,0,0,0.2)',flexShrink:0}}>💊</div>
          <div>
            <div style={{color:'#fff',fontWeight:700,fontSize:17,letterSpacing:'-0.3px'}}>SJ Medex</div>
            <div style={{color:'#6ee7b7',fontSize:9,letterSpacing:'0.5px'}} className="hide-mobile">WHOLESALE PLATFORM</div>
          </div>
        </div>
        <div className="nav-links">
          <Link to="/login" style={{color:'#6ee7b7',fontSize:13,textDecoration:'none',fontWeight:500}} className="hide-mobile">Login</Link>
          <Link to="/register" className="reg-btn" style={{background:'#1DB97A',color:'#fff',padding:'8px 18px',borderRadius:20,fontSize:13,fontWeight:600,textDecoration:'none',boxShadow:'0 2px 8px rgba(29,185,122,0.4)'}}>Register</Link>
          <Link to="/login" style={{background:'rgba(255,255,255,0.15)',color:'#fff',padding:'8px 14px',borderRadius:20,fontSize:13,fontWeight:500,textDecoration:'none',border:'1px solid rgba(255,255,255,0.2)'}} className="hide-mobile">Login</Link>
          <Link to="/admin/login" style={{color:'rgba(255,255,255,0.35)',fontSize:11,textDecoration:'none'}} className="hide-mobile">Admin</Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero-pad" style={{background:'linear-gradient(135deg,#0a5c47 0%,#0d7a5f 50%,#1DB97A 100%)',padding:'72px 24px 90px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-60,right:-60,width:250,height:250,background:'rgba(255,255,255,0.04)',borderRadius:'50%'}}/>
        <div style={{position:'absolute',bottom:-60,left:-40,width:200,height:200,background:'rgba(255,255,255,0.04)',borderRadius:'50%'}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:580,margin:'0 auto'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,255,255,0.15)',backdropFilter:'blur(10px)',padding:'5px 14px',borderRadius:20,marginBottom:20,border:'1px solid rgba(255,255,255,0.2)'}}>
            <span style={{width:6,height:6,background:'#6ee7b7',borderRadius:'50%',display:'inline-block'}}></span>
            <span style={{color:'#6ee7b7',fontSize:11,fontWeight:500,letterSpacing:'0.3px'}}>TRUSTED BY 500+ PHARMACIES ACROSS INDIA</span>
          </div>
          <h1 className="hero-title" style={{fontWeight:800,color:'#fff',lineHeight:1.15,marginBottom:16,letterSpacing:'-1px'}}>
            Wholesale Medicines<br/><span style={{color:'#6ee7b7'}}>at Your Fingertips</span>
          </h1>
          <p style={{fontSize:15,color:'rgba(255,255,255,0.85)',lineHeight:1.7,marginBottom:32,maxWidth:460,margin:'0 auto 32px'}}>
            India's fastest growing B2B platform for licensed pharmacies. Order medicines, surgical items & injectables at the best wholesale rates.
          </p>
          <div className="hero-btns" style={{display:'flex',gap:12,justifyContent:'center'}}>
            <Link to="/register" style={{background:'#fff',color:'#0a5c47',padding:'13px 28px',borderRadius:30,fontSize:15,fontWeight:700,textDecoration:'none',boxShadow:'0 4px 20px rgba(0,0,0,0.15)',display:'inline-flex',alignItems:'center',justifyContent:'center',gap:8}}>
              🏥 Register Pharmacy
            </Link>
            <Link to="/login" style={{background:'rgba(255,255,255,0.15)',color:'#fff',padding:'13px 28px',borderRadius:30,fontSize:15,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.3)',backdropFilter:'blur(10px)',display:'inline-flex',alignItems:'center',justifyContent:'center',gap:8}}>
              Login →
            </Link>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="stat-bar" style={{background:'#083d2c',padding:'20px 24px'}}>
        <div className="stats-grid" style={{maxWidth:900,margin:'0 auto',display:'grid',gap:16,textAlign:'center'}}>
          {[['500+','Licensed Pharmacies'],['10,000+','Products Available'],['₹2Cr+','Monthly Orders'],['24hr','Approval Time']].map(([n,l])=>(
            <div key={l}>
              <div style={{fontSize:22,fontWeight:800,color:'#6ee7b7'}}>{n}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,0.55)',marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="section-pad" style={{padding:'64px 24px',background:'#f8fffe'}}>
        <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:11,fontWeight:600,color:'#1DB97A',letterSpacing:'1.5px',marginBottom:8}}>HOW IT WORKS</div>
          <h2 style={{fontSize:28,fontWeight:800,color:'#0a3d2e',marginBottom:10,letterSpacing:'-0.5px'}}>Start ordering in 3 simple steps</h2>
          <p style={{color:'#6b7280',marginBottom:40,fontSize:14}}>Get verified and start buying wholesale in under 24 hours</p>
          <div className="steps-grid" style={{display:'grid',gap:20}}>
            {[
              {n:'01',icon:'📝',title:'Register & Upload',desc:'Sign up with your mobile number and upload your Drug License for verification.'},
              {n:'02',icon:'✅',title:'Get Approved',desc:'Our team verifies your license within 24 hours and activates your account.'},
              {n:'03',icon:'🛒',title:'Order & Save',desc:'Browse our full catalogue and place wholesale orders directly from your phone.'},
            ].map(s=>(
              <div key={s.n} style={{background:'#fff',borderRadius:16,padding:24,textAlign:'left',border:'1px solid #e5f5ef',boxShadow:'0 4px 20px rgba(0,0,0,0.05)',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:14,right:16,fontSize:36,fontWeight:900,color:'#e5f5ef',lineHeight:1}}>{s.n}</div>
                <div style={{fontSize:32,marginBottom:14}}>{s.icon}</div>
                <div style={{fontWeight:700,fontSize:15,color:'#0a3d2e',marginBottom:6}}>{s.title}</div>
                <div style={{fontSize:13,color:'#6b7280',lineHeight:1.6}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="section-pad" style={{padding:'64px 24px',background:'#fff'}}>
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <div style={{fontSize:11,fontWeight:600,color:'#1DB97A',letterSpacing:'1.5px',marginBottom:8}}>WHY SJ MEDEX</div>
            <h2 style={{fontSize:28,fontWeight:800,color:'#0a3d2e',letterSpacing:'-0.5px'}}>Built for Indian pharmacies</h2>
          </div>
          <div className="features-grid" style={{display:'grid',gap:16}}>
            {[
              {icon:'🔒',title:'Verified Access',desc:'Only licensed pharmacies with valid Drug License can access wholesale pricing',color:'#e5f5ef'},
              {icon:'💰',title:'Best Wholesale Rates',desc:'Direct from distributor — no middlemen, maximum savings on every order',color:'#e5f0ff'},
              {icon:'📦',title:'10,000+ Products',desc:'Complete range of medicines, surgical items and injectables in one place',color:'#fff5e5'},
              {icon:'🚚',title:'Free Delivery',desc:'Free delivery on all orders above ₹5,000. Fast and reliable logistics',color:'#e5f5ef'},
              {icon:'📱',title:'Mobile First',desc:'Install on your phone homescreen for instant access anytime, anywhere',color:'#ffe5e5'},
              {icon:'⚡',title:'Instant Orders',desc:'Place orders in seconds. Real-time stock updates and order tracking',color:'#e5f0ff'},
            ].map(f=>(
              <div key={f.title} style={{background:f.color,borderRadius:14,padding:'20px 18px'}}>
                <div style={{fontSize:26,marginBottom:10}}>{f.icon}</div>
                <div style={{fontWeight:700,fontSize:14,color:'#0a3d2e',marginBottom:6}}>{f.title}</div>
                <div style={{fontSize:12,color:'#6b7280',lineHeight:1.5}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PWA BANNER */}
      <div style={{background:'#e5f5ef',padding:'20px 24px'}}>
        <div style={{maxWidth:700,margin:'0 auto',display:'flex',alignItems:'center',gap:16,flexWrap:'wrap',justifyContent:'center',textAlign:'center'}}>
          <span style={{fontSize:28}}>📱</span>
          <div>
            <div style={{fontWeight:700,color:'#0a3d2e',fontSize:15}}>Add SJ Medex to your Home Screen</div>
            <div style={{fontSize:12,color:'#6b7280',marginTop:2}}>On iPhone: tap <strong>Share → Add to Home Screen</strong> · On Android: tap <strong>Menu → Add to Home Screen</strong></div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section-pad" style={{background:'linear-gradient(135deg,#0a5c47,#1DB97A)',padding:'64px 24px',textAlign:'center'}}>
        <div style={{maxWidth:500,margin:'0 auto'}}>
          <h2 className="cta-title" style={{fontSize:28,fontWeight:800,color:'#fff',marginBottom:12,letterSpacing:'-0.5px'}}>Ready to save on every order?</h2>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:14,marginBottom:28,lineHeight:1.6}}>Join 500+ pharmacies already using SJ Medex for their wholesale needs.</p>
          <Link to="/register" style={{background:'#fff',color:'#0a5c47',padding:'14px 36px',borderRadius:30,fontSize:15,fontWeight:700,textDecoration:'none',display:'inline-block',boxShadow:'0 4px 20px rgba(0,0,0,0.2)'}}>
            Get Started — It's Free →
          </Link>
          <div style={{marginTop:16,fontSize:12,color:'rgba(255,255,255,0.55)'}}>No setup fees · Approval within 24 hours</div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:'#071f17',padding:'20px 24px'}}>
        <div className="footer-inner" style={{maxWidth:900,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:16}}>💊</span>
            <span style={{color:'#fff',fontWeight:600,fontSize:14}}>SJ Medex</span>
            <span style={{color:'rgba(255,255,255,0.3)',fontSize:12}}>· Wholesale Medical Platform</span>
          </div>
          <div style={{color:'rgba(255,255,255,0.35)',fontSize:11}}>© 2025 SJ Medex. All rights reserved.</div>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,255,255,0.08)',padding:'5px 12px',borderRadius:20}}>
            <span style={{width:5,height:5,background:'#1DB97A',borderRadius:'50%',display:'inline-block'}}></span>
            <span style={{color:'rgba(255,255,255,0.5)',fontSize:10}}>Install as app on your phone</span>
          </div>
        </div>
      </div>

    </div>
  );
}
