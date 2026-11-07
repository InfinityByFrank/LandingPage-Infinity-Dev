import type { CSSProperties } from 'react'

const bar = (i: number): CSSProperties => ({ '--i': i } as CSSProperties)
const len = (n: number): CSSProperties => ({ '--len': n } as CSSProperties)

const Defs = ({ id }: { id: string }) => (
  <defs>
    <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#8030C0" />
      <stop offset="1" stopColor="#20C0E0" />
    </linearGradient>
  </defs>
)

export const VisWeb = () => (
  <svg viewBox="0 0 840 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <Defs id="web" />
    <g className="v-float">
      <rect x="150" y="50" width="540" height="300" rx="6" fill="#0d0b17" stroke="rgba(255,255,255,.25)" />
      <path d="M150 84h540" stroke="rgba(255,255,255,.18)" />
      <circle cx="170" cy="67" r="4" fill="#ff5f57" /><circle cx="186" cy="67" r="4" fill="#febc2e" /><circle cx="202" cy="67" r="4" fill="#28c840" />
      <rect x="250" y="58" width="220" height="18" rx="2" fill="rgba(255,255,255,.07)" />
      <rect x="172" y="104" width="250" height="14" rx="2" fill="#fff" />
      <rect x="172" y="128" width="190" height="14" rx="2" fill="#fff" opacity=".55" />
      <rect x="172" y="160" width="120" height="30" fill="url(#g-web)" />
      <rect x="450" y="104" width="218" height="104" fill="url(#g-web)" opacity=".85" />
      <path className="v-draw" style={len(260)} d="M450 200 C 490 150, 520 190, 560 140 S 630 120, 668 112" fill="none" stroke="#fff" strokeWidth="2" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={172 + i * 170} y="236" width="156" height="90" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.14)" />
          <rect x={184 + i * 170} y="250" width="60" height="8" fill="rgba(255,255,255,.55)" />
          <rect x={184 + i * 170} y="268" width="120" height="6" fill="rgba(255,255,255,.2)" />
          <rect x={184 + i * 170} y="282" width="96" height="6" fill="rgba(255,255,255,.2)" />
        </g>
      ))}
      <path d="M610 180l0 34 9-8 6 14 6-3-6-14 12 0z" fill="#fff" stroke="#07060d" strokeWidth="1.5" />
    </g>
  </svg>
)

export const VisMobile = () => (
  <svg viewBox="0 0 840 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <Defs id="mob" />
    <g className="v-float" style={{ animationDelay: '.4s' }}>
      <rect x="260" y="40" width="150" height="300" rx="22" fill="#0d0b17" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" />
      <rect x="318" y="50" width="34" height="7" rx="3.5" fill="rgba(255,255,255,.2)" />
      <rect x="276" y="78" width="118" height="70" rx="8" fill="url(#g-mob)" />
      <rect x="276" y="160" width="80" height="8" fill="#fff" /><rect x="276" y="176" width="118" height="6" fill="rgba(255,255,255,.25)" />
      {[0, 1, 2].map((i) => <rect key={i} x="276" y={200 + i * 40} width="118" height="30" rx="6" fill="rgba(255,255,255,.07)" />)}
    </g>
    <g className="v-float" style={{ animationDelay: '1.4s' }}>
      <rect x="440" y="70" width="150" height="300" rx="22" fill="#0d0b17" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" />
      <rect x="498" y="80" width="34" height="7" rx="3.5" fill="rgba(255,255,255,.2)" />
      <circle cx="515" cy="150" r="34" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="8" />
      <circle className="v-draw" style={len(214)} cx="515" cy="150" r="34" fill="none" stroke="url(#g-mob)" strokeWidth="8" strokeLinecap="round" transform="rotate(-90 515 150)" />
      <text x="515" y="156" textAnchor="middle" fill="#fff" fontFamily="Space Grotesk" fontWeight="700" fontSize="18">92%</text>
      {[0, 1, 2].map((i) => <rect key={i} x="456" y={206 + i * 38} width="118" height="28" rx="6" fill="rgba(255,255,255,.07)" />)}
    </g>
    <path className="v-flow" d="M410 190 C 425 190, 425 210, 440 210" fill="none" stroke="#20C0E0" strokeWidth="1.5" />
  </svg>
)

