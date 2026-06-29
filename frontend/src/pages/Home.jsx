import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InstallButton from '../components/InstallButton';

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 38 38" fill="none">
    <rect width="38" height="38" rx="9" fill="#1DB97A"/>
    <rect x="17" y="6" width="4" height="26" rx="2" fill="white"/>
    <rect x="6" y="17" width="26" height="4" rx="2" fill="white"/>
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
    <div style={{minHeight:'100vh',background:'#fff',fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        a{text-decoration:none}
        body{-webkit-text-size-adjust:100%}

        /* DESKTOP */
        .hero-grid{display:grid;grid-template-columns:1fr 380px;gap:48px;align-items:center}
        .g2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
        .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .g4{display:grid;grid-template-columns:repeat(4,1fr)}
        .g4-trust{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
        .ht{font-size:44px;line-height:1.08;letter-spacing:-2px;font-weight:900;color:#0a1a14;margin-bottom:18px}
        .sp{padding:60px 24px}
        .hide-mob{display:flex}
        .show-mob{display:none}
        .reg-card{display:block}
        .cta-btns{flex-direction:row}
        .foot-g{display:grid;grid-template-columns:repeat(3,1fr);gap:32px}
        .stat-item{border-right:1px solid #f0f0f0}
        .stat-item:last-child{border-right:none}

        /* MOBILE */
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr!important;gap:0!important}
          .reg-card{display:none!important}
          .show-mob{display:block!important}
          .hide-mob{display:none!important}
          .ht{font-size:28px!important;letter-spacing:-0.5px!important;margin-bottom:14px!important}
          .sp{padding:40px 16px!important}
          .g2,.g3{grid-template-columns:1fr!important;gap:12px!important}
          .g4{grid-template-columns:1fr 1fr!important}
          .g4-trust{grid-template-columns:1fr 1fr!important;gap:10px!important}
          .cta-btns{flex-direction:column!important}
          .cta-btns a{text-align:center!important}
          .foot-g{grid-template-columns:1fr!important;gap:24px!important}
          .stat-item{border-right:none!important;border-bottom:1px solid #f0f0f0!important;padding:14px 16px!important}
          .stat-item:last-child{border-bottom:none!important}
          .hero-pad{padding:36px 16px 32px!important}
          .top-bar-inner{flex-direction:column!important;gap:6px!important;text-align:center}
          .contact-inner{flex-direction:column!important;text-align:center!important;gap:16px!important}
        }
      `}</style>

      {/* TOP BAR */}
      <div style={{background:'#0a5c47',padding:'8px 20px'}}>
        <div className="top-bar-inner" style={{maxWidth:1100,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
          <div style={{fontSize:11,color:'#6ee7b7',fontWeight:500}}>📍 Ballabhagarh, Faridabad · Mon–Sat 9AM–6PM</div>
          <a href="tel:+918595501653" style={{background:'rgba(255,255,255,0.15)',color:'#fff',padding:'5px 14px',borderRadius:20,fontSize:12,fontWeight:600,border:'1px solid rgba(255,255,255,0.2)',whiteSpace:'nowrap'}}>
            📞 +91 85955 01653
          </a>
        </div>
      </div>

      {/* NAV */}
      <nav style={{background:'#fff',borderBottom:'1px solid #f0f0f0',padding:'0 20px',position:'sticky',top:0,zIndex:100,boxShadow:'0 1px 4px rgba(0,0,0,0.05)'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',height:56}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <Logo/>
            <div>
              <div style={{fontWeight:800,fontSize:15,color:'#0a1a14',letterSpacing:'-0.3px'}}>SJ Medex</div>
              <div style={{fontSize:8,color:'#9ca3af',letterSpacing:'0.8px',lineHeight:1}} className="hide-mob">WHOLESALE MEDICAL PLATFORM</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <InstallButton/>
            <Link to="/login" className="hide-mob" style={{fontSize:13,color:'#0a5c47',fontWeight:600,padding:'6px 14px',borderRadius:7,border:'1px solid #d1fae5',background:'#f0fdf9'}}>Login</Link>
            <Link to="/register" style={{background:'#0a5c47',color:'#fff',padding:'8px 16px',borderRadius:7,fontSize:13,fontWeight:700,whiteSpace:'nowrap'}}>Register Free</Link>
            <Link to="/admin/login" className="hide-mob" style={{fontSize:11,color:'#d1d5db'}}>Admin</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero-pad" style={{background:'#f9fffe',borderBottom:'1px solid #e5f5ef',padding:'60px 20px 48px'}}>
        <div className="hero-grid" style={{maxWidth:1100,margin:'0 auto'}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'#e5f5ef',padding:'5px 12px',borderRadius:20,marginBottom:16,border:'1px solid #86efac'}}>
              <span style={{width:6,height:6,background:'#1DB97A',borderRadius:'50%',display:'inline-block'}}></span>
              <span style={{fontSize:10,fontWeight:600,color:'#0a5c47',letterSpacing:'0.3px'}}>GST · FSSAI · DRUG LICENSED · EST. 2025</span>
            </div>
            <h1 className="ht">
              Wholesale Medical<br/>Supplies for<br/><span style={{color:'#1DB97A'}}>Pharmacies & Doctors</span>
            </h1>
            <p style={{fontSize:14,color:'#6b7280',lineHeight:1.75,marginBottom:24,maxWidth:440}}>
              Haryana's trusted B2B medical distributor. Order medicines, surgical items and injectables at wholesale rates with proper GST invoices.
            </p>
            <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:20}}>
              <Link to="/login?type=pharmacy" style={{background:'#0a5c47',color:'#fff',padding:'12px 22px',borderRadius:9,fontSize:14,fontWeight:700,boxShadow:'0 4px 14px rgba(10,92,71,0.25)',display:'flex',alignItems:'center',gap:6}}>
                🏥 Register as Pharmacy
              </Link>
              <Link to="/login?type=doctor" style={{background:'#fff',color:'#0a5c47',padding:'12px 22px',borderRadius:9,fontSize:14,fontWeight:600,border:'1.5px solid #0a5c47',display:'flex',alignItems:'center',gap:6}}>
                👨‍⚕️ Register as Doctor
              </Link>
            </div>
            <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
              {['Free registration','Approved in 24hrs','Free delivery','GST invoices'].map(f=>(
                <div key={f} style={{display:'flex',alignItems:'center',gap:4,fontSize:12,color:'#6b7280'}}>
                  <span style={{color:'#1DB97A',fontWeight:700}}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>

          {/* QUICK REGISTER CARD — desktop only */}
          <div className="reg-card" style={{background:'#fff',borderRadius:16,padding:24,border:'1px solid #e5e7eb',boxShadow:'0 8px 32px rgba(0,0,0,0.07)'}}>
            <div style={{fontWeight:700,fontSize:15,color:'#0a1a14',marginBottom:3}}>Get started — it's free</div>
            <p style={{fontSize:12,color:'#9ca3af',marginBottom:16}}>Approved within 24 hours · No fees ever</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
              <button onClick={()=>setRegType('pharmacy')} style={{padding:'11px 8px',borderRadius:9,border:regType==='pharmacy'?'2px solid #0a5c47':'2px solid #e5e7eb',background:regType==='pharmacy'?'#f0fdf9':'#fff',cursor:'pointer',fontWeight:600,fontSize:12,color:regType==='pharmacy'?'#0a5c47':'#6b7280',textAlign:'center'}}>
                🏥<br/><span style={{fontSize:11,marginTop:3,display:'block'}}>Pharmacy</span>
              </button>
              <button onClick={()=>setRegType('doctor')} style={{padding:'11px 8px',borderRadius:9,border:regType==='doctor'?'2px solid #2563eb':'2px solid #e5e7eb',background:regType==='doctor'?'#eff6ff':'#fff',cursor:'pointer',fontWeight:600,fontSize:12,color:regType==='doctor'?'#2563eb':'#6b7280',textAlign:'center'}}>
                👨‍⚕️<br/><span style={{fontSize:11,marginTop:3,display:'block'}}>Doctor/Clinic</span>
              </button>
            </div>
            <Link to={'/register?type='+regType} style={{display:'block',background:'#0a5c47',color:'#fff',padding:'12px',borderRadius:9,fontSize:14,fontWeight:700,textAlign:'center',marginBottom:8}}>
              Register as {regType==='pharmacy'?'Pharmacy':'Doctor/Clinic'} →
            </Link>
            <Link to="/login" style={{display:'block',background:'#f9fafb',color:'#6b7280',padding:'10px',borderRadius:9,fontSize:13,fontWeight:500,textAlign:'center',border:'1px solid #e5e7eb'}}>
              Already registered? Login →
            </Link>
            <div style={{marginTop:14,paddingTop:12,borderTop:'1px solid #f3f4f6'}}>
              <div style={{fontSize:10,color:'#9ca3af',marginBottom:6,fontWeight:600,letterSpacing:'0.5px'}}>VERIFIED LICENSES</div>
              {[['GST','06CTDPS6578R1ZJ'],['FSSAI','20826004000806'],['Drug Lic','WLF20B2025HR001699']].map(([k,v])=>(
                <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:10,marginBottom:4}}>
                  <span style={{color:'#9ca3af'}}>{k}</span>
                  <span style={{fontFamily:'monospace',color:'#0a5c47',fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE ONLY — login link below hero */}
        <div className="show-mob" style={{maxWidth:1100,margin:'16px auto 0',display:'flex',gap:10}}>
          <Link to="/login" style={{flex:1,background:'#fff',color:'#0a5c47',padding:'11px',borderRadius:9,fontSize:13,fontWeight:600,textAlign:'center',border:'1.5px solid #0a5c47'}}>
            Login →
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div style={{background:'#fff',borderBottom:'1px solid #f0f0f0'}}>
        <div className="g4" style={{maxWidth:1100,margin:'0 auto'}}>
          {[['500+','Licensed Members'],['Est. 2025','Serving Since'],['Haryana & Delhi NCR','Service Area'],['₹0','Registration Fee']].map(([n,l])=>(
            <div key={l} className="stat-item" style={{textAlign:'center',padding:'18px 16px'}}>
              <div style={{fontSize:19,fontWeight:800,color:'#0a3d2e'}}>{n}</div>
              <div style={{fontSize:11,color:'#9ca3af',marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY JOIN */}
      <div className="sp" style={{background:'#fff'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{marginBottom:28}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:8}}>WHY SJ MEDEX</div>
            <h2 style={{fontSize:26,fontWeight:900,color:'#0a1a14',letterSpacing:'-0.5px'}}>Save more on every order</h2>
          </div>
          <div className="g3">
            {[
              {icon:'💸',title:'Save Rs.15K–40K/month',desc:'Wholesale prices 20–35% lower than local market. Verified by our members.',tag:'TOP REASON',tc:'#dc2626',tb:'#fee2e2'},
              {icon:'⚡',title:'Order in 2 Minutes',desc:'No calls, no waiting. Browse, add to cart, order. Same day dispatch before 2PM.',tag:'FAST',tc:'#15803d',tb:'#dcfce7'},
              {icon:'📄',title:'GST Invoice Every Order',desc:'Proper GST invoices included. Claim input tax credit and stay 100% compliant.',tag:'COMPLIANT',tc:'#1d4ed8',tb:'#dbeafe'},
            ].map(c=>(
              <div key={c.title} style={{background:'#f9fafb',borderRadius:12,padding:20,border:'1px solid #f0f0f0'}}>
                <div style={{display:'inline-block',background:c.tb,color:c.tc,fontSize:9,fontWeight:700,padding:'3px 10px',borderRadius:20,marginBottom:12,letterSpacing:'0.5px'}}>{c.tag}</div>
                <div style={{fontSize:28,marginBottom:10}}>{c.icon}</div>
                <div style={{fontWeight:700,fontSize:14,color:'#0a1a14',marginBottom:6}}>{c.title}</div>
                <div style={{fontSize:13,color:'#6b7280',lineHeight:1.65}}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="sp" style={{background:'#f9fffe',borderTop:'1px solid #e5f5ef',borderBottom:'1px solid #e5f5ef'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:28}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:8}}>HOW IT WORKS</div>
            <h2 style={{fontSize:26,fontWeight:900,color:'#0a1a14',letterSpacing:'-0.5px'}}>Start ordering in 3 steps</h2>
          </div>
          <div className="g3">
            {[
              {n:'01',icon:'📱',title:'Register with OTP',desc:'Sign up with mobile number. Choose pharmacy or doctor. Done in 2 minutes. Free.'},
              {n:'02',icon:'📄',title:'Upload Your License',desc:'Pharmacy: Drug License. Doctor: MCI Registration. We verify within 24 hours.'},
              {n:'03',icon:'💰',title:'Order & Save',desc:'Browse 500+ products, place order, get free delivery with GST invoice.'},
            ].map(s=>(
              <div key={s.n} style={{background:'#fff',borderRadius:12,padding:20,border:'1px solid #e5e7eb',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:-6,right:10,fontSize:64,fontWeight:900,color:'#f3f4f6',lineHeight:1,fontFamily:'monospace'}}>{s.n}</div>
                <div style={{fontSize:28,marginBottom:10,position:'relative'}}>{s.icon}</div>
                <div style={{fontWeight:700,fontSize:14,color:'#0a1a14',marginBottom:6,position:'relative'}}>{s.title}</div>
                <div style={{fontSize:13,color:'#6b7280',lineHeight:1.65,position:'relative'}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LICENSES + REVIEWS */}
      <div className="sp" style={{background:'#fff'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{marginBottom:28}}>
            <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:8}}>FULLY LICENSED</div>
            <h2 style={{fontSize:26,fontWeight:900,color:'#0a1a14',letterSpacing:'-0.5px'}}>Government registered. Nothing to hide.</h2>
          </div>
          <div className="g4-trust" style={{marginBottom:28}}>
            {[
              {icon:'🏛️',label:'GST',value:'06CTDPS6578R1ZJ',sub:'Haryana · Active',bg:'#f0fdf9',border:'#d1fae5'},
              {icon:'🧾',label:'FSSAI',value:'20826004000806',sub:'Food Safety · Valid',bg:'#eff6ff',border:'#dbeafe'},
              {icon:'💊',label:'Drug License',value:'WLF20B2025HR001699',sub:'Wholesale Only',bg:'#fefce8',border:'#fef08a'},
              {icon:'📋',label:'PAN',value:'CTDPS6578R',sub:'Income Tax · Verified',bg:'#fdf4ff',border:'#e9d5ff'},
            ].map(c=>(
              <div key={c.label} style={{background:c.bg,border:'1px solid '+c.border,borderRadius:12,padding:14,position:'relative'}}>
                <div style={{position:'absolute',top:8,right:8,fontSize:8,fontWeight:700,color:'#15803d',background:'#dcfce7',padding:'2px 6px',borderRadius:20}}>✓ OK</div>
                <div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>
                <div style={{fontSize:9,color:'#9ca3af',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:3}}>{c.label}</div>
                <div style={{fontFamily:'monospace',fontWeight:700,fontSize:10,color:'#0a1a14',marginBottom:2}}>{c.value}</div>
                <div style={{fontSize:10,color:'#9ca3af'}}>{c.sub}</div>
              </div>
            ))}
          </div>

          {/* REVIEWS */}
          <div className="g3">
            {[
              {name:'Luv Medical Store',role:'Faridabad, Haryana',text:'Prices are 25-30% lower than local suppliers. GST invoices make accounting much easier.'},
              {name:'Gaurav Medical Store',role:'Ballabhagarh, Haryana',text:'Great verification process. Surgical supplies quality is excellent and delivery always on time.'},
              {name:'Goyal Medical Store',role:'NIT Faridabad, Haryana',text:'Saving significantly every month. Platform works perfectly on mobile, very easy to use.'},
            ].map(t=>(
              <div key={t.name} style={{background:'#f9fafb',borderRadius:12,padding:18,border:'1px solid #f0f0f0'}}>
                <div style={{display:'flex',gap:1,marginBottom:8}}>
                  {'★★★★★'.split('').map((s,i)=><span key={i} style={{color:'#f59e0b',fontSize:14}}>{s}</span>)}
                </div>
                <div style={{fontSize:13,color:'#374151',lineHeight:1.65,marginBottom:12,fontStyle:'italic'}}>"{t.text}"</div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:32,height:32,background:'#e5f5ef',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0}}>🏥</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:12,color:'#0a1a14'}}>{t.name}</div>
                    <div style={{fontSize:11,color:'#9ca3af'}}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{background:'#0a5c47',padding:'56px 20px',textAlign:'center'}}>
        <div style={{maxWidth:520,margin:'0 auto'}}>
          <h2 style={{fontSize:28,fontWeight:900,color:'#fff',marginBottom:10,letterSpacing:'-0.5px'}}>Ready to save on every order?</h2>
          <p style={{color:'rgba(255,255,255,0.65)',fontSize:14,marginBottom:24,lineHeight:1.7}}>
            Join 500+ pharmacies and doctors across Haryana and Delhi NCR.<br/>
            📍 Rajeev Colony, Ballabhagarh, Faridabad — 121004
          </p>
          <div className="cta-btns" style={{display:'flex',gap:10,justifyContent:'center',marginBottom:16}}>
            <Link to="/login?type=pharmacy" style={{background:'#fff',color:'#0a5c47',padding:'13px 24px',borderRadius:9,fontSize:14,fontWeight:700}}>
              🏥 Register as Pharmacy
            </Link>
            <Link to="/login?type=doctor" style={{background:'rgba(255,255,255,0.12)',color:'#fff',padding:'13px 24px',borderRadius:9,fontSize:14,fontWeight:600,border:'1.5px solid rgba(255,255,255,0.25)'}}>
              👨‍⚕️ Register as Doctor
            </Link>
          </div>
          <a href="tel:+918595501653" style={{color:'#6ee7b7',fontSize:13,fontWeight:500}}>📞 Call: +91 85955 01653</a>
        </div>
      </div>

      {/* WHAT WE SUPPLY — internal links for SEO discovery */}
      <div className="sp" style={{padding:'48px 20px',background:'#fff'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{fontSize:11,fontWeight:700,color:'#1DB97A',letterSpacing:'2px',marginBottom:8}}>WHAT WE SUPPLY</div>
          <h2 style={{fontSize:22,fontWeight:800,color:'#0a1a14',marginBottom:18}}>Wholesale rates on every category</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
            {[
              ['bp-machine-wholesaler-faridabad','🩺 BP Machines'],
              ['adult-diaper-wholesaler-faridabad','📦 Adult Diapers'],
              ['iv-fluid-wholesaler-haryana','💧 IV Fluids'],
              ['iv-set-wholesaler-faridabad','🔗 IV Sets'],
              ['nebulizer-wholesaler-faridabad','💨 Nebulizers'],
              ['cannula-fixer-wholesaler','🩹 Cannula Fixers'],
              ['surgical-bandage-wholesaler-manufacturer','🧻 Surgical Bandages'],
              ['syringe-wholesaler-faridabad','💉 Syringes'],
              ['medicine-envelope-wholesaler','✉️ Medicine Envelopes'],
              ['medical-equipment-wholesaler-faridabad','🏥 All Medical Equipment'],
            ].map(([slug,label])=>(
              <Link key={slug} to={`/${slug}`} style={{fontSize:13,color:'#0a5c47',background:'#f0fdf9',padding:'9px 16px',borderRadius:20,border:'1px solid #d1fae5',fontWeight:600}}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:'#071f17',padding:'36px 20px 24px'}}>
        <div className="foot-g" style={{maxWidth:1100,margin:'0 auto',marginBottom:24}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
              <Logo/>
              <div>
                <div style={{color:'#fff',fontWeight:800,fontSize:14}}>SJ Medex</div>
                <div style={{color:'#6ee7b7',fontSize:8,letterSpacing:'1px'}}>WHOLESALE MEDICAL PLATFORM</div>
              </div>
            </div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.3)',lineHeight:1.9}}>
              Rajeev Colony, Samaypur Road,<br/>
              Near Bansi School, Ballabhagarh<br/>
              Faridabad, Haryana — 121004
            </div>
          </div>
          <div>
            <div style={{color:'rgba(255,255,255,0.4)',fontWeight:600,fontSize:10,marginBottom:10,letterSpacing:'1px'}}>REGISTRATIONS</div>
            {[['GSTIN','06CTDPS6578R1ZJ'],['PAN','CTDPS6578R'],['FSSAI','20826004000806'],['Drug Lic 1','WLF20B2025HR001699'],['Drug Lic 2','WLF21B2025HR001693']].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:5}}>
                <span style={{color:'rgba(255,255,255,0.3)'}}>{k}</span>
                <span style={{color:'#6ee7b7',fontFamily:'monospace',fontWeight:600,fontSize:10}}>{v}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{color:'rgba(255,255,255,0.4)',fontWeight:600,fontSize:10,marginBottom:10,letterSpacing:'1px'}}>CONTACT</div>
            <a href="tel:+918595501653" style={{display:'flex',alignItems:'center',gap:6,color:'#6ee7b7',fontSize:13,marginBottom:8}}>📞 +91 8595501653</a>
            <a href="mailto:sjmedex@gmail.com" style={{display:'flex',alignItems:'center',gap:6,color:'#6ee7b7',fontSize:13,marginBottom:8}}>✉️ sjmedex@gmail.com</a>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.25)'}}>Mon–Sat · 9AM to 6PM IST</div>
          </div>
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:18,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10,alignItems:'center'}}>
          <div style={{fontSize:11,color:'rgba(255,255,255,0.2)'}}>© 2025 SJ Medex · GSTIN: 06CTDPS6578R1ZJ</div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            {['GST Registered','FSSAI Approved','Drug Licensed'].map(b=>(
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
