const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No authorization header' });
  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-in-prod');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Score formula: max 100
// feeling(1-10)*3=30, date=15, ex_thoughts(never=25,once=15,few=8,alot=0), social(stayed=0,out=8,great=15), glow(1-10)*1.5=15
function calcEntryScore(entry) {
  let s = 0;
  s += entry.feeling * 3;
  s += entry.went_on_date ? 15 : 0;
  const thoughtsMap = { never: 25, once: 15, few: 8, alot: 0 };
  s += thoughtsMap[entry.ex_thoughts] ?? 15;
  const socialMap = { stayed_in: 0, went_out: 8, great_time: 15 };
  s += socialMap[entry.social_life] ?? 0;
  s += Math.round(entry.glow_up * 1.5);
  return Math.min(Math.round(s), 100);
}

function calcStreak(entries) {
  if (!entries.length) return 0;
  // Use UTC dates consistently (same as how dates are stored)
  const dates = new Set(entries.map(e => e.date));
  const todayUTC = new Date().toISOString().split('T')[0];
  let streak = 0;
  let checking = todayUTC;
  while (dates.has(checking)) {
    streak++;
    const d = new Date(checking + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() - 1);
    checking = d.toISOString().split('T')[0];
  }
  return streak;
}

function calcStats(entries) {
  if (!entries.length) return { totalDates: 0, avgGlowUp: '—', avgExThoughts: '—', totalExThoughts: 0 };
  const thoughtsScore = { never: 0, once: 1, few: 3, alot: 5 };
  return {
    totalDates: entries.filter(e => e.went_on_date).length,
    avgGlowUp: (entries.reduce((a, e) => a + e.glow_up, 0) / entries.length).toFixed(1),
    avgExThoughts: (entries.reduce((a, e) => a + (thoughtsScore[e.ex_thoughts] ?? 0), 0) / entries.length).toFixed(1),
    totalExThoughts: entries.reduce((a, e) => a + (thoughtsScore[e.ex_thoughts] ?? 0), 0),
  };
}

// POST /api/checkins — submit today's check-in
router.post('/', authMiddleware, (req, res) => {
  const { feeling, went_on_date, ex_thoughts, social_life, glow_up, diary_note } = req.body;
  const today = new Date().toISOString().split('T')[0];

  const existing = db.getByUserDate(req.user.username, today);

  if (existing) {
    db.update(req.user.username, today, {
      feeling,
      went_on_date: went_on_date ? 1 : 0,
      ex_thoughts,
      social_life,
      glow_up,
      diary_note: diary_note || null,
    });
  } else {
    db.insert({
      user: req.user.username,
      date: today,
      feeling,
      went_on_date: went_on_date ? 1 : 0,
      ex_thoughts,
      social_life,
      glow_up,
      diary_note: diary_note || null,
    });
  }

  res.json({ success: true });
});

// GET /api/checkins/today
router.get('/today', authMiddleware, (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  res.json(db.getByUserDate(req.user.username, today));
});

// GET /api/checkins/dashboard
router.get('/dashboard', authMiddleware, (req, res) => {
  const all = db.getAll();
  const peter = all.filter(e => e.user === 'peter');
  const niloufar = all.filter(e => e.user === 'niloufar');

  const avgScore = (entries) => {
    if (!entries.length) return 0;
    return Math.round(entries.map(calcEntryScore).reduce((a, b) => a + b, 0) / entries.length);
  };

  const recentNotes = (entries) =>
    entries.filter(e => e.diary_note).slice(0, 3).map(e => ({ date: e.date, note: e.diary_note }));

  const today = new Date().toISOString().split('T')[0];
  const checkedInToday = all.some(e => e.user === req.user.username && e.date === today);

  res.json({
    peter: {
      score: avgScore(peter),
      streak: calcStreak(peter),
      stats: calcStats(peter),
      recentNotes: recentNotes(peter),
      totalEntries: peter.length,
    },
    niloufar: {
      score: avgScore(niloufar),
      streak: calcStreak(niloufar),
      stats: calcStats(niloufar),
      recentNotes: recentNotes(niloufar),
      totalEntries: niloufar.length,
    },
    currentUser: req.user.username,
    checkedInToday,
  });
});

module.exports = router;