export const VisServer = () => (
  <svg viewBox="0 0 840 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <Defs id="srv" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x="160" y={70 + i * 84} width="230" height="66" fill="#0d0b17" stroke="rgba(255,255,255,.28)" />
        <rect x="176" y={90 + i * 84} width="92" height="8" fill="rgba(255,255,255,.5)" />
        <rect x="176" y={108 + i * 84} width="150" height="6" fill="rgba(255,255,255,.18)" />
        {[0, 1, 2].map((j) => (
          <circle key={j} className="v-blink" style={{ animationDelay: `${(i * 3 + j) * 0.3}s` }} cx={346 + j * 14} cy={103 + i * 84} r="3.5" fill={j === 2 ? '#20C0E0' : '#2fe08a'} />
        ))}
        <path className="v-flow" d="" />
        <path className="v-flow" d={`M390 ${103 + i * 84} H 520 ${i === 1 ? '' : `V 180`}`} fill="none" stroke="#20C0E0" strokeWidth="1.5" />
      </g>
    ))}
    <circle cx="560" cy="180" r="42" fill="none" stroke="url(#g-srv)" strokeWidth="2" />
    <circle cx="560" cy="180" r="62" fill="none" stroke="rgba(255,255,255,.14)" strokeDasharray="3 6" />
    <path d="M540 188a14 14 0 0 1 4-27 20 20 0 0 1 38-2 14 14 0 0 1 4 29z" fill="none" stroke="#fff" strokeWidth="2" />
    <path className="v-flow" d="M622 180 H 700" fill="none" stroke="#8030C0" strokeWidth="1.5" />
    <rect x="700" y="150" width="112" height="60" fill="#0d0b17" stroke="rgba(255,255,255,.28)" />
    <text x="716" y="176" fill="#fff" fontFamily="JetBrains Mono" fontSize="12">GET /api/v1</text>
    <text x="716" y="196" fill="#2fe08a" fontFamily="JetBrains Mono" fontSize="12">200 · 148ms</text>
  </svg>
)

export const VisDash = () => (
  <svg viewBox="0 0 840 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <Defs id="dsh" />
    <g fontFamily="JetBrains Mono" fontSize="11" fill="rgba(255,255,255,.5)">
      <text x="120" y="70">REVENUE</text><text x="500" y="70">USERS</text>
    </g>
    <text x="120" y="108" fill="#fff" fontFamily="Space Grotesk" fontWeight="700" fontSize="34">$48.2k</text>
    <text x="500" y="108" fill="#fff" fontFamily="Space Grotesk" fontWeight="700" fontSize="34">2.4k</text>
    {[40, 62, 48, 78, 58, 92, 70, 100, 84, 120, 96, 132].map((h, i) => (
      <rect key={i} className="v-bar" style={bar(i)} x={120 + i * 30} y={300 - h * 1.3} width="18" height={h * 1.3} fill="url(#g-dsh)" opacity={0.55 + i * 0.04} />
    ))}
    <line x1="100" y1="300" x2="740" y2="300" stroke="rgba(255,255,255,.2)" />
    <path className="v-draw" style={len(520)} d="M500 270 C 540 240, 560 260, 600 210 S 670 190, 720 140" fill="none" stroke="#20C0E0" strokeWidth="2.5" />
    <circle className="v-blink" cx="720" cy="140" r="5" fill="#fff" />
    <rect x="600" y="118" width="110" height="26" fill="#fff" />
    <text x="612" y="135" fill="#07060d" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700">+68% · LIVE</text>
  </svg>
)
