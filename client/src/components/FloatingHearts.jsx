import { useMemo } from 'react';

const HEART_CONFIGS = [
  { left: 4,  delay: 0,   dur: 9,  size: 14, opacity: 0.35 },
  { left: 12, delay: 2.2, dur: 7,  size: 20, opacity: 0.25 },
  { left: 20, delay: 0.8, dur: 11, size: 11, opacity: 0.4  },
  { left: 28, delay: 4.5, dur: 8,  size: 17, opacity: 0.3  },
  { left: 36, delay: 1.5, dur: 10, size: 22, opacity: 0.2  },
  { left: 44, delay: 3.3, dur: 7,  size: 13, opacity: 0.38 },
  { left: 52, delay: 6.1, dur: 9,  size: 18, opacity: 0.28 },
  { left: 60, delay: 0.4, dur: 12, size: 10, opacity: 0.42 },
  { left: 68, delay: 5.2, dur: 8,  size: 24, opacity: 0.18 },
  { left: 76, delay: 2.8, dur: 10, size: 15, opacity: 0.33 },
  { left: 84, delay: 7.0, dur: 7,  size: 12, opacity: 0.4  },
  { left: 92, delay: 1.1, dur: 11, size: 19, opacity: 0.22 },
  { left: 8,  delay: 8.4, dur: 8,  size: 16, opacity: 0.3  },
  { left: 48, delay: 9.2, dur: 10, size: 21, opacity: 0.2  },
  { left: 88, delay: 3.7, dur: 9,  size: 13, opacity: 0.35 },
  { left: 32, delay: 6.8, dur: 7,  size: 11, opacity: 0.45 },
  { left: 72, delay: 4.1, dur: 12, size: 18, opacity: 0.25 },
  { left: 56, delay: 7.6, dur: 8,  size: 14, opacity: 0.38 },
];

export default function FloatingHearts() {
  return (
    <div className="floating-hearts-container" aria-hidden="true">
      {HEART_CONFIGS.map((cfg, i) => (
        <div
          key={i}
          className="floating-heart"
          style={{
            left: `${cfg.left}%`,
            animationDelay: `${cfg.delay}s`,
            animationDuration: `${cfg.dur}s`,
            fontSize: `${cfg.size}px`,
            opacity: cfg.opacity,
            color: i % 3 === 0 ? '#FF69B4' : i % 3 === 1 ? '#C2185B' : '#FFB6C1',
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}
