require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const checkinRoutes = require('./routes/checkins');

const app = express();

// In production (Vercel) frontend & API share the same origin — CORS is open.
// Locally, allow the Vite dev server on :3000.
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/checkins', checkinRoutes);

module.exports = app;
