import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    setLoading(true); setError('');
    try {
      const res = await api.post('/admin/login', { password });
      login(res.data.token, { role: 'admin', pharmacy_name: 'Admin' });
      navigate('/admin');
    } catch(err) { setError('Invalid password'); }
    finally { setLoading(false); }
  }

  return (
    <div style={{minHeight:'100vh',background:'#085041',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div className="card" style={{width:'100%',maxWidth:360}}>
        <div style={{textAlign:'center',marginBottom:24}}>
          <div style={{fontSize:32,marginBottom:8}}>🔐</div>
          <div style={{fontWeight:600,fontSize:18}}>SJ Medex Admin</div>
          <div style={{color:'#6b7280',fontSize:13}}>Distributor panel</div>
        </div>
        {error && <div className="error-msg">{error}</div>}
        <div className="form-group">
          <label className="form-label">Admin password</label>
          <input className="form-input" type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} autoFocus />
        </div>
        <button className="btn btn-primary" onClick={handleLogin} disabled={loading}>{loading?'Logging in...':'Login'}</button>
      </div>
    </div>
  );
}
