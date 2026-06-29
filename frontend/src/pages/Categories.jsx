import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const CATEGORIES = [
  {
    slug: 'bp-machine-wholesaler-faridabad',
    title: 'BP Machine & Blood Pressure Monitor Wholesaler in Faridabad',
    h1: 'BP Machine Wholesaler in Faridabad & Haryana',
    icon: '🩺',
    intro: "SJ Medex supplies BP machines and digital blood pressure monitors at wholesale rates to licensed pharmacies, clinics and doctors across Faridabad, Ballabhgarh and Delhi NCR. We stock trusted brands like Dr Morepen and other certified manufacturers, all backed by GST invoices and fast local delivery.",
    points: [
      'Digital and manual BP machines at genuine wholesale pricing',
      'Bulk orders for pharmacies, clinics and hospitals',
      'GST invoice with every order — fully compliant for your accounts',
      'Same-day dispatch for orders placed before 2PM from our Ballabhgarh warehouse',
    ],
  },
  {
    slug: 'adult-diaper-wholesaler-faridabad',
    title: 'Adult Diaper Wholesaler & Bulk Supplier in Faridabad, Delhi NCR',
    h1: 'Adult Diaper Wholesaler in Faridabad & Delhi NCR',
    icon: '📦',
    intro: "We supply adult diaper pants and tape-style diapers in bulk to pharmacies and medical stores across Faridabad, Ballabhgarh and the wider Delhi NCR region. Available in M, L and XL sizes, sourced directly and priced for wholesale buyers.",
    points: [
      'Adult diaper pants and tape-style, sizes M / L / XL',
      'Bulk wholesale pricing for pharmacies and medical stores',
      'Reliable stock availability — no waiting weeks for restocks',
      'Free delivery on qualifying wholesale orders',
    ],
  },
  {
    slug: 'iv-fluid-wholesaler-haryana',
    title: 'IV Fluid Wholesaler in Haryana — NS, RL, DNS, D5% Supplier',
    h1: 'IV Fluid Wholesaler in Haryana & Delhi NCR',
    icon: '💧',
    intro: "SJ Medex is a wholesale supplier of IV fluids including Normal Saline (NS), Ringer Lactate (RL), Dextrose Normal Saline (DNS) and D5% solutions for pharmacies, clinics and small hospitals in Faridabad and across Haryana.",
    points: [
      'Normal Saline, Ringer Lactate, DNS and D5% IV fluids in stock',
      'Proper cold-chain-safe storage and handling at our facility',
      'Batch number and expiry tracking on every GST invoice',
      'Bulk pricing for clinics, nursing homes and pharmacies',
    ],
  },
  {
    slug: 'iv-set-wholesaler-faridabad',
    title: 'IV Set Wholesaler in Faridabad — Infusion Sets at Wholesale Rates',
    h1: 'IV Infusion Set Wholesaler in Faridabad',
    icon: '🔗',
    intro: "We stock IV infusion sets from trusted brands including Romsons at wholesale prices for licensed pharmacies, clinics and hospitals across Faridabad, Ballabhgarh and Delhi NCR.",
    points: [
      'IV infusion sets — economy and branded (Romsons) options',
      'Sold in bulk packs for pharmacy and clinic requirements',
      'Quality-checked stock with proper documentation',
      'Wholesale rates significantly below local retail pricing',
    ],
  },
  {
    slug: 'nebulizer-wholesaler-faridabad',
    title: 'Nebulizer Machine Wholesaler in Faridabad & Haryana',
    h1: 'Nebulizer Wholesaler in Faridabad & Haryana',
    icon: '💨',
    intro: "SJ Medex supplies nebulizer machines at wholesale rates to pharmacies and medical stores across Faridabad and Haryana, including Dr Morepen and other certified electric nebulizers.",
    points: [
      'Dr Morepen and other certified electric nebulizer machines',
      'Wholesale bulk pricing for pharmacy and clinic stock',
      'Genuine products with manufacturer warranty',
      'Fast dispatch from our Ballabhgarh warehouse',
    ],
  },
  {
    slug: 'cannula-fixer-wholesaler',
    title: 'Cannula Fixer Wholesaler in Faridabad & Haryana',
    h1: 'IV Cannula Fixer Wholesaler in Haryana',
    icon: '🩹',
    intro: "We supply IV cannula fixers in bulk to pharmacies, clinics and hospitals across Faridabad, Ballabhgarh and Delhi NCR — a key disposable item for IV line stability, available at genuine wholesale pricing.",
    points: [
      'IV cannula fixers sold in bulk packs of 100',
      'Consistent quality and adhesive performance',
      'Wholesale rates for pharmacies and healthcare facilities',
      'GST invoice and reliable supply on every order',
    ],
  },
  {
    slug: 'surgical-bandage-wholesaler-manufacturer',
    title: 'Surgical Bandage Wholesaler & Manufacturer Supplier — Faridabad',
    h1: 'Surgical Bandage Wholesaler in Faridabad & Haryana',
    icon: '🧻',
    intro: "SJ Medex supplies surgical bandages, crepe bandages and deluxe quality bandages in multiple sizes (2 inch, 3 inch, 4 inch, 6 inch) at wholesale rates for pharmacies and medical stores across Faridabad and Delhi NCR.",
    points: [
      'Deluxe quality bandages and crepe elastic bandages, sizes 2"–6"',
      'Bulk wholesale packs for pharmacies and surgical stores',
      'Sourced from reliable manufacturers (including Pouche)',
      'Competitive pricing with GST invoice included',
    ],
  },
  {
    slug: 'syringe-wholesaler-faridabad',
    title: 'Disposable Syringe Wholesaler in Faridabad & Delhi NCR',
    h1: 'Syringe Wholesaler in Faridabad & Delhi NCR',
    icon: '💉',
    intro: "We supply disposable syringes (3ml, 5ml, 10ml) at wholesale rates to pharmacies, clinics and hospitals across Faridabad, Ballabhgarh and the wider Delhi NCR region, sourced from trusted manufacturers like Hitech.",
    points: [
      'Disposable syringes — 3ml, 5ml and 10ml sizes in stock',
      'Bulk packs of 100 syringes, wholesale pricing',
      'Reliable, hygienic and quality-checked stock',
      'Fast local delivery across Faridabad and Delhi NCR',
    ],
  },
  {
    slug: 'medicine-envelope-wholesaler',
    title: 'Medicine Envelope Wholesaler & Manufacturer — Faridabad, Haryana',
    h1: 'Medicine Envelope Wholesaler in Haryana',
    icon: '✉️',
    intro: "SJ Medex supplies medicine envelopes and pouches in bulk to pharmacies across Faridabad, Ballabhgarh and Haryana, helping pharmacy owners stock up for daily dispensing needs at wholesale prices.",
    points: [
      'Medicine envelopes and pouches in bulk quantities',
      'Wholesale pricing for pharmacies and medical stores',
      'Reliable restocking — never run out during peak hours',
      'Order alongside your regular surgical and medicine supplies',
    ],
  },
  {
    slug: 'medical-equipment-wholesaler-faridabad',
    title: 'Medical Equipment Wholesaler in Faridabad, Ballabhgarh & Delhi NCR',
    h1: 'Medical Equipment Wholesaler in Faridabad',
    icon: '🏥',
    intro: "SJ Medex is a licensed wholesale distributor of medical equipment and surgical supplies serving pharmacies, clinics and doctors across Faridabad, Ballabhgarh and Delhi NCR — covering BP machines, nebulizers, glucometers, IV fluids, surgical disposables and more under one roof.",
    points: [
      'One platform for BP machines, nebulizers, glucometers, IV fluids and surgical disposables',
      'GST registered, FSSAI approved, Drug Licensed distributor',
      'Order online or call us directly for bulk pricing',
      'Serving Faridabad, Ballabhgarh and Delhi NCR with fast delivery',
    ],
  },
];

