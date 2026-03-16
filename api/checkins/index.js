/**
 * POST /api/checkins — submit today's check-in
 * Vercel serverless function — no Express dependency.
 */
const verifyAuth = require('../_auth');
const db         = require('../_db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let user;
  try {
    user = verifyAuth(req);
  } catch (err) {
    return res.status(err.status || 401).json({ error: err.message });
  }

  try {
    const { feeling, went_on_date, ex_thoughts, social_life, glow_up, diary_note } = req.body || {};
    const today = new Date().toISOString().split('T')[0];

    const existing = await db.getByUserDate(user.username, today);

    if (existing) {
      await db.update(user.username, today, {
        feeling,
        went_on_date: went_on_date ? 1 : 0,
        ex_thoughts,
        social_life,
        glow_up,
        diary_note: diary_note || null,
      });
    } else {
      await db.insert({
        user:         user.username,
        date:         today,
        feeling,
        went_on_date: went_on_date ? 1 : 0,
        ex_thoughts,
        social_life,
        glow_up,
        diary_note:   diary_note || null,
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('[/api/checkins POST]', err.message, err.code);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
};
