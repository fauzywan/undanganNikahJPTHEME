import React from 'react';

const KoinoboriTester = () => {
  return (
    <section className="koinobori-tester">
      <style>{`
        .koinobori-tester {
          padding: 4rem 2rem;
          background: var(--rice-paper, #faf6ee);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          text-align: center;
        }

        .tester-title { font-family: 'Zen Antique', serif; color: var(--deep-red, #8b1a2e); font-size: 1.8rem; margin-bottom: 0.5rem; }
        .tester-desc { font-style: italic; color: var(--ink, #1a1410); opacity: 0.7; margin-bottom: 2rem; }

        .card-container { display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; width: 100%; }

        .style-card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          border: 1px solid rgba(201,168,76,0.3);
          width: 280px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .style-title { font-family: 'Cormorant Garamond', serif; font-weight: bold; color: var(--matcha, #5a7a5e); margin-top: 1.5rem; letter-spacing: 0.1em; }

        /* =========================================
           ANIMASI KOINOBORI (MENGAMBANG & BERENANG)
           ========================================= */
        .koinobori-wrapper {
          transform-origin: center left; /* Titik tumpu di mulut ikan */
          animation: swimKoi 4s ease-in-out infinite;
        }
        
        @keyframes swimKoi {
          0% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(4deg); }
          100% { transform: translateY(0) rotate(-2deg); }
        }
      `}</style>

      <div>
        <h2 className="tester-title">Perbandingan Gaya Koinobori</h2>
        <p className="tester-desc">Tiga variasi ornamen untuk menghiasi samping undangan Anda.</p>
      </div>

      <div className="card-container">
        
        {/* =======================================================
            GAYA 1: SOLID WASHI (Lembut, warna pastel, tanpa garis)
            ======================================================= */}
        <div className="style-card">
          <div className="koinobori-wrapper">
            <svg width="120" height="60" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Tali */}
              <line x1="0" y1="25" x2="15" y2="25" stroke="var(--ink)" strokeWidth="1" strokeDasharray="2 2" opacity="0.4"/>
              {/* Badan Koinobori */}
              <path d="M 15 15 Q 40 0 95 10 L 80 25 L 95 40 Q 40 50 15 35 Z" fill="var(--sakura, #E8A0B0)" opacity="0.8"/>
              <path d="M 15 15 Q 40 0 95 10 L 80 25 L 95 40 Q 40 50 15 35 Z" fill="url(#washi-grad)" opacity="0.5"/>
              {/* Mulut & Mata */}
              <ellipse cx="17" cy="25" rx="3" ry="10" fill="var(--rice-paper)"/>
              <circle cx="28" cy="22" r="3" fill="var(--ink)" opacity="0.8"/>
              {/* Sirip */}
              <path d="M 40 8 Q 50 -5 60 8 Z" fill="var(--deep-red)" opacity="0.7"/>
              <path d="M 40 42 Q 50 55 60 42 Z" fill="var(--deep-red)" opacity="0.7"/>
            </svg>
          </div>
          <div className="style-title">GAYA 1: SOLID WASHI</div>
          <p style={{fontSize:'0.8rem', marginTop:'0.5rem', opacity:0.7}}>Warna blok lembut, terkesan manis.</p>
        </div>


        {/* =======================================================
            GAYA 2: GOLD OUTLINE (Minimalis, transparan, garis emas)
            ======================================================= */}
        <div className="style-card">
          <div className="koinobori-wrapper" style={{ animationDelay: '1s' }}>
            <svg width="120" height="60" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Tali */}
              <line x1="0" y1="25" x2="15" y2="25" stroke="var(--gold)" strokeWidth="1" opacity="0.6"/>
              {/* Badan */}
              <path d="M 15 15 Q 40 0 95 10 L 80 25 L 95 40 Q 40 50 15 35 Z" stroke="var(--gold)" strokeWidth="1.5" fill="none"/>
              {/* Mulut & Mata */}
              <ellipse cx="15" cy="25" rx="2" ry="10" stroke="var(--gold)" strokeWidth="1.5" fill="none"/>
              <circle cx="28" cy="22" r="2.5" stroke="var(--gold)" strokeWidth="1.5" fill="none"/>
              {/* Sirip Outline */}
              <path d="M 40 8 Q 50 -2 60 9" stroke="var(--gold)" strokeWidth="1.5" fill="none"/>
              <path d="M 40 42 Q 50 52 60 41" stroke="var(--gold)" strokeWidth="1.5" fill="none"/>
              {/* Garis Aksen / Angin */}
              <path d="M 35 25 Q 50 20 65 25" stroke="var(--gold)" strokeWidth="1" opacity="0.5" fill="none"/>
            </svg>
          </div>
          <div className="style-title">GAYA 2: GOLD OUTLINE</div>
          <p style={{fontSize:'0.8rem', marginTop:'0.5rem', opacity:0.7}}>Transparan, garis emas. Paling aman untuk background.</p>
        </div>


        {/* =======================================================
            GAYA 3: TRADITIONAL SCALES (Batik / Corak Ikan Koi)
            ======================================================= */}
        <div className="style-card">
          <div className="koinobori-wrapper" style={{ animationDelay: '2s' }}>
            <svg width="120" height="60" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Tali */}
              <line x1="0" y1="25" x2="15" y2="25" stroke="var(--ink)" strokeWidth="1" opacity="0.5"/>
              {/* Badan */}
              <path d="M 15 15 Q 40 0 95 10 L 80 25 L 95 40 Q 40 50 15 35 Z" fill="var(--deep-red)" opacity="0.85"/>
              {/* Sisik (Scales Pattern) */}
              <g stroke="var(--rice-paper)" strokeWidth="1.5" fill="none" opacity="0.8">
                <path d="M 35 15 Q 40 20 35 25" /> <path d="M 35 25 Q 40 30 35 35" />
                <path d="M 45 13 Q 50 18 45 23" /> <path d="M 45 23 Q 50 28 45 33" /> <path d="M 45 33 Q 50 38 45 42" />
                <path d="M 55 13 Q 60 18 55 23" /> <path d="M 55 23 Q 60 28 55 33" /> <path d="M 55 33 Q 60 38 55 42" />
                <path d="M 65 15 Q 70 20 65 25" /> <path d="M 65 25 Q 70 30 65 35" />
              </g>
              {/* Mulut & Mata */}
              <ellipse cx="15" cy="25" rx="3" ry="10" fill="var(--gold)"/>
              <circle cx="25" cy="22" r="4" fill="white"/>
              <circle cx="26" cy="22" r="2" fill="var(--ink)"/>
              {/* Sirip */}
              <path d="M 40 6 Q 50 -5 60 8 Z" fill="var(--gold)"/>
              <path d="M 40 44 Q 50 55 60 42 Z" fill="var(--gold)"/>
            </svg>
          </div>
          <div className="style-title">GAYA 3: TRADITIONAL</div>
          <p style={{fontSize:'0.8rem', marginTop:'0.5rem', opacity:0.7}}>Detail sisik dengan paduan merah dan emas.</p>
        </div>

      </div>

      {/* SVG Defs (Untuk gradient Gaya 1) */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="washi-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
};

export default KoinoboriTester;