export default function CategoryPage({ slug }) {
  const cat = CATEGORIES.find(c => c.slug === slug) || CATEGORIES[CATEGORIES.length - 1];

  useEffect(() => {
    document.title = cat.title + ' | SJ Medex';
  }, [cat]);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Inter',-apple-system,sans-serif" }}>
      <style>{`*{box-sizing:border-box}a{text-decoration:none}`}</style>

      {/* TOP BAR with direct call */}
      <div style={{ background: '#0a5c47', padding: '10px 20px', textAlign: 'center' }}>
        <a href="tel:+918595501653" style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>
          📞 Call now for wholesale rates: +91 85955 01653
        </a>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px 60px' }}>
        <Link to="/" style={{ fontSize: 13, color: '#0a5c47', fontWeight: 600 }}>← Back to SJ Medex Home</Link>

        <div style={{ fontSize: 40, marginTop: 24, marginBottom: 10 }}>{cat.icon}</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0a1a14', letterSpacing: '-0.5px', marginBottom: 16, lineHeight: 1.25 }}>
          {cat.h1}
        </h1>
        <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.75, marginBottom: 28 }}>
          {cat.intro}
        </p>

        <div style={{ background: '#f9fffe', border: '1px solid #d1fae5', borderRadius: 14, padding: 24, marginBottom: 28 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#0a5c47', marginBottom: 14 }}>Why buy from SJ Medex</div>
          {cat.points.map((pt, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
              <span style={{ color: '#1DB97A', fontWeight: 700 }}>✓</span>
              <span style={{ fontSize: 13.5, color: '#374151' }}>{pt}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          <a href="tel:+918595501653" style={{ background: '#0a5c47', color: '#fff', padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: 14 }}>
            📞 Call for Wholesale Pricing
          </a>
          <Link to="/login" style={{ background: '#fff', color: '#0a5c47', padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 14, border: '1.5px solid #0a5c47' }}>
            Register & Order Online →
          </Link>
        </div>

        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.5px', marginBottom: 12 }}>EXPLORE OTHER CATEGORIES</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CATEGORIES.filter(c => c.slug !== cat.slug).map(c => (
              <Link key={c.slug} to={`/${c.slug}`} style={{ fontSize: 12.5, color: '#0a5c47', background: '#f0fdf9', padding: '6px 12px', borderRadius: 20, border: '1px solid #d1fae5' }}>
                {c.icon} {c.h1.split(' in ')[0]}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 40, fontSize: 12.5, color: '#9ca3af', lineHeight: 1.8 }}>
          SJ Medex · Rajeev Colony, Samaypur Road, Near Bansi School, Ballabhagarh, Faridabad, Haryana — 121004<br/>
          GSTIN: 06CTDPS6578R1ZJ · Drug License: WLF20B2025HR001699
        </div>
      </div>
    </div>
  );
}

export { CATEGORIES };
