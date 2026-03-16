/**
 * GET /api/checkins/dashboard — aggregated stats for both users
 * Vercel serverless function — no Express dependency.
 */
const verifyAuth = require('../_auth');
const db         = require('../_db');
const { calcEntryScore, calcStreak, calcStats } = require('../_calc');

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
    const all      = await db.getAll();
    const peter    = all.filter(e => e.user === 'peter');
    const niloufar = all.filter(e => e.user === 'niloufar');

    const avgScore = (entries) => {
      if (!entries.length) return 0;
      return Math.round(entries.map(calcEntryScore).reduce((a, b) => a + b, 0) / entries.length);
    };

    const recentNotes = (entries) =>
      entries.filter(e => e.diary_note).slice(0, 3).map(e => ({
        date: typeof e.date === 'string' ? e.date.split('T')[0] : e.date,
        note: e.diary_note,
      }));

    const today          = new Date().toISOString().split('T')[0];
    const checkedInToday = all.some(e => {
      const d = typeof e.date === 'string' ? e.date.split('T')[0] : e.date;
      return e.user === user.username && d === today;
    });

    res.json({
      peter: {
        score:        avgScore(peter),
        streak:       calcStreak(peter),
        stats:        calcStats(peter),
        recentNotes:  recentNotes(peter),
        totalEntries: peter.length,
      },
      niloufar: {
        score:        avgScore(niloufar),
        streak:       calcStreak(niloufar),
        stats:        calcStats(niloufar),
        recentNotes:  recentNotes(niloufar),
        totalEntries: niloufar.length,
      },
      currentUser:    user.username,
      checkedInToday,
    });
  } catch (err) {
    console.error('[/api/checkins/dashboard GET]', err.message, err.code);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
};
