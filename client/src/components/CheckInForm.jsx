import { useState, useEffect } from 'react';
import { apiFetch } from '../api.js';

const EX_THOUGHTS_OPTIONS = [
  { value: 'never',  label: '🙅 Not once' },
  { value: 'once',   label: '🤔 Just once' },
  { value: 'few',    label: '😶 A few times' },
  { value: 'alot',   label: '😩 Way too much' },
];

const SOCIAL_OPTIONS = [
  { value: 'stayed_in',  label: '🛋️ Stayed in' },
  { value: 'went_out',   label: '🚶 Went out' },
  { value: 'great_time', label: '🎉 Had a blast' },
];

export default function CheckInForm({ user, onNavigate }) {
  const [feeling, setFeeling] = useState(7);
  const [wentOnDate, setWentOnDate] = useState(false);
  const [exThoughts, setExThoughts] = useState('once');
  const [socialLife, setSocialLife] = useState('stayed_in');
  const [glowUp, setGlowUp] = useState(7);
  const [diaryNote, setDiaryNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);
  const [loadingExisting, setLoadingExisting] = useState(true);

  const name = user.username === 'peter' ? 'Peter' : 'Niloufar';

  useEffect(() => {
    apiFetch('/checkins/today')
      .then(entry => {
        if (entry) {
          setAlreadyCheckedIn(true);
          setFeeling(entry.feeling);
          setWentOnDate(!!entry.went_on_date);
          setExThoughts(entry.ex_thoughts);
          setSocialLife(entry.social_life);
          setGlowUp(entry.glow_up);
          setDiaryNote(entry.diary_note || '');
        }
      })
      .catch(() => {})
      .finally(() => setLoadingExisting(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch('/checkins', {
        method: 'POST',
        body: JSON.stringify({
          feeling,
          went_on_date: wentOnDate,
          ex_thoughts: exThoughts,
          social_life: socialLife,
          glow_up: glowUp,
          diary_note: diaryNote,
        }),
      });
      setSuccess(true);
      setAlreadyCheckedIn(true);
      setTimeout(() => onNavigate('dashboard'), 2000);
    } catch (err) {
      alert('Something went wrong: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingExisting) {
    return <div className="loading-wrap">Loading your check-in… 💭</div>;
  }

  const feelingEmoji = feeling <= 3 ? '😔' : feeling <= 6 ? '😐' : feeling <= 8 ? '😊' : '🔥';
  const glowEmoji = glowUp <= 3 ? '😴' : glowUp <= 6 ? '✨' : glowUp <= 8 ? '💫' : '👑';

  return (
    <div className="checkin-page">
      <div className="checkin-card">
        <div className="checkin-header">
          <h2 className="checkin-title">
            {alreadyCheckedIn ? `Update Today's Vibe` : `Daily Check-In`}
          </h2>
          <p className="checkin-subtitle">
            {alreadyCheckedIn
              ? `You already checked in today, ${name}. Update it below.`
              : `How's the moving on going, ${name}? Be honest.`}
          </p>
        </div>

        {success && (
          <div className="checkin-success">
            ✅ Saved! Redirecting to dashboard… 💕
          </div>
        )}

        <form className="checkin-form" onSubmit={handleSubmit}>
          {/* Q1: Feeling */}
          <div className="question-block">
            <label className="question-label">
              <span className="question-num">1</span>
              How are you feeling today? {feelingEmoji}
            </label>
            <div className="heart-slider-wrap">
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>💔 1</span>
              <input
                type="range"
                min="1" max="10"
                value={feeling}
                onChange={e => setFeeling(Number(e.target.value))}
                className="heart-slider"
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>10 💖</span>
              <span className="slider-value">{feeling}</span>
            </div>
          </div>

          {/* Q2: Date? */}
          <div className="question-block">
            <label className="question-label">
              <span className="question-num">2</span>
              Did you go on a date or meet someone new?
            </label>
            <div className="pill-group">
              {[{ v: false, label: '🙅 No dates yet' }, { v: true, label: '💘 Yes I did!' }].map(opt => (
                <button
                  key={String(opt.v)}
                  type="button"
                  className={`pill-btn ${wentOnDate === opt.v ? 'selected' : ''}`}
                  onClick={() => setWentOnDate(opt.v)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q3: Ex thoughts */}
          <div className="question-block">
            <label className="question-label">
              <span className="question-num">3</span>
              Did you think about your ex today?
            </label>
            <div className="pill-group">
              {EX_THOUGHTS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`pill-btn ${exThoughts === opt.value ? 'selected' : ''}`}
                  onClick={() => setExThoughts(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q4: Social life */}
          <div className="question-block">
            <label className="question-label">
              <span className="question-num">4</span>
              How was your social life today?
            </label>
            <div className="pill-group">
              {SOCIAL_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`pill-btn ${socialLife === opt.value ? 'selected' : ''}`}
                  onClick={() => setSocialLife(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q5: Glow-up */}
          <div className="question-block">
            <label className="question-label">
              <span className="question-num">5</span>
              Rate your glow-up today (confidence + looks + energy) {glowEmoji}
            </label>
            <div className="heart-slider-wrap">
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>😴 1</span>
              <input
                type="range"
                min="1" max="10"
                value={glowUp}
                onChange={e => setGlowUp(Number(e.target.value))}
                className="heart-slider"
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>10 👑</span>
              <span className="slider-value">{glowUp}</span>
            </div>
          </div>

          {/* Q6: Diary note */}
          <div className="question-block">
            <label className="question-label">
              <span className="question-num">6</span>
              Diary note <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>(optional — be petty)</span>
            </label>
            <textarea
              className="form-textarea"
              placeholder="Tell the journal how you're REALLY doing…"
              value={diaryNote}
              onChange={e => setDiaryNote(e.target.value)}
              maxLength={500}
            />
          </div>

          <div className="checkin-submit-wrap">
            <button type="submit" className="btn-primary" disabled={loading || success}>
              {loading ? 'Saving…' : alreadyCheckedIn ? 'Update My Vibe 💫' : 'Submit Check-In 💌'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
