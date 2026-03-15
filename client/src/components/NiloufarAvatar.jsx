export default function NiloufarAvatar() {
  return (
    <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" aria-label="Niloufar avatar">
      {/* ── Long hair — back layer (behind head, extends down) ── */}
      <path d="M40 100 Q28 155 30 215 Q44 232 58 226 Q52 192 56 158 Q62 128 68 112 Z" fill="#0D0508"/>
      <path d="M160 100 Q172 155 170 215 Q156 232 142 226 Q148 192 144 158 Q138 128 132 112 Z" fill="#0D0508"/>
      {/* Hair shoulder curtains */}
      <path d="M40 130 Q26 168 30 215 Q38 222 48 218 Q42 178 48 148 Q44 140 40 130 Z" fill="#150308" opacity="0.7"/>
      <path d="M160 130 Q174 168 170 215 Q162 222 152 218 Q158 178 152 148 Q156 140 160 130 Z" fill="#150308" opacity="0.7"/>

      {/* ── Rose/magenta top & shoulders ── */}
      <path d="M0 240 L0 196 Q6 170 34 158 L70 148 L100 166 L130 148 L166 158 Q194 170 200 196 L200 240 Z" fill="#C2185B"/>
      {/* Top highlight */}
      <path d="M70 148 L100 168 L130 148 L118 156 L100 170 L82 156 Z" fill="#E91E8C" opacity="0.35"/>
      {/* Top neckline curve */}
      <path d="M76 150 Q100 160 124 150" stroke="#AD1457" strokeWidth="2" fill="none" opacity="0.5"/>

      {/* ── Neck ── */}
      <path d="M88 148 Q100 153 112 148 L112 170 Q106 177 100 177 Q94 177 88 170 Z" fill="#D4956A"/>

      {/* ── Head ── */}
      <ellipse cx="100" cy="94" rx="51" ry="55" fill="#D4956A"/>

      {/* ── Ears ── */}
      <ellipse cx="50" cy="97" rx="8" ry="11" fill="#D4956A"/>
      <ellipse cx="150" cy="97" rx="8" ry="11" fill="#D4956A"/>

      {/* ── Gold drop earrings ── */}
      <circle cx="50" cy="106" r="3.5" fill="#D4AF37"/>
      <ellipse cx="50" cy="113" rx="2.5" ry="3.5" fill="#D4AF37" opacity="0.9"/>
      <circle cx="150" cy="106" r="3.5" fill="#D4AF37"/>
      <ellipse cx="150" cy="113" rx="2.5" ry="3.5" fill="#D4AF37" opacity="0.9"/>

      {/* ── Hair — front layer, long dark, flows past shoulders ── */}
      {/* Left side curtain front */}
      <path d="M50 70 Q38 88 40 100 Q44 122 68 115 Q60 94 62 76 Q66 58 80 50 Z" fill="#150208"/>
      {/* Right side curtain front */}
      <path d="M150 70 Q162 88 160 100 Q156 122 132 115 Q140 94 138 76 Q134 58 120 50 Z" fill="#150208"/>
      {/* Crown and top */}
      <path d="M50 70 Q50 32 100 29 Q150 32 150 70 Q142 46 122 40 Q111 36 100 36 Q89 36 78 40 Q58 46 50 70 Z" fill="#150208"/>
      {/* Center part highlight (subtle blue-black sheen) */}
      <path d="M97 29 Q100 24 103 29 Q101 38 100 42 Q99 38 97 29 Z" fill="#2A0A18" opacity="0.5"/>
      {/* Hair waves/texture hint right */}
      <path d="M148 60 Q154 75 152 92" stroke="#0D0508" strokeWidth="3" fill="none" opacity="0.5"/>

      {/* ── Cheek warmth ── */}
      <ellipse cx="72" cy="108" rx="14" ry="9" fill="#FFB8B8" opacity="0.28"/>
      <ellipse cx="128" cy="108" rx="14" ry="9" fill="#FFB8B8" opacity="0.28"/>

      {/* ── Eyebrows — defined, gracefully arched ── */}
      <path d="M63 78 Q78 70 94 74" stroke="#150208" strokeWidth="3.8" fill="none" strokeLinecap="round"/>
      <path d="M106 74 Q122 70 137 78" stroke="#150208" strokeWidth="3.8" fill="none" strokeLinecap="round"/>

      {/* ── Eyes — large, beautiful, sharp ── */}
      {/* Left eye */}
      <ellipse cx="78" cy="91" rx="13.5" ry="10.5" fill="white"/>
      <ellipse cx="80" cy="92" rx="8.5" ry="8.5" fill="#3D1828"/>
      <circle cx="80" cy="92" r="4.5" fill="#0A0004"/>
      <circle cx="84.5" cy="88" r="2.5" fill="white"/>
      {/* Upper lash line */}
      <path d="M64 84 Q78 79 92 84" stroke="#150208" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      {/* Lower lash hint */}
      <path d="M65 99 Q78 104 91 99" stroke="#150208" strokeWidth="1" fill="none" opacity="0.3"/>
      {/* Lash flicks */}
      <line x1="65" y1="85" x2="61" y2="81" stroke="#150208" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="91" y1="84" x2="95" y2="80" stroke="#150208" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Right eye */}
      <ellipse cx="122" cy="91" rx="13.5" ry="10.5" fill="white"/>
      <ellipse cx="124" cy="92" rx="8.5" ry="8.5" fill="#3D1828"/>
      <circle cx="124" cy="92" r="4.5" fill="#0A0004"/>
      <circle cx="128.5" cy="88" r="2.5" fill="white"/>
      {/* Upper lash line */}
      <path d="M108 84 Q122 79 136 84" stroke="#150208" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      {/* Lower lash hint */}
      <path d="M109 99 Q122 104 135 99" stroke="#150208" strokeWidth="1" fill="none" opacity="0.3"/>
      {/* Lash flicks */}
      <line x1="109" y1="85" x2="105" y2="81" stroke="#150208" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="135" y1="84" x2="139" y2="80" stroke="#150208" strokeWidth="1.5" strokeLinecap="round"/>

      {/* ── Nose — refined ── */}
      <path d="M96 107 Q100 117 104 107" stroke="#B07050" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M98 99 Q96.5 103 96 107" stroke="#B07050" strokeWidth="1.4" fill="none" opacity="0.4" strokeLinecap="round"/>

      {/* ── Lips — full, confident, beautiful ── */}
      {/* Upper lip shape */}
      <path d="M82 122 Q91 116 100 119 Q109 116 118 122 Q109 128 100 130 Q91 128 82 122 Z" fill="#C2185B"/>
      {/* Cupid's bow highlight */}
      <path d="M91 116 Q96 113 100 116 Q104 113 109 116 Q104 120 100 119 Q96 120 91 116 Z" fill="#E91E8C" opacity="0.6"/>
      {/* Lower lip */}
      <path d="M82 122 Q100 136 118 122 Q109 130 100 133 Q91 130 82 122 Z" fill="#D4406A"/>
      {/* Lower lip highlight */}
      <ellipse cx="100" cy="130" rx="8" ry="3" fill="#E87090" opacity="0.45"/>
      {/* Smile dimples */}
      <path d="M82 122 Q80 128 82 134" stroke="#B07050" strokeWidth="1.4" fill="none" opacity="0.3" strokeLinecap="round"/>
      <path d="M118 122 Q120 128 118 134" stroke="#B07050" strokeWidth="1.4" fill="none" opacity="0.3" strokeLinecap="round"/>

      {/* ── Delicate gold necklace ── */}
      <path d="M78 152 Q100 160 122 152" stroke="#D4AF37" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.65"/>
      <circle cx="100" cy="160" r="2.5" fill="#D4AF37" opacity="0.6"/>
    </svg>
  );
}
