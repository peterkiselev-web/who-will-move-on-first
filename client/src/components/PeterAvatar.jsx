export default function PeterAvatar() {
  return (
    <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" aria-label="Peter avatar">
      {/* ── Navy shirt & collar ── */}
      <path d="M0 240 L0 192 Q4 165 34 155 L74 145 L100 164 L126 145 L166 155 Q196 165 200 192 L200 240 Z" fill="#1a237e"/>
      <path d="M74 145 L100 165 L126 145 L116 138 L100 148 L84 138 Z" fill="#FFFFFF"/>
      <path d="M84 138 L100 148 L100 164 L94 160 L86 148 Z" fill="#E0E8FF" opacity="0.6"/>

      {/* ── Neck ── */}
      <path d="M88 148 Q100 152 112 148 L112 170 Q106 178 100 178 Q94 178 88 170 Z" fill="#F5C89A"/>

      {/* ── Head ── */}
      <ellipse cx="100" cy="96" rx="54" ry="58" fill="#F5C89A"/>

      {/* ── Ears ── */}
      <ellipse cx="47" cy="100" rx="9" ry="12" fill="#F5C89A"/>
      <path d="M50 93 Q57 100 50 108" stroke="#E0A878" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="153" cy="100" rx="9" ry="12" fill="#F5C89A"/>
      <path d="M150 93 Q143 100 150 108" stroke="#E0A878" strokeWidth="2" fill="none" strokeLinecap="round"/>

      {/* ── Hair — short, dark, styled with a slight side-swept front ── */}
      {/* Hair back/base covering top-rear of head */}
      <path d="M46 88 Q46 40 100 37 Q154 40 154 88 Q148 60 136 52 Q118 42 100 42 Q82 42 64 52 Q52 60 46 88 Z" fill="#1C0705"/>
      {/* Side fade left */}
      <path d="M46 88 Q44 108 48 118 Q50 122 53 119 Q52 106 54 96 Q50 96 46 88 Z" fill="#1C0705"/>
      {/* Side fade right */}
      <path d="M154 88 Q156 108 152 118 Q150 122 147 119 Q148 106 146 96 Q150 96 154 88 Z" fill="#1C0705"/>
      {/* Swept front tuft */}
      <path d="M70 58 Q84 48 100 47 Q82 50 74 62 Z" fill="#2A0C08" opacity="0.6"/>

      {/* ── Cheek warmth ── */}
      <ellipse cx="73" cy="112" rx="13" ry="8" fill="#FFAAAA" opacity="0.22"/>
      <ellipse cx="127" cy="112" rx="13" ry="8" fill="#FFAAAA" opacity="0.22"/>

      {/* ── Eyebrows ── */}
      {/* Left brow — slightly flat, casual */}
      <path d="M68 80 Q79 75 93 78" stroke="#2C1200" strokeWidth="3.2" fill="none" strokeLinecap="round"/>
      {/* Right brow — outer edge higher = smirk energy */}
      <path d="M107 76 Q119 72 133 77" stroke="#2C1200" strokeWidth="3.2" fill="none" strokeLinecap="round"/>

      {/* ── Eyes ── */}
      {/* Left eye */}
      <ellipse cx="80" cy="95" rx="12" ry="9.5" fill="white"/>
      <ellipse cx="82" cy="96" rx="7" ry="7" fill="#3D2114"/>
      <circle cx="82" cy="96" r="3.8" fill="#0D0000"/>
      <circle cx="85.5" cy="92.5" r="2.2" fill="white"/>
      {/* Upper lid line */}
      <path d="M68 88 Q80 84 92 88" stroke="#1C0705" strokeWidth="1.8" fill="none" opacity="0.35"/>

      {/* Right eye */}
      <ellipse cx="120" cy="95" rx="12" ry="9.5" fill="white"/>
      <ellipse cx="122" cy="96" rx="7" ry="7" fill="#3D2114"/>
      <circle cx="122" cy="96" r="3.8" fill="#0D0000"/>
      <circle cx="125.5" cy="92.5" r="2.2" fill="white"/>
      {/* Upper lid line */}
      <path d="M108 88 Q120 84 132 88" stroke="#1C0705" strokeWidth="1.8" fill="none" opacity="0.35"/>

      {/* ── Nose ── */}
      <path d="M94 110 Q100 122 106 110" stroke="#C8906A" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M98 98 Q96.5 104 94 110" stroke="#C8906A" strokeWidth="1.4" fill="none" opacity="0.45" strokeLinecap="round"/>

      {/* ── SMIRK — asymmetric, the whole vibe ── */}
      {/* Upper lip — rides higher on the left side */}
      <path d="M80 128 Q91 134 102 131 Q112 128 122 122" stroke="#B06040" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      {/* Lower lip hint */}
      <path d="M83 133 Q96 141 112 136" stroke="#C07050" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.55"/>

      {/* ── Stubble suggestion (subtle dots) ── */}
      <circle cx="78" cy="138" r="1.1" fill="#C0906A" opacity="0.32"/>
      <circle cx="85" cy="141" r="1.1" fill="#C0906A" opacity="0.32"/>
      <circle cx="93" cy="142" r="1.1" fill="#C0906A" opacity="0.32"/>
      <circle cx="112" cy="138" r="1.1" fill="#C0906A" opacity="0.32"/>
      <circle cx="119" cy="141" r="1.1" fill="#C0906A" opacity="0.32"/>
      <circle cx="126" cy="138" r="1.1" fill="#C0906A" opacity="0.28"/>

      {/* ── Shirt collar stitch detail ── */}
      <line x1="93" y1="140" x2="107" y2="140" stroke="#3949AB" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
    </svg>
  );
}
