import { useState, useEffect } from 'react';
import { apiFetch } from '../api.js';
import PeterAvatar from './PeterAvatar.jsx';
import NiloufarAvatar from './NiloufarAvatar.jsx';
import WinnerBanner from './WinnerBanner.jsx';

const BREAKUP_DATE = new Date('2026-03-16T00:00:00');

function daysSince(date) {
  return Math.floor((new Date() - date) / 86400000);
}

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/* ─── Profile Card ─── */
function ProfileCard({ person, data, isOwn }) {
  const isPeter = person === 'peter';
  const name = isPeter ? 'Peter' : 'Niloufar';
  const tagline = isPeter ? 'The Comeback King' : 'The Unbothered Queen';
  const frameClass = isPeter ? 'peter-frame' : 'niloufar-frame';

  return (
    <div className="profile-card">
      <span className="sparkle sparkle-1">✨</span>
      <span className="sparkle sparkle-2">💫</span>
      <span className="sparkle sparkle-3">⭐</span>
      <div className={`avatar-frame ${frameClass}`}>
        {isPeter ? <PeterAvatar /> : <NiloufarAvatar />}
      </div>
      <p className="profile-name">{name}</p>
      <p className="profile-tagline">{tagline}</p>
      <p className="profile-score-label">Moving On Score</p>
      <span className="profile-score-badge">
        {data ? `${data.score} / 100` : '—'}
      </span>
      {isOwn && (
        <p style={{ marginTop: 10, fontSize: '0.72rem', color: 'var(--text-light)' }}>
          (that's you)
        </p>
      )}
    </div>
  );
}

/* ─── Race Track ─── */
function RaceTrack({ peterScore, niloufarScore }) {
  return (
    <div className="race-section">
      <h3 className="section-title">🏁 The Moving-On Race</h3>
      <div className="race-track">
        <div className="race-lane">
          <span className="race-name">👑 Peter</span>
          <div className="race-bar-bg">
            <div
              className="race-bar-fill peter-bar"
              style={{ '--fill-width': `${peterScore}%` }}
            />
          </div>
          <span className="race-score">{peterScore}</span>
        </div>
        <div className="race-lane">
          <span className="race-name">💅 Niloufar</span>
          <div className="race-bar-bg">
            <div
              className="race-bar-fill niloufar-bar"
              style={{ '--fill-width': `${niloufarScore}%` }}
            />
          </div>
          <span className="race-score">{niloufarScore}</span>
        </div>
      </div>
      <p style={{ marginTop: 14, fontSize: '0.75rem', color: 'var(--text-light)', textAlign: 'center' }}>
        Score = fewer ex-thoughts + more dates + higher glow-up + social life + overall feeling
      </p>
    </div>
  );
}

/* ─── Stats Grid ─── */
function StatsGrid({ peter, niloufar }) {
  const stats = [
    {
      icon: '🔥',
      label: 'Day Streak',
      pVal: peter.streak,
      nVal: niloufar.streak,
      suffix: ' days',
    },
    {
      icon: '💘',
      label: 'Total Dates',
      pVal: peter.stats.totalDates,
      nVal: niloufar.stats.totalDates,
    },
    {
      icon: '✨',
      label: 'Avg Glow-Up',
      pVal: peter.stats.avgGlowUp,
      nVal: niloufar.stats.avgGlowUp,
      suffix: ' / 10',
    },
    {
      icon: '📅',
      label: 'Check-Ins',
      pVal: peter.totalEntries,
      nVal: niloufar.totalEntries,
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map(s => (
        <div key={s.label} className="stat-card">
          <span className="stat-icon">{s.icon}</span>
          <p className="stat-label">{s.label}</p>
          <div className="stat-values">
            <div>
              <span className="stat-val stat-val-peter">{s.pVal ?? '—'}{s.suffix || ''}</span>
              <span className="stat-val-name">Peter</span>
            </div>
            <span className="stat-divider">vs</span>
            <div>
              <span className="stat-val stat-val-niloufar">{s.nVal ?? '—'}{s.suffix || ''}</span>
              <span className="stat-val-name">Niloufar</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Diary Entry ─── */
function DiaryEntry({ entry, isOwn }) {
  const [revealed, setRevealed] = useState(false);

  if (isOwn) {
    return (
      <div className="diary-entry">
        <p className="diary-entry-date">{formatDate(entry.date)}</p>
        <p className="diary-entry-text">{entry.note}</p>
      </div>
    );
  }

  return (
    <div className={`diary-entry diary-entry-blurred ${revealed ? 'revealed' : ''}`}>
      <p className="diary-entry-date">{formatDate(entry.date)}</p>
      <p className="diary-entry-text">{entry.note}</p>
      <button
        className="peek-btn"
        onClick={() => setRevealed(r => !r)}
      >
        {revealed ? '🙈 Re-blur' : '👀 Peek?'}
      </button>
    </div>
  );
}

/* ─── Diary Feed ─── */
function DiaryFeed({ peter, niloufar, currentUser }) {
  return (
    <div className="diary-section">
      <div className="diary-column">
        <h3 className="diary-column-title">
          <span>👑</span> Peter's Diary
        </h3>
        {peter.recentNotes.length === 0 ? (
          <p className="diary-empty">No diary entries yet… keeping it bottled up?</p>
        ) : (
          peter.recentNotes.map((entry, i) => (
            <DiaryEntry key={i} entry={entry} isOwn={currentUser === 'peter'} />
          ))
        )}
      </div>
      <div className="diary-column">
        <h3 className="diary-column-title">
          <span>💅</span> Niloufar's Diary
        </h3>
        {niloufar.recentNotes.length === 0 ? (
          <p className="diary-empty">No diary entries yet… too unbothered to write?</p>
        ) : (
          niloufar.recentNotes.map((entry, i) => (
            <DiaryEntry key={i} entry={entry} isOwn={currentUser === 'niloufar'} />
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Petty Stats ─── */
function PettyStats({ peter, niloufar }) {
  const pExTotal = peter.stats.totalExThoughts;
  const nExTotal = niloufar.stats.totalExThoughts;
  const pMoreEx = pExTotal > nExTotal;

  const items = [
    pExTotal > 0 || nExTotal > 0
      ? `Peter has thought about Niloufar ~${pExTotal} times total 👀${pExTotal > nExTotal ? " (he's not over it)" : ''}`
      : null,
    pExTotal > 0 || nExTotal > 0
      ? `Niloufar has thought about Peter ~${nExTotal} times total 💭${nExTotal > pExTotal ? " (she's still thinking…)" : ''}`
      : null,
    peter.stats.totalDates > 0
      ? `Peter has been on ${peter.stats.totalDates} date${peter.stats.totalDates !== 1 ? 's' : ''} since the breakup 🌹`
      : `Peter has been on 0 dates since the breakup… 🌵`,
    niloufar.stats.totalDates > 0
      ? `Niloufar has been on ${niloufar.stats.totalDates} date${niloufar.stats.totalDates !== 1 ? 's' : ''} since the breakup 💃`
      : `Niloufar has been on 0 dates since the breakup… 🤷`,
    peter.stats.avgGlowUp !== '—' && niloufar.stats.avgGlowUp !== '—'
      ? `Glow-up race: Peter averages ${peter.stats.avgGlowUp} vs Niloufar's ${niloufar.stats.avgGlowUp} out of 10 ✨`
      : null,
    peter.streak > 0 && niloufar.streak > 0
      ? `${peter.streak > niloufar.streak ? 'Peter' : 'Niloufar'} is more disciplined — ${Math.max(peter.streak, niloufar.streak)} day check-in streak 🏆`
      : null,
  ].filter(Boolean);

  return (
    <div className="petty-section">
      <h3 className="section-title">👀 Petty Stats</h3>
      <div className="petty-stats-list">
        {items.map((item, i) => (
          <div key={i} className="petty-stat-item">
            <span>{i % 4 === 0 ? '💀' : i % 4 === 1 ? '👀' : i % 4 === 2 ? '📊' : '☕'}</span>
            <span>{item}</span>
          </div>
        ))}
        {items.length === 0 && (
          <div className="petty-stat-item">
            <span>💭</span>
            <span>No data yet — start checking in to unlock the tea ☕</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Dashboard ─── */
export default function Dashboard({ user, onNavigate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const days = daysSince(BREAKUP_DATE);

  useEffect(() => {
    apiFetch('/checkins/dashboard')
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-wrap">Loading the drama… 💔</div>;
  if (error) return <div className="loading-wrap">Error: {error}</div>;

  const { peter, niloufar, currentUser, checkedInToday } = data;

  return (
    <div>
      {/* Breakup counter */}
      <div className="breakup-counter">
        <p className="breakup-counter-label">Days Since the Breakup</p>
        <p className="breakup-counter-days">
          <span>{days}</span> {days === 1 ? 'day' : 'days'}
        </p>
        <p className="breakup-counter-sub">
          March 16, 2026 — the day everything changed 💔
        </p>
      </div>

      {/* Check-in reminder */}
      {!checkedInToday && (
        <div className="checkin-reminder">
          <p>⏰ You haven't checked in today, {currentUser === 'peter' ? 'Peter' : 'Niloufar'}. Don't let your ex win by default!</p>
          <button className="btn-secondary" onClick={() => onNavigate('checkin')}>
            Check In Now
          </button>
        </div>
      )}

      {/* Winner banner */}
      <WinnerBanner peterScore={peter.score} niloufarScore={niloufar.score} />

      {/* Profile cards */}
      <div className="hero-section">
        <ProfileCard
          person="peter"
          data={peter}
          isOwn={currentUser === 'peter'}
        />
        <ProfileCard
          person="niloufar"
          data={niloufar}
          isOwn={currentUser === 'niloufar'}
        />
      </div>

      {/* Race track */}
      <RaceTrack peterScore={peter.score} niloufarScore={niloufar.score} />

      {/* Stats grid */}
      <StatsGrid peter={peter} niloufar={niloufar} />

      {/* Diary feed */}
      <DiaryFeed peter={peter} niloufar={niloufar} currentUser={currentUser} />

      {/* Petty stats */}
      <PettyStats peter={peter} niloufar={niloufar} />
    </div>
  );
}
