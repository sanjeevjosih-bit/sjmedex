# SJ Medex — Setup Guide

## Project Structure
```
sjmedex/
├── backend/
│   ├── server.js          ← Express API (all routes)
│   ├── db.js              ← PostgreSQL connection
│   ├── otpService.js      ← OTP send + verify (MSG91)
│   ├── uploadService.js   ← Cloudinary file uploads
│   ├── middleware.js      ← JWT auth middleware
│   ├── db_setup.sql       ← Run this in Neon SQL Editor
│   └── .env.example       ← Copy to .env and fill in
└── frontend/
    └── src/
        ├── pages/         ← All screens
        ├── components/    ← Navbar
        ├── context/       ← Auth state
        └── api.js         ← Axios with token
```

---

## Step 1 — Create database (Neon)

1. Go to https://neon.tech and create a project called `sjmedex`
2. Open the SQL Editor
3. Paste and run the contents of `backend/db_setup.sql`
4. Copy your connection string — looks like:
   `postgresql://user:password@ep-xxx.neon.tech/sjmedex`

---

## Step 2 — Configure environment

Copy `.env.example` to `.env` inside the `backend/` folder:

```
DATABASE_URL=your_neon_connection_string
JWT_SECRET=pick_any_long_random_string_here
ADMIN_PASSWORD=sjmedex@admin2025
PORT=5000

# Leave these blank for now — OTP will be logged to console
MSG91_AUTH_KEY=
MSG91_TEMPLATE_ID=

# Leave blank for now — file upload will be skipped gracefully
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Step 3 — Run locally (test)

```bash
# Backend
cd backend
npm install
node server.js

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 — OTP will print in the backend terminal.

---

## Step 4 — Deploy on Render

1. Push this whole folder to GitHub
2. Go to https://render.com → New Web Service
3. Connect your GitHub repo
4. Settings:
   - **Build command:** `npm run build`
   - **Start command:** `node backend/server.js`
   - **Environment:** Node
5. Add Environment Variables (same as your .env)
6. Deploy!

---

## Step 5 — Add MSG91 for real SMS OTP

1. Sign up at https://msg91.com
2. Create an OTP template (must contain `##OTP##`)
3. Copy your Auth Key and Template ID
4. Add to your Render environment variables:
   - `MSG91_AUTH_KEY`
   - `MSG91_TEMPLATE_ID`

---

## Step 6 — Add Cloudinary for drug license uploads

1. Sign up at https://cloudinary.com (free tier = 25GB)
2. Go to Dashboard → copy Cloud Name, API Key, API Secret
3. Add to Render environment variables

---

## Admin Panel

Go to `/admin/login` and use the password from `ADMIN_PASSWORD`.

From admin you can:
- ✅ Approve / reject pharmacy registrations
- 📦 Add / remove products, toggle stock
- 🧾 Update order status (pending → processing → shipped → delivered)
- 📊 View analytics

---

## PWA (Home Screen Install)

The app is PWA-ready. Once deployed:
- On Android Chrome: banner appears automatically
- On iPhone Safari: Share → Add to Home Screen
- Users see the SJ Medex icon on their phone

Add your own 192×192 and 512×512 PNG icons as:
- `frontend/public/icon-192.png`
- `frontend/public/icon-512.png`
