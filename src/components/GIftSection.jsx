import { useEffect, useState, useRef } from 'react';

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
        else setIsVisible(false);
      },
      { threshold: 0.15 }
    );

    if (innerRef.current) observer.observe(innerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="gift-wrapper" ref={sectionRef}>
      <style>{`
        .gift-wrapper { text-align: center; padding: 4rem 1.25rem; max-width: 900px; margin: 0 auto; width: 100%; position: relative; z-index: 2; }
        @media (min-width: 640px) { .gift-wrapper { padding: 5rem 2rem; } }
        
        .gift-wrapper .section-heading { font-family: 'Zen Antique', serif; font-size: clamp(1.8rem, 8vw, 2.5rem); color: var(--deep-red, #8b1a2e); letter-spacing: 0.1em; margin-bottom: 0.2rem; }
        .gift-wrapper .section-heading-sub { font-size: 0.7rem; color: var(--gold, #c9a84c); letter-spacing: 0.4em; margin-bottom: 1.5rem; opacity: 0.9; text-transform: uppercase; }
        
        .gift-wrapper .gift-desc { font-size: 0.9rem; color: var(--ink, #1a1410); opacity: 0.8; line-height: 1.8; max-width: 500px; margin: 0 auto 2rem; font-style: italic; }

        .gift-wrapper .gift-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        @media (min-width: 640px) { .gift-wrapper .gift-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); } }

        .gift-wrapper .gift-card { background: rgba(255,255,255,0.5); backdrop-filter: blur(4px); border: 0.5px solid rgba(201,168,76,0.4); padding: 2rem 1.5rem; border-radius: 4px; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        
        .gift-wrapper .gift-card::before { content: '✿'; position: absolute; top: 10px; left: 10px; color: var(--gold); font-size: 0.6rem; opacity: 0.5; }
        .gift-wrapper .gift-card::after { content: '✿'; position: absolute; bottom: 10px; right: 10px; color: var(--gold); font-size: 0.6rem; opacity: 0.5; }

        .gift-wrapper .bank-name { font-family: 'Zen Antique', serif; font-size: 1.2rem; color: var(--matcha, #5a7a5e); letter-spacing: 0.2em; margin-bottom: 0.5rem; text-transform: uppercase; }
        .gift-wrapper .bank-account { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: var(--deep-red); font-weight: bold; letter-spacing: 0.1em; margin-bottom: 0.2rem; }
        .gift-wrapper .bank-holder { font-size: 0.85rem; color: var(--ink); opacity: 0.7; letter-spacing: 0.1em; margin-bottom: 1.5rem; text-transform: uppercase; }

        .gift-wrapper .btn-copy { background: transparent; border: 1px solid var(--gold); color: var(--gold); font-family: 'Cormorant Garamond', serif; font-size: 0.85rem; letter-spacing: 0.15em; padding: 0.6rem 1.5rem; cursor: pointer; transition: all 0.3s; border-radius: 2px; text-transform: uppercase; display: flex; align-items: center; gap: 0.5rem; }
        .gift-wrapper .btn-copy:active { transform: scale(0.95); }
        .gift-wrapper .btn-copy.copied { background: var(--matcha); border-color: var(--matcha); color: var(--washi, #f5f0e8); }
        @media (min-width: 640px) { .gift-wrapper .btn-copy:hover:not(.copied) { background: var(--gold); color: var(--washi); } }

        /* =======================================================
           ANIMASI ENTRANCE TANDA KASIH
           ======================================================= */
        .anim-slide-up { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1); }
        .animate-on .anim-slide-up { opacity: 1; transform: translateY(0); }
        
        .anim-h1 { transition-delay: 0.1s; }
        .anim-h2 { transition-delay: 0.2s; }
        .anim-p { transition-delay: 0.3s; }
      `}</style>

      <div ref={innerRef} className={`gift-inner ${isVisible ? 'animate-on' : ''}`}>
        <h2 className="section-heading anim-slide-up anim-h1">Tanda Kasih</h2>
        <p className="section-heading-sub anim-slide-up anim-h2">WEDDING GIFT</p>
        
        <p className="gift-desc anim-slide-up anim-p">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
          Namun jika Anda ingin memberikan tanda kasih secara langsung, 
          kami menyediakan fitur di bawah ini:
        </p>

        <div className="gift-grid">
          {bankAccounts.map((bank, index) => (
            <div 
              className="gift-card anim-slide-up" 
              key={index}
              style={{ transitionDelay: `${0.4 + (index * 0.2)}s` }} // Delay bertambah 0.2s per kartu
            >
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
      </div>
    </section>
  );
};

export default GiftSection;