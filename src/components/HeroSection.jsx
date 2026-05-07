import Furin from './Furin';

const HeroSection = ({ sectionRef, photos, brideShort, groomShort, config }) => {
  // Ambil 3 foto dari galeri (atau gunakan placeholder jika kosong)

  const polaroidPhotos = photos?.filter((p) => p.role === 'polaroid')?.map(p=>p.url) || [null, null, null];

  return (
    <section className="hero-wrapper" ref={sectionRef}>
      <style>{`
        .hero-wrapper { text-align: center; padding: 6rem 1.25rem 3rem; position: relative; z-index: 1; min-height: 80svh; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
        @media (min-width: 640px) { .hero-wrapper { padding: 6rem 2rem 3rem; max-width: 900px; margin: 0 auto; } }
        
        /* Background Fuji & Koinobori */
        .hero-wrapper .fuji-wrapper { position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: 0; display: flex; align-items: flex-end; justify-content: center; pointer-events: none; }
        .hero-wrapper .fuji-svg { width: 250%; max-width: 1000px; min-width: 600px; opacity: 0.9; }
        
        .hero-wrapper .koinobori-wrapper { position: absolute; top: 10%; right: -5%; width: 90px; height: 250px; opacity: 0.15; pointer-events: none; z-index: 0; }
        @media (min-width: 640px) { .hero-wrapper .koinobori-wrapper { width: 120px; right: 5%; height: 350px; } }
        .hero-wrapper .koi-wind-1 { animation: wind 4s ease-in-out infinite alternate; transform-origin: 15px 50px; will-change: transform; }
        .hero-wrapper .koi-wind-2 { animation: wind 3.5s ease-in-out infinite alternate; transform-origin: 15px 120px; will-change: transform; }
        @keyframes wind { 0% { transform: rotate(-3deg) scaleY(0.95); } 100% { transform: rotate(5deg) scaleY(1.05); } }

        /* Quran Surah */
        .hero-wrapper .hero-surah { max-width: 600px; margin: 1.5rem auto 1rem; padding: 0 1rem; position: relative; z-index: 2; }
        .hero-wrapper .surah-translation { font-size: 0.95rem; font-style: italic; color: rgba(26,20,16,0.8); line-height: 1.8; margin-bottom: 1rem; font-family: 'Cormorant Garamond', serif; text-shadow: 0 0 10px rgba(255,255,255,0.8); }
        .hero-wrapper .surah-reference { font-size: 0.8rem; letter-spacing: 0.2em; color: var(--gold, #c9a84c); font-weight: bold; }

        /* HANGING POLAROIDS SECTION */
        .polaroid-container { position: relative; margin: 1rem auto 3rem; padding-top: 1.5rem; max-width: 600px; width: 100%; display: flex; justify-content: center; gap: 0.8rem; z-index: 2; }
        @media (min-width: 640px) { .polaroid-container { gap: 1.5rem; padding-top: 2.5rem; } }

        /* Tali melengkung */
        .polaroid-string { position: absolute; top: 15px; left: -10%; width: 120%; height: 60px; border-bottom: 1.5px dashed var(--gold, #c9a84c); border-radius: 50%; opacity: 0.5; z-index: 0; pointer-events: none; }
        @media (min-width: 640px) { .polaroid-string { top: 25px; height: 80px; } }

        /* Wrapper tiap polaroid */
        .polaroid-wrapper { position: relative; display: flex; flex-direction: column; align-items: center; z-index: 1; }
        
        /* Jepitan (Clothespin) ala Jepang (Emas/Kayu) */
        .clothespin { width: 8px; height: 28px; background: linear-gradient(to bottom, #d4a373, #8b5a2b); border-radius: 1px; position: absolute; top: -12px; z-index: 3; box-shadow: 1px 2px 4px rgba(0,0,0,0.2); }
        .clothespin::after { content: ''; position: absolute; top: 10px; left: -1px; right: -1px; height: 2px; background: var(--gold, #c9a84c); }

        /* Kertas Polaroid */
        .polaroid-card { background: var(--rice-paper, #faf6ee); padding: 0.4rem 0.4rem 1.2rem 0.4rem; box-shadow: 0 6px 15px rgba(0,0,0,0.15); border: 1px solid rgba(201,168,76,0.3); transform-origin: top center; display: inline-block; }
        @media (min-width: 640px) { .polaroid-card { padding: 0.6rem 0.6rem 2rem 0.6rem; } }
        
        /* Rotasi unik tiap foto agar terlihat natural */
        .polaroid-wrapper:nth-child(2) .polaroid-card { transform: rotate(-6deg) translateY(15px); animation: swingP1 4s ease-in-out infinite alternate; }
        .polaroid-wrapper:nth-child(3) .polaroid-card { transform: rotate(4deg) translateY(25px); animation: swingP2 5s ease-in-out infinite alternate; }
        .polaroid-wrapper:nth-child(4) .polaroid-card { transform: rotate(-3deg) translateY(12px); animation: swingP3 4.5s ease-in-out infinite alternate; }

        @keyframes swingP1 { 0% { transform: rotate(-6deg) translateY(15px); } 100% { transform: rotate(-2deg) translateY(15px); } }
        @keyframes swingP2 { 0% { transform: rotate(4deg) translateY(25px); } 100% { transform: rotate(8deg) translateY(25px); } }
        @keyframes swingP3 { 0% { transform: rotate(-3deg) translateY(12px); } 100% { transform: rotate(1deg) translateY(12px); } }

        /* Foto di dalam polaroid */
        .polaroid-photo { width: 85px; height: 90px; object-fit: cover; background: var(--ink, #1a1410); display: block; }
        @media (min-width: 640px) { .polaroid-photo { width: 130px; height: 140px; } }
        
        /* Placeholder jika tidak ada foto */
        .polaroid-placeholder { width: 85px; height: 90px; background: rgba(201,168,76,0.1); display: flex; align-items: center; justify-content: center; font-family: 'Zen Antique', serif; font-size: 2rem; color: var(--gold); }
        @media (min-width: 640px) { .polaroid-placeholder { width: 130px; height: 140px; font-size: 3rem; } }

        /* Names & Typography */
        .hero-wrapper .hero-names { font-family: 'Zen Antique', serif; font-size: clamp(2.2rem, 10vw, 4rem); color: var(--deep-red, #8b1a2e); letter-spacing: 0.1em; line-height: 1.2; position: relative; z-index: 2; }
        .hero-wrapper .hero-and { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: clamp(1.2rem, 5vw, 1.8rem); color: var(--gold, #c9a84c); margin: 0.25rem 0; position: relative; z-index: 2; }
        .hero-wrapper .divider { display: flex; align-items: center; gap: 0.5rem; margin: 1.5rem 0; color: var(--gold, #c9a84c); opacity: 0.6; position: relative; z-index: 2; }
        .hero-wrapper .divider::before, .hero-wrapper .divider::after { content: ''; flex: 1; height: 0.5px; background: currentColor; }
      `}</style>

      {/* Background Fuji & Koinobori */}
      <div className="fuji-wrapper">
        <svg className="fuji-svg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="180" r="100" fill="rgba(139,26,46,0.04)" />
          <path d="M400 80 L750 400 L50 400 Z" fill="rgba(201,168,76,0.03)" stroke="rgba(201,168,76,0.15)" strokeWidth="1"/>
          <path d="M400 80 L480 160 Q400 135 320 160 Z" fill="rgba(255,255,255,0.6)" stroke="rgba(201,168,76,0.1)" strokeWidth="1"/>
        </svg>
      </div>
      
      <div className="koinobori-wrapper">
        <svg viewBox="0 0 200 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <line x1="15" y1="10" x2="15" y2="400" stroke="var(--gold)" strokeWidth="2"/>
          <circle cx="15" cy="10" r="5" fill="var(--gold)"/>
          <g className="koi-wind-1"><path d="M 15 50 Q 80 20 180 40 L 150 55 L 180 70 Q 80 90 15 60 Z" fill="var(--deep-red)" opacity="0.7"/><circle cx="30" cy="53" r="2.5" fill="var(--rice-paper)"/></g>
          <g className="koi-wind-2"><path d="M 15 120 Q 60 100 140 115 L 115 125 L 140 135 Q 60 150 15 130 Z" fill="var(--gold)" opacity="0.7"/><circle cx="28" cy="123" r="2" fill="var(--rice-paper)"/></g>
        </svg>
      </div>
      
      {/* 1. Lonceng Furin */}
      <Furin />

      {/* 2. Ayat Al-Qur'an */}
      <div className="hero-surah">
        <p className="surah-translation">"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."</p>
        <p className="surah-reference">(QS. Ar-Rum: 21)</p>
      </div>

      {/* 3. Gantungan Polaroid */}
      <div className="polaroid-container">
        {/* Garis Tali */}
        <div className="polaroid-string"></div>

        {polaroidPhotos.map((photo, index) => (
          <div className="polaroid-wrapper" key={index}>
            <div className="clothespin"></div>
            <div className="polaroid-card">
              {photo ? (
                <img src={photo} alt={`Momen ${index + 1}`} className="polaroid-photo" />
              ) : (
                <div className="polaroid-placeholder">{['✿', '✾', '❀'][index]}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default HeroSection;