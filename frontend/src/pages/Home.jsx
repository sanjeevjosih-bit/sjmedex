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
  const [regType, setRegType] = useState('pharmacy');

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.status === 'approved') navigate('/dashboard');
      else navigate('/pending');
    }
  }, [user]);

  return (
    <div style={{minHeight:'100vh',background:'#fff',fontFamily:"'Inter',-apple-system,sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .stats-g{grid-template-columns:repeat(4,1fr)}
        .steps-g{grid-template-columns:repeat(3,1fr)}
        .feat-g{grid-template-columns:repeat(3,1fr)}
        .trust-g{grid-template-columns:repeat(4,1fr)}
        .creds-g{grid-template-columns:repeat(3,1fr)}
        .foot-g{grid-template-columns:repeat(3,1fr)}
        .testi-g{grid-template-columns:repeat(3,1fr)}
        .reg-g{grid-template-columns:1fr 1fr}
        .hero-t{font-size:52px;line-height:1.05}
        @media(max-width:900px){
          .hero-t{font-size:36px!important}
          .stats-g,.trust-g{grid-template-columns:repeat(2,1fr)!important}
          .steps-g,.creds-g,.foot-g,.testi-g{grid-template-columns:1fr!important}
          .feat-g{grid-template-columns:repeat(2,1fr)!important}
          .hide-mob{display:none!important}
          .sp{padding:48px 20px!important}
          .reg-g{grid-template-columns:1fr!important}
          .hero-inner{padding:60px 20px 48px!important}
        }
        @media(max-width:480px){
          .feat-g{grid-template-columns:1fr!important}
          .hero-t{font-size:28px!important}
          .trust-g{grid-template-columns:repeat(2,1fr)!important}
        }
        @keyframes pulse2{0%,100%{opacity:1}50%{opacity:0.4}}
        .ld{animation:pulse2 2s infinite}
        a{text-decoration:none}
      `}</style>

      {/* CALL BAR */}
      <div style={{background:'#0a5c47',padding:'7px 24px'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
          <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'#6ee7b7'}}>
            <span className="ld" style={{width:6,height:6,background:'#4ade80',borderRadius:'50%',display:'inline-block'}}></span>
            <span style={{fontWeight:500}}>Support available Mon–Sat, 9AM–6PM · Faridabad, Haryana</span>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <a href="tel:+918595501653" style={{background:'rgba(255,255,255,0.15)',color:'#fff',padding:'4px 12px',borderRadius:20,fontSize:12,fontWeight:600,display:'flex',alignItems:'center',gap:4,border:'1px solid rgba(255,255,255,0.2)'}}>
              📞 +91 85955 01653
            </a>
            <a href="mailto:sjmedex@gmail.com" className="hide-mob" style={{color:'rgba(255,255,255,0.5)',fontSize:11}}>sjmedex@gmail.com</a>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'0 24px',position:'sticky',top:32,zIndex:199,boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',height:60}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <Logo/>
            <div>
              <div style={{fontWeight:800,fontSize:17,color:'#0a3d2e',letterSpacing:'-0.5px'}}>SJ Medex</div>
              <div style={{fontSize:9,color:'#6b7280',letterSpacing:'1px',fontWeight:500}} className="hide-mob">WHOLESALE MEDICAL PLATFORM</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:16}}>
            <div className="hide-mob" style={{display:'flex',gap:24}}>
              {[['How it works','#how'],['Licenses','#trust'],['Contact','#contact']].map(([l,h])=>(
                <a key={l} href={h} style={{fontSize:13,color:'#6b7280',fontWeight:500}}>{l}</a>
              ))}
            </div>
            <Link to="/login" style={{fontSize:13,color:'#0a5c47',fontWeight:600,padding:'7px 16px',borderRadius:8,border:'1px solid #d1fae5',background:'#f0fdf9'}} className="hide-mob">Login</Link>
            <Link to="/register" style={{background:'#0a5c47',color:'#fff',padding:'8px 20px',borderRadius:8,fontSize:13,fontWeight:700,boxShadow:'0 2px 8px rgba(10,92,71,0.25)'}}>Register Free</Link>
            <Link to="/admin/login" className="hide-mob" style={{fontSize:11,color:'#d1d5db'}}>Admin</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero-inner" style={{background:'#f9fffe',padding:'80px 24px 64px',borderBottom:'1px solid #e5f5ef'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 420px',gap:48,alignItems:'center'}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'#e5f5ef',padding:'5px 14px',borderRadius:20,marginBottom:20,border:'1px solid #86efac'}}>
              <span className="ld" style={{width:6,height:6,background:'#1DB97A',borderRadius:'50%',display:'inline-block'}}></span>
              <span style={{fontSize:11,fontWeight:600,color:'#0a5c47',letterSpacing:'0.3px'}}>GSTIN VERIFIED · FSSAI APPROVED · DRUG LICENSED</span>
            </div>
            <h1 className="hero-t" style={{fontWeight:900,color:'#0a1a14',marginBottom:20,letterSpacing:'-2px'}}>
              Wholesale Medical<br/>Supplies for<br/><span style={{color:'#1DB97A'}}>Pharmacies & Doctors</span>
            </h1>
            <p style={{fontSize:16,color:'#4b5563',lineHeight:1.75,marginBottom:28,maxWidth:480}}>
              Haryana's trusted B2B medical distributor since 2025. Order medicines, surgical items and injectables at guaranteed wholesale rates with proper GST invoices.
            </p>
            <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:28,flexWrap:'wrap'}}>
              {['Free registration','Approved in 24hrs','GST invoices included','Free delivery'].map(f=>(
                <div key={f} style={{display:'flex',alignItems:'center',gap:5,fontSize:12,color:'#374151',background:'#fff',padding:'5px 12px',borderRadius:20,border:'1px solid #e5e7eb'}}>
                  <span style={{color:'#1DB97A',fontWeight:700}}>✓</span>{f}
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <Link to="/register?type=pharmacy" style={{background:'#0a5c47',color:'#fff',padding:'13px 28px',borderRadius:10,fontSize:14,fontWeight:700,boxShadow:'0 4px 16px rgba(10,92,71,0.3)',display:'flex',alignItems:'center',gap:8}}>
                🏥 Register as Pharmacy
              </Link>
              <Link to="/register?type=doctor" style={{background:'#fff',color:'#0a5c47',padding:'13px 28px',borderRadius:10,fontSize:14,fontWeight:600,border:'1.5px solid #0a5c47',display:'flex',alignItems:'center',gap:8}}>
                👨‍⚕️ Register as Doctor
              </Link>
            </div>
          </div>

          {/* REGISTER CARD */}
          <div style={{background:'#fff',borderRadius:16,padding:28,border:'1px solid #e5e7eb',boxShadow:'0 8px 40px rgba(0,0,0,0.08)'}}>
            <div style={{fontWeight:700,fontSize:16,color:'#0a1a14',marginBottom:4}}>Get started today</div>
            <p style={{fontSize:13,color:'#6b7280',marginBottom:20}}>Free registration · No fees · Approved in 24 hours</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
              <button onClick={()=>setRegType('pharmacy')} style={{padding:'12px 8px',borderRadius:9,border:regType==='pharmacy'?'2px solid #0a5c47':'2px solid #e5e7eb',background:regType==='pharmacy'?'#f0fdf9':'#fff',cursor:'pointer',fontWeight:600,fontSize:13,color:regType==='pharmacy'?'#0a5c47':'#6b7280',textAlign:'center'}}>
                🏥<br/><span style={{fontSize:11,marginTop:4,display:'block'}}>Pharmacy</span>
              </button>
              <button onClick={()=>setRegType('doctor')} style={{padding:'12px 8px',borderRadius:9,border:regType==='doctor'?'2px solid #2563eb':'2px solid #e5e7eb',background:regType==='doctor'?'#eff6ff':'#fff',cursor:'pointer',fontWeight:600,fontSize:13,color:regType==='doctor'?'#2563eb':'#6b7280',textAlign:'center'}}>
                👨‍⚕️<br/><span style={{fontSize:11,marginTop:4,display:'block'}}>Doctor/Clinic</span>
              </button>
            </div>
            <Link to={'/register?type='+regType} style={{display:'block',background:'#0a5c47',color:'#fff',padding:'13px',borderRadius:10,fontSize:14,fontWeight:700,textAlign:'center',marginBottom:14,boxShadow:'0 2px 8px rgba(10,92,71,0.2)'}}>
              Register as {regType==='pharmacy'?'Pharmacy':'Doctor/Clinic'} →
            </Link>
            <Link to="/login" style={{display:'block',background:'#f9fafb',color:'#374151',padding:'11px',borderRadius:10,fontSize:13,fontWeight:500,textAlign:'center',border:'1px solid #e5e7eb'}}>
              Already registered? Login →
            </Link>
            <div style={{marginTop:16,paddingTop:16,borderTop:'1px solid #f3f4f6'}}>
              <div style={{fontSize:11,color:'#9ca3af',marginBottom:8,fontWeight:600}}>VERIFIED LICENSES</div>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {[['GST','06CTDPS6578R1ZJ'],['FSSAI','20826004000806'],['Drug Lic','WLF20B2025HR001699']].map(([k,v])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:11}}>
                    <span style={{color:'#9ca3af'}}>{k}</span>
                    <span style={{fontFamily:'monospace',color:'#0a5c47',fontWeight:600}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'24px'}}>
        <div className="stats-g" style={{maxWidth:1100,margin:'0 auto',display:'grid',gap:0}}>
          {[['500+','Licensed Members'],['Since 2025','Est. & Serving'],['Haryana & Delhi NCR','Service Area'],['100%','Govt. Licensed']].map(([n,l],i)=>(
            <div key={l} style={{textAlign:'center',padding:'16px 24px',borderRight:i<3?'1px solid #f0f0f0':'none'}}>
              <div style={{fontSize:22,fontWeight:800,color:'#0a3d2e'}}>{n}</div>
              <div style={{fontSize:12,color:'#9ca3af',marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY JOIN */}
      <div id="how" className="sp" style={{padding:'72px 24px',background:'#fff'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{marginBottom:48}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:10}}>WHY CHOOSE SJ MEDEX</div>
            <h2 style={{fontSize:32,fontWeight:900,color:'#0a1a14',letterSpacing:'-0.5px',marginBottom:12}}>Every day without us is money lost</h2>
            <p style={{color:'#6b7280',fontSize:15,maxWidth:520}}>Pharmacies and doctors on SJ Medex save Rs.15,000 to Rs.40,000 per month compared to local distributors.</p>
          </div>
          <div className="creds-g" style={{display:'grid',gap:24}}>
            {[
              {icon:'💸',title:'Save Rs.15K–40K Every Month',desc:'Our wholesale prices are 20–35% lower than local market rates. Every single order saves you significant money — verified by our existing members.',tag:'MOST POPULAR REASON',tagColor:'#fee2e2',tagText:'#dc2626'},
              {icon:'⚡',title:'Order in Under 2 Minutes',desc:'No phone calls, no waiting, no bargaining. Browse products, add to cart, place order. We dispatch same day for orders placed before 2PM.',tag:'SAVES YOUR TIME',tagColor:'#dcfce7',tagText:'#15803d'},
              {icon:'📄',title:'100% GST Compliant Invoices',desc:'Every order comes with a proper GST invoice. Claim input tax credit, maintain clean books, stay fully compliant with zero effort.',tag:'STAY LEGAL',tagColor:'#dbeafe',tagText:'#1d4ed8'},
            ].map(c=>(
              <div key={c.title} style={{background:'#f9fafb',borderRadius:14,padding:28,position:'relative',border:'1px solid #f0f0f0'}}>
                <div style={{display:'inline-block',background:c.tagColor,color:c.tagText,fontSize:9,fontWeight:700,padding:'3px 10px',borderRadius:20,marginBottom:16,letterSpacing:'0.5px'}}>{c.tag}</div>
                <div style={{fontSize:36,marginBottom:14}}>{c.icon}</div>
                <div style={{fontWeight:700,fontSize:17,color:'#0a1a14',marginBottom:10}}>{c.title}</div>
                <div style={{fontSize:14,color:'#6b7280',lineHeight:1.75}}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHO CAN JOIN */}
      <div className="sp" style={{padding:'72px 24px',background:'#f9fffe'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{marginBottom:48}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:10}}>WHO CAN REGISTER</div>
            <h2 style={{fontSize:32,fontWeight:900,color:'#0a1a14',letterSpacing:'-0.5px'}}>Built for licensed medical professionals</h2>
          </div>
          <div className="reg-g" style={{display:'grid',gap:24}}>
            <div style={{background:'#fff',borderRadius:16,padding:32,border:'2px solid #0a5c47',boxShadow:'0 4px 24px rgba(10,92,71,0.08)'}}>
              <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:20}}>
                <div style={{width:56,height:56,background:'#e5f5ef',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28}}>🏥</div>
                <div>
                  <div style={{fontWeight:800,fontSize:18,color:'#0a1a14'}}>Pharmacy / Medical Store</div>
                  <div style={{fontSize:12,color:'#1DB97A',fontWeight:600,marginTop:2}}>480+ active members</div>
                </div>
              </div>
              <p style={{fontSize:14,color:'#6b7280',lineHeight:1.75,marginBottom:20}}>Any retail or wholesale pharmacy with a valid Drug License can register. We manually verify your license before activation — no shortcuts.</p>
              <div style={{marginBottom:24,display:'flex',flexDirection:'column',gap:10}}>
                {['Valid Drug License Number (DL No.)','Mobile number for OTP verification','Shop / pharmacy name and address','GST number (optional but recommended)'].map(r=>(
                  <div key={r} style={{display:'flex',alignItems:'center',gap:10,fontSize:13,color:'#374151'}}>
                    <div style={{width:20,height:20,background:'#e5f5ef',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <span style={{color:'#0a5c47',fontWeight:800,fontSize:11}}>✓</span>
                    </div>
                    {r}
                  </div>
                ))}
              </div>
              <Link to="/register?type=pharmacy" style={{display:'block',background:'#0a5c47',color:'#fff',padding:'13px',borderRadius:10,fontSize:14,fontWeight:700,textAlign:'center',boxShadow:'0 2px 8px rgba(10,92,71,0.2)'}}>Register as Pharmacy →</Link>
            </div>

            <div style={{background:'#fff',borderRadius:16,padding:32,border:'2px solid #2563eb',boxShadow:'0 4px 24px rgba(37,99,235,0.08)'}}>
              <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:20}}>
                <div style={{width:56,height:56,background:'#eff6ff',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28}}>👨‍⚕️</div>
                <div>
                  <div style={{fontWeight:800,fontSize:18,color:'#0a1a14'}}>Doctor / Clinic</div>
                  <div style={{fontSize:12,color:'#2563eb',fontWeight:600,marginTop:2}}>Now accepting registrations</div>
                </div>
              </div>
              <p style={{fontSize:14,color:'#6b7280',lineHeight:1.75,marginBottom:20}}>Licensed doctors and clinic owners can order medical and surgical supplies directly at wholesale rates. MCI or State Medical Council registration required.</p>
              <div style={{marginBottom:24,display:'flex',flexDirection:'column',gap:10}}>
                {['Doctor name or clinic name','MCI / State Council Registration Number','Mobile number for OTP verification','Clinic address and specialization'].map(r=>(
                  <div key={r} style={{display:'flex',alignItems:'center',gap:10,fontSize:13,color:'#374151'}}>
                    <div style={{width:20,height:20,background:'#eff6ff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <span style={{color:'#2563eb',fontWeight:800,fontSize:11}}>✓</span>
                    </div>
                    {r}
                  </div>
                ))}
              </div>
              <Link to="/register?type=doctor" style={{display:'block',background:'#2563eb',color:'#fff',padding:'13px',borderRadius:10,fontSize:14,fontWeight:700,textAlign:'center',boxShadow:'0 2px 8px rgba(37,99,235,0.2)'}}>Register as Doctor/Clinic →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* LICENSES */}
      <div id="trust" className="sp" style={{padding:'72px 24px',background:'#fff'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{marginBottom:48}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:10}}>FULLY VERIFIED AND LICENSED</div>
            <h2 style={{fontSize:32,fontWeight:900,color:'#0a1a14',letterSpacing:'-0.5px',marginBottom:12}}>Government registered. Nothing to hide.</h2>
            <p style={{color:'#6b7280',fontSize:15}}>Every license below is publicly verifiable with the respective government authority.</p>
          </div>
          <div className="trust-g" style={{display:'grid',gap:16,marginBottom:40}}>
            {[
              {icon:'🏛️',label:'GST Registration',value:'06CTDPS6578R1ZJ',sub:'Haryana · Active',color:'#f0fdf9',border:'#d1fae5'},
              {icon:'🧾',label:'FSSAI License',value:'20826004000806',sub:'Food Safety · Valid',color:'#eff6ff',border:'#dbeafe'},
              {icon:'💊',label:'Drug License',value:'WLF20B2025HR001699',sub:'Wholesale Only',color:'#fefce8',border:'#fef08a'},
              {icon:'📋',label:'PAN Card',value:'CTDPS6578R',sub:'Income Tax · Verified',color:'#fdf4ff',border:'#e9d5ff'},
            ].map(c=>(
              <div key={c.label} style={{background:c.color,border:'1px solid '+c.border,borderRadius:14,padding:20,position:'relative'}}>
                <div style={{position:'absolute',top:12,right:12,fontSize:9,fontWeight:700,color:'#15803d',background:'#dcfce7',padding:'2px 8px',borderRadius:20}}>✓ VERIFIED</div>
                <div style={{fontSize:28,marginBottom:10}}>{c.icon}</div>
                <div style={{fontSize:10,color:'#6b7280',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:6}}>{c.label}</div>
                <div style={{fontFamily:'monospace',fontWeight:700,fontSize:13,color:'#0a1a14',marginBottom:4}}>{c.value}</div>
                <div style={{fontSize:11,color:'#6b7280'}}>{c.sub}</div>
              </div>
            ))}
          </div>
          <div className="creds-g" style={{display:'grid',gap:20}}>
            {[
              {icon:'🔒',title:'Every Member Manually Verified',desc:'Our team manually checks every Drug License or Medical Registration number before approving any account. Zero fake pharmacies on our platform.'},
              {icon:'📦',title:'Direct from Licensed Distributor',desc:'SJ Medex is the licensed wholesale distributor. No middlemen. All products sourced from authorized manufacturers with complete chain of documentation.'},
              {icon:'📞',title:'Real Support from Real People',desc:'Call +91 8595501653. Talk to our team directly from our Faridabad office. Monday to Saturday, 9AM to 6PM. No bots, no tickets.'},
            ].map(t=>(
              <div key={t.title} style={{background:'#f9fafb',borderRadius:14,padding:24,border:'1px solid #f0f0f0'}}>
                <div style={{fontSize:32,marginBottom:14}}>{t.icon}</div>
                <div style={{fontWeight:700,fontSize:16,color:'#0a1a14',marginBottom:10}}>{t.title}</div>
                <div style={{fontSize:14,color:'#6b7280',lineHeight:1.75}}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="sp" style={{padding:'72px 24px',background:'#f9fffe'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{marginBottom:48,textAlign:'center'}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:10}}>HOW IT WORKS</div>
            <h2 style={{fontSize:32,fontWeight:900,color:'#0a1a14',letterSpacing:'-0.5px'}}>Start ordering in 3 steps</h2>
          </div>
          <div className="steps-g" style={{display:'grid',gap:24}}>
            {[
              {n:'01',icon:'📱',title:'Register with Mobile OTP',desc:'Sign up with your mobile number. Choose pharmacy or doctor. Complete your profile in under 2 minutes. Completely free.'},
              {n:'02',icon:'📄',title:'Upload Your License',desc:'Pharmacy: upload your Drug License. Doctor: upload your MCI/Council registration. Our team verifies it within 24 hours.'},
              {n:'03',icon:'💰',title:'Order and Save Every Month',desc:'Browse 500+ products at exclusive wholesale rates. Add to cart, place order, receive free delivery with proper GST invoice.'},
            ].map(s=>(
              <div key={s.n} style={{background:'#fff',borderRadius:16,padding:32,border:'1px solid #e5e7eb',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:-10,right:16,fontSize:80,fontWeight:900,color:'#f3f4f6',lineHeight:1,fontFamily:'monospace'}}>{s.n}</div>
                <div style={{fontSize:36,marginBottom:16,position:'relative'}}>{s.icon}</div>
                <div style={{fontWeight:700,fontSize:17,color:'#0a1a14',marginBottom:10,position:'relative'}}>{s.title}</div>
                <div style={{fontSize:14,color:'#6b7280',lineHeight:1.75,position:'relative'}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="sp" style={{padding:'72px 24px',background:'#fff'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{marginBottom:48,textAlign:'center'}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:10}}>TRUSTED BY OUR MEMBERS</div>
            <h2 style={{fontSize:32,fontWeight:900,color:'#0a1a14',letterSpacing:'-0.5px'}}>What pharmacies say about us</h2>
          </div>
          <div className="testi-g" style={{display:'grid',gap:20}}>
            {[
              {name:'Luv Medical Store',role:'Faridabad, Haryana',text:'Been ordering for months now. Prices are genuinely 25-30% lower than local suppliers. GST invoices make accounting so much easier. Highly recommend.'},
              {name:'Gaurav Medical Store',role:'Ballabhagarh, Haryana',text:'The verification process gave me confidence that this is a legitimate platform. Surgical supplies quality is excellent and delivery is always on time.'},
              {name:'Goyal Medical Store',role:'NIT Faridabad, Haryana',text:'Saving a significant amount every month since joining. The platform works perfectly on mobile and ordering takes less than 2 minutes each time.'},
            ].map(t=>(
              <div key={t.name} style={{background:'#f9fafb',borderRadius:16,padding:28,border:'1px solid #f0f0f0'}}>
                <div style={{display:'flex',gap:2,marginBottom:14}}>
                  {'★★★★★'.split('').map((s,i)=><span key={i} style={{color:'#f59e0b',fontSize:18}}>{s}</span>)}
                </div>
                <div style={{fontSize:14,color:'#374151',lineHeight:1.8,marginBottom:20,fontStyle:'italic'}}>"{t.text}"</div>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:40,height:40,background:'#e5f5ef',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>🏥</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:14,color:'#0a1a14'}}>{t.name}</div>
                    <div style={{fontSize:12,color:'#9ca3af',marginTop:2}}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{background:'#f9fffe',borderTop:'1px solid #e5f5ef',borderBottom:'1px solid #e5f5ef',padding:'48px 24px'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:24}}>
          <div>
            <div style={{fontWeight:800,fontSize:22,color:'#0a1a14',marginBottom:8}}>Have questions? Talk to us directly.</div>
            <div style={{fontSize:14,color:'#6b7280',lineHeight:1.8}}>
              📍 Rajeev Colony, Samaypur Road, Near Bansi School, Ballabhagarh, Faridabad — 121004<br/>
              ✉️ sjmedex@gmail.com &nbsp;·&nbsp; Mon–Sat, 9AM to 6PM
            </div>
          </div>
          <a href="tel:+918595501653" style={{background:'#0a5c47',color:'#fff',padding:'14px 28px',borderRadius:10,fontSize:15,fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',gap:8,boxShadow:'0 4px 16px rgba(10,92,71,0.25)',whiteSpace:'nowrap'}}>
            📞 +91 85955 01653
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="sp" style={{background:'#0a5c47',padding:'72px 24px',textAlign:'center'}}>
        <div style={{maxWidth:600,margin:'0 auto'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#6ee7b7',letterSpacing:'2px',marginBottom:16}}>JOIN SJ MEDEX TODAY</div>
          <h2 style={{fontSize:36,fontWeight:900,color:'#fff',marginBottom:14,letterSpacing:'-1px'}}>Stop paying more than you should</h2>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:15,marginBottom:32,lineHeight:1.75}}>
            Every pharmacy and doctor in your area is comparing prices. The ones on SJ Medex are already saving money every month. Register free in 2 minutes.
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/register?type=pharmacy" style={{background:'#fff',color:'#0a5c47',padding:'14px 32px',borderRadius:10,fontSize:15,fontWeight:700,textDecoration:'none',boxShadow:'0 4px 20px rgba(0,0,0,0.15)'}}>
              🏥 Register as Pharmacy
            </Link>
            <Link to="/register?type=doctor" style={{background:'rgba(255,255,255,0.1)',color:'#fff',padding:'14px 32px',borderRadius:10,fontSize:15,fontWeight:600,textDecoration:'none',border:'1.5px solid rgba(255,255,255,0.3)'}}>
              👨‍⚕️ Register as Doctor
            </Link>
          </div>
          <div style={{marginTop:16,fontSize:12,color:'rgba(255,255,255,0.4)'}}>Free · No contracts · Approved in 24 hours</div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:'#071f17',padding:'48px 24px 28px'}}>
        <div className="foot-g" style={{maxWidth:1100,margin:'0 auto',display:'grid',gap:40,marginBottom:40}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <Logo/>
              <div>
                <div style={{color:'#fff',fontWeight:800,fontSize:17}}>SJ Medex</div>
                <div style={{color:'#6ee7b7',fontSize:9,letterSpacing:'1px',marginTop:2}}>WHOLESALE MEDICAL PLATFORM</div>
              </div>
            </div>
            <div style={{fontSize:13,color:'rgba(255,255,255,0.4)',lineHeight:2}}>
              Rajeev Colony, Samaypur Road,<br/>
              Near Bansi School, Ballabhagarh<br/>
              Faridabad, Haryana — 121004
            </div>
            <div style={{marginTop:12}}>
              <a href="mailto:sjmedex@gmail.com" style={{fontSize:13,color:'#6ee7b7',textDecoration:'none'}}>sjmedex@gmail.com</a>
            </div>
          </div>
          <div>
            <div style={{color:'rgba(255,255,255,0.5)',fontWeight:600,fontSize:11,marginBottom:16,letterSpacing:'1px'}}>LEGAL REGISTRATIONS</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {[['GSTIN','06CTDPS6578R1ZJ'],['PAN','CTDPS6578R'],['FSSAI','20826004000806'],['Drug License 1','WLF20B2025HR001699'],['Drug License 2','WLF21B2025HR001693']].map(([k,v])=>(
                <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:12,borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:8}}>
                  <span style={{color:'rgba(255,255,255,0.3)'}}>{k}</span>
                  <span style={{color:'#6ee7b7',fontFamily:'monospace',fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{color:'rgba(255,255,255,0.5)',fontWeight:600,fontSize:11,marginBottom:16,letterSpacing:'1px'}}>CONTACT AND SUPPORT</div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <a href="tel:+918595501653" style={{display:'flex',alignItems:'center',gap:8,color:'#6ee7b7',fontSize:13,textDecoration:'none'}}>
                📞 +91 8595501653
              </a>
              <a href="mailto:sjmedex@gmail.com" style={{display:'flex',alignItems:'center',gap:8,color:'#6ee7b7',fontSize:13,textDecoration:'none'}}>
                ✉️ sjmedex@gmail.com
              </a>
              <div style={{fontSize:12,color:'rgba(255,255,255,0.3)',marginTop:4}}>Monday to Saturday · 9AM to 6PM IST</div>
            </div>
            <div style={{marginTop:24,padding:'16px',background:'rgba(255,255,255,0.04)',borderRadius:10,border:'1px solid rgba(255,255,255,0.08)'}}>
              <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',marginBottom:6}}>INSTALL AS APP</div>
              <div style={{fontSize:12,color:'rgba(255,255,255,0.5)',lineHeight:1.6}}>On iPhone: Share → Add to Home Screen<br/>On Android: Menu → Add to Home Screen</div>
            </div>
          </div>
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <div style={{fontSize:12,color:'rgba(255,255,255,0.2)'}}>© 2025 SJ Medex. GSTIN: 06CTDPS6578R1ZJ · All rights reserved.</div>
          <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
            {['GST Registered','FSSAI Approved','Drug Licensed','Est. 2025'].map(b=>(
              <div key={b} style={{fontSize:11,color:'#6ee7b7',display:'flex',alignItems:'center',gap:5}}>
                <span style={{width:4,height:4,background:'#1DB97A',borderRadius:'50%',display:'inline-block'}}></span>{b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
