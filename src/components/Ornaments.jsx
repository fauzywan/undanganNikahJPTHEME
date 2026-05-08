import React from 'react';

// ==========================================
// VOL 1: KLASIK & ELEGAN
// ==========================================

// 1. ORIGAMI LOVE KOINOBORI
export const KoinoboriLove = ({ className = "w-16 h-16 text-[var(--sakura)]" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 35 L 25 10 L 5 45 L 50 90 L 95 45 L 75 10 Z" fill="currentColor" opacity="0.85"/>
    <path d="M 5 45 L 50 35 L 95 45" stroke="var(--rice-paper, #faf6ee)" strokeWidth="1.5" opacity="0.7" strokeLinejoin="round"/>
    <path d="M 50 35 L 50 90" stroke="var(--rice-paper, #faf6ee)" strokeWidth="1.5" opacity="0.7"/>
    <path d="M 25 10 L 50 55 L 75 10" stroke="var(--rice-paper, #faf6ee)" strokeWidth="1.5" opacity="0.5" strokeLinejoin="round"/>
    <ellipse cx="20" cy="30" rx="3" ry="12" fill="var(--gold, #c9a84c)" transform="rotate(-35 20 30)"/>
    <circle cx="34" cy="32" r="5" fill="white"/>
    <circle cx="35" cy="32" r="2.5" fill="var(--ink, #1a1410)"/>
    <g stroke="var(--rice-paper, #faf6ee)" strokeWidth="1.5" fill="none" opacity="0.9">
      <path d="M 55 45 Q 60 50 55 55" /> <path d="M 55 55 Q 60 60 55 65" />
      <path d="M 65 35 Q 70 40 65 45" /> <path d="M 65 45 Q 70 50 65 55" /> <path d="M 65 55 Q 70 60 65 65" />
      <path d="M 75 40 Q 80 45 75 50" /> <path d="M 75 50 Q 80 55 75 60" />
    </g>
    <path d="M 70 70 Q 85 85 95 65 Z" fill="var(--gold, #c9a84c)" opacity="0.9"/>
    <path d="M 65 18 Q 80 0 90 15 Z" fill="var(--gold, #c9a84c)" opacity="0.9"/>
  </svg>
);

// 2. SENSU FAN
export const SensuFan = ({ className = "w-16 h-16 text-[var(--deep-red)]" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 40 A 50 50 0 0 1 90 40 L 55 75 A 10 10 0 0 0 45 75 Z" fill="currentColor" opacity="0.85"/>
    <path d="M 50 80 L 10 40 M 50 80 L 25 32 M 50 80 L 50 25 M 50 80 L 75 32 M 50 80 L 90 40" stroke="var(--gold, #c9a84c)" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="50" cy="80" r="4" fill="var(--gold, #c9a84c)"/>
    <path d="M 48 83 L 43 95 M 52 83 L 57 95" stroke="var(--sakura, #E8A0B0)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// 3. ORIGAMI CRANE
export const OrigamiCrane = ({ className = "w-16 h-16 text-[var(--washi)]" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,60 10,30 50,45" fill="var(--sakura, #E8A0B0)" opacity="0.9"/>
    <polygon points="50,60 90,30 50,45" fill="currentColor" opacity="0.7"/>
    <polygon points="50,60 50,45 80,85" fill="var(--gold, #c9a84c)"/>
    <polygon points="50,60 50,45 20,75" fill="currentColor" opacity="0.9"/>
    <polygon points="20,75 15,65 25,68" fill="var(--deep-red, #8b1a2e)"/>
  </svg>
);

export const KoinoboriKite = ({ className = "w-16 h-16 text-[var(--deep-red)]" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 10 L 85 45 L 50 90 L 15 45 Z" fill="currentColor" opacity="0.85"/>
    <path d="M 50 10 L 50 90 M 15 45 L 85 45" stroke="var(--rice-paper)" strokeWidth="1.5" opacity="0.7"/>
    <polygon points="50,10 85,45 50,45" fill="currentColor" opacity="0.4"/>
    
    <ellipse cx="50" cy="10" rx="12" ry="3" fill="var(--gold, #c9a84c)"/>
    <circle cx="50" cy="24" r="5" fill="white"/>
    <circle cx="50" cy="24" r="2.5" fill="var(--ink, #1a1410)"/>
    
    <g stroke="var(--rice-paper)" strokeWidth="1.5" fill="none" opacity="0.9">
      <path d="M 35 55 Q 42 60 50 55 Q 58 60 65 55" />
      <path d="M 40 65 Q 45 70 50 65 Q 55 70 60 65" />
      <path d="M 45 75 Q 50 80 55 75" />
    </g>
    
    <polygon points="15,45 5,60 25,55" fill="var(--gold, #c9a84c)" opacity="0.9"/>
    <polygon points="85,45 95,60 75,55" fill="var(--gold, #c9a84c)" opacity="0.9"/>
    <polygon points="50,90 40,100 60,100" fill="var(--gold, #c9a84c)" opacity="0.9"/>
  </svg>
);

// 20. KOINOBORI HEX (Segi Enam Kikko)
export const KoinoboriHex = ({ className = "w-16 h-16 text-[var(--sakura)]" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="15,50 35,15 75,15 90,50 75,85 35,85" fill="currentColor" opacity="0.85"/>
    <line x1="35" y1="15" x2="75" y2="85" stroke="var(--rice-paper)" strokeWidth="1.5" opacity="0.5"/>
    <line x1="75" y1="15" x2="35" y2="85" stroke="var(--rice-paper)" strokeWidth="1.5" opacity="0.5"/>
    <polygon points="15,50 35,15 55,50 35,85" fill="currentColor" opacity="0.5"/>

    <ellipse cx="15" cy="50" rx="3" ry="14" fill="var(--gold, #c9a84c)"/>
    <circle cx="32" cy="50" r="5" fill="white"/>
    <circle cx="33" cy="50" r="2.5" fill="var(--ink, #1a1410)"/>

    <g stroke="var(--rice-paper)" strokeWidth="1.5" fill="none" opacity="0.9">
      <path d="M 45 35 Q 50 40 45 45" /> <path d="M 45 45 Q 50 50 45 55" /> <path d="M 45 55 Q 50 60 45 65" />
      <path d="M 55 35 Q 60 40 55 45" /> <path d="M 55 45 Q 60 50 55 55" /> <path d="M 55 55 Q 60 60 55 65" />
      <path d="M 65 40 Q 70 45 65 50" /> <path d="M 65 50 Q 70 55 65 60" />
    </g>

    <polygon points="90,50 100,30 80,40" fill="var(--gold, #c9a84c)" opacity="0.9"/>
    <polygon points="90,50 100,70 80,60" fill="var(--gold, #c9a84c)" opacity="0.9"/>
    <polygon points="55,15 75,5 70,15" fill="var(--gold, #c9a84c)" opacity="0.9"/>
    <polygon points="55,85 75,95 70,85" fill="var(--gold, #c9a84c)" opacity="0.9"/>
  </svg>
);

// 21. KOINOBORI PENNANT (Bendera Ekor Walet)
export const KoinoboriPennant = ({ className = "w-16 h-16 text-[var(--matcha)]" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="15,25 85,25 70,50 85,75 15,75" fill="currentColor" opacity="0.85"/>
    <line x1="15" y1="50" x2="70" y2="50" stroke="var(--rice-paper)" strokeWidth="1.5" opacity="0.7"/>
    <polygon points="15,25 45,50 15,75" fill="currentColor" opacity="0.4"/>

    <ellipse cx="15" cy="50" rx="3" ry="25" fill="var(--gold, #c9a84c)"/>
    <circle cx="30" cy="40" r="4.5" fill="white"/>
    <circle cx="31" cy="40" r="2" fill="var(--ink, #1a1410)"/>
    <circle cx="30" cy="60" r="4.5" fill="white"/>
    <circle cx="31" cy="60" r="2" fill="var(--ink, #1a1410)"/>

    <g stroke="var(--rice-paper)" strokeWidth="1.5" fill="none" opacity="0.9">
      <path d="M 45 35 Q 50 40 45 45" /> <path d="M 45 55 Q 50 60 45 65" />
      <path d="M 55 35 Q 60 40 55 45" /> <path d="M 55 45 Q 60 50 55 55" /> <path d="M 55 55 Q 60 60 55 65" />
    </g>

    <polygon points="85,25 100,15 80,35" fill="var(--gold, #c9a84c)" opacity="0.9"/>
    <polygon points="85,75 100,85 80,65" fill="var(--gold, #c9a84c)" opacity="0.9"/>
  </svg>
);

// 22. KOINOBORI FAN (Kipas Origami)
export const KoinoboriFan = ({ className = "w-16 h-16 text-[var(--gold)]" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="10,40 30,20 50,15 70,20 90,40 50,85" fill="currentColor" opacity="0.85"/>
    <line x1="50" y1="85" x2="30" y2="20" stroke="var(--rice-paper)" strokeWidth="1.5" opacity="0.7"/>
    <line x1="50" y1="85" x2="70" y2="20" stroke="var(--rice-paper)" strokeWidth="1.5" opacity="0.7"/>
    <line x1="50" y1="85" x2="50" y2="15" stroke="var(--rice-paper)" strokeWidth="1.5" opacity="0.7"/>
    <polygon points="30,20 50,15 50,85" fill="var(--rice-paper)" opacity="0.2"/>

    <ellipse cx="50" cy="85" rx="10" ry="3" fill="var(--gold, #c9a84c)"/>
    <circle cx="50" cy="65" r="5" fill="white"/>
    <circle cx="50" cy="64" r="2.5" fill="var(--ink, #1a1410)"/>

    <g stroke="var(--rice-paper)" strokeWidth="1.5" fill="none" opacity="0.9">
      <path d="M 40 45 Q 45 40 50 45 Q 55 40 60 45" />
      <path d="M 35 35 Q 42 30 50 35 Q 58 30 65 35" />
      <path d="M 28 25 Q 38 20 50 25 Q 62 20 72 25" />
    </g>

    <polygon points="10,40 5,25 20,35" fill="currentColor" opacity="0.9"/>
    <polygon points="90,40 95,25 80,35" fill="currentColor" opacity="0.9"/>
    <polygon points="50,15 45,5 55,5" fill="currentColor" opacity="0.9"/>
  </svg>
);

// 23. KOINOBORI LEAF (Daun / Kelopak Mata Air)
export const KoinoboriLeaf = ({ className = "w-16 h-16 text-[var(--ink)]" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="20,20 60,25 85,50 90,85 50,85 25,60" fill="currentColor" opacity="0.85"/>
    <line x1="20" y1="20" x2="90" y2="85" stroke="var(--rice-paper)" strokeWidth="1.5" opacity="0.7"/>
    <line x1="60" y1="25" x2="50" y2="85" stroke="var(--rice-paper)" strokeWidth="1.5" opacity="0.5"/>
    <polygon points="20,20 60,25 90,85" fill="var(--rice-paper)" opacity="0.15"/>

    <ellipse cx="20" cy="20" rx="3" ry="10" fill="var(--gold, #c9a84c)" transform="rotate(-45 20 20)"/>
    <circle cx="36" cy="36" r="5" fill="white"/>
    <circle cx="37" cy="37" r="2.5" fill="var(--ink, #1a1410)"/>

    <g stroke="var(--rice-paper)" strokeWidth="1.5" fill="none" opacity="0.9">
      <path d="M 45 55 Q 52 52 55 58" /> <path d="M 55 58 Q 62 55 65 61" />
      <path d="M 55 68 Q 62 65 65 71" /> <path d="M 65 71 Q 72 68 75 74" />
      <path d="M 70 50 Q 77 47 80 53" />
    </g>

    <polygon points="90,85 100,100 80,95" fill="var(--gold, #c9a84c)" opacity="0.9"/>
    <polygon points="50,85 45,100 60,90" fill="var(--gold, #c9a84c)" opacity="0.9"/>
    <polygon points="85,50 100,45 90,60" fill="var(--gold, #c9a84c)" opacity="0.9"/>
  </svg>
);

// 24. KOINOBORI STAR (Bintang Origami Shuriken)
export const KoinoboriStar = ({ className = "w-16 h-16 text-[var(--sakura)]" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,10 60,40 90,50 60,60 50,90 40,60 10,50 40,40" fill="currentColor" opacity="0.85"/>
    <line x1="50" y1="10" x2="50" y2="90" stroke="var(--rice-paper)" strokeWidth="1.5" opacity="0.7"/>
    <line x1="10" y1="50" x2="90" y2="50" stroke="var(--rice-paper)" strokeWidth="1.5" opacity="0.7"/>
    <polygon points="50,10 60,40 50,50" fill="var(--rice-paper)" opacity="0.2"/>
    <polygon points="50,50 60,60 50,90" fill="var(--rice-paper)" opacity="0.2"/>

    <ellipse cx="50" cy="10" rx="10" ry="3" fill="var(--gold, #c9a84c)"/>
    <circle cx="50" cy="28" r="4" fill="white"/>
    <circle cx="50" cy="28" r="2" fill="var(--ink, #1a1410)"/>

    <g stroke="var(--rice-paper)" strokeWidth="1.5" fill="none" opacity="0.9">
      <path d="M 42 45 Q 45 40 50 45 Q 55 40 58 45" />
      <path d="M 42 55 Q 45 50 50 55 Q 55 50 58 55" />
      <path d="M 42 65 Q 45 60 50 65 Q 55 60 58 65" />
    </g>

    <polygon points="10,50 0,40 15,60" fill="var(--gold, #c9a84c)" opacity="0.9"/>
    <polygon points="90,50 100,60 85,40" fill="var(--gold, #c9a84c)" opacity="0.9"/>
    <polygon points="50,90 40,100 60,100" fill="var(--gold, #c9a84c)" opacity="0.9"/>
  </svg>
);