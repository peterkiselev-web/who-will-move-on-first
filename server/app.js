require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const authRoutes = require('./routes/auth');
const checkinRoutes = require('./routes/checkins');

const app = express();

// In production on Vercel, frontend and API share the same origin so we
// open CORS to all origins. Locally ALLOWED_ORIGIN restricts to Vite dev server.
const allowedOrigin = process.env.ALLOWED_ORIGIN;
app.use(cors(allowedOrigin ? { origin: allowedOrigin, credentials: true } : {}));

app.use(express.json());

// Health check — tests DB connectivity without touching app tables.
// Hit GET /api/health in a browser to diagnose connection issues on Vercel.
app.get('/api/health', async (req, res) => {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    return res.status(500).json({ status: 'error', reason: 'POSTGRES_URL env var not set' });
  }
  try {
    const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
    await pool.query('SELECT 1');
    await pool.end();
    res.json({ status: 'ok', db: 'connected', host: new URL(url).hostname });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      reason: err.message,
      code: err.code,
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/checkins', checkinRoutes);

module.exports = app;
