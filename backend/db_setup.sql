-- Run this in your Neon SQL Editor

CREATE TABLE IF NOT EXISTS pharmacies (
  id SERIAL PRIMARY KEY,
  pharmacy_name VARCHAR(200) NOT NULL,
  owner_name VARCHAR(200) NOT NULL,
  mobile VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(200),
  address TEXT,
  drug_license_number VARCHAR(100),
  drug_license_expiry DATE,
  drug_license_photo_url TEXT,
  status VARCHAR(20) DEFAULT 'pending',  -- pending | approved | rejected
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS otp_store (
  id SERIAL PRIMARY KEY,
  mobile VARCHAR(15) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  manufacturer VARCHAR(200),
  category VARCHAR(50),         -- medicine | surgical | injectable
  price NUMERIC(10,2) NOT NULL,
  unit VARCHAR(100),
  min_order INT DEFAULT 1,
  in_stock BOOLEAN DEFAULT TRUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(20) UNIQUE NOT NULL,
  pharmacy_id INT REFERENCES pharmacies(id),
  items JSONB NOT NULL,          -- [{product_id, name, qty, price}]
  subtotal NUMERIC(10,2),
  delivery_charge NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2),
  status VARCHAR(30) DEFAULT 'pending',  -- pending | processing | shipped | delivered | cancelled
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Seed some products
INSERT INTO products (name, manufacturer, category, price, unit, min_order) VALUES
('Paracetamol 500mg', 'Cipla Ltd', 'medicine', 42, 'strip of 10', 10),
('Amoxicillin 250mg', 'Sun Pharma', 'medicine', 89, 'strip of 10', 5),
('Cetirizine 10mg', 'Mankind', 'medicine', 35, 'strip of 15', 10),
('Surgical Gloves (L)', 'Hindustan Syringes', 'surgical', 180, 'box of 100', 5),
('IV Cannula 22G', 'Romsons', 'surgical', 420, 'box of 50', 5),
('Metformin 500mg', 'USV Ltd', 'medicine', 56, 'strip of 15', 10),
('Dextrose 5% 500ml', 'Baxter', 'injectable', 95, 'bottle', 12),
('Disposable Syringe 5ml', 'Becton Dickinson', 'surgical', 210, 'box of 100', 5),
('Atorvastatin 10mg', 'Zydus', 'medicine', 78, 'strip of 10', 10),
('Normal Saline 500ml', 'Fresenius Kabi', 'injectable', 88, 'bottle', 12)
ON CONFLICT DO NOTHING;
