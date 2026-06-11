const pool = require('./db');

// Generate random 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Save OTP to DB (expires in 10 minutes)
async function saveOTP(mobile, otp) {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await pool.query(
    `INSERT INTO otp_store (mobile, otp, expires_at) VALUES ($1, $2, $3)`,
    [mobile, otp, expiresAt]
  );
}

// Send OTP via MSG91
async function sendOTPviaMSG91(mobile, otp) {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;
  const senderId = process.env.MSG91_SENDER_ID || 'SJMEDX';

  const url = `https://api.msg91.com/api/v5/otp?template_id=${templateId}&mobile=91${mobile}&authkey=${authKey}&otp=${otp}&sender=${senderId}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Main: generate, save, send OTP
async function sendOTP(mobile) {
  const otp = generateOTP();
  await saveOTP(mobile, otp);

  // If MSG91 keys are configured, send real SMS
  if (process.env.MSG91_AUTH_KEY && process.env.MSG91_TEMPLATE_ID) {
    try {
      await sendOTPviaMSG91(mobile, otp);
      console.log(`OTP sent via MSG91 to ${mobile}`);
    } catch (err) {
      console.error('MSG91 send error:', err.message);
      // Fall through — OTP still saved in DB, log it for dev
      console.log(`[DEV FALLBACK] OTP for ${mobile}: ${otp}`);
    }
  } else {
    // Dev mode: just log the OTP
    console.log(`[DEV MODE] OTP for ${mobile}: ${otp}`);
  }

  return otp; // Only returned in dev/test; don't send in API response
}

// Verify OTP
async function verifyOTP(mobile, otp) {
  const result = await pool.query(
    `SELECT * FROM otp_store
     WHERE mobile = $1 AND otp = $2 AND used = FALSE AND expires_at > NOW()
     ORDER BY created_at DESC LIMIT 1`,
    [mobile, otp]
  );

  if (result.rows.length === 0) return false;

  // Mark as used
  await pool.query(
    `UPDATE otp_store SET used = TRUE WHERE id = $1`,
    [result.rows[0].id]
  );

  return true;
}

module.exports = { sendOTP, verifyOTP };
