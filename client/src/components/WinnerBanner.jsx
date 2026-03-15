import { useEffect, useState } from 'react';

const CONFETTI_COLORS = ['#FF69B4', '#FFB6C1', '#D4AF37', '#C2185B', '#FF1493', '#FFC0CB', '#F5E6A0', '#880E4F'];

function makeConfetti() {
  return Array.from({ length: 90 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.2,
    duration: 1.4 + Math.random() * 1.4,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 5 + Math.random() * 9,
    rotation: Math.random() * 360,
    isRect: Math.random() > 0.45,
  }));
}

export default function WinnerBanner({ peterScore, niloufarScore }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    setConfetti(makeConfetti());
  }, []);

  const diff = Math.abs(peterScore - niloufarScore);
  const isTie = peterScore === niloufarScore;
  const peterWins = peterScore > niloufarScore;

  let title, sub;
  if (isTie) {
    title = '💕 Perfectly tied — who blinks first?';
    sub = 'Both healing at the same mysterious pace';
  } else if (peterWins) {
    title = '👑 Peter is absolutely thriving!';
    sub = `Leading by ${diff} moving-on points`;
  } else {
    title = '💅 Niloufar is moving on faster!';
    sub = `Leading by ${diff} moving-on points`;
  }

  return (
    <div className="winner-banner-wrap">
      <div className="winner-banner">
        {confetti.map(c => (
          <div
            key={c.id}
            className="confetti-piece"
            style={{
              left: `${c.x}%`,
              backgroundColor: c.color,
              width: c.size,
              height: c.isRect ? c.size * 0.55 : c.size,
              borderRadius: c.isRect ? '2px' : '50%',
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              transform: `rotate(${c.rotation}deg)`,
            }}
          />
        ))}
        <h2 className="winner-banner-title">{title}</h2>
        <p className="winner-banner-sub">{sub}</p>
      </div>
    </div>
  );
}
