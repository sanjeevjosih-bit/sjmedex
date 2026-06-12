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

  const isPharmacy = regType === 'pharmacy';
  const accentColor = isPharmacy ? '#0a5c47' : '#2563eb';
  const accentLight = isPharmacy ? '#e5f5ef' : '#eff6ff';
  const accentBorder = isPharmacy ? '#86efac' : '#93c5fd';

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
    if(isPharmacy && !license.drug_license_number) return setError('Drug License Number is required');
    if(!isPharmacy && !form.registration_number) return setError('Registration number is required');
    setLoading(true);setError('');
    try {
      const data = new FormData();
      data.append('mobile', mobile);
      data.append('reg_type', regType);
      data.append('pharmacy_name', form.name);
      data.append('owner_name', form.owner_name);
      data.append('email', form.email);
      data.append('address', form.address);
      if(isPharmacy){
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

  const inp = {width:'100%',padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:14,outline:'none',fontFamily:'Inter,sans-serif'};

  return (
    <div style={{minHeight:'100vh',background:'#f9fafb',padding:'24px 16px',fontFamily:'Inter,sans-serif'}}>
      <div style={{maxWidth:520,margin:'0 auto'}}>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24}}>
          <Link to="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none'}}>
            <Logo/>
            <div>
              <div style={{fontWeight:800,fontSize:16,color:'#0a5c47'}}>SJ Medex</div>
              <div style={{fontSize:9,color:'#6b7280',letterSpacing:'0.5px'}}>WHOLESALE MEDICAL PLATFORM</div>
            </div>
          </Link>
          <Link to="/login" style={{fontSize:13,color:'#6b7280',textDecoration:'none'}}>Login →</Link>
        </div>

        {step===0&&(
          <div style={{background:'#fff',borderRadius:12,padding:14,marginBottom:14,border:'1px solid #e5e7eb'}}>
            <div style={{fontSize:11,fontWeight:700,color:'#6b7280',letterSpacing:'1px',marginBottom:10}}>I AM REGISTERING AS</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              <button onClick={()=>setRegType('pharmacy')} style={{padding:'11px 8px',borderRadius:9,border:`2px solid ${isPharmacy?'#0a5c47':'#e5e7eb'}`,background:isPharmacy?'#e5f5ef':'#fff',cursor:'pointer',fontWeight:600,fontSize:13,color:isPharmacy?'#0a5c47':'#6b7280',display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
                🏥 Pharmacy
              </button>
              <button onClick={()=>setRegType('doctor')} style={{padding:'11px 8px',borderRadius:9,border:`2px solid ${!isPharmacy?'#2563eb':'#e5e7eb'}`,background:!isPharmacy?'#eff6ff':'#fff',cursor:'pointer',fontWeight:600,fontSize:13,color:!isPharmacy?'#2563eb':'#6b7280',display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
                👨‍⚕️ Doctor/Clinic
              </button>
            </div>
          </div>
        )}

        <div style={{display:'flex',marginBottom:24}}>
          {STEPS.map((s,i)=>(
            <div key={s} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',position:'relative'}}>
              {i<STEPS.length-1&&<div style={{position:'absolute',top:13,left:'60%',width:'80%',height:1,background:i<step?accentColor:'#e5e7eb'}}/>}
              <div style={{width:26,height:26,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,zIndex:1,background:i<=step?accentColor:'#fff',color:i<=step?'#fff':'#9ca3af',border:`1.5px solid ${i<=step?accentColor:'#e5e7eb'}`}}>
                {i<step?'✓':i+1}
              </div>
              <div style={{fontSize:9,color:i===step?accentColor:'#9ca3af',marginTop:5,textAlign:'center',fontWeight:i===step?700:400}}>{s}</div>
            </div>
          ))}
        </div>

        {error&&<div style={{background:'#fee2e2',color:'#dc2626',padding:'10px 14px',borderRadius:8,fontSize:13,marginBottom:14}}>{error}</div>}

        {step===0&&(
          <div style={{background:'#fff',borderRadius:14,padding:24,border:'1px solid #e5e7eb'}}>
            <div style={{fontWeight:700,fontSize:17,marginBottom:4}}>Verify your mobile</div>
            <p style={{color:'#6b7280',fontSize:13,marginBottom:20}}>This will be your login ID for SJ Medex</p>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>MOBILE NUMBER</label>
              <div style={{display:'flex',gap:8}}>
                <div style={{padding:'10px 12px',border:'1px solid #e5e7eb',borderRadius:7,fontSize:14,color:'#6b7280',background:'#f9fafb',whiteSpace:'nowrap'}}>+91</div>
                <input style={{...inp,flex:1}} type="tel" maxLength={10} placeholder="9XXXXXXXXX" value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,''))} />
              </div>
            </div>
            {otpSent&&(
              <div style={{marginBottom:16}}>
                <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>ENTER OTP</label>
                <input style={{...inp,fontSize:22,textAlign:'center',letterSpacing:12,fontWeight:700}} type="number" placeholder="——" value={otp} onChange={e=>setOtp(e.target.value.slice(0,4))} autoFocus />
                {devOtp&&<div style={{background:'#e5f5ef',borderRadius:6,padding:'7px 12px',fontSize:12,color:'#0a5c47',marginTop:8}}><strong>Dev OTP:</strong> {devOtp}</div>}
              </div>
            )}
            <button onClick={otpSent?verifyOTP:sendOTP} disabled={loading} style={{width:'100%',padding:'12px',background:accentColor,color:'#fff',border:'none',borderRadius:8,fontSize:14,fontWeight:700,cursor:'pointer'}}>
              {loading?'Please wait...':(otpSent?'Verify OTP':'Send OTP')}
            </button>
            <p style={{textAlign:'center',fontSize:12,color:'#9ca3af',marginTop:14}}>Already registered? <Link to="/login" style={{color:accentColor}}>Login</Link></p>
          </div>
        )}

        {step===1&&(
          <div style={{background:'#fff',borderRadius:14,padding:24,border:'1px solid #e5e7eb'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20,padding:'12px 14px',background:accentLight,borderRadius:10,border:`1px solid ${accentBorder}`}}>
              <span style={{fontSize:22}}>{isPharmacy?'🏥':'👨‍⚕️'}</span>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:accentColor}}>{isPharmacy?'Pharmacy Registration':'Doctor / Clinic Registration'}</div>
                <div style={{fontSize:11,color:'#6b7280'}}>+91 {mobile} · Verified ✓</div>
              </div>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>{isPharmacy?'PHARMACY / SHOP NAME *':'DOCTOR NAME / CLINIC NAME *'}</label>
              <input style={inp} placeholder={isPharmacy?'e.g. Sharma Medical Store':'e.g. Dr. Priya Nair or Nair Clinic'} value={form.name} onChange={e=>setF('name',e.target.value)} />
            </div>
            {isPharmacy&&(
              <div style={{marginBottom:14}}>
                <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>OWNER / PROPRIETOR NAME *</label>
                <input style={inp} placeholder="Full legal name" value={form.owner_name} onChange={e=>setF('owner_name',e.target.value)} />
              </div>
            )}
            {!isPharmacy&&(
              <div style={{marginBottom:14}}>
                <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>SPECIALIZATION</label>
                <input style={inp} placeholder="e.g. General Physician, Pediatrician, Surgeon" value={form.specialization} onChange={e=>setF('specialization',e.target.value)} />
              </div>
            )}
            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>FULL ADDRESS *</label>
              <textarea style={{...inp,resize:'vertical'}} rows={2} placeholder={isPharmacy?'Shop address with city and pincode':'Clinic address with city and pincode'} value={form.address} onChange={e=>setF('address',e.target.value)} />
            </div>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>EMAIL (OPTIONAL)</label>
              <input style={inp} type="email" placeholder="For order notifications" value={form.email} onChange={e=>setF('email',e.target.value)} />
            </div>
            <button onClick={()=>{if(!form.name||!form.address) return setError('Name and address are required');setError('');setStep(2);}} style={{width:'100%',padding:'12px',background:accentColor,color:'#fff',border:'none',borderRadius:8,fontSize:14,fontWeight:700,cursor:'pointer',marginBottom:8}}>Continue →</button>
            <button onClick={()=>setStep(0)} style={{width:'100%',padding:'10px',background:'transparent',color:'#6b7280',border:'1px solid #e5e7eb',borderRadius:8,fontSize:13,cursor:'pointer'}}>← Back</button>
          </div>
        )}

        {step===2&&(
          <div style={{background:'#fff',borderRadius:14,padding:24,border:'1px solid #e5e7eb'}}>
            <div style={{fontWeight:700,fontSize:17,marginBottom:4}}>{isPharmacy?'Drug License Details':'Medical Registration'}</div>
            <p style={{color:'#6b7280',fontSize:13,marginBottom:20}}>We verify every {isPharmacy?'Drug License':'registration'} manually before approval.</p>
            {isPharmacy?(
              <>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>DRUG LICENSE NUMBER *</label>
                  <input style={{...inp,fontFamily:'monospace'}} placeholder="e.g. DL/HR/2021/XXXXX" value={license.drug_license_number} onChange={e=>setL('drug_license_number',e.target.value)} />
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>LICENSE EXPIRY DATE</label>
                  <input style={inp} type="date" value={license.drug_license_expiry} onChange={e=>setL('drug_license_expiry',e.target.value)} />
                </div>
              </>
            ):(
              <div style={{marginBottom:14}}>
                <label style={{fontSize:11,fontWeight:700,color:'#6b7280',display:'block',marginBottom:6}}>MCI / STATE COUNCIL REGISTRATION NUMBER *</label>
                <input style={{...inp,fontFamily:'monospace'}} placeholder="e.g. MCI/HR/2015/XXXXX" value={form.registration_number} onChange={e=>setF('registration_number',e.target.value)} />
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
              ⚠️ Your {isPharmacy?'Drug License':'Registration'} will be manually verified within 24 hours.
            </div>
            <button onClick={submitRegistration} disabled={loading} style={{width:'100%',padding:'12px',background:accentColor,color:'#fff',border:'none',borderRadius:8,fontSize:14,fontWeight:700,cursor:'pointer',marginBottom:8}}>
              {loading?'Submitting...':`Submit ${isPharmacy?'Pharmacy':'Doctor'} Application`}
            </button>
            <button onClick={()=>setStep(1)} style={{width:'100%',padding:'10px',background:'transparent',color:'#6b7280',border:'1px solid #e5e7eb',borderRadius:8,fontSize:13,cursor:'pointer'}}>← Back</button>
          </div>
        )}

        {step===3&&(
          <div style={{background:'#fff',borderRadius:14,padding:32,border:'1px solid #e5e7eb',textAlign:'center'}}>
            <div style={{width:72,height:72,background:'#f0fdf4',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:32}}>✅</div>
            <div style={{fontWeight:800,fontSize:20,marginBottom:8,color:'#0a3d2e'}}>Application Submitted!</div>
            <p style={{color:'#6b7280',fontSize:14,lineHeight:1.7,marginBottom:20}}>Your {isPharmacy?'Drug License':'registration'} is under review. Our team will verify within <strong>24 hours</strong> and activate your account. SMS will be sent to <strong>+91 {mobile}</strong>.</p>
            <div style={{background:'#f9fafb',borderRadius:10,padding:16,textAlign:'left',fontSize:13,marginBottom:16,border:'1px solid #e5e7eb'}}>
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
            <div style={{background:'#e5f5ef',borderRadius:10,padding:'12px 14px',fontSize:12,color:'#0a5c47',marginBottom:20,display:'flex',gap:8,alignItems:'flex-start',textAlign:'left'}}>
              <span>💡</span><span>Need faster approval? Call <strong>+91 8595501653</strong> with your details.</span>
            </div>
            <button onClick={()=>navigate('/login')} style={{width:'100%',padding:'12px',background:accentColor,color:'#fff',border:'none',borderRadius:8,fontSize:14,fontWeight:700,cursor:'pointer'}}>Go to Login →</button>
          </div>
        )}
      </div>
    </div>
  );
}
