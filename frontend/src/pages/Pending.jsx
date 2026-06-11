import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Pending() {
  const { user, logout } = useAuth();
  return (
    <div style={{minHeight:'100vh',background:'#f9fafb',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24}}>
      <div className="card" style={{maxWidth:420,width:'100%',textAlign:'center'}}>
        <div style={{width:72,height:72,background:'#E1F5EE',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',fontSize:32}}>⏳</div>
        <h2 style={{fontSize:20,fontWeight:600,marginBottom:8}}>Verification in progress</h2>
        <p style={{color:'#6b7280',fontSize:14,lineHeight:1.6,marginBottom:20}}>Your drug license documents are being reviewed. You'll receive an SMS once approved — usually within 24 hours.</p>
        <div style={{background:'#E1F5EE',borderRadius:8,padding:'14px 16px',textAlign:'left',fontSize:13,color:'#085041',marginBottom:20}}>
          <strong>What happens next?</strong><br/>Our team verifies your Drug License Number and expiry. Once approved, you'll get full access to our wholesale catalogue.
        </div>
        <button onClick={logout} style={{background:'none',border:'none',color:'#6b7280',cursor:'pointer',fontSize:13}}>Logout</button>
      </div>
    </div>
  );
}
