import React from 'react';

// Sub-komponen SVG Universal yang bisa ganti wujud
const KoiFish = ({ variant, className }) => {
  if (variant === 'washi') {
    return (
      <svg className={className} viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 15 15 Q 40 0 95 10 L 80 25 L 95 40 Q 40 50 15 35 Z" fill="currentColor" opacity="0.7"/>
        <path d="M 15 15 Q 40 0 95 10 L 80 25 L 95 40 Q 40 50 15 35 Z" fill="white" opacity="0.3"/>
        <ellipse cx="17" cy="25" rx="3" ry="10" fill="var(--rice-paper, #faf6ee)"/>
        <circle cx="28" cy="22" r="3" fill="var(--ink, #1a1410)" opacity="0.8"/>
        <path d="M 40 8 Q 50 -5 60 8 Z" fill="currentColor" opacity="0.9"/>
        <path d="M 40 42 Q 50 55 60 42 Z" fill="currentColor" opacity="0.9"/>
      </svg>
    );
  }

  if (variant === 'sakura') {
    return (
      <svg className={className} viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Badan Ikan */}
        <path d="M 15 15 Q 40 0 95 10 L 80 25 L 95 40 Q 40 50 15 35 Z" fill="currentColor" opacity="0.85"/>
        {/* Corak Bunga Sakura */}
        <text x="32" y="24" fontSize="12" fill="var(--rice-paper, #faf6ee)" opacity="0.9">✿</text>
        <text x="50" y="36" fontSize="10" fill="var(--rice-paper, #faf6ee)" opacity="0.8">✿</text>
        <text x="65" y="22" fontSize="14" fill="var(--rice-paper, #faf6ee)" opacity="0.9">✿</text>
        <text x="80" y="32" fontSize="8" fill="var(--rice-paper, #faf6ee)" opacity="0.7">✿</text>
        {/* Detail Wajah & Sirip */}
        <ellipse cx="15" cy="25" rx="3" ry="10" fill="var(--gold, #c9a84c)"/>
        <circle cx="25" cy="22" r="4" fill="white"/>
        <circle cx="26" cy="22" r="2" fill="var(--ink, #1a1410)"/>
        <path d="M 40 6 Q 50 -5 60 8 Z" fill="var(--gold, #c9a84c)"/>
        <path d="M 40 44 Q 50 55 60 42 Z" fill="var(--gold, #c9a84c)"/>
      </svg>
    );
  }

  // ==========================================
  // 2. GAYA ORIGAMI (Baru!) - Geometris 3D
  // ==========================================
  if (variant === 'origami') {
    return (
      <svg className={className} viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Siluet Dasar */}
        <path d="M 15 25 L 30 10 L 60 12 L 95 15 L 80 25 L 95 35 L 60 38 L 30 40 Z" fill="currentColor" opacity="0.9"/>
        {/* Lipatan Kertas (Highlight Terang) */}
        <path d="M 15 25 L 30 10 L 50 25 Z" fill="white" opacity="0.25"/>
        <path d="M 30 10 L 60 12 L 50 25 Z" fill="white" opacity="0.15"/>
        <path d="M 60 12 L 95 15 L 80 25 L 50 25 Z" fill="white" opacity="0.3"/>
        {/* Lipatan Kertas (Bayangan Gelap) */}
        <path d="M 15 25 L 30 40 L 50 25 Z" fill="black" opacity="0.15"/>
        <path d="M 30 40 L 60 38 L 50 25 Z" fill="black" opacity="0.25"/>
        <path d="M 60 38 L 95 35 L 80 25 L 50 25 Z" fill="black" opacity="0.1"/>
        {/* Mata & Sirip Tajam */}
        <polygon points="22,23 27,21 27,25" fill="var(--rice-paper, #faf6ee)"/>
        <polygon points="40,9 50,0 55,10" fill="var(--gold, #c9a84c)"/>
        <polygon points="40,41 50,50 55,40" fill="var(--gold, #c9a84c)"/>
      </svg>
    );
  }

  // ==========================================
  // 3. GAYA MIZUHIKI (Baru!) - Tali Simpul
  // ==========================================
  if (variant === 'mizuhiki') {
    return (
      <svg className={className} viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Tali Atas & Bawah (Mengikuti warna currentColor) */}
        <path d="M 15 15 Q 40 5 95 10 L 80 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M 15 35 Q 40 45 95 40 L 80 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {/* Tali Tengah (Emas) */}
        <path d="M 15 25 Q 50 25 80 25" stroke="var(--gold, #c9a84c)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 2" fill="none"/>
        {/* Simpul Wajah (Knot 8) */}
        <path d="M 15 15 C 0 15 0 35 15 35 C 30 35 30 15 15 15 Z" stroke="var(--gold, #c9a84c)" strokeWidth="1.5" fill="none"/>
        <circle cx="20" cy="25" r="2" fill="currentColor"/>
        {/* Sirip Simpul Tali */}
        <path d="M 35 10 Q 45 -5 55 12" stroke="var(--gold, #c9a84c)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M 35 40 Q 45 55 55 38" stroke="var(--gold, #c9a84c)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    );
  }
  if (variant === 'outline') {
    return (
      <svg className={className} viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 15 15 Q 40 0 95 10 L 80 25 L 95 40 Q 40 50 15 35 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <ellipse cx="15" cy="25" rx="2" ry="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="28" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M 40 8 Q 50 -2 60 9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M 40 42 Q 50 52 60 41" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M 35 25 Q 50 20 65 25" stroke="currentColor" strokeWidth="1" opacity="0.5" fill="none"/>
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 15 15 Q 40 0 95 10 L 80 25 L 95 40 Q 40 50 15 35 Z" fill="currentColor" opacity="0.85"/>
      <g stroke="var(--rice-paper, #faf6ee)" strokeWidth="1.5" fill="none" opacity="0.8">
        <path d="M 35 15 Q 40 20 35 25" /> <path d="M 35 25 Q 40 30 35 35" />
        <path d="M 45 13 Q 50 18 45 23" /> <path d="M 45 23 Q 50 28 45 33" /> <path d="M 45 33 Q 50 38 45 42" />
        <path d="M 55 13 Q 60 18 55 23" /> <path d="M 55 23 Q 60 28 55 33" /> <path d="M 55 33 Q 60 38 55 42" />
        <path d="M 65 15 Q 70 20 65 25" /> <path d="M 65 25 Q 70 30 65 35" />
      </g>
      <ellipse cx="15" cy="25" rx="3" ry="10" fill="var(--gold, #c9a84c)"/>
      <circle cx="25" cy="22" r="4" fill="white"/>
      <circle cx="26" cy="22" r="2" fill="var(--ink, #1a1410)"/>
      <path d="M 40 6 Q 50 -5 60 8 Z" fill="var(--gold, #c9a84c)"/>
      <path d="M 40 44 Q 50 55 60 42 Z" fill="var(--gold, #c9a84c)"/>
    </svg>
  );
};

