import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const GOOGLE_CLIENT_ID = '1007931042684-65eqpp3bi2ussf9e4c1d9u9ts2n0ho7u.apps.googleusercontent.com';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const buttonRef = useRef(null);
  const params = new URLSearchParams(location.search);
  const regType = params.get('type'); // pharmacy or doctor, if user clicked Register on homepage

  useEffect(() => {
    function initGoogle() {
      if (!window.google || !buttonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        width: 320,
        text: 'continue_with',
      });
    }

    if (window.google) {
      initGoogle();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initGoogle;
      document.body.appendChild(script);
    }
  }, []);

  async function handleGoogleResponse(response) {
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/google', { id_token: response.credential });
      if (res.data.status === 'new_user') {
        const typeParam = regType ? `?type=${regType}` : '';
        navigate(`/register${typeParam}`, { state: { email: res.data.email, name: res.data.name, google_id: res.data.google_id } });
        return;
      }
      login(res.data.token, res.data.pharmacy);
      if (res.data.pharmacy.status === 'approved') navigate('/dashboard');
      else navigate('/pending');
    } catch (err) {
      setError(err.response?.data?.error || 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, textDecoration: 'none' }}>
        <div style={{ width: 36, height: 36, background: '#0F6E56', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>💊</div>
        <span style={{ fontWeight: 700, fontSize: 18, color: '#0F6E56' }}>SJ Medex</span>
      </Link>

      <div className="card" style={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{regType ? 'Get started with SJ Medex' : 'Welcome back'}</h2>
        <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 28 }}>
          {regType ? 'Sign in with Google to begin your registration' : 'Sign in with Google to access your account'}
        </p>

        {error && <div className="error-msg" style={{ marginBottom: 16, textAlign: 'left' }}>{error}</div>}

        {loading && (
          <div style={{ marginBottom: 16, color: '#6b7280', fontSize: 13 }}>
            <div className="spinner" style={{ display: 'inline-block', marginRight: 8 }} /> Signing you in...
          </div>
        )}

        <div ref={buttonRef} style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}></div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 24 }}>
          New pharmacy or clinic? Just sign in with Google above — <br />we'll guide you through a quick registration.
        </p>
      </div>
    </div>
  );
}
