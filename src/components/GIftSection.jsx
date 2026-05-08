import { useEffect, useState, useRef } from 'react';
import SakuraBlossom from './SakuraBlossom';

const GiftSection = ({ sectionRef, config }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const innerRef = useRef(null);

  // Data fallback jika di database belum ada
  const bankAccounts = config?.bankAccounts?.length > 0 
    ? config.bankAccounts 
    : [
        { bank: 'BCA', account: '1234567890', name: 'Arya Pratama' },
        { bank: 'Mandiri', account: '0987654321', name: 'Hana Putri' }
      ];

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (innerRef.current) observer.observe(innerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="gift-root" ref={sectionRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=IM+Fell+English:ital@0;1&family=Cinzel+Decorative:wght@400;700&display=swap');

        :root {
          --crimson: #7a1828;
          --gold: #b8933a;
          --gold-light: #d4a84b;
          --ivory: #faf6ee;
          --ink: #1c1410;
          --ink-soft: #3d2e24;
          --sage: #4a6650;
        }

        .gift-root {
          font-family: 'Cormorant Garamond', Georgia, serif;
          background: var(--ivory);
          padding: 4rem 1.5rem;
          position: relative;
          overflow: hidden;
          min-height: 500px;
          width: 100%;
        }

        .gift-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(184,147,58,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 10% 100%, rgba(122,24,40,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 90% 100%, rgba(122,24,40,0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        /* ORNAMEN SUDUT */
        .corner { position: absolute; width: 80px; height: 80px; opacity: 0.18; }
        .corner svg { width: 100%; height: 100%; }
        .c-tl { top: 16px; left: 16px; }
        .c-tr { top: 16px; right: 16px; transform: scaleX(-1); }
        .c-bl { bottom: 16px; left: 16px; transform: scaleY(-1); }
        .c-br { bottom: 16px; right: 16px; transform: scale(-1,-1); }

        .gift-inner {
          position: relative;
          z-index: 2;
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }

        /* TIPOGRAFI HEADER */
        .ornament-line { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 1rem; }
        .ornament-line .line { height: 0.5px; width: 60px; background: linear-gradient(to right, transparent, var(--gold)); }
        .ornament-line .line.rev { background: linear-gradient(to left, transparent, var(--gold)); }
        .ornament-line .diamond { width: 6px; height: 6px; background: var(--gold); transform: rotate(45deg); }
        .ornament-line .dot { width: 3px; height: 3px; background: var(--gold-light); transform: rotate(45deg); opacity: 0.6; }

        .section-eyebrow { font-size: 0.68rem; letter-spacing: 0.45em; color: var(--gold); text-transform: uppercase; margin-bottom: 0.6rem; font-family: 'Cormorant Garamond', serif; font-weight: 400; opacity: 0.9; }
        .section-title { font-family: 'Cinzel Decorative', serif; font-size: clamp(1.4rem, 5vw, 2.1rem); color: var(--crimson); font-weight: 600; letter-spacing: 0.04em; margin: 0 0 0.3rem; line-height: 1.2; }
        .section-subtitle { font-family: 'IM Fell English', serif; font-style: italic; font-size: 1rem; color: var(--sage); letter-spacing: 0.1em; margin-bottom: 1.8rem; }
        .gift-desc { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1rem; color: var(--ink-soft); line-height: 1.9; max-width: 480px; margin: 0 auto 2.5rem; opacity: 0.85; }

        .ornament-divider { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 0 auto 2.5rem; max-width: 300px; }
        .ornament-divider .ld { flex: 1; height: 0.5px; background: linear-gradient(to right, transparent, rgba(184,147,58,0.5)); }
        .ornament-divider .rd { flex: 1; height: 0.5px; background: linear-gradient(to left, transparent, rgba(184,147,58,0.5)); }
        .ornament-divider .center-ornament { font-size: 0.9rem; color: var(--gold); opacity: 0.7; }

        /* GRID KARTU */
        .gift-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }

        /* KARTU VERSI SEBELUMNYA (CLEAN & MODERN) */
        .gift-card { 
          background: rgba(255, 255, 255, 0.75); 
          backdrop-filter: blur(8px); 
          border: 1px solid rgba(184,147,58, 0.3); /* Disesuaikan dengan warna tema baru */
          padding: 2.5rem 1.5rem; 
          border-radius: 12px; 
          position: relative; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          box-shadow: 0 8px 24px rgba(0,0,0,0.04); 
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .gift-card:hover {
          transform: translateY(-4px); 
          box-shadow: 0 12px 32px rgba(0,0,0,0.06);
        }
        
        .gift-card::before { content: '✿'; position: absolute; top: 12px; left: 12px; color: var(--gold); font-size: 0.7rem; opacity: 0.4; }
        .gift-card::after { content: '✿'; position: absolute; bottom: 12px; right: 12px; color: var(--gold); font-size: 0.7rem; opacity: 0.4; }

        .bank-name { 
          font-family: 'Cinzel Decorative', serif; 
          font-size: 1.2rem; 
          color: var(--sage); 
          letter-spacing: 0.15em; 
          margin-bottom: 0.5rem; 
          text-transform: uppercase; 
          font-weight: 700; 
        }
        
        .bank-account { 
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Font sederhana untuk angka */
          font-size: 1.6rem; 
          color: var(--crimson); 
          font-weight: 600; 
          letter-spacing: 0.05em; 
          margin-bottom: 0.3rem; 
        }
        
        .bank-holder { 
          font-family: system-ui, sans-serif;
          font-size: 0.85rem; 
          color: var(--ink); 
          opacity: 0.8; 
          letter-spacing: 0.05em; 
          margin-bottom: 1.8rem; 
          text-transform: capitalize; 
        }

        .btn-copy { 
          background: transparent; 
          border: 1px solid var(--gold); 
          color: var(--gold); 
          font-family: 'Cormorant Garamond', serif; 
          font-size: 0.9rem; 
          font-weight: bold; 
          letter-spacing: 0.1em; 
          padding: 0.6rem 1.5rem; 
          cursor: pointer; 
          transition: all 0.3s; 
          border-radius: 6px; 
          text-transform: uppercase; 
          display: flex; 
          align-items: center; 
          gap: 0.5rem; 
        }
        .btn-copy:active { transform: scale(0.95); }
        .btn-copy.copied { background: var(--sage); border-color: var(--sage); color: #fff; }
        @media (min-width: 640px) { .btn-copy:hover:not(.copied) { background: var(--gold); color: #fff; } }

        .closing-note {
          margin-top: 2.8rem;
          font-family: 'IM Fell English', serif;
          font-style: italic;
          font-size: 0.92rem;
          color: var(--ink-soft);
          opacity: 0.55;
          letter-spacing: 0.06em;
        }

        /* ANIMASI */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .gift-inner > * { opacity: 0; }
        .animate-on > * { animation: fadeUp 0.7s ease forwards; }
        
        .animate-on .section-eyebrow { animation-delay: 0.05s; }
        .animate-on .section-title    { animation-delay: 0.15s; }
        .animate-on .section-subtitle { animation-delay: 0.22s; }
        .animate-on .gift-desc        { animation-delay: 0.32s; }
        .animate-on .ornament-divider { animation-delay: 0.4s; }
        .animate-on .gift-grid        { animation-delay: 0.5s; }
        .animate-on .closing-note     { animation-delay: 0.65s; }
      `}</style>

      {/* Ornamen Sudut */}
      <div className="corner c-tl">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4 L4 76" stroke="#b8933a" strokeWidth="0.8"/>
          <path d="M4 4 L76 4" stroke="#b8933a" strokeWidth="0.8"/>
          <path d="M14 14 L14 40" stroke="#b8933a" strokeWidth="0.4" strokeDasharray="2 3"/>
          <path d="M14 14 L40 14" stroke="#b8933a" strokeWidth="0.4" strokeDasharray="2 3"/>
          <circle cx="4" cy="4" r="3" fill="#b8933a"/>
          <circle cx="14" cy="14" r="1.5" fill="#b8933a" opacity="0.5"/>
        </svg>
      </div>
      <div className="corner c-tr">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4 L4 76" stroke="#b8933a" strokeWidth="0.8"/>
          <path d="M4 4 L76 4" stroke="#b8933a" strokeWidth="0.8"/>
          <path d="M14 14 L14 40" stroke="#b8933a" strokeWidth="0.4" strokeDasharray="2 3"/>
          <path d="M14 14 L40 14" stroke="#b8933a" strokeWidth="0.4" strokeDasharray="2 3"/>
          <circle cx="4" cy="4" r="3" fill="#b8933a"/>
          <circle cx="14" cy="14" r="1.5" fill="#b8933a" opacity="0.5"/>
        </svg>
      </div>
      <div className="corner c-bl">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4 L4 76" stroke="#b8933a" strokeWidth="0.8"/>
          <path d="M4 4 L76 4" stroke="#b8933a" strokeWidth="0.8"/>
          <path d="M14 14 L14 40" stroke="#b8933a" strokeWidth="0.4" strokeDasharray="2 3"/>
          <path d="M14 14 L40 14" stroke="#b8933a" strokeWidth="0.4" strokeDasharray="2 3"/>
          <circle cx="4" cy="4" r="3" fill="#b8933a"/>
          <circle cx="14" cy="14" r="1.5" fill="#b8933a" opacity="0.5"/>
        </svg>
      </div>
      <div className="corner c-br">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4 L4 76" stroke="#b8933a" strokeWidth="0.8"/>
          <path d="M4 4 L76 4" stroke="#b8933a" strokeWidth="0.8"/>
          <path d="M14 14 L14 40" stroke="#b8933a" strokeWidth="0.4" strokeDasharray="2 3"/>
          <path d="M14 14 L40 14" stroke="#b8933a" strokeWidth="0.4" strokeDasharray="2 3"/>
          <circle cx="4" cy="4" r="3" fill="#b8933a"/>
          <circle cx="14" cy="14" r="1.5" fill="#b8933a" opacity="0.5"/>
        </svg>
      </div>
    <SakuraBlossom/>
      <div ref={innerRef} className={`gift-inner ${isVisible ? 'animate-on' : ''}`}>
        
        <div className="ornament-line">
          <div className="line rev"></div>
          <div className="dot"></div>
          <div className="diamond"></div>
          <div className="dot"></div>
          <div className="line"></div>
        </div>

        <p className="section-eyebrow">Wedding Gift</p>
        <h2 className="section-title">Tanda Kasih</h2>
        <p className="section-subtitle">Ungkapan Cinta &amp; Doa</p>

        <p className="gift-desc">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
          Namun jika Anda berkenan memberikan tanda kasih,
          kami menyediakan rekening di bawah ini.
        </p>

        <div className="ornament-divider">
          <div className="ld"></div>
          <span className="center-ornament">✦ ✦ ✦</span>
          <div className="rd"></div>
        </div>

        <div className="gift-grid">
          {bankAccounts.map((bank, index) => (
            <div className="gift-card" key={index}>
              <div className="bank-name">{bank.bank}</div>
              <div className="bank-account">{bank.account}</div>
              <div className="bank-holder">a.n {bank.name}</div>
              
              <button 
                className={`btn-copy ${copiedIndex === index ? 'copied' : ''}`}
                onClick={() => handleCopy(bank.account, index)}
              >
                {copiedIndex === index ? '✓ Tersalin' : '✦ Salin Rekening'}
              </button>
            </div>
          ))}
        </div>

        <p className="closing-note">
          Terima kasih atas doa dan tanda kasih yang diberikan.
        </p>
      </div>
    </section>
  );
};

export default GiftSection;