const KoinoboriGarland = ({ customOpacity = 0.5, variant = "traditional" }) => {
  return (
    <div className="koinobori-garland" style={{ opacity: customOpacity }}>
      <style>{`
        .koinobori-garland { position: absolute; top: 0; left: 0; width: 100%; height: 120px; pointer-events: none; z-index: 1; overflow: hidden; display: flex; justify-content: space-around; align-items: flex-start; padding-top: 15px; }
        .garland-string { position: absolute; top: 40px; left: 0; width: 100%; height: 1.5px; background: var(--gold, #c9a84c); opacity: 0.5; z-index: 0; }

        .koi-wrapper { position: relative; z-index: 1; }
        .koi-garland { transform-origin: 15px 25px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.05)); }

        .kg-1 { width: 100px; animation: swimH 4s ease-in-out infinite; color: var(--gold, #c9a84c); }
        .kg-2 { width: 85px;  animation: swimH 3.5s ease-in-out infinite 0.5s; color: var(--deep-red, #8b1a2e); }
        .kg-3 { width: 70px;  animation: swimH 4.2s ease-in-out infinite 1s; color: var(--matcha, #5a7a5e); }

        @keyframes swimH { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(6deg); } }
      `}</style>

      <div className="garland-string"></div>

      <div className="koi-wrapper">
        <KoiFish variant={variant} className="koi-garland kg-1" />
      </div>
      <div className="koi-wrapper">
        <KoiFish variant={variant} className="koi-garland kg-2" />
      </div>
      <div className="koi-wrapper">
        <KoiFish variant={variant} className="koi-garland kg-3" />
      </div>

    </div>
  );
};

export default KoinoboriGarland;