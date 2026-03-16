/**
 * GET /api/checkins/today — return the current user's check-in for today
 * Vercel serverless function — no Express dependency.
 */
const verifyAuth = require('../_auth');
const db         = require('../_db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  let user;
  try {
    user = verifyAuth(req);
  } catch (err) {
    return res.status(err.status || 401).json({ error: err.message });
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    res.json(await db.getByUserDate(user.username, today));
  } catch (err) {
    console.error('[/api/checkins/today GET]', err.message, err.code);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
};
