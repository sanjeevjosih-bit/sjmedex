import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
    <rect width="38" height="38" rx="10" fill="#1DB97A"/>
    <rect x="17" y="6" width="4" height="26" rx="2" fill="white"/>
    <rect x="6" y="17" width="26" height="4" rx="2" fill="white"/>
    <circle cx="19" cy="19" r="7" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4"/>
  </svg>
);

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savings, setSavings] = useState(50000);
  const [regType, setRegType] = useState('pharmacy');

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.status === 'approved') navigate('/dashboard');
      else navigate('/pending');
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSavings(s => s + Math.floor(Math.random() * 500 + 200));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{minHeight:'100vh',background:'#fff',fontFamily:'Inter,sans-serif'}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        .stats-g{grid-template-columns:repeat(4,1fr)}
        .steps-g{grid-template-columns:repeat(3,1fr)}
        .feat-g{grid-template-columns:repeat(3,1fr)}
        .trust-g{grid-template-columns:repeat(4,1fr)}
        .creds-g{grid-template-columns:repeat(3,1fr)}
        .foot-g{grid-template-columns:repeat(3,1fr)}
        .testi-g{grid-template-columns:repeat(3,1fr)}
        .reg-g{grid-template-columns:1fr 1fr}
        .hero-t{font-size:44px}
        @media(max-width:768px){
          .hero-t{font-size:26px!important}
          .stats-g,.trust-g,.reg-g{grid-template-columns:repeat(2,1fr)!important}
          .steps-g,.creds-g,.foot-g,.testi-g{grid-template-columns:1fr!important}
          .feat-g{grid-template-columns:repeat(2,1fr)!important}
          .hide-mob{display:none!important}
          .sp{padding:44px 16px!important}
          .cb{flex-direction:column!important;gap:8px!important;text-align:center}
          .hb{flex-direction:column!important}
          .hb a,.hb button{width:100%!important;text-align:center!important}
        }
        @media(max-width:480px){
          .feat-g,.reg-g{grid-template-columns:1fr!important}
        }
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        .ld{animation:pulse 1.5s infinite}
      `}</style>

      {/* CALL BAR */}
      <div style={{background:'#064e3b',padding:'8px 20px',position:'sticky',top:0,zIndex:200,boxShadow:'0 2px 8px rgba(0,0,0,0.3)'}}>
        <div className="cb" style={{maxWidth:960,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:12,color:'#6ee7b7'}}>
            <span className="ld" style={{width:7,height:7,background:'#4ade80',borderRadius:'50%',display:'inline-block'}}></span>
            <span style={{fontWeight:600}}>Support: Mon-Sat 9AM-6PM</span>
            <span className="hide-mob" style={{color:'rgba(255,255,255,0.4)'}}>· Faridabad, Haryana</span>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
            <a href="tel:+918595501653" style={{background:'#1DB97A',color:'#fff',padding:'6px 14px',borderRadius:20,fontSize:12,fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',gap:4}}>
              📞 +91 85955 01653
            </a>
            <a href="tel:+917827170286" style={{background:'rgba(255,255,255,0.1)',color:'#6ee7b7',padding:'6px 14px',borderRadius:20,fontSize:12,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.15)',display:'flex',alignItems:'center',gap:4}}>
              📞 +91 78271 70286
            </a>
            <a href="mailto:sjmedex@gmail.com" className="hide-mob" style={{color:'rgba(255,255,255,0.4)',fontSize:11,textDecoration:'none'}}>✉️ sjmedex@gmail.com</a>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav style={{background:'#0a5c47',padding:'11px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:42,zIndex:199,boxShadow:'0 1px 8px rgba(0,0,0,0.15)'}}>
        <div style={{display:'flex',alignItems:'center',gap:9}}>
          <Logo/>
          <div>
            <div style={{color:'#fff',fontWeight:800,fontSize:17,letterSpacing:'-0.4px',lineHeight:1.1}}>SJ Medex</div>
            <div style={{color:'#6ee7b7',fontSize:9,letterSpacing:'1px',fontWeight:600}} className="hide-mob">WHOLESALE MEDICAL PLATFORM</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <Link to="/login" className="hide-mob" style={{color:'#6ee7b7',fontSize:13,textDecoration:'none',fontWeight:500}}>Login</Link>
          <Link to="/register" style={{background:'#1DB97A',color:'#fff',padding:'8px 20px',borderRadius:20,fontSize:13,fontWeight:700,textDecoration:'none'}}>Register Free</Link>
          <Link to="/admin/login" className="hide-mob" style={{color:'rgba(255,255,255,0.25)',fontSize:11,textDecoration:'none'}}>Admin</Link>
        </div>
      </nav>

      {/* VERIFIED RIBBON */}
      <div style={{background:'#052e16',padding:'7px 20px',overflowX:'auto',whiteSpace:'nowrap'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:24,minWidth:'max-content',margin:'0 auto'}}>
          {[['🏛️','GSTIN: 06CTDPS6578R1ZJ'],['🧾','FSSAI: 20826004000806'],['💊','DL: WLF20B2025HR001699'],['📋','PAN: CTDPS6578R'],['📅','Est. 2022 · 3 Years']].map(([icon,text])=>(
            <div key={text} style={{display:'flex',alignItems:'center',gap:5,fontSize:10,color:'#6ee7b7',fontWeight:500}}>
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div className="sp" style={{background:'linear-gradient(135deg,#0a5c47 0%,#0d7a5f 55%,#1DB97A 100%)',padding:'68px 24px 84px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-100,right:-100,width:350,height:350,background:'rgba(255,255,255,0.03)',borderRadius:'50%'}}/>
        <div style={{position:'absolute',bottom:-80,left:-80,width:280,height:280,background:'rgba(255,255,255,0.03)',borderRadius:'50%'}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:640,margin:'0 auto'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(0,0,0,0.2)',padding:'7px 18px',borderRadius:24,marginBottom:20,border:'1px solid rgba(255,255,255,0.1)'}}>
            <span className="ld" style={{width:7,height:7,background:'#4ade80',borderRadius:'50%',display:'inline-block'}}></span>
            <span style={{color:'#6ee7b7',fontSize:11,fontWeight:600}}>Pharmacies saved Rs.{savings.toLocaleString('en-IN')} today on SJ Medex</span>
          </div>
          <h1 className="hero-t" style={{fontWeight:900,color:'#fff',lineHeight:1.1,marginBottom:16,letterSpacing:'-1.5px'}}>
            Stop Overpaying.<br/><span style={{color:'#6ee7b7'}}>Start Saving Today.</span>
          </h1>
          <p style={{fontSize:15,color:'rgba(255,255,255,0.85)',lineHeight:1.8,marginBottom:10,maxWidth:520,margin:'0 auto 10px'}}>
            Haryana most trusted wholesale medical distributor serving pharmacies and doctors since 2022. GST registered, FSSAI approved, Drug Licensed.
          </p>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.5)',marginBottom:32}}>📍 Ballabhagarh, Faridabad · Serving Delhi NCR and Haryana</p>
          <div style={{background:'rgba(0,0,0,0.2)',borderRadius:16,padding:20,marginBottom:24,maxWidth:480,margin:'0 auto 24px',border:'1px solid rgba(255,255,255,0.1)'}}>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.6)',marginBottom:12,fontWeight:600,letterSpacing:'0.5px'}}>I WANT TO REGISTER AS</div>
            <div className="reg-g" style={{display:'grid',gap:10,marginBottom:14}}>
              <button onClick={()=>setRegType('pharmacy')} style={{padding:'12px',borderRadius:10,border:regType==='pharmacy'?'2px solid #1DB97A':'2px solid rgba(255,255,255,0.2)',background:regType==='pharmacy'?'#1DB97A':'rgba(255,255,255,0.05)',color:'#fff',cursor:'pointer',fontWeight:600,fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                🏥 Pharmacy / Medical Store
              </button>
              <button onClick={()=>setRegType('doctor')} style={{padding:'12px',borderRadius:10,border:regType==='doctor'?'2px solid #1DB97A':'2px solid rgba(255,255,255,0.2)',background:regType==='doctor'?'#1DB97A':'rgba(255,255,255,0.05)',color:'#fff',cursor:'pointer',fontWeight:600,fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                👨‍⚕️ Doctor / Clinic
              </button>
            </div>
            <Link to={'/register?type='+regType} style={{display:'block',background:'#fff',color:'#0a5c47',padding:'13px',borderRadius:10,fontSize:14,fontWeight:700,textDecoration:'none',textAlign:'center'}}>
              Register as {regType==='pharmacy'?'Pharmacy':'Doctor/Clinic'} — Free
            </Link>
          </div>
          <div className="hb" style={{display:'flex',gap:10,justifyContent:'center',maxWidth:360,margin:'0 auto'}}>
            <Link to="/login" style={{background:'rgba(255,255,255,0.1)',color:'#fff',padding:'11px 24px',borderRadius:24,fontSize:13,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.2)',flex:1,textAlign:'center'}}>
              Already registered? Login
            </Link>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{background:'#083d2c',padding:'20px 24px'}}>
        <div className="stats-g" style={{maxWidth:960,margin:'0 auto',display:'grid',gap:16,textAlign:'center'}}>
          {[['500+','Registered Members'],['3 Years','Trusted Since 2022'],['Haryana and Delhi','Service Region'],['Rs.0','Registration Fee']].map(([n,l])=>(
            <div key={l} style={{padding:'10px 0'}}>
              <div style={{fontSize:20,fontWeight:800,color:'#6ee7b7'}}>{n}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,0.45)',marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY JOIN */}
      <div className="sp" style={{padding:'64px 24px',background:'#fff'}}>
        <div style={{maxWidth:960,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div style={{fontSize:11,fontWeight:700,color:'#dc2626',letterSpacing:'2px',marginBottom:8}}>ARE YOU STILL OVERPAYING?</div>
            <h2 style={{fontSize:28,fontWeight:900,color:'#0a3d2e',marginBottom:12}}>Every day without SJ Medex is money lost</h2>
            <p style={{color:'#6b7280',fontSize:14,maxWidth:520,margin:'0 auto'}}>Pharmacies and doctors on SJ Medex save Rs.15,000 to Rs.40,000 per month vs local distributors.</p>
          </div>
          <div className="creds-g" style={{display:'grid',gap:20}}>
            {[
              {icon:'💸',title:'Save Rs.15K to Rs.40K per month',desc:'Our wholesale prices are 20 to 35% lower than local market rates. Every order saves significant money verified by our existing members.',bg:'#fff5f5',border:'#fecaca',badge:'TOP REASON TO JOIN'},
              {icon:'⚡',title:'Order in 30 Seconds',desc:'No phone calls, no waiting, no bargaining. Browse, add to cart, place order. We dispatch same day for orders placed before 2PM.',bg:'#f0fdf4',border:'#86efac',badge:'SAVES YOUR TIME'},
              {icon:'📄',title:'Proper GST Invoices',desc:'Every order includes a valid GST invoice. Claim input tax credit, maintain clean accounts, stay 100% compliant.',bg:'#eff6ff',border:'#93c5fd',badge:'STAY COMPLIANT'},
            ].map(c=>(
              <div key={c.title} style={{background:c.bg,border:'1px solid '+c.border,borderRadius:16,padding:24,position:'relative'}}>
                <div style={{position:'absolute',top:14,right:14,background:c.border,color:'#0a3d2e',fontSize:9,fontWeight:700,padding:'3px 8px',borderRadius:8}}>{c.badge}</div>
                <div style={{fontSize:32,marginBottom:12}}>{c.icon}</div>
                <div style={{fontWeight:700,fontSize:16,color:'#0a3d2e',marginBottom:8}}>{c.title}</div>
                <div style={{fontSize:13,color:'#6b7280',lineHeight:1.7}}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHO CAN JOIN */}
      <div className="sp" style={{padding:'64px 24px',background:'#f0fdf9'}}>
        <div style={{maxWidth:960,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:8}}>WHO CAN JOIN</div>
            <h2 style={{fontSize:28,fontWeight:800,color:'#0a3d2e'}}>Exclusive access for licensed professionals only</h2>
          </div>
          <div className="reg-g" style={{display:'grid',gap:20}}>
            <div style={{background:'#fff',borderRadius:18,padding:28,border:'2px solid #1DB97A',boxShadow:'0 8px 32px rgba(29,185,122,0.1)'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <div style={{width:52,height:52,background:'#e5f5ef',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:26}}>🏥</div>
                <div>
                  <div style={{fontWeight:800,fontSize:17,color:'#0a3d2e'}}>Pharmacy / Medical Store</div>
                  <div style={{fontSize:12,color:'#1DB97A',fontWeight:600}}>480+ active members</div>
                </div>
              </div>
              <p style={{fontSize:13,color:'#6b7280',lineHeight:1.7,marginBottom:16}}>Any retail or wholesale pharmacy with a valid Drug License. We manually verify your DL before activation.</p>
              <div style={{marginBottom:20}}>
                {['Valid Drug License Number','Mobile OTP verification','Shop name and address','GST number optional'].map(r=>(
                  <div key={r} style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'#374151',marginBottom:7}}>
                    <span style={{color:'#1DB97A',fontWeight:700,fontSize:15}}>✓</span>{r}
                  </div>
                ))}
              </div>
              <Link to="/register?type=pharmacy" style={{display:'block',background:'#0a5c47',color:'#fff',padding:'12px',borderRadius:10,fontSize:14,fontWeight:700,textDecoration:'none',textAlign:'center'}}>Register as Pharmacy</Link>
            </div>
            <div style={{background:'#fff',borderRadius:18,padding:28,border:'2px solid #3b82f6',boxShadow:'0 8px 32px rgba(59,130,246,0.08)'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <div style={{width:52,height:52,background:'#eff6ff',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:26}}>👨‍⚕️</div>
                <div>
                  <div style={{fontWeight:800,fontSize:17,color:'#0a3d2e'}}>Doctor / Clinic</div>
                  <div style={{fontSize:12,color:'#3b82f6',fontWeight:600}}>Now accepting registrations</div>
                </div>
              </div>
              <p style={{fontSize:13,color:'#6b7280',lineHeight:1.7,marginBottom:16}}>Licensed doctors and clinic owners can order medical supplies at wholesale rates. MCI/State Medical Council registration required.</p>
              <div style={{marginBottom:20}}>
                {['Doctor name or clinic name','MCI or State Council Reg. No.','Mobile OTP verification','Clinic address'].map(r=>(
                  <div key={r} style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'#374151',marginBottom:7}}>
                    <span style={{color:'#3b82f6',fontWeight:700,fontSize:15}}>✓</span>{r}
                  </div>
                ))}
              </div>
              <Link to="/register?type=doctor" style={{display:'block',background:'#2563eb',color:'#fff',padding:'12px',borderRadius:10,fontSize:14,fontWeight:700,textDecoration:'none',textAlign:'center'}}>Register as Doctor/Clinic</Link>
            </div>
          </div>
        </div>
      </div>

      {/* LICENSES */}
      <div className="sp" style={{padding:'64px 24px',background:'#fff'}}>
        <div style={{maxWidth:960,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:8}}>100% VERIFIED AND LICENSED</div>
            <h2 style={{fontSize:28,fontWeight:800,color:'#0a3d2e',marginBottom:8}}>We are fully government registered</h2>
            <p style={{color:'#6b7280',fontSize:14}}>Every license publicly verifiable. We have nothing to hide.</p>
          </div>
          <div className="trust-g" style={{display:'grid',gap:14,marginBottom:36}}>
            {[
              {icon:'🏛️',label:'GST Registered',value:'06CTDPS6578R1ZJ',sub:'Haryana Active',color:'#e5f5ef',border:'#86efac'},
              {icon:'🧾',label:'FSSAI Licensed',value:'20826004000806',sub:'Food Safety Valid',color:'#eff6ff',border:'#93c5fd'},
              {icon:'💊',label:'Drug License',value:'WLF20B2025HR001699',sub:'Retail and Wholesale',color:'#fefce8',border:'#fde047'},
              {icon:'📋',label:'PAN Verified',value:'CTDPS6578R',sub:'Income Tax Dept',color:'#fdf4ff',border:'#d8b4fe'},
            ].map(c=>(
              <div key={c.label} style={{background:c.color,border:'1px solid '+c.border,borderRadius:14,padding:18,position:'relative'}}>
                <div style={{position:'absolute',top:10,right:10,fontSize:9,fontWeight:700,color:'#15803d',background:'#dcfce7',padding:'2px 7px',borderRadius:8}}>VERIFIED</div>
                <div style={{fontSize:24,marginBottom:8}}>{c.icon}</div>
                <div style={{fontSize:10,color:'#6b7280',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:4}}>{c.label}</div>
                <div style={{fontFamily:'monospace',fontWeight:700,fontSize:12,color:'#0a3d2e',marginBottom:2}}>{c.value}</div>
                <div style={{fontSize:11,color:'#6b7280'}}>{c.sub}</div>
              </div>
            ))}
          </div>
          <div className="creds-g" style={{display:'grid',gap:16}}>
            {[
              {icon:'🔒',title:'Manual Verification of Every Member',desc:'Our team manually checks every Drug License or Medical Registration before approving. No fake accounts ever.'},
              {icon:'📦',title:'Direct from Licensed Distributor',desc:'SJ Medex is the licensed wholesale distributor. Products from authorized manufacturers with complete documentation.'},
              {icon:'📞',title:'Real People. Real Support.',desc:'Call +91 8595501653 or +91 7827170286. Real humans from our Faridabad office. Mon to Sat, 9AM to 6PM.'},
            ].map(t=>(
              <div key={t.title} style={{background:'#f8fffe',borderRadius:14,padding:22,border:'1px solid #d1fae5'}}>
                <div style={{fontSize:28,marginBottom:12}}>{t.icon}</div>
                <div style={{fontWeight:700,fontSize:15,color:'#0a3d2e',marginBottom:8}}>{t.title}</div>
                <div style={{fontSize:13,color:'#6b7280',lineHeight:1.7}}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="sp" style={{padding:'64px 24px',background:'#f0fdf9'}}>
        <div style={{maxWidth:960,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:8}}>WHAT OUR MEMBERS SAY</div>
            <h2 style={{fontSize:28,fontWeight:800,color:'#0a3d2e'}}>Trusted by pharmacies across Haryana</h2>
          </div>
          <div className="testi-g" style={{display:'grid',gap:16}}>
            {[
              {name:'Rakesh Sharma',role:'Sharma Medical Store, Faridabad',text:'Been ordering for 2 years. Prices are genuinely 25-30% lower than local suppliers. GST invoices make accounting so much easier.'},
              {name:'Dr. Priya Nair',role:'Nair Clinic, Ballabhagarh',text:'The verification process gave me confidence. Surgical supplies quality is excellent and delivery is always on time. Highly recommended.'},
              {name:'Amit Sinha',role:'HealthPlus Pharmacy, NIT Faridabad',text:'Saving Rs.18,000 every month since joining. The platform works perfectly and ordering takes less than 2 minutes.'},
            ].map(t=>(
              <div key={t.name} style={{background:'#fff',borderRadius:16,padding:22,border:'1px solid #d1fae5',boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}}>
                <div style={{display:'flex',gap:2,marginBottom:12}}>
                  {'★★★★★'.split('').map((s,i)=><span key={i} style={{color:'#f59e0b',fontSize:16}}>{s}</span>)}
                </div>
                <div style={{fontSize:13,color:'#374151',lineHeight:1.7,marginBottom:16,fontStyle:'italic'}}>"{t.text}"</div>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:36,height:36,background:'#e5f5ef',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:'#0a5c47',fontSize:14}}>{t.name[0]}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:'#0a3d2e'}}>{t.name}</div>
                    <div style={{fontSize:11,color:'#6b7280'}}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="sp" style={{padding:'64px 24px',background:'#fff'}}>
        <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:8}}>HOW IT WORKS</div>
          <h2 style={{fontSize:28,fontWeight:800,color:'#0a3d2e',marginBottom:10}}>Approved and ordering in under 24 hours</h2>
          <p style={{color:'#6b7280',marginBottom:40,fontSize:14}}>Zero fees. No contracts. Cancel anytime.</p>
          <div className="steps-g" style={{display:'grid',gap:20}}>
            {[
              {n:'01',icon:'📱',title:'Register with Mobile OTP',desc:'Sign up with your mobile. Choose pharmacy or doctor. Fill basic details in under 2 minutes.'},
              {n:'02',icon:'📄',title:'Upload Your License',desc:'Pharmacy: upload Drug License. Doctor: upload MCI registration. Verified within 24 hours.'},
              {n:'03',icon:'💰',title:'Order and Save Every Month',desc:'Browse 500+ products at wholesale rates. Place order, get free delivery with GST invoice.'},
            ].map(s=>(
              <div key={s.n} style={{background:'#f8fffe',borderRadius:16,padding:26,textAlign:'left',border:'1px solid #d1fae5',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:12,right:16,fontSize:48,fontWeight:900,color:'#d1fae5',lineHeight:1}}>{s.n}</div>
                <div style={{fontSize:32,marginBottom:14}}>{s.icon}</div>
                <div style={{fontWeight:700,fontSize:15,color:'#0a3d2e',marginBottom:8}}>{s.title}</div>
                <div style={{fontSize:13,color:'#6b7280',lineHeight:1.65}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div style={{background:'#0a5c47',padding:'36px 24px'}}>
        <div style={{maxWidth:960,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:20}}>
          <div>
            <div style={{color:'#fff',fontWeight:800,fontSize:18,marginBottom:6}}>Talk to us before registering</div>
            <div style={{color:'#6ee7b7',fontSize:13,lineHeight:1.8}}>
              📍 Rajeev Colony, Samaypur Road, Near Bansi School, Ballabhagarh, Faridabad 121004<br/>
              ✉️ sjmedex@gmail.com · Mon-Sat 9AM to 6PM
            </div>
          </div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <a href="tel:+918595501653" style={{background:'#fff',color:'#0a5c47',padding:'12px 22px',borderRadius:28,fontSize:14,fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',gap:6}}>📞 +91 85955 01653</a>
            <a href="tel:+917827170286" style={{background:'rgba(255,255,255,0.12)',color:'#fff',padding:'12px 22px',borderRadius:28,fontSize:14,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.25)',display:'flex',alignItems:'center',gap:6}}>📞 +91 78271 70286</a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="sp" style={{background:'linear-gradient(135deg,#064e3b,#0a5c47,#1DB97A)',padding:'64px 24px',textAlign:'center'}}>
        <div style={{maxWidth:540,margin:'0 auto'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#6ee7b7',letterSpacing:'2px',marginBottom:14}}>DO NOT LET YOUR COMPETITORS SAVE MORE</div>
          <h2 style={{fontSize:28,fontWeight:900,color:'#fff',marginBottom:12}}>Join 500+ pharmacies and doctors saving every month</h2>
          <p style={{color:'rgba(255,255,255,0.75)',fontSize:14,marginBottom:28,lineHeight:1.7}}>Every pharmacy in your area is comparing prices. The ones on SJ Medex are already saving Rs.15K+ per month.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/register?type=pharmacy" style={{background:'#fff',color:'#0a5c47',padding:'14px 28px',borderRadius:28,fontSize:14,fontWeight:700,textDecoration:'none'}}>🏥 Register as Pharmacy</Link>
            <Link to="/register?type=doctor" style={{background:'rgba(255,255,255,0.15)',color:'#fff',padding:'14px 28px',borderRadius:28,fontSize:14,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.3)'}}>👨‍⚕️ Register as Doctor</Link>
          </div>
          <div style={{marginTop:14,fontSize:12,color:'rgba(255,255,255,0.4)'}}>Free registration · No contracts · Approved in 24 hours</div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:'#071f17',padding:'40px 24px 24px'}}>
        <div className="foot-g" style={{maxWidth:960,margin:'0 auto',display:'grid',gap:32,marginBottom:32}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
              <Logo/>
              <div>
                <div style={{color:'#fff',fontWeight:800,fontSize:16}}>SJ Medex</div>
                <div style={{color:'#6ee7b7',fontSize:9,letterSpacing:'1px'}}>WHOLESALE MEDICAL PLATFORM</div>
              </div>
            </div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.45)',lineHeight:1.8}}>Rajeev Colony, Samaypur Road,<br/>Near Bansi School, Ballabhagarh<br/>Faridabad, Haryana 121004</div>
            <div style={{fontSize:12,color:'#6ee7b7',marginTop:8}}>sjmedex@gmail.com</div>
          </div>
          <div>
            <div style={{color:'#fff',fontWeight:600,fontSize:12,marginBottom:14,letterSpacing:'0.8px'}}>LEGAL AND REGISTRATION</div>
            {[['GSTIN','06CTDPS6578R1ZJ'],['PAN','CTDPS6578R'],['FSSAI','20826004000806'],['Drug License 1','WLF20B2025HR001699'],['Drug License 2','WLF21B2025HR001693']].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:11}}>
                <span style={{color:'rgba(255,255,255,0.35)'}}>{k}</span>
                <span style={{color:'#6ee7b7',fontFamily:'monospace'}}>{v}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{color:'#fff',fontWeight:600,fontSize:12,marginBottom:14,letterSpacing:'0.8px'}}>CONTACT AND SUPPORT</div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.45)',lineHeight:2.2}}>
              <div>📞 <a href="tel:+918595501653" style={{color:'#6ee7b7',textDecoration:'none'}}>+91 8595501653</a></div>
              <div>📞 <a href="tel:+917827170286" style={{color:'#6ee7b7',textDecoration:'none'}}>+91 7827170286</a></div>
              <div>✉️ <a href="mailto:sjmedex@gmail.com" style={{color:'#6ee7b7',textDecoration:'none'}}>sjmedex@gmail.com</a></div>
              <div style={{color:'rgba(255,255,255,0.3)',marginTop:4}}>Mon-Sat · 9AM to 6PM IST</div>
            </div>
          </div>
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:20,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <div style={{fontSize:11,color:'rgba(255,255,255,0.25)'}}>© 2025 SJ Medex. GST: 06CTDPS6578R1ZJ · All rights reserved.</div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            {['GST Registered','FSSAI Approved','Drug Licensed','Est. 2022'].map(b=>(
              <div key={b} style={{fontSize:10,color:'#6ee7b7',display:'flex',alignItems:'center',gap:4}}>
                <span style={{width:4,height:4,background:'#1DB97A',borderRadius:'50%',display:'inline-block'}}></span>{b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
