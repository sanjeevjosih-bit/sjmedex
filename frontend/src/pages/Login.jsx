import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('mobile'); // mobile | otp
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSendOTP() {
    if (mobile.length !== 10) return setError('Enter a valid 10-digit mobile number');
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/send-otp', { mobile });
      if (res.data.dev_otp) setDevOtp(res.data.dev_otp); // dev mode hint
      setStep('otp');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    } finally { setLoading(false); }
  }

  async function handleVerifyOTP() {
    if (otp.length !== 4) return setError('Enter the 4-digit OTP');
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/verify-otp', { mobile, otp });
      if (res.data.status === 'new_user') {
        navigate('/register', { state: { mobile, verified: true } });
        return;
      }
      login(res.data.token, res.data.pharmacy);
      if (res.data.pharmacy.status === 'approved') navigate('/dashboard');
      else navigate('/pending');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP');
    } finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, textDecoration: 'none' }}>
        <div style={{ width: 36, height: 36, background: '#0F6E56', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>💊</div>
        <span style={{ fontWeight: 700, fontSize: 18, color: '#0F6E56' }}>SJ Medex</span>
      </Link>

      <div className="card" style={{ width: '100%', maxWidth: 400 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Welcome back</h2>
        <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 24 }}>
          {step === 'mobile' ? 'Enter your registered mobile number' : `OTP sent to +91 ${mobile}`}
        </p>

        {error && <div className="error-msg">{error}</div>}

        {step === 'mobile' ? (
          <>
            <div className="form-group">
              <label className="form-label">Mobile number</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 14, color: '#6b7280', whiteSpace: 'nowrap' }}>+91</div>
                <input className="form-input" type="tel" maxLength={10} placeholder="9XXXXXXXXX" value={mobile}
                  onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={e => e.key === 'Enter' && handleSendOTP()} />
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleSendOTP} disabled={loading}>
              {loading ? <><div className="spinner" /> Sending...</> : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label className="form-label">Enter OTP</label>
              <input className="form-input" type="number" maxLength={4} placeholder="4-digit OTP"
                value={otp} onChange={e => setOtp(e.target.value.slice(0, 4))}
                onKeyDown={e => e.key === 'Enter' && handleVerifyOTP()}
                style={{ fontSize: 20, letterSpacing: 8, textAlign: 'center' }} autoFocus />
            </div>
            {devOtp && (
              <div style={{ background: '#E1F5EE', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#085041', marginBottom: 14 }}>
                <strong>Dev mode — OTP:</strong> {devOtp}
              </div>
            )}
            <button className="btn btn-primary" onClick={handleVerifyOTP} disabled={loading}>
              {loading ? <><div className="spinner" /> Verifying...</> : 'Verify & Login'}
            </button>
            <div className="divider">or</div>
            <button style={{ background: 'none', border: 'none', color: '#0F6E56', cursor: 'pointer', fontSize: 13, width: '100%' }}
              onClick={() => { setStep('mobile'); setOtp(''); setError(''); }}>
              ← Change number
            </button>
          </>
        )}

        <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 20 }}>
          New pharmacy? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
