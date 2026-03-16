/**
 * Shared score / stats calculation helpers used by the dashboard function.
 */

// Score formula: max 100
// feeling(1-10)*3=30, date=15, ex_thoughts(never=25,once=15,few=8,alot=0),
// social(stayed=0,out=8,great=15), glow(1-10)*1.5=15
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
  const dates = new Set(entries.map(e =>
    // Supabase DATE columns come back as 'YYYY-MM-DD' strings
    typeof e.date === 'string' ? e.date.split('T')[0] : e.date
  ));
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
  if (!entries.length) {
    return { totalDates: 0, avgGlowUp: '—', avgExThoughts: '—', totalExThoughts: 0 };
  }
  const thoughtsScore = { never: 0, once: 1, few: 3, alot: 5 };
  return {
    totalDates:      entries.filter(e => e.went_on_date).length,
    avgGlowUp:       (entries.reduce((a, e) => a + e.glow_up, 0) / entries.length).toFixed(1),
    avgExThoughts:   (entries.reduce((a, e) => a + (thoughtsScore[e.ex_thoughts] ?? 0), 0) / entries.length).toFixed(1),
    totalExThoughts: entries.reduce((a, e) => a + (thoughtsScore[e.ex_thoughts] ?? 0), 0),
  };
}

module.exports = { calcEntryScore, calcStreak, calcStats };
