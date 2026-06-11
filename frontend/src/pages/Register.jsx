import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

const STEPS = ['Verify Mobile', 'Pharmacy Details', 'Drug License', 'Done'];

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefill = location.state || {};

  const [step, setStep] = useState(prefill.verified ? 1 : 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [devOtp, setDevOtp] = useState('');

  const [mobile, setMobile] = useState(prefill.mobile || '');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [form, setForm] = useState({ pharmacy_name: '', owner_name: '', email: '', address: '' });
  const [license, setLicense] = useState({ drug_license_number: '', drug_license_expiry: '', file: null });

  function setF(k, v) { setForm(f => ({ ...f, [k]: v })); }
  function setL(k, v) { setLicense(l => ({ ...l, [k]: v })); }

  async function sendOTP() {
    if (mobile.length !== 10) return setError('Enter valid 10-digit mobile number');
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/send-otp', { mobile });
      if (res.data.dev_otp) setDevOtp(res.data.dev_otp);
      setOtpSent(true);
    } catch (err) { setError(err.response?.data?.error || 'Failed to send OTP'); }
    finally { setLoading(false); }
  }

  async function verifyOTP() {
    if (otp.length !== 4) return setError('Enter 4-digit OTP');
    setLoading(true); setError('');
    try {
      await api.post('/auth/verify-otp', { mobile, otp });
      setStep(1);
    } catch (err) { setError(err.response?.data?.error || 'Invalid OTP'); }
    finally { setLoading(false); }
  }

  async function submitRegistration() {
    if (!license.drug_license_number) return setError('Drug license number is required');
    setLoading(true); setError('');
    try {
      const data = new FormData();
      data.append('mobile', mobile);
      data.append('pharmacy_name', form.pharmacy_name);
      data.append('owner_name', form.owner_name);
      data.append('email', form.email);
      data.append('address', form.address);
      data.append('drug_license_number', license.drug_license_number);
      data.append('drug_license_expiry', license.drug_license_expiry);
      if (license.file) data.append('drug_license_photo', license.file);

      await api.post('/pharmacy/register', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setStep(3);
    } catch (err) { setError(err.response?.data?.error || 'Registration failed'); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '32px 24px' }}>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, background: '#0F6E56', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💊</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#0F6E56' }}>SJ Medex</span>
        </Link>

        {/* Steps */}
        <div style={{ display: 'flex', marginBottom: 28 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              {i < STEPS.length - 1 && <div style={{ position: 'absolute', top: 13, left: '60%', width: '80%', height: 1, background: i < step ? '#0F6E56' : '#e5e7eb' }} />}
              <div style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, zIndex: 1, background: i < step ? '#0F6E56' : i === step ? '#0F6E56' : '#fff', color: i <= step ? '#fff' : '#9ca3af', border: `1.5px solid ${i <= step ? '#0F6E56' : '#e5e7eb'}` }}>
                {i < step ? '✓' : i + 1}
              </div>
              <div style={{ fontSize: 10, color: i === step ? '#0F6E56' : '#9ca3af', marginTop: 5, textAlign: 'center', fontWeight: i === step ? 600 : 400 }}>{s}</div>
            </div>
          ))}
        </div>

        {error && <div className="error-msg">{error}</div>}

        {/* Step 0: Verify Mobile */}
        {step === 0 && (
          <div className="card">
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Verify your mobile</h2>
            <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>This will be your login ID</p>
            <div className="form-group">
              <label className="form-label">Mobile number</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 14, color: '#6b7280' }}>+91</div>
                <input className="form-input" type="tel" maxLength={10} placeholder="9XXXXXXXXX" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, ''))} />
              </div>
            </div>
            {otpSent && (
              <div className="form-group">
                <label className="form-label">OTP</label>
                <input className="form-input" type="number" maxLength={4} placeholder="4-digit OTP" value={otp} onChange={e => setOtp(e.target.value.slice(0, 4))} style={{ fontSize: 20, letterSpacing: 8, textAlign: 'center' }} autoFocus />
                {devOtp && <div style={{ background: '#E1F5EE', borderRadius: 6, padding: '6px 10px', fontSize: 12, color: '#085041', marginTop: 8 }}><strong>Dev OTP:</strong> {devOtp}</div>}
              </div>
            )}
            <button className="btn btn-primary" onClick={otpSent ? verifyOTP : sendOTP} disabled={loading}>
              {loading ? <><div className="spinner" /> Loading...</> : otpSent ? 'Verify OTP' : 'Send OTP'}
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 16 }}>Already registered? <Link to="/login">Login</Link></p>
          </div>
        )}

        {/* Step 1: Pharmacy Details */}
        {step === 1 && (
          <div className="card">
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Pharmacy details</h2>
            <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>Tell us about your pharmacy</p>
            <div className="form-group"><label className="form-label">Pharmacy / shop name *</label><input className="form-input" placeholder="e.g. Sharma Medical Store" value={form.pharmacy_name} onChange={e => setF('pharmacy_name', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Owner / proprietor name *</label><input className="form-input" placeholder="Full legal name" value={form.owner_name} onChange={e => setF('owner_name', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Full address</label><textarea className="form-input" rows={3} placeholder="Shop address with city & pincode" value={form.address} onChange={e => setF('address', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Email (optional)</label><input className="form-input" type="email" placeholder="for order notifications" value={form.email} onChange={e => setF('email', e.target.value)} /></div>
            <button className="btn btn-primary" onClick={() => { if (!form.pharmacy_name || !form.owner_name) return setError('Name fields are required'); setError(''); setStep(2); }}>Continue</button>
            <button className="btn btn-outline" style={{ marginTop: 8 }} onClick={() => setStep(0)}>Back</button>
          </div>
        )}

        {/* Step 2: Drug License */}
        {step === 2 && (
          <div className="card">
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Drug license documents</h2>
            <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>Required to verify your pharmacy</p>
            <div className="form-group"><label className="form-label">Drug License Number *</label><input className="form-input" placeholder="e.g. DL/DL/2021/XXXXX" value={license.drug_license_number} onChange={e => setL('drug_license_number', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">License expiry date</label><input className="form-input" type="date" value={license.drug_license_expiry} onChange={e => setL('drug_license_expiry', e.target.value)} /></div>
            <div className="form-group">
              <label className="form-label">Upload license photo</label>
              <label style={{ display: 'block', border: '2px dashed #e5e7eb', borderRadius: 8, padding: '24px', textAlign: 'center', cursor: 'pointer', color: '#6b7280', fontSize: 13, background: license.file ? '#f0fdf4' : '#fff', borderColor: license.file ? '#86efac' : '#e5e7eb' }}>
                {license.file ? (
                  <span style={{ color: '#15803d' }}>✓ {license.file.name}</span>
                ) : (
                  <><div style={{ fontSize: 28, marginBottom: 6 }}>📄</div>Tap to upload photo or PDF<br /><span style={{ fontSize: 11 }}>JPG, PNG or PDF · Max 5MB</span></>
                )}
                <input type="file" accept="image/*,.pdf" style={{ display: 'none' }} onChange={e => setL('file', e.target.files[0])} />
              </label>
            </div>
            <button className="btn btn-primary" onClick={submitRegistration} disabled={loading}>
              {loading ? <><div className="spinner" /> Submitting...</> : 'Submit Application'}
            </button>
            <button className="btn btn-outline" style={{ marginTop: 8 }} onClick={() => setStep(1)}>Back</button>
          </div>
        )}

        {/* Step 3: Done */}
        {step === 3 && (
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 28 }}>✅</div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Application submitted!</h2>
            <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>Your drug license is under review. You'll receive an SMS on +91 {mobile} once your account is approved — usually within 24 hours.</p>
            <div style={{ background: '#f9fafb', borderRadius: 8, padding: 16, textAlign: 'left', fontSize: 13, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #e5e7eb', marginBottom: 8 }}>
                <span style={{ color: '#6b7280' }}>Pharmacy</span><strong>{form.pharmacy_name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Mobile</span><span>+91 {mobile}</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>Go to login</button>
          </div>
        )}
      </div>
    </div>
  );
}
