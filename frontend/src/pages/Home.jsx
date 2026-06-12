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
        .hero-title{font-size:44px}
        .stats-g{grid-template-columns:repeat(4,1fr)}
        .steps-g{grid-template-columns:repeat(3,1fr)}
        .feat-g{grid-template-columns:repeat(3,1fr)}
        .trust-g{grid-template-columns:repeat(4,1fr)}
        .creds-g{grid-template-columns:repeat(3,1fr)}
        .foot-g{grid-template-columns:repeat(3,1fr)}
        .testi-g{grid-template-columns:repeat(3,1fr)}
        .reg-type-g{grid-template-columns:1fr 1fr}
        @media(max-width:768px){
          .hero-title{font-size:26px!important}
          .stats-g,.trust-g{grid-template-columns:repeat(2,1fr)!important}
          .steps-g,.creds-g,.foot-g,.testi-g{grid-template-columns:1fr!important}
          .feat-g{grid-template-columns:repeat(2,1fr)!important}
          .hide-mob{display:none!important}
          .sp{padding:44px 16px!important}
          .call-bar-inner{flex-direction:column!important;gap:8px!important;text-align:center}
          .hero-btns{flex-direction:column!important}
          .hero-btns a,.hero-btns button{width:100%!important;text-align:center!important}
        }
        @media(max-width:480px){
          .feat-g{grid-template-columns:1fr!important}
          .reg-type-g{grid-template-columns:1fr!important}
        }
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .live-dot{animation:pulse 1.5s infinite}
        .fade-in{animation:fadeIn 0.6s ease}
      `}</style>

      {/* CALL BAR — Always on top */}
      <div style={{background:'#064e3b',padding:'8px 20px',position:'sticky',top:0,zIndex:200,boxShadow:'0 2px 8px rgba(0,0,0,0.3)'}}>
        <div className="call-bar-inner" style={{maxWidth:960,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:12,color:'#6ee7b7'}}>
            <span className="live-dot" style={{width:7,height:7,background:'#4ade80',borderRadius:'50%',display:'inline-block'}}></span>
            <span style={{fontWeight:600}}>Support Available · Mon–Sat 9AM–6PM</span>
            <span className="hide-mob" style={{color:'rgba(255,255,255,0.4)'}}>· Faridabad, Haryana</span>
          </div>
          <div style={{display:'flex',gap:10,alignItems:'center'}}>
            <a href="tel:+918595501653" style={{background:'#1DB97A',color:'#fff',padding:'6px 16px',borderRadius:20,fontSize:12,fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',gap:5,boxShadow:'0 2px 8px rgba(29,185,122,0.4)'}}>
              📞 +91 85955 01653
            </a>
            <a href="tel:+917827170286" style={{background:'rgba(255,255,255,0.1)',color:'#6ee7b7',padding:'6px 16px',borderRadius:20,fontSize:12,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.15)',display:'flex',alignItems:'center',gap:5}}>
              📞 +91 78271 70286
            </a>
            <a href="mailto:sjmedex@gmail.com" className="hide-mob" style={{color:'rgba(255,255,255,0.4)',fontSize:11,textDecoration:'none'}}>✉️ sjmedex@gmail.com</a>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav style={{background:'#0a5c47',padding:'11px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 1px 8px rgba(0,0,0,0.15)',position:'sticky',top:42,zIndex:199}}>
        <div style={{display:'flex',alignItems:'center',gap:9}}>
          <Logo/>
          <div>
            <div style={{color:'#fff',fontWeight:800,fontSize:17,letterSpacing:'-0.4px',lineHeight:1.1}}>SJ Medex</div>
            <div style={{color:'#6ee7b7',fontSize:9,letterSpacing:'1px',fontWeight:600}} className="hide-mob">WHOLESALE MEDICAL PLATFORM</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <Link to="/login" className="hide-mob" style={{color:'#6ee7b7',fontSize:13,textDecoration:'none',fontWeight:500}}>Login</Link>
          <Link to="/register" style={{background:'#1DB97A',color:'#fff',padding:'8px 20px',borderRadius:20,fontSize:13,fontWeight:700,textDecoration:'none',boxShadow:'0 2px 10px rgba(29,185,122,0.4)'}}>Register Free</Link>
          <Link to="/admin/login" className="hide-mob" style={{color:'rgba(255,255,255,0.25)',fontSize:11,textDecoration:'none'}}>Admin</Link>
        </div>
      </nav>

      {/* VERIFIED RIBBON */}
      <div style={{background:'#052e16',padding:'7px 20px',overflowX:'auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:24,flexWrap:'nowrap',minWidth:'max-content',margin:'0 auto'}}>
          {[
            {icon:'🏛️',text:'GSTIN: 06CTDPS6578R1ZJ'},
            {icon:'🧾',text:'FSSAI: 20826004000806'},
            {icon:'💊',text:'DL No: WLF20B2025HR001699'},
            {icon:'📋',text:'PAN: CTDPS6578R'},
            {icon:'📅',text:'Est. 2022 · 3 Years'},
          ].map(b=>(
            <div key={b.text} style={{display:'flex',alignItems:'center',gap:5,fontSize:10,color:'#6ee7b7',fontWeight:500,whiteSpace:'nowrap'}}>
              <span>{b.icon}</span><span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div className="sp" style={{background:'linear-gradient(135deg,#0a5c47 0%,#0d7a5f 55%,#1DB97A 100%)',padding:'68px 24px 84px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-100,right:-100,width:350,height:350,background:'rgba(255,255,255,0.03)',borderRadius:'50%'}}/>
        <div style={{position:'absolute',bottom:-80,left:-80,width:280,height:280,background:'rgba(255,255,255,0.03)',borderRadius:'50%'}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:640,margin:'0 auto'}}>

          {/* LIVE SAVINGS COUNTER */}
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(0,0,0,0.2)',backdropFilter:'blur(10px)',padding:'8px 18px',borderRadius:24,marginBottom:20,border:'1px solid rgba(255,255,255,0.1)'}}>
            <span className="live-dot" style={{width:7,height:7,background:'#4ade80',borderRadius:'50%',display:'inline-block'}}></span>
            <span style={{color:'#6ee7b7',fontSize:12,fontWeight:600}}>Pharmacies saved ₹{savings.toLocaleString('en-IN')} today on SJ Medex</span>
          </div>

          <h1 className="hero-title" style={{fontWeight:900,color:'#fff',lineHeight:1.1,marginBottom:16,letterSpacing:'-1.5px'}}>
            Stop Overpaying.<br/><span style={{color:'#6ee7b7'}}>Start Saving Today.</span>
          </h1>
          <p style={{fontSize:15,color:'rgba(255,255,255,0.85)',lineHeight:1.8,marginBottom:10,maxWidth:520,margin:'0 auto 10px'}}>
            Haryana's most trusted wholesale medical distributor — serving pharmacies & doctors since 2022. GST registered, FSSAI approved, Drug Licensed.
          </p>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.55)',marginBottom:32}}>📍 Ballabhagarh, Faridabad · Serving Delhi NCR & Haryana</p>

          {/* REGISTER TYPE SELECTOR */}
          <div style={{background:'rgba(0,0,0,0.2)',borderRadius:16,padding:20,marginBottom:24,maxWidth:480,margin:'0 auto 24px',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)'}}>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.6)',marginBottom:12,fontWeight:600}}>I WANT TO REGISTER AS</div>
            <div className="reg-type-g" style={{display:'grid',gap:10,marginBottom:16}}>
              <button onClick={()=>setRegType('pharmacy')} style={{padding:'12px',borderRadius:10,border:`2px solid ${regType==='pharmacy'?'#1DB97A':'rgba(255,255,255,0.2)'}`,background:regType==='pharmacy'?'#1DB97A':'rgba(255,255,255,0.05)',color:'#fff',cursor:'pointer',fontWeight:600,fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                🏥 Pharmacy / Medical Store
              </button>
              <button onClick={()=>setRegType('doctor')} style={{padding:'12px',borderRadius:10,border:`2px solid ${regType==='doctor'?'#1DB97A':'rgba(255,255,255,0.2)'}`,background:regType==='doctor'?'#1DB97A':'rgba(255,255,255,0.05)',color:'#fff',cursor:'pointer',fontWeight:600,fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                👨‍⚕️ Doctor / Clinic
              </button>
            </div>
            <Link to={`/register?type=${regType}`} style={{display:'block',background:'#fff',color:'#0a5c47',padding:'13px',borderRadius:10,fontSize:14,fontWeight:700,textDecoration:'none',textAlign:'center',boxShadow:'0 4px 16px rgba(0,0,0,0.2)'}}>
              Register as {regType==='pharmacy'?'Pharmacy':'Doctor/Clinic'} — Free →
            </Link>
          </div>

          <div className="hero-btns" style={{display:'flex',gap:10,justifyContent:'center',maxWidth:380,margin:'0 auto'}}>
            <Link to="/login" style={{background:'rgba(255,255,255,0.1)',color:'#fff',padding:'11px 24px',borderRadius:24,fontSize:13,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.2)',flex:1,textAlign:'center'}}>
              Already registered? Login →
            </Link>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{background:'#083d2c',padding:'20px 24px'}}>
        <div className="stats-g" style={{maxWidth:960,margin:'0 auto',display:'grid',gap:16,textAlign:'center'}}>
          {[['500+','Registered Members'],['3 Years','Trusted Since 2022'],['Haryana & Delhi','Service Region'],['₹0','Registration Fee']].map(([n,l])=>(
            <div key={l} style={{padding:'10px 0'}}>
              <div style={{fontSize:20,fontWeight:800,color:'#6ee7b7'}}>{n}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,0.45)',marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY JOIN — URGENCY SECTION */}
      <div className="sp" style={{padding:'64px 24px',background:'#fff'}}>
        <div style={{maxWidth:960,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div style={{fontSize:11,fontWeight:700,color:'#dc2626',letterSpacing:'2px',marginBottom:8}}>⚠️ ARE YOU STILL OVERPAYING?</div>
            <h2 style={{fontSize:30,fontWeight:900,color:'#0a3d2e',letterSpacing:'-0.5px',marginBottom:12}}>Every day without SJ Medex<br/>is money left on the table</h2>
            <p style={{color:'#6b7280',fontSize:14,maxWidth:520,margin:'0 auto'}}>Pharmacies and doctors on SJ Medex save an average of ₹15,000–₹40,000 per month compared to local distributors.</p>
          </div>
          <div className="creds-g" style={{display:'grid',gap:20}}>
            {[
              {icon:'💸',title:'Save ₹15K–₹40K/month',desc:'Our wholesale prices are 20–35% lower than local market rates. Every order saves you significant money — verified by our existing members.',bg:'#fff5f5',border:'#fecaca',badge:'MOST POPULAR REASON'},
              {icon:'⚡',title:'Order in 30 Seconds',desc:'No phone calls, no waiting, no bargaining. Browse products, add to cart, place order. Done. We dispatch the same day for orders before 2PM.',bg:'#f0fdf4',border:'#86efac',badge:'SAVES YOUR TIME'},
              {icon:'📄',title:'Proper GST Invoices',desc:'Every order includes a valid GST invoice. Maintain perfect accounts, claim input tax credit, and stay 100% compliant — no black market hassle.',bg:'#eff6ff',border:'#93c5fd',badge:'STAY COMPLIANT'},
            ].map(c=>(
              <div key={c.title} style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:16,padding:24,position:'relative'}}>
                <div style={{position:'absolute',top:16,right:16,background:c.border,color:'#0a3d2e',fontSize:9,fontWeight:700,padding:'3px 8px',borderRadius:8,letterSpacing:'0.5px'}}>{c.badge}</div>
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
            <h2 style={{fontSize:28,fontWeight:800,color:'#0a3d2e',letterSpacing:'-0.5px'}}>Exclusive access for licensed professionals only</h2>
          </div>
          <div className="reg-type-g" style={{display:'grid',gap:20}}>
            {/* PHARMACY CARD */}
            <div style={{background:'#fff',borderRadius:18,padding:28,border:'2px solid #1DB97A',boxShadow:'0 8px 32px rgba(29,185,122,0.12)'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <div style={{width:52,height:52,background:'#e5f5ef',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:26}}>🏥</div>
                <div>
                  <div style={{fontWeight:800,fontSize:18,color:'#0a3d2e'}}>Pharmacy / Medical Store</div>
                  <div style={{fontSize:12,color:'#1DB97A',fontWeight:600}}>Most common · 480+ members</div>
                </div>
              </div>
              <div style={{fontSize:13,color:'#6b7280',lineHeight:1.7,marginBottom:16}}>Any retail or wholesale pharmacy with a valid Drug License can register. We verify your DL number before activation.</div>
              <div style={{marginBottom:20}}>
                {['Valid Drug License (DL No.)', 'Mobile number for OTP', 'Shop name & address', 'GST number (optional)'].map(r=>(
                  <div key={r} style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'#374151',marginBottom:6}}>
                    <span style={{color:'#1DB97A',fontWeight:700}}>✓</span>{r}
                  </div>
                ))}
              </div>
              <Link to="/register?type=pharmacy" style={{display:'block',background:'#0a5c47',color:'#fff',padding:'12px',borderRadius:10,fontSize:14,fontWeight:700,textDecoration:'none',textAlign:'center'}}>Register as Pharmacy →</Link>
            </div>

            {/* DOCTOR CARD */}
            <div style={{background:'#fff',borderRadius:18,padding:28,border:'2px solid #3b82f6',boxShadow:'0 8px 32px rgba(59,130,246,0.1)'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <div style={{width:52,height:52,background:'#eff6ff',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:26}}>👨‍⚕️</div>
                <div>
                  <div style={{fontWeight:800,fontSize:18,color:'#0a3d2e'}}>Doctor / Clinic</div>
                  <div style={{fontSize:12,color:'#3b82f6',fontWeight:600}}>New · Accepting registrations</div>
                </div>
              </div>
              <div style={{fontSize:13,color:'#6b7280',lineHeight:1.7,marginBottom:16}}>Licensed doctors and clinic owners can order medical supplies directly at wholesale rates. MCI/State Medical Council registration required.</div>
              <div style={{marginBottom:20}}>
                {['Doctor name or clinic name', 'MCI / State Council Reg. No.', 'Mobile number for OTP', 'Clinic address'].map(r=>(
                  <div key={r} style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'#374151',marginBottom:6}}>
                    <span style={{color:'#3b82f6',fontWeight:700}}>✓</span>{r}
                  </div>
                ))}
              </div>
              <Link to="/register?type=doctor" style={{display:'block',background:'#2563eb',color:'#fff',padding:'12px',borderRadius:10,fontSize:14,fontWeight:700,textDecoration:'none',textAlign:'center'}}>Register as Doctor/Clinic →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST / LICENSES */}
      <div className="sp" style={{padding:'64px 24px',background:'#fff'}}>
        <div style={{maxWidth:960,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:8}}>100% VERIFIED & LICENSED</div>
            <h2 style={{fontSize:28,fontWeight:800,color:'#0a3d2e',letterSpacing:'-0.5px',marginBottom:8}}>We are fully government registered</h2>
            <p style={{color:'#6b7280',fontSize:14}}>Every license publicly verifiable. We have nothing to hide.</p>
          </div>
          <div className="trust-g" style={{display:'grid',gap:14,marginBottom:36}}>
            {[
              {icon:'🏛️',label:'GST Registered',value:'06CTDPS6578R1ZJ',sub:'Haryana · Active',color:'#e5f5ef',border:'#86efac'},
              {icon:'🧾',label:'FSSAI Licensed',value:'20826004000806',sub:'Food Safety · Valid',color:'#eff6ff',border:'#93c5fd'},
              {icon:'💊',label:'Drug License',value:'WLF20B2025HR001699',sub:'Retail + Wholesale',color:'#fefce8',border:'#fde047'},
              {icon:'📋',label:'PAN Verified',value:'CTDPS6578R',sub:'Income Tax Dept.',color:'#fdf4ff',border:'#d8b4fe'},
            ].map(c=>(
              <div key={c.label} style={{background:c.color,border:`1px solid ${c.border}`,borderRadius:14,padding:18,position:'relative'}}>
                <div style={{position:'absolute',top:10,right:10,fontSize:9,fontWeight:700,color:'#15803d',background:'#dcfce7',padding:'2px 7px',borderRadius:8}}>✓ VERIFIED</div>
                <div style={{fontSize:24,marginBottom:8}}>{c.icon}</div>
                <div style={{fontSize:10,color:'#6b7280',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:4}}>{c.label}</div>
                <div style={{fontFamily:'monospace',fontWeight:700,fontSize:12,color:'#0a3d2e',marginBottom:2}}>{c.value}</div>
                <div style={{fontSize:11,color:'#6b7280'}}>{c.sub}</div>
              </div>
            ))}
          </div>

          {/* TRUST POINTS */}
          <div className="creds-g" style={{display:'grid',gap:16}}>
            {[
              {icon:'🔒',title:'Manual Verification of Every Member',desc:'Our team manually checks every Drug License or Medical Registration before approving. No fake pharmacies, no unauthorized access — ever.'},
              {icon:'📦',title:'Direct from Licensed Distributor',desc:'SJ Medex is the licensed wholesale distributor. Products sourced directly from authorized manufacturers with complete documentation.'},
              {icon:'📞',title:'Real People. Real Support.',desc:'Call +91 8595501653 or +91 7827170286. Talk to a real person from our Faridabad office. Monday to Saturday, 9AM–6PM.'},
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
            <h2 style={{fontSize:28,fontWeight:800,color:'#0a3d2e',letterSpacing:'-0.5px'}}>Trusted by pharmacies across Haryana</h2>
          </div>
          <div className="testi-g" style={{display:'grid',gap:16}}>
            {[
              {name:'Rakesh Sharma',role:'Sharma Medical Store, Faridabad',text:'Been ordering from SJ Medex for 2 years. Prices are genuinely 25-30% lower than local suppliers. The GST invoices make accounting so much easier.',stars:5},
              {name:'Dr. Priya Nair',role:'Nair Clinic, Ballabhagarh',text:'As a doctor I was skeptical at first but the verification process gave me confidence. Surgical supplies quality is excellent and delivery is always on time.',stars:5},
              {name:'Amit Sinha',role:'HealthPlus Pharmacy, NIT Faridabad',text:'Saving ₹18,000 every month since joining. The mobile app works perfectly and ordering takes less than 2 minutes. Highly recommended.',stars:5},
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
          <h2 style={{fontSize:28,fontWeight:800,color:'#0a3d2e',marginBottom:10,letterSpacing:'-0.5px'}}>Approved & ordering in under 24 hours</h2>
          <p style={{color:'#6b7280',marginBottom:40,fontSize:14}}>Zero fees · No contracts · Cancel anytime</p>
          <div className="steps-g" style={{display:'grid',gap:20}}>
            {[
              {n:'01',icon:'📱',title:'Register with Mobile OTP',desc:'Sign up using your mobile number. Choose pharmacy or doctor. Fill basic details in under 2 minutes.'},
              {n:'02',icon:'📄',title:'Upload Your License',desc:'Pharmacy: upload Drug License. Doctor: upload MCI/Council registration. We verify manually within 24 hours.'},
              {n:'03',icon:'💰',title:'Order & Save Every Month',desc:'Browse 500+ products at wholesale rates. Add to cart, place order, get free delivery. GST invoice included.'},
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
            <div style={{color:'#fff',fontWeight:800,fontSize:20,marginBottom:6}}>Talk to us before registering</div>
            <div style={{color:'#6ee7b7',fontSize:13,lineHeight:1.8}}>
              📍 Rajeev Colony, Samaypur Road, Near Bansi School, Ballabhagarh, Faridabad — 121004<br/>
              ✉️ sjmedex@gmail.com · Mon–Sat 9AM to 6PM
            </div>
          </div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <a href="tel:+918595501653" style={{background:'#fff',color:'#0a5c47',padding:'12px 24px',borderRadius:28,fontSize:14,fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',gap:6,boxShadow:'0 4px 16px rgba(0,0,0,0.15)'}}>📞 +91 85955 01653</a>
            <a href="tel:+917827170286" style={{background:'rgba(255,255,255,0.12)',color:'#fff',padding:'12px 24px',borderRadius:28,fontSize:14,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.25)',display:'flex',alignItems:'center',gap:6}}>📞 +91 78271 70286</a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="sp" style={{background:'linear-gradient(135deg,#064e3b,#0a5c47,#1DB97A)',padding:'64px 24px',textAlign:'center'}}>
        <div style={{maxWidth:540,margin:'0 auto'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#6ee7b7',letterSpacing:'2px',marginBottom:14}}>🔥 LIMITED SLOTS AVAILABLE THIS MONTH</div>
          <h2 style={{fontSize:30,fontWeight:900,color:'#fff',marginBottom:12,letterSpacing:'-0.5px'}}>Don't let your competitors save more than you</h2>
          <p style={{color:'rgba(255,255,255,0.75)',fontSize:14,marginBottom:28,lineHeight:1.7}}>Every pharmacy and doctor in your area is comparing prices. The ones on SJ Medex are already saving ₹15K+ per month. Join them today.</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/register?type=pharmacy" style={{background:'#fff',color:'#0a5c47',padding:'14px 28px',borderRadius:28,fontSize:14,fontWeight:700,textDecoration:'none',boxShadow:'0 4px 20px rgba(0,0,0,0.2)'}}>🏥 Register as Pharmacy</Link>
            <Link to="/register?type=doctor" style={{background:'rgba(255,255,255,0.15)',color:'#fff',padding:'14px 28px',borderRadius:28,fontSize:14,fontWeight:600,textDecoration:'none',border:'1px solid rgba(255,255,255,0.3)'}}>👨‍⚕️ Register as Doctor</Link>
          </div>
          <div style={{marginTop:16,fontSize:12,color:'rgba(255,255,255,0.45)'}}>Free registration · No contracts · Approved in 24 hours</div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:'#071f17',padding:'40px 24px 24px'}}>
        <div className="foot-g" style={{maxWidth:960,margin:'0 auto',display:'grid',gap:32,marginBottom:32}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
              <Logo/><div><div style={{color:'#fff',fontWeight:800,fontSize:16}}>SJ Medex</div><div style={{color:'#6ee7b7',fontSize:9,letterSpacing:'1px'}}>WHOLESALE MEDICAL PLATFORM</div></div>
            </div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.45)',lineHeight:1.8}}>Rajeev Colony, Samaypur Road,<br/>Near Bansi School, Ballabhagarh<br/>Faridabad, Haryana — 121004</div>
            <div style={{fontSize:12,color:'#6ee7b7',marginTop:8}}>sjmedex@gmail.com</div>
          </div>
          <div>
            <div style={{color:'#fff',fontWeight:600,fontSize:12,marginBottom:14,letterSpacing:'0.8px'}}>LEGAL & REGISTRATION</div>
            {[['GSTIN','06CTDPS6578R1ZJ'],['PAN','CTDPS6578R'],['FSSAI','20826004000806'],['Drug License','WLF20B2025HR001699'],['Drug License 2','WLF21B2025HR001693']].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:11}}>
                <span style={{color:'rgba(255,255,255,0.35)'}}>{k}</span>
                <span style={{color:'#6ee7b7',fontFamily:'monospace'}}>{v}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{color:'#fff',fontWeight:600,fontSize:12,marginBottom:14,letterSpacing:'0.8px'}}>CONTACT & SUPPORT</div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.45)',lineHeight:2.2}}>
              <div>📞 <a href="tel:+918595501653" style={{color:'#6ee7b7',textDecoration:'none'}}>+91 8595501653</a></div>
              <div>📞 <a href="tel:+917827170286" style={{color:'#6ee7b7',textDecoration:'none'}}>+91 7827170286</a></div>
              <div>✉️ <a href="mailto:sjmedex@gmail.com" style={{color:'#6ee7b7',textDecoration:'none'}}>sjmedex@gmail.com</a></div>
              <div style={{color:'rgba(255,255,255,0.3)',marginTop:4}}>Mon–Sat · 9AM to 6PM IST</div>
            </div>
          </div>
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:20,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <div style={{fontSize:11,color:'rgba(255,255,255,0.25)'}}>© 2025 SJ Medex. GST: 06CTDPS6578R1ZJ · All rights reserved.</div>
          <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
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
ENDOFFILEcat > ~/workspace/frontend/src/pages/Register.jsx << 'ENDOFFILE'
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

const STEPS = ['Verify Mobile','Your Details','Documents','Done'];

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 38 38" fill="none">
    <rect width="38" height="38" rx="10" fill="#1DB97A"/>
    <rect x="17" y="6" width="4" height="26" rx="2" fill="white"/>
    <rect x="6" y="17" width="26" height="4" rx="2" fill="white"/>
  </svg>
);

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const prefill = location.state || {};

  const [regType, setRegType] = useState(params.get('type') || 'pharmacy');
  const [step, setStep] = useState(prefill.verified ? 1 : 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [mobile, setMobile] = useState(prefill.mobile || '');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [form, setForm] = useState({name:'',owner_name:'',email:'',address:'',registration_number:'',specialization:''});
  const [license, setLicense] = useState({drug_license_number:'',drug_license_expiry:'',file:null});

  function setF(k,v){setForm(f=>({...f,[k]:v}));}
  function setL(k,v){setLicense(l=>({...l,[k]:v}));}

  async function sendOTP() {
    if(mobile.length!==10) return setError('Enter valid 10-digit mobile number');
    setLoading(true);setError('');
    try {
      const res = await api.post('/auth/send-otp',{mobile});
      if(res.data.dev_otp) setDevOtp(res.data.dev_otp);
      setOtpSent(true);
    } catch(err){setError(err.response?.data?.error||'Failed to send OTP');}
    finally{setLoading(false);}
  }

  async function verifyOTP() {
    if(otp.length!==4) return setError('Enter 4-digit OTP');
    setLoading(true);setError('');
    try {
      await api.post('/auth/verify-otp',{mobile,otp});
      setStep(1);
    } catch(err){setError(err.response?.data?.error||'Invalid OTP');}
    finally{setLoading(false);}
  }

  async function submitRegistration() {
    if(regType==='pharmacy' && !license.drug_license_number) return setError('Drug License Number is required');
    if(regType==='doctor' && !form.registration_number) return setError('Registration number is required');
    setLoading(true);setError('');
    try {
      const data = new FormData();
      data.append('mobile', mobile);
      data.append('reg_type', regType);
      data.append('pharmacy_name', form.name);
      data.append('owner_name', form.owner_name);
      data.append('email', form.email);
      data.append('address', form.address);
      if(regType==='pharmacy'){
        data.append('drug_license_number', license.drug_license_number);
        data.append('drug_license_expiry', license.drug_license_expiry);
      } else {
        data.append('drug_license_number', form.registration_number);
        data.append('specialization', form.specialization);
      }
      if(license.file) data.append('drug_license_photo', license.file);
      await api.post('/pharmacy/register', data, {headers:{'Content-Type':'multipart/form-data'}});
      setStep(3);
    } catch(err){setError(err.response?.data?.error||'Registration failed');}
    finally{setLoading(false);}
  }

  const isPharmacy = regType === 'pharmacy';
  const accentColor = isPharmacy ? '#0a5c47' : '#2563eb';
  const accentLight = isPharmacy ? '#e5f5ef' : '#eff6ff';

  return (
    <div style={{minHeight:'100vh',background:'#f9fafb',padding:'24px 16px',fontFamily:'Inter,sans-serif'}}>
      <style>{`*{box-sizing:border-box}`}</style>
      <div style={{maxWidth:520,margin:'0 auto'}}>

        {/* HEADER */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <Link to="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <Logo/>
            <div>
              <div style={{fontWeight:800,fontSize:16,color:'#0a5c47'}}>SJ Medex</div>
              <div style={{fontSize:9,color:'#6b7280',letterSpacing:'0.5px'}}>WHOLESALE MEDICAL PLATFORM</div>
            </div>
          </Link>
          <Link to="/login" style={{fontSize:13,color:'#6b7280',textDecoration:'none'}}>Already registered? Login →</Link>
        </div>

        {/* TYPE SELECTOR — only on step 0 */}
        {step === 0 && (
          <div style={{background:'#fff',borderRadius:14,padding:16,marginBottom:16,border:'1px solid #e5e7eb'}}>
            <div style={{fontSize:11,fontWeight:700,color:'#6b7280',letterSpacing:'1px',marginBottom:10}}>I AM REGISTERING AS</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <button onClick={()=>setRegType('pharmacy')} style={{padding:'12px 8px',borderRadius:10,border:`2px solid ${isPharmacy?'#0a5c47':'#e5e7eb'}`,background:isPharmacy?'#e5f5ef':'#fff',cursor:'pointer',fontWeight:600,fontSize:13,color:isPharmacy?'#0a5c47':'#6b7280',display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
                🏥 Pharmacy
              </button>
              <button onClick={()=>setRegType('doctor')} style={{padding:'12px 8px',borderRadius:10,border:`2px solid ${!isPharmacy?'#2563eb':'#e5e7eb'}`,background:!isPharmacy?'#eff6ff':'#fff',cursor:'pointer',fontWeight:600,fontSize:13,color:!isPharmacy?'#2563eb':'#6b7280',display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
                👨‍⚕️ Doctor / Clinic
              </button>
            </div>
          </div>
        )}

        {/* STEPS */}
        <div style={{display:'flex',marginBottom:24}}>
          {STEPS.map((s,i)=>(
            <div key={s} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',position:'relative'}}>
              {i<STEPS.length-1&&<div style={{position:'absolute',top:13,left:'60%',width:'80%',height:1,background:i<step?accentColor:'#e5e7eb'}}/>}
              <div style={{width:26,height:26,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,zIndex:1,background:i<step?accentColor:i===step?accentColor:'#fff',color:i<=step?'#fff':'#9ca3af',border:`1.5px solid ${i<=step?accentColor:'#e5e7eb'}`}}>
                {i<step?'✓':i+1}
              </div>
              <div style={{fontSize:9,color:i===step?accentColor:'#9ca3af',marginTop:5,textAlign:'center',fontWeight:i===step?700:400}}>{s}</div>
            </div>
          ))}
        </div>

        {error&&<div style={{background:'#fee2e2',color:'#dc2626',padding:'10px 14px',borderRadius:8,fontSize:13,marginBottom:14}}>{error}</div>}

        {/* STEP 0: MOBILE */}
        {step===0&&(
          <div style={{background:'#fff',borderRadius:14,padding:24,border:'1px solid #e5e7eb'}}>
            <div style={{fontWeight:700,fontSize:17,marginBottom:4}}>Verify your mobile</div>
            <p style={{color:'#6b7280',fontSize:13,marginBottom:20}}>This will be your login ID for SJ Medex</p>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6,letterSpacing:'0.5px'}}>MOBILE NUMBER</label>
              <div style={{display:'flex',gap:8}}>
                <div style={{padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:14,color:'#6b7280',whiteSpace:'nowrap',background:'#f9fafb'}}>+91</div>
                <input style={{flex:1,padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:14,outline:'none'}} type="tel" maxLength={10} placeholder="9XXXXXXXXX" value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,''))} />
              </div>
            </div>
            {otpSent&&(
              <div style={{marginBottom:16}}>
                <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6,letterSpacing:'0.5px'}}>ENTER OTP</label>
                <input style={{width:'100%',padding:'12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:22,textAlign:'center',letterSpacing:12,outline:'none',fontWeight:700}} type="number" maxLength={4} placeholder="——" value={otp} onChange={e=>setOtp(e.target.value.slice(0,4))} autoFocus />
                {devOtp&&<div style={{background:'#e5f5ef',borderRadius:6,padding:'7px 12px',fontSize:12,color:'#0a5c47',marginTop:8}}><strong>Dev OTP:</strong> {devOtp}</div>}
              </div>
            )}
            <button onClick={otpSent?verifyOTP:sendOTP} disabled={loading} style={{width:'100%',padding:'12px',background:accentColor,color:'#fff',border:'none',borderRadius:8,fontSize:14,fontWeight:700,cursor:'pointer'}}>
              {loading?'Please wait...':(otpSent?'Verify OTP & Continue':'Send OTP')}
            </button>
            <p style={{textAlign:'center',fontSize:12,color:'#9ca3af',marginTop:14}}>Already registered? <Link to="/login" style={{color:accentColor}}>Login here</Link></p>
          </div>
        )}

        {/* STEP 1: DETAILS */}
        {step===1&&(
          <div style={{background:'#fff',borderRadius:14,padding:24,border:'1px solid #e5e7eb'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20,padding:'12px 16px',background:accentLight,borderRadius:10,border:`1px solid ${isPharmacy?'#86efac':'#93c5fd'}`}}>
              <span style={{fontSize:24}}>{isPharmacy?'🏥':'👨‍⚕️'}</span>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:isPharmacy?'#0a5c47':'#1d4ed8'}}>{isPharmacy?'Pharmacy Registration':'Doctor / Clinic Registration'}</div>
                <div style={{fontSize:11,color:'#6b7280'}}>Mobile: +91 {mobile} · Verified ✓</div>
              </div>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>{isPharmacy?'PHARMACY / SHOP NAME *':'DOCTOR NAME / CLINIC NAME *'}</label>
              <input style={{width:'100%',padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:14,outline:'none'}} placeholder={isPharmacy?'e.g. Sharma Medical Store':'e.g. Dr. Priya Nair / Nair Clinic'} value={form.name} onChange={e=>setF('name',e.target.value)} />
            </div>
            {isPharmacy&&(
              <div style={{marginBottom:14}}>
                <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>OWNER / PROPRIETOR NAME *</label>
                <input style={{width:'100%',padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:14,outline:'none'}} placeholder="Full legal name" value={form.owner_name} onChange={e=>setF('owner_name',e.target.value)} />
              </div>
            )}
            {!isPharmacy&&(
              <div style={{marginBottom:14}}>
                <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>SPECIALIZATION</label>
                <input style={{width:'100%',padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:14,outline:'none'}} placeholder="e.g. General Physician, Pediatrician" value={form.specialization} onChange={e=>setF('specialization',e.target.value)} />
              </div>
            )}
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>FULL ADDRESS *</label>
              <textarea style={{width:'100%',padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:14,outline:'none',resize:'vertical'}} rows={2} placeholder={isPharmacy?'Shop address with city & pincode':'Clinic address with city & pincode'} value={form.address} onChange={e=>setF('address',e.target.value)} />
            </div>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>EMAIL (OPTIONAL)</label>
              <input style={{width:'100%',padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:14,outline:'none'}} type="email" placeholder="For order notifications" value={form.email} onChange={e=>setF('email',e.target.value)} />
            </div>
            <button onClick={()=>{if(!form.name||!form.address) return setError('Name and address are required');setError('');setStep(2);}} style={{width:'100%',padding:'12px',background:accentColor,color:'#fff',border:'none',borderRadius:8,fontSize:14,fontWeight:700,cursor:'pointer',marginBottom:8}}>Continue →</button>
            <button onClick={()=>setStep(0)} style={{width:'100%',padding:'10px',background:'transparent',color:'#6b7280',border:'1px solid #e5e7eb',borderRadius:8,fontSize:13,cursor:'pointer'}}>← Back</button>
          </div>
        )}

        {/* STEP 2: DOCUMENTS */}
        {step===2&&(
          <div style={{background:'#fff',borderRadius:14,padding:24,border:'1px solid #e5e7eb'}}>
            <div style={{fontWeight:700,fontSize:17,marginBottom:4}}>{isPharmacy?'Drug License Details':'Registration Certificate'}</div>
            <p style={{color:'#6b7280',fontSize:13,marginBottom:20}}>Required to verify your {isPharmacy?'pharmacy':'credentials'} — we check every registration manually.</p>

            {isPharmacy?(
              <>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>DRUG LICENSE NUMBER *</label>
                  <input style={{width:'100%',padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:14,outline:'none',fontFamily:'monospace'}} placeholder="e.g. DL/HR/2021/XXXXX" value={license.drug_license_number} onChange={e=>setL('drug_license_number',e.target.value)} />
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>LICENSE EXPIRY DATE</label>
                  <input style={{width:'100%',padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:14,outline:'none'}} type="date" value={license.drug_license_expiry} onChange={e=>setL('drug_license_expiry',e.target.value)} />
                </div>
              </>
            ):(
              <div style={{marginBottom:14}}>
                <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>MCI / STATE COUNCIL REGISTRATION NUMBER *</label>
                <input style={{width:'100%',padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:14,outline:'none',fontFamily:'monospace'}} placeholder="e.g. MCI/HR/2015/XXXXX" value={form.registration_number} onChange={e=>setF('registration_number',e.target.value)} />
                <div style={{fontSize:11,color:'#6b7280',marginTop:5}}>Medical Council of India or State Medical Council registration number</div>
              </div>
            )}

            <div style={{marginBottom:16}}>
              <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>UPLOAD {isPharmacy?'DRUG LICENSE':'REGISTRATION CERTIFICATE'} PHOTO</label>
              <label style={{display:'block',border:`2px dashed ${license.file?'#86efac':'#e5e7eb'}`,borderRadius:10,padding:20,textAlign:'center',cursor:'pointer',background:license.file?'#f0fdf4':'#f9fafb'}}>
                {license.file?(
                  <div style={{color:'#15803d',fontWeight:600,fontSize:13}}>✓ {license.file.name}</div>
                ):(
                  <div>
                    <div style={{fontSize:28,marginBottom:6}}>📄</div>
                    <div style={{fontSize:13,color:'#6b7280'}}>Tap to upload photo or PDF</div>
                    <div style={{fontSize:11,color:'#9ca3af',marginTop:3}}>JPG, PNG or PDF · Max 5MB</div>
                  </div>
                )}
                <input type="file" accept="image/*,.pdf" style={{display:'none'}} onChange={e=>setL('file',e.target.files[0])} />
              </label>
            </div>

            <div style={{background:'#fffbeb',border:'1px solid #fde047',borderRadius:8,padding:'10px 14px',fontSize:12,color:'#854d0e',marginBottom:16}}>
              ⚠️ Your {isPharmacy?'Drug License':'Registration'} will be manually verified by our team within 24 hours.
            </div>

            <button onClick={submitRegistration} disabled={loading} style={{width:'100%',padding:'12px',background:accentColor,color:'#fff',border:'none',borderRadius:8,fontSize:14,fontWeight:700,cursor:'pointer',marginBottom:8}}>
              {loading?'Submitting...':`Submit ${isPharmacy?'Pharmacy':'Doctor'} Application`}
            </button>
            <button onClick={()=>setStep(1)} style={{width:'100%',padding:'10px',background:'transparent',color:'#6b7280',border:'1px solid #e5e7eb',borderRadius:8,fontSize:13,cursor:'pointer'}}>← Back</button>
          </div>
        )}

        {/* STEP 3: DONE */}
        {step===3&&(
          <div style={{background:'#fff',borderRadius:14,padding:32,border:'1px solid #e5e7eb',textAlign:'center'}}>
            <div style={{width:72,height:72,background:'#f0fdf4',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:32}}>✅</div>
            <div style={{fontWeight:800,fontSize:20,marginBottom:8,color:'#0a3d2e'}}>Application Submitted!</div>
            <p style={{color:'#6b7280',fontSize:14,lineHeight:1.7,marginBottom:20}}>
              Your {isPharmacy?'Drug License':'registration'} is under review. Our team will verify it within <strong>24 hours</strong> and activate your account. You'll receive an SMS on <strong>+91 {mobile}</strong>.
            </p>
            <div style={{background:'#f9fafb',borderRadius:10,padding:16,textAlign:'left',fontSize:13,marginBottom:20,border:'1px solid #e5e7eb'}}>
              <div style={{display:'flex',justifyContent:'space-between',paddingBottom:8,borderBottom:'1px solid #e5e7eb',marginBottom:8}}>
                <span style={{color:'#6b7280'}}>{isPharmacy?'Pharmacy':'Clinic/Doctor'}</span><strong>{form.name}</strong>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',paddingBottom:8,borderBottom:'1px solid #e5e7eb',marginBottom:8}}>
                <span style={{color:'#6b7280'}}>Mobile</span><span>+91 {mobile}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span style={{color:'#6b7280'}}>Type</span><span style={{fontWeight:600,color:accentColor}}>{isPharmacy?'Pharmacy':'Doctor/Clinic'}</span>
              </div>
            </div>
            <div style={{background:'#e5f5ef',borderRadius:10,padding:'12px 16px',fontSize:12,color:'#0a5c47',marginBottom:20,display:'flex',gap:10,alignItems:'flex-start',textAlign:'left'}}>
              <span style={{fontSize:16}}>💡</span>
              <span>Need faster approval? Call us at <strong>+91 8595501653</strong> with your registration details.</span>
            </div>
            <button onClick={()=>navigate('/login')} style={{width:'100%',padding:'12px',background:accentColor,color:'#fff',border:'none',borderRadius:8,fontSize:14,fontWeight:700,cursor:'pointer'}}>Go to Login →</button>
          </div>
        )}
      </div>
    </div>
  );
}
