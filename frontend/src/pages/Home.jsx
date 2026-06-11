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
        *{box-sizing:border-box}
        .hero-title{font-size:46px}
        .hero-btns{flex-direction:row}
        .stats-grid{grid-template-columns:repeat(4,1fr)}
        .steps-grid{grid-template-columns:repeat(3,1fr)}
        .features-grid{grid-template-columns:repeat(3,1fr)}
        .trust-grid{grid-template-columns:repeat(4,1fr)}
        .creds-grid{grid-template-columns:repeat(3,1fr)}
        .footer-grid{grid-template-columns:repeat(3,1fr)}
        @media(max-width:768px){
          .hero-title{font-size:28px!important}
          .hero-btns{flex-direction:column!important;align-items:stretch!important}
          .hero-btns a{text-align:center!important}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important}
          .steps-grid{grid-template-columns:1fr!important}
          .features-grid{grid-template-columns:repeat(2,1fr)!important}
          .trust-grid{grid-template-columns:repeat(2,1fr)!important}
          .creds-grid{grid-template-columns:1fr!important}
          .footer-grid{grid-template-columns:1fr!important}
          .hide-mob{display:none!important}
          .nav-pad{padding:10px 16px!important}
          .sec-pad{padding:48px 16px!important}
        }
        @media(max-width:480px){
          .features-grid{grid-template-columns:1fr!important}
          .trust-grid{grid-template-columns:1fr 1fr!important}
        }
      `}</style>

      {/* NAV */}
      <nav className="nav-pad" style={{background:'#0a5c47',padding:'12px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 16px rgba(0,0,0,0.2)'}}>
        {/* LOGO */}
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="38" height="38" rx="10" fill="#1DB97A"/>
            <rect x="17" y="6" width="4" height="26" rx="2" fill="white"/>
            <rect x="6" y="17" width="26" height="4" rx="2" fill="white"/>
            <circle cx="19" cy="19" r="7" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4"/>
          </svg>
          <div>
            <div style={{color:'#fff',fontWeight:800,fontSize:18,letterSpacing:'-0.5px',lineHeight:1.1}}>SJ Medex</div>
            <div style={{color:'#6ee7b7',fontSize:9,letterSpacing:'1px',fontWeight:500}} className="hide-mob">WHOLESALE MEDICAL PLATFORM</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <Link to="/login" className="hide-mob" style={{color:'#6ee7b7',fontSize:13,textDecoration:'none',fontWeight:500}}>Login</Link>
          <Link to="/register" style={{background:'#fff',color:'#0a5c47',padding:'8px 18px',borderRadius:20,fontSize:13,fontWeight:700,textDecoration:'none',boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>Register</Link>
          <Link to="/admin/login" className="hide-mob" style={{color:'rgba(255,255,255,0.35)',fontSize:11,textDecoration:'none'}}>Admin</Link>
        </div>
      </nav>

      {/* VERIFIED RIBBON */}
      <div style={{background:'#064e3b',padding:'8px 20px',display:'flex',alignItems:'center',justifyContent:'center',gap:24,flexWrap:'wrap'}}>
        {[
          {icon:'🏛️',text:'GSTIN: 06CTDPS6578R1ZJ'},
          {icon:'🧾',text:'FSSAI: 20826004000806'},
          {icon:'💊',text:'DL: WLF20B2025HR001699'},
          {icon:'📅',text:'Est. 2022 · 3 Years in Business'},
        ].map(b=>(
          <div key={b.text} style={{display:'flex',alignItems:'center',gap:5,fontSize:10,color:'#6ee7b7',fontWeight:500,letterSpacing:'0.3px'}}>
            <span>{b.icon}</span><span>{b.text}</span>
          </div>
        ))}
      </div>

      {/* HERO */}
      <div className="sec-pad" style={{background:'linear-gradient(135deg,#0a5c47 0%,#0d7a5f 60%,#1DB97A 100%)',padding:'72px 28px 90px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-80,right:-80,width:300,height:300,background:'rgba(255,255,255,0.03)',borderRadius:'50%'}}/>
        <div style={{position:'absolute',bottom:-60,left:-60,width:220,height:220,background:'rgba(255,255,255,0.03)',borderRadius:'50%'}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:600,margin:'0 auto'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,255,255,0.12)',backdropFilter:'blur(8px)',padding:'6px 16px',borderRadius:20,marginBottom:22,border:'1px solid rgba(255,255,255,0.15)'}}>
            <span style={{width:7,height:7,background:'#6ee7b7',borderRadius:'50%',display:'inline-block',animation:'pulse 2s infinite'}}></span>
            <span style={{color:'#6ee7b7',fontSize:11,fontWeight:600,letterSpacing:'0.5px'}}>GOVERNMENT LICENSED · GST REGISTERED · FSSAI APPROVED</span>
          </div>
          <h1 className="hero-title" style={{fontWeight:800,color:'#fff',lineHeight:1.12,marginBottom:18,letterSpacing:'-1px'}}>
            India's Most Trusted<br/><span style={{color:'#6ee7b7'}}>Wholesale Medical Platform</span>
          </h1>
          <p style={{fontSize:15,color:'rgba(255,255,255,0.85)',lineHeight:1.75,marginBottom:12,maxWidth:500,margin:'0 auto 12px'}}>
            Serving 500+ licensed pharmacies across Haryana & Delhi NCR since 2022. Order medicines, surgical items & injectables at guaranteed wholesale rates.
          </p>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.6)',marginBottom:32}}>📍 Rajeev Colony, Samaypur Road, Ballabhagarh, Faridabad — 121004</p>
          <div className="hero-btns" style={{display:'flex',gap:12,justifyContent:'center',maxWidth:420,margin:'0 auto'}}>
            <Link to="/register" style={{background:'#fff',color:'#0a5c47',padding:'14px 28px',borderRadius:30,fontSize:15,fontWeight:700,textDecoration:'none',boxShadow:'0 4px 20px rgba(0,0,0,0.2)',flex:1,textAlign:'center',display:'block'}}>
              🏥 Register Pharmacy
            </Link>
            <Link to="/login" style={{background:'rgba(255,255,255,0.12)',color:'#fff',padding:'14px 28px',borderRadius:30,fontSize:15,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.25)',flex:1,textAlign:'center',display:'block'}}>
              Login →
            </Link>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{background:'#083d2c',padding:'22px 24px'}}>
        <div className="stats-grid" style={{maxWidth:900,margin:'0 auto',display:'grid',gap:16,textAlign:'center'}}>
          {[['500+','Licensed Pharmacies'],['3 Years','In Business'],['100%','Govt. Licensed'],['Haryana & Delhi','Service Area']].map(([n,l])=>(
            <div key={l}>
              <div style={{fontSize:20,fontWeight:800,color:'#6ee7b7'}}>{n}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TRUST US SECTION */}
      <div className="sec-pad" style={{padding:'64px 24px',background:'#f0fdf9'}}>
        <div style={{maxWidth:960,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:8}}>WHY PHARMACIES TRUST US</div>
            <h2 style={{fontSize:30,fontWeight:800,color:'#0a3d2e',letterSpacing:'-0.5px',marginBottom:10}}>Fully Licensed. Fully Verified. Fully Reliable.</h2>
            <p style={{color:'#6b7280',fontSize:14,maxWidth:500,margin:'0 auto'}}>SJ Medex is a government registered wholesale medical distributor operating since 2022 from Faridabad, Haryana.</p>
          </div>

          {/* LICENSE CARDS */}
          <div className="trust-grid" style={{display:'grid',gap:16,marginBottom:40}}>
            {[
              {icon:'🏛️',label:'GST Registered',value:'06CTDPS6578R1ZJ',sub:'Haryana GST · Active',color:'#e5f5ef',border:'#86efac'},
              {icon:'🧾',label:'FSSAI Licensed',value:'20826004000806',sub:'Food Safety · Valid',color:'#eff6ff',border:'#93c5fd'},
              {icon:'💊',label:'Drug License',value:'WLF20B2025HR001699',sub:'Retail + Wholesale · Active',color:'#fefce8',border:'#fde047'},
              {icon:'📋',label:'PAN Verified',value:'CTDPS6578R',sub:'Income Tax · Registered',color:'#fdf4ff',border:'#d8b4fe'},
            ].map(c=>(
              <div key={c.label} style={{background:c.color,border:`1px solid ${c.border}`,borderRadius:14,padding:18,position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:10,right:12,fontSize:10,fontWeight:600,color:'#15803d',background:'#dcfce7',padding:'2px 8px',borderRadius:10}}>✓ VERIFIED</div>
                <div style={{fontSize:26,marginBottom:8}}>{c.icon}</div>
                <div style={{fontSize:11,color:'#6b7280',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:4}}>{c.label}</div>
                <div style={{fontFamily:'monospace',fontWeight:700,fontSize:13,color:'#0a3d2e',marginBottom:3}}>{c.value}</div>
                <div style={{fontSize:11,color:'#6b7280'}}>{c.sub}</div>
              </div>
            ))}
          </div>

          {/* TRUST POINTS */}
          <div className="creds-grid" style={{display:'grid',gap:16}}>
            {[
              {icon:'🔒',title:'100% Verified Buyers Only',desc:'Every pharmacy is manually verified — Drug License checked before account activation. No fake accounts, no unauthorized access.'},
              {icon:'📦',title:'Direct from Licensed Distributor',desc:'SJ Medex is the distributor. No middlemen. All products sourced from authorized manufacturers with proper documentation.'},
              {icon:'📞',title:'Dedicated Support Team',desc:'Call us directly at +91 8595501653 or +91 7827170286. Real humans, based in Faridabad. Monday to Saturday, 9AM–6PM.'},
            ].map(t=>(
              <div key={t.title} style={{background:'#fff',borderRadius:14,padding:22,border:'1px solid #d1fae5',boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
                <div style={{fontSize:28,marginBottom:12}}>{t.icon}</div>
                <div style={{fontWeight:700,fontSize:15,color:'#0a3d2e',marginBottom:8}}>{t.title}</div>
                <div style={{fontSize:13,color:'#6b7280',lineHeight:1.7}}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="sec-pad" style={{padding:'64px 24px',background:'#fff'}}>
        <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:8}}>HOW IT WORKS</div>
          <h2 style={{fontSize:28,fontWeight:800,color:'#0a3d2e',marginBottom:10,letterSpacing:'-0.5px'}}>Start ordering in 3 simple steps</h2>
          <p style={{color:'#6b7280',marginBottom:40,fontSize:14}}>Approval within 24 hours · No registration fees · Free delivery on all orders</p>
          <div className="steps-grid" style={{display:'grid',gap:20}}>
            {[
              {n:'01',icon:'📱',title:'Register with Mobile OTP',desc:'Sign up using your mobile number. Verify with OTP and fill in your pharmacy details in under 2 minutes.'},
              {n:'02',icon:'📄',title:'Upload Drug License',desc:'Upload your valid Drug License. Our team manually verifies it and approves your account within 24 hours.'},
              {n:'03',icon:'🛒',title:'Order at Wholesale Rates',desc:'Browse 500+ products, add to cart with your required quantity and place orders directly from your phone.'},
            ].map(s=>(
              <div key={s.n} style={{background:'#f8fffe',borderRadius:16,padding:26,textAlign:'left',border:'1px solid #d1fae5',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:12,right:16,fontSize:44,fontWeight:900,color:'#d1fae5',lineHeight:1}}>{s.n}</div>
                <div style={{fontSize:32,marginBottom:14}}>{s.icon}</div>
                <div style={{fontWeight:700,fontSize:15,color:'#0a3d2e',marginBottom:8}}>{s.title}</div>
                <div style={{fontSize:13,color:'#6b7280',lineHeight:1.65}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="sec-pad" style={{padding:'64px 24px',background:'#f8fffe'}}>
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:8}}>PLATFORM FEATURES</div>
            <h2 style={{fontSize:28,fontWeight:800,color:'#0a3d2e',letterSpacing:'-0.5px'}}>Everything a pharmacy needs</h2>
          </div>
          <div className="features-grid" style={{display:'grid',gap:16}}>
            {[
              {icon:'💰',title:'Best Wholesale Rates',desc:'Direct distributor pricing — no commission, no markup. Maximum savings on every order.',color:'#e5f5ef'},
              {icon:'📦',title:'500+ Products',desc:'Medicines, surgical items, injectables — complete catalogue updated regularly.',color:'#eff6ff'},
              {icon:'🚚',title:'Free Delivery',desc:'Free delivery on all orders. No minimum order value for free shipping.',color:'#fefce8'},
              {icon:'📱',title:'Install on Phone',desc:'Add to home screen — works like an app on Android and iPhone.',color:'#fdf4ff'},
              {icon:'🧾',title:'GST Invoices',desc:'Every order comes with proper GST invoice for your accounting needs.',color:'#fff5e5'},
              {icon:'⚡',title:'Instant Ordering',desc:'Place orders in 30 seconds. Real-time stock status on every product.',color:'#e5f5ef'},
            ].map(f=>(
              <div key={f.title} style={{background:f.color,borderRadius:14,padding:'20px 18px'}}>
                <div style={{fontSize:26,marginBottom:10}}>{f.icon}</div>
                <div style={{fontWeight:700,fontSize:14,color:'#0a3d2e',marginBottom:6}}>{f.title}</div>
                <div style={{fontSize:12,color:'#6b7280',lineHeight:1.6}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT STRIP */}
      <div style={{background:'#0a5c47',padding:'32px 24px'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:20}}>
          <div>
            <div style={{color:'#fff',fontWeight:700,fontSize:18,marginBottom:4}}>Have questions? Talk to us directly.</div>
            <div style={{color:'#6ee7b7',fontSize:13}}>📍 Rajeev Colony, Samaypur Road, Ballabhagarh, Faridabad — 121004</div>
            <div style={{color:'#6ee7b7',fontSize:13,marginTop:4}}>✉️ sjmedex@gmail.com</div>
          </div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <a href="tel:+918595501653" style={{background:'#fff',color:'#0a5c47',padding:'11px 22px',borderRadius:24,fontSize:14,fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',gap:6}}>📞 +91 85955 01653</a>
            <a href="tel:+917827170286" style={{background:'rgba(255,255,255,0.15)',color:'#fff',padding:'11px 22px',borderRadius:24,fontSize:14,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.25)',display:'flex',alignItems:'center',gap:6}}>📞 +91 78271 70286</a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="sec-pad" style={{background:'linear-gradient(135deg,#064e3b,#0a5c47,#1DB97A)',padding:'64px 24px',textAlign:'center'}}>
        <div style={{maxWidth:520,margin:'0 auto'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#6ee7b7',letterSpacing:'2px',marginBottom:12}}>JOIN 500+ PHARMACIES TODAY</div>
          <h2 style={{fontSize:28,fontWeight:800,color:'#fff',marginBottom:12,letterSpacing:'-0.5px'}}>Ready to save on every order?</h2>
          <p style={{color:'rgba(255,255,255,0.75)',fontSize:14,marginBottom:28,lineHeight:1.7}}>Register your pharmacy today. Upload your Drug License and get approved within 24 hours.</p>
          <Link to="/register" style={{background:'#fff',color:'#0a5c47',padding:'15px 40px',borderRadius:30,fontSize:15,fontWeight:700,textDecoration:'none',display:'inline-block',boxShadow:'0 4px 20px rgba(0,0,0,0.2)'}}>
            Get Started — Free Registration →
          </Link>
          <div style={{marginTop:16,fontSize:12,color:'rgba(255,255,255,0.5)'}}>No fees · Approved in 24hrs · GST invoices included</div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:'#071f17',padding:'40px 24px 24px'}}>
        <div className="footer-grid" style={{maxWidth:960,margin:'0 auto',display:'grid',gap:32,marginBottom:32}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
              <svg width="32" height="32" viewBox="0 0 38 38" fill="none"><rect width="38" height="38" rx="10" fill="#1DB97A"/><rect x="17" y="6" width="4" height="26" rx="2" fill="white"/><rect x="6" y="17" width="26" height="4" rx="2" fill="white"/></svg>
              <div>
                <div style={{color:'#fff',fontWeight:800,fontSize:16}}>SJ Medex</div>
                <div style={{color:'#6ee7b7',fontSize:9,letterSpacing:'1px'}}>WHOLESALE MEDICAL PLATFORM</div>
              </div>
            </div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.5)',lineHeight:1.7}}>Rajeev Colony, Samaypur Road,<br/>Near Bansi School, Ballabhagarh<br/>Faridabad, Haryana — 121004</div>
            <div style={{fontSize:12,color:'#6ee7b7',marginTop:8}}>sjmedex@gmail.com</div>
          </div>
          <div>
            <div style={{color:'#fff',fontWeight:600,fontSize:13,marginBottom:12,letterSpacing:'0.5px'}}>REGISTRATION DETAILS</div>
            {[
              ['GSTIN','06CTDPS6578R1ZJ'],
              ['PAN','CTDPS6578R'],
              ['FSSAI','20826004000806'],
              ['Drug License','WLF20B2025HR001699'],
            ].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:11}}>
                <span style={{color:'rgba(255,255,255,0.4)'}}>{k}</span>
                <span style={{color:'#6ee7b7',fontFamily:'monospace'}}>{v}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{color:'#fff',fontWeight:600,fontSize:13,marginBottom:12,letterSpacing:'0.5px'}}>CONTACT & SUPPORT</div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.5)',lineHeight:2}}>
              <div>📞 +91 8595501653</div>
              <div>📞 +91 7827170286</div>
              <div>✉️ sjmedex@gmail.com</div>
              <div style={{marginTop:8,color:'#6ee7b7'}}>Mon–Sat · 9AM to 6PM</div>
            </div>
          </div>
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:20,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <div style={{fontSize:11,color:'rgba(255,255,255,0.3)'}}>© 2025 SJ Medex. All rights reserved. GST: 06CTDPS6578R1ZJ</div>
          <div style={{display:'flex',gap:16}}>
            {['Licensed Distributor','GST Registered','FSSAI Approved'].map(b=>(
              <div key={b} style={{fontSize:10,color:'#6ee7b7',display:'flex',alignItems:'center',gap:4}}>
                <span style={{width:5,height:5,background:'#1DB97A',borderRadius:'50%',display:'inline-block'}}></span>{b}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
