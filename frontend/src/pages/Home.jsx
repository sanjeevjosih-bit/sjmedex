import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
    <rect width="38" height="38" rx="9" fill="#2563EB"/>
    <rect x="17" y="6" width="4" height="26" rx="2" fill="white"/>
    <rect x="6" y="17" width="26" height="4" rx="2" fill="white"/>
  </svg>
);

const CATEGORIES = [
  { slug: 'bp-machine-wholesaler-faridabad', icon: '🩺', label: 'BP Machines' },
  { slug: 'adult-diaper-wholesaler-faridabad', icon: '📦', label: 'Adult Diapers' },
  { slug: 'iv-fluid-wholesaler-haryana', icon: '💧', label: 'IV Fluids' },
  { slug: 'iv-set-wholesaler-faridabad', icon: '🔗', label: 'IV Sets' },
  { slug: 'nebulizer-wholesaler-faridabad', icon: '💨', label: 'Nebulizers' },
  { slug: 'cannula-fixer-wholesaler', icon: '🩹', label: 'Cannula Fixers' },
  { slug: 'surgical-bandage-wholesaler-manufacturer', icon: '🧻', label: 'Surgical Bandages' },
  { slug: 'syringe-wholesaler-faridabad', icon: '💉', label: 'Syringes' },
  { slug: 'medicine-envelope-wholesaler', icon: '✉️', label: 'Medicine Envelopes' },
  { slug: 'medical-equipment-wholesaler-faridabad', icon: '🏥', label: 'All Equipment' },
];

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [regType, setRegType] = useState('pharmacy');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.status === 'approved') navigate('/dashboard');
      else navigate('/pending');
    }
  }, [user]);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Inter',-apple-system,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        a{text-decoration:none}
        body{-webkit-text-size-adjust:100%}
        .container{max-width:1140px;margin:0 auto;padding:0 20px}
        .hero-grid{display:grid;grid-template-columns:1fr 420px;gap:60px;align-items:center}
        .cat-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
        .feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
        .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        .foot-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:40px}
        .hide-mob{display:flex}
        .show-mob{display:none}
        @media(max-width:900px){
          .hero-grid{grid-template-columns:1fr!important;gap:32px!important}
          .reg-card-wrap{display:none!important}
          .show-mob{display:flex!important}
          .hide-mob{display:none!important}
          .cat-grid{grid-template-columns:repeat(3,1fr)!important}
          .feat-grid,.steps-grid,.testi-grid{grid-template-columns:1fr!important}
          .trust-grid{grid-template-columns:repeat(2,1fr)!important}
          .foot-grid{grid-template-columns:1fr!important;gap:24px!important}
          .hero-title{font-size:32px!important;letter-spacing:-0.5px!important}
          .section-pad{padding:48px 20px!important}
          .nav-inner{padding:0 16px!important}
        }
        @media(max-width:500px){
          .cat-grid{grid-template-columns:repeat(2,1fr)!important}
          .trust-grid{grid-template-columns:1fr 1fr!important}
        }
        .btn-primary{background:#2563EB;color:#fff;padding:13px 28px;borderRadius:9px;fontWeight:700;fontSize:14px;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:8px;transition:background 0.15s}
        .btn-primary:hover{background:#1d4ed8}
        .btn-outline{background:#fff;color:#2563EB;padding:12px 24px;border-radius:9px;fontWeight:600;fontSize:14px;cursor:pointer;border:1.5px solid #2563EB;display:inline-flex;align-items:center;gap:8px;transition:all 0.15s}
        .btn-outline:hover{background:#eff6ff}
        .card{background:#fff;border:1px solid #e8eaed;border-radius:14px;transition:box-shadow 0.18s,transform 0.15s}
        .card:hover{box-shadow:0 8px 24px rgba(0,0,0,0.07);transform:translateY(-2px)}
        .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase}
      `}</style>

      {/* TOP ANNOUNCEMENT BAR */}
      <div style={{ background: '#1e3a5f', padding: '8px 20px', textAlign: 'center' }}>
        <span style={{ color: '#93c5fd', fontSize: 12, fontWeight: 500 }}>
          🎉 Now accepting online payments via UPI, Cards & Net Banking ·{' '}
          <a href="tel:+918595501653" style={{ color: '#fff', fontWeight: 700 }}>Call +91 85955 01653</a>
        </span>
      </div>

      {/* NAVBAR */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e8eaed', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 0 #e8eaed' }}>
        <div className="nav-inner" style={{ maxWidth: 1140, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', height: 62, gap: 32 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo />
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: '#0f172a', letterSpacing: '-0.3px' }}>SJ Medex</div>
              <div style={{ fontSize: 9, color: '#94a3b8', letterSpacing: '1px', fontWeight: 500 }}>WHOLESALE MEDICAL PLATFORM</div>
            </div>
          </Link>

          <div className="hide-mob" style={{ flex: 1, gap: 6 }}>
            {[
              ['What We Supply', '#categories'],
              ['Why Us', '#why'],
              ['How It Works', '#how'],
              ['Contact', '#contact'],
            ].map(([l, h]) => (
              <a key={l} href={h} style={{ fontSize: 13.5, color: '#475569', fontWeight: 500, padding: '6px 12px', borderRadius: 7 }}>{l}</a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link to="/login" className="hide-mob" style={{ fontSize: 13.5, color: '#2563EB', fontWeight: 600, padding: '8px 18px', borderRadius: 8, border: '1px solid #bfdbfe', background: '#eff6ff' }}>Sign In</Link>
            <Link to="/register" style={{ background: '#2563EB', color: '#fff', padding: '9px 20px', borderRadius: 8, fontSize: 13.5, fontWeight: 700 }}>Register Free</Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="show-mob" style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#475569', padding: 4 }}>☰</button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid #f1f5f9', padding: '12px 16px 16px' }}>
            {[['Sign In', '/login'], ['Register Free', '/register'], ['Admin', '/admin/login']].map(([l, h]) => (
              <Link key={l} to={h} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '11px 12px', fontSize: 14, color: '#0f172a', fontWeight: 500, borderBottom: '1px solid #f1f5f9' }}>{l}</Link>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #f8faff 0%, #eff6ff 50%, #f0f9ff 100%)', padding: '72px 20px 64px', borderBottom: '1px solid #e0e7ff' }}>
        <div className="container">
          <div className="hero-grid">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#dbeafe', padding: '5px 14px', borderRadius: 20, marginBottom: 22 }}>
                <span style={{ width: 6, height: 6, background: '#2563EB', borderRadius: '50%', display: 'inline-block' }}></span>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: '#1d4ed8', letterSpacing: '0.3px' }}>GSTIN · FSSAI · DRUG LICENSED · EST. 2025</span>
              </div>

              <h1 className="hero-title" style={{ fontSize: 46, fontWeight: 900, color: '#0f172a', lineHeight: 1.08, letterSpacing: '-1.5px', marginBottom: 20 }}>
                India's Local B2B<br />
                <span style={{ color: '#2563EB' }}>Medical Wholesale</span><br />
                Platform
              </h1>

              <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.75, marginBottom: 28, maxWidth: 460 }}>
                Order surgical supplies, IV fluids, BP machines, syringes and more at guaranteed wholesale rates. Serving licensed pharmacies and doctors across Faridabad, Ballabhgarh and Delhi NCR.
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
                <Link to="/register?type=pharmacy" className="btn-primary">
                  🏥 Register as Pharmacy
                </Link>
                <Link to="/register?type=doctor" className="btn-outline">
                  👨‍⚕️ Register as Doctor
                </Link>
              </div>

              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {['Free registration', 'Approved in 24hrs', 'GST invoices', 'Free delivery'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: '#64748b' }}>
                    <span style={{ color: '#2563EB', fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </div>

            {/* REGISTER CARD */}
            <div className="reg-card-wrap">
              <div style={{ background: '#fff', borderRadius: 18, padding: 28, boxShadow: '0 4px 40px rgba(37,99,235,0.12)', border: '1px solid #e0e7ff' }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a', marginBottom: 4 }}>Get started — it's free</div>
                <p style={{ fontSize: 12.5, color: '#94a3b8', marginBottom: 18 }}>Approved within 24 hours · No fees ever</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                  <button onClick={() => setRegType('pharmacy')} style={{ padding: '11px 8px', borderRadius: 9, border: `2px solid ${regType === 'pharmacy' ? '#2563EB' : '#e2e8f0'}`, background: regType === 'pharmacy' ? '#eff6ff' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 12.5, color: regType === 'pharmacy' ? '#2563EB' : '#64748b', textAlign: 'center' }}>
                    🏥<br /><span style={{ fontSize: 11, marginTop: 3, display: 'block' }}>Pharmacy</span>
                  </button>
                  <button onClick={() => setRegType('doctor')} style={{ padding: '11px 8px', borderRadius: 9, border: `2px solid ${regType === 'doctor' ? '#2563EB' : '#e2e8f0'}`, background: regType === 'doctor' ? '#eff6ff' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 12.5, color: regType === 'doctor' ? '#2563EB' : '#64748b', textAlign: 'center' }}>
                    👨‍⚕️<br /><span style={{ fontSize: 11, marginTop: 3, display: 'block' }}>Doctor/Clinic</span>
                  </button>
                </div>

                <Link to={`/register?type=${regType}`} style={{ display: 'block', background: '#2563EB', color: '#fff', padding: '13px', borderRadius: 9, fontSize: 14, fontWeight: 700, textAlign: 'center', marginBottom: 10, boxShadow: '0 2px 12px rgba(37,99,235,0.25)' }}>
                  Register as {regType === 'pharmacy' ? 'Pharmacy' : 'Doctor/Clinic'} →
                </Link>
                <Link to="/login" style={{ display: 'block', background: '#f8fafc', color: '#475569', padding: '11px', borderRadius: 9, fontSize: 13.5, fontWeight: 500, textAlign: 'center', border: '1px solid #e2e8f0' }}>
                  Already registered? Sign in →
                </Link>

                <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 8, fontWeight: 700, letterSpacing: '0.5px' }}>VERIFIED REGISTRATIONS</div>
                  {[['GST', '06CTDPS6578R1ZJ'], ['FSSAI', '20826004000806'], ['Drug Lic', 'WLF20B2025HR001699']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
                      <span style={{ color: '#94a3b8' }}>{k}</span>
                      <span style={{ fontFamily: 'monospace', color: '#2563EB', fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE LOGIN BUTTON */}
          <div className="show-mob" style={{ marginTop: 20 }}>
            <Link to="/login" style={{ display: 'block', background: '#fff', color: '#2563EB', padding: '12px', borderRadius: 9, fontSize: 14, fontWeight: 600, textAlign: 'center', border: '1.5px solid #2563EB' }}>
              Already registered? Sign in →
            </Link>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{ background: '#1e3a5f', padding: '20px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
          {[['500+', 'Licensed Members'], ['Est. 2025', 'Serving Since'], ['Haryana & Delhi NCR', 'Service Area'], ['₹0', 'Registration Fee'], ['GST Invoice', 'Every Order']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '4px 16px' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{n}</div>
              <div style={{ fontSize: 11, color: '#93c5fd', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT WE SUPPLY */}
      <div id="categories" className="section-pad" style={{ padding: '64px 20px', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', letterSpacing: '2px', marginBottom: 8 }}>WHAT WE SUPPLY</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>Wholesale rates on every category</h2>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map(c => (
              <Link key={c.slug} to={`/${c.slug}`} className="card" style={{ padding: '20px 12px', textAlign: 'center', display: 'block' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0f172a', lineHeight: 1.3 }}>{c.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div id="why" className="section-pad" style={{ padding: '64px 20px', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', letterSpacing: '2px', marginBottom: 8 }}>WHY SJ MEDEX</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 10 }}>Everything your pharmacy needs</h2>
            <p style={{ color: '#64748b', fontSize: 15, maxWidth: 500 }}>Pharmacies on SJ Medex save ₹15,000–₹40,000 per month compared to local distributors.</p>
          </div>
          <div className="feat-grid">
            {[
              { icon: '💸', title: 'Save Rs.15K–40K/month', desc: 'Wholesale prices 20–35% lower than local market rates, verified by our existing members.', tag: 'TOP REASON', tagBg: '#fee2e2', tagColor: '#dc2626' },
              { icon: '⚡', title: 'Order in 2 Minutes', desc: 'No calls, no waiting. Browse products, add to cart, place order. Same-day dispatch before 2PM.', tag: 'SAVES TIME', tagBg: '#dcfce7', tagColor: '#15803d' },
              { icon: '📄', title: 'Proper GST Invoices', desc: 'Every order includes a valid GST invoice. Claim input tax credit and stay 100% compliant.', tag: 'STAY LEGAL', tagBg: '#dbeafe', tagColor: '#1d4ed8' },
              { icon: '🚚', title: 'Free Delivery', desc: 'Free delivery on all wholesale orders within Faridabad and Delhi NCR — no minimum threshold.', tag: 'FREE', tagBg: '#f3e8ff', tagColor: '#7c3aed' },
              { icon: '🔒', title: 'Verified Members Only', desc: 'Every Drug License and MCI registration is manually verified before activation. Zero fake accounts.', tag: 'TRUSTED', tagBg: '#fef9c3', tagColor: '#92400e' },
              { icon: '💳', title: 'Flexible Payments', desc: 'Pay online via UPI, cards or net banking, or choose Cash on Delivery — your choice every order.', tag: 'FLEXIBLE', tagBg: '#e0f2fe', tagColor: '#0369a1' },
            ].map(c => (
              <div key={c.title} className="card" style={{ padding: 24 }}>
                <div style={{ display: 'inline-block', background: c.tagBg, color: c.tagColor, fontSize: 9.5, fontWeight: 700, padding: '3px 10px', borderRadius: 20, marginBottom: 14, letterSpacing: '0.5px' }}>{c.tag}</div>
                <div style={{ fontSize: 30, marginBottom: 12 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', marginBottom: 8 }}>{c.title}</div>
                <div style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.7 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how" className="section-pad" style={{ padding: '64px 20px', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', letterSpacing: '2px', marginBottom: 8 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>Start ordering in 3 steps</h2>
          </div>
          <div className="steps-grid">
            {[
              { n: '01', icon: '📱', title: 'Register with Google', desc: 'Sign in with your Google account, choose pharmacy or doctor, and complete your profile in 2 minutes. Completely free.' },
              { n: '02', icon: '📄', title: 'Upload Your License', desc: 'Pharmacy: upload Drug License. Doctor: upload MCI registration. Our team verifies within 24 hours.' },
              { n: '03', icon: '💰', title: 'Order & Save', desc: 'Browse 56+ products at wholesale rates. Add to cart, choose payment method, place order.' },
            ].map(s => (
              <div key={s.n} className="card" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -8, right: 14, fontSize: 72, fontWeight: 900, color: '#f1f5f9', lineHeight: 1, fontFamily: 'monospace' }}>{s.n}</div>
                <div style={{ fontSize: 30, marginBottom: 14, position: 'relative' }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15.5, color: '#0f172a', marginBottom: 8, position: 'relative' }}>{s.title}</div>
                <div style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.7, position: 'relative' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRUST SIGNALS */}
      <div style={{ padding: '64px 20px', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', letterSpacing: '2px', marginBottom: 8 }}>100% VERIFIED</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>Government registered. Nothing to hide.</h2>
          </div>
          <div className="trust-grid">
            {[
              { icon: '🏛️', label: 'GST', value: '06CTDPS6578R1ZJ', sub: 'Haryana · Active', bg: '#f0fdf4', border: '#bbf7d0' },
              { icon: '🧾', label: 'FSSAI', value: '20826004000806', sub: 'Food Safety · Valid', bg: '#eff6ff', border: '#bfdbfe' },
              { icon: '💊', label: 'Drug License', value: 'WLF20B2025HR001699', sub: 'Wholesale Only', bg: '#fefce8', border: '#fde68a' },
              { icon: '📋', label: 'PAN', value: 'CTDPS6578R', sub: 'Income Tax · Verified', bg: '#fdf4ff', border: '#e9d5ff' },
            ].map(c => (
              <div key={c.label} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 14, padding: 18, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 10, right: 10, fontSize: 9, fontWeight: 700, color: '#15803d', background: '#dcfce7', padding: '2px 7px', borderRadius: 20 }}>✓ VERIFIED</div>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 11.5, color: '#0f172a', marginBottom: 3 }}>{c.value}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ padding: '64px 20px', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', letterSpacing: '2px', marginBottom: 8 }}>TRUSTED BY MEMBERS</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>What pharmacies say about us</h2>
          </div>
          <div className="testi-grid">
            {[
              { name: 'Luv Medical Store', loc: 'Faridabad, Haryana', text: 'Prices are genuinely 25-30% lower than local suppliers. GST invoices make accounting so much easier.' },
              { name: 'Gaurav Medical Store', loc: 'Ballabhgarh, Haryana', text: 'Verification process gave me confidence it\'s a legitimate platform. Surgical supplies quality is excellent.' },
              { name: 'Goyal Medical Store', loc: 'NIT Faridabad, Haryana', text: 'Saving significantly every month. Platform works perfectly on mobile, very easy to use.' },
            ].map(t => (
              <div key={t.name} className="card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>{'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#f59e0b', fontSize: 15 }}>{s}</span>)}</div>
                <p style={{ fontSize: 13.5, color: '#374151', lineHeight: 1.75, marginBottom: 18, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, background: '#eff6ff', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏥</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{t.name}</div>
                    <div style={{ fontSize: 11.5, color: '#94a3b8' }}>{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA + CONTACT */}
      <div id="contact" style={{ background: '#1e3a5f', padding: '64px 20px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: '-0.5px', marginBottom: 12 }}>Ready to save on every order?</h2>
          <p style={{ color: '#93c5fd', fontSize: 15, marginBottom: 28, lineHeight: 1.7 }}>
            Join 500+ pharmacies and doctors across Haryana and Delhi NCR.<br />
            📍 Rajeev Colony, Ballabhgarh, Faridabad — 121004
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
            <Link to="/register?type=pharmacy" style={{ background: '#2563EB', color: '#fff', padding: '14px 28px', borderRadius: 9, fontSize: 14.5, fontWeight: 700 }}>🏥 Register as Pharmacy</Link>
            <Link to="/register?type=doctor" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: 9, fontSize: 14.5, fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.25)' }}>👨‍⚕️ Register as Doctor</Link>
          </div>
          <a href="tel:+918595501653" style={{ color: '#93c5fd', fontSize: 14, fontWeight: 500 }}>📞 Or call us: +91 85955 01653</a>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#0f172a', padding: '48px 20px 28px' }}>
        <div className="container">
          <div className="foot-grid" style={{ marginBottom: 36 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <Logo />
                <div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>SJ Medex</div>
                  <div style={{ color: '#64748b', fontSize: 9, letterSpacing: '1px' }}>WHOLESALE MEDICAL PLATFORM</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.9, marginBottom: 12 }}>
                Rajeev Colony, Samaypur Road,<br />
                Near Bansi School, Ballabhagarh<br />
                Faridabad, Haryana — 121004
              </p>
              <a href="mailto:sjmedex@gmail.com" style={{ fontSize: 13, color: '#3b82f6' }}>sjmedex@gmail.com</a>
            </div>
            <div>
              <div style={{ color: '#64748b', fontWeight: 600, fontSize: 10, marginBottom: 14, letterSpacing: '1px' }}>REGISTRATIONS</div>
              {[['GSTIN', '06CTDPS6578R1ZJ'], ['PAN', 'CTDPS6578R'], ['FSSAI', '20826004000806'], ['Drug Lic 1', 'WLF20B2025HR001699'], ['Drug Lic 2', 'WLF21B2025HR001693']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 7 }}>
                  <span style={{ color: '#475569' }}>{k}</span>
                  <span style={{ color: '#3b82f6', fontFamily: 'monospace', fontWeight: 600, fontSize: 10.5 }}>{v}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: '#64748b', fontWeight: 600, fontSize: 10, marginBottom: 14, letterSpacing: '1px' }}>CONTACT & SUPPORT</div>
              <a href="tel:+918595501653" style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#3b82f6', fontSize: 13.5, marginBottom: 10 }}>📞 +91 8595501653</a>
              <a href="mailto:sjmedex@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#3b82f6', fontSize: 13.5, marginBottom: 10 }}>✉️ sjmedex@gmail.com</a>
              <div style={{ fontSize: 12, color: '#475569' }}>Mon–Sat · 9AM to 6PM IST</div>
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 10, color: '#475569', marginBottom: 8, fontWeight: 600 }}>QUICK LINKS</div>
                {CATEGORIES.slice(0, 5).map(c => (
                  <Link key={c.slug} to={`/${c.slug}`} style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 5 }}>{c.icon} {c.label} Wholesale</Link>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ fontSize: 11.5, color: '#475569' }}>© 2025 SJ Medex · GSTIN: 06CTDPS6578R1ZJ · All rights reserved.</div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {['GST Registered', 'FSSAI Approved', 'Drug Licensed'].map(b => (
                <div key={b} style={{ fontSize: 10.5, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 4, height: 4, background: '#2563EB', borderRadius: '50%', display: 'inline-block' }}></span>{b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
