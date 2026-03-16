/**
 * This file is no longer used as a Vercel entry point.
 * Routes are now handled by individual serverless functions:
 *   POST /api/auth/login         → api/auth/login.js
 *   POST /api/checkins           → api/checkins/index.js
 *   GET  /api/checkins/today     → api/checkins/today.js
 *   GET  /api/checkins/dashboard → api/checkins/dashboard.js
 *   GET  /api/health             → api/health.js
 */
module.exports = (req, res) => {
  res.status(404).json({ error: 'Use /api/auth/login or /api/checkins endpoints' });
};
