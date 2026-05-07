import { useEffect, useState, useRef } from 'react';
import KoinoboriFamily from './KoinoboriFamily';

const CoupleSection = ({ sectionRef, brideShort, groomShort, config,photos }) => {
  const [isVisible, setIsVisible] = useState(false);
  const innerRef = useRef(null);

  // Data fallback untuk daftar Turut Mengundang
  
  let turutMengundang =  [];
  if(config?.otherFamily){
    turutMengundang=  config?.otherFamily.map(item => {
      return item.name;
    });
  } 

  // Efek untuk memicu animasi saat bagian ini masuk ke layar
  const bridePhoto = photos.find((p) => p.role === 'bride')?.url || null;
  const groomPhoto = photos.find((p) => p.role === 'groom')?.url || null;
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: observer.unobserve(entry.target); // Hapus komentar jika ingin animasi hanya jalan 1x
        } else {
          setIsVisible(false); // Reset animasi jika di-scroll ke atas/bawah
        }
      },
      { threshold: 0.15 } // Terpicu ketika 15% bagian ini terlihat
    );

    if (innerRef.current) {
      observer.observe(innerRef.current);
    }

    return () => observer.disconnect();

  }, []);

  return (
    <section className="couple-wrapper" ref={sectionRef}>
      <style>{`
        .couple-wrapper { text-align: center; padding: 4rem 1.25rem; max-width: 900px; margin: 0 auto; width: 100%; position: relative; z-index: 2; overflow: hidden; }
        @media (min-width: 640px) { .couple-wrapper { padding: 5rem 2rem; } }

        /* --- Bismillah & Intro --- */
        .couple-wrapper .bismillah { font-size: 2.5rem; color: var(--gold, #c9a84c); margin-bottom: 1rem; line-height: 1; font-family: 'Amiri', 'Scheherazade', serif; font-weight: normal; text-shadow: 0 0 15px rgba(201,168,76,0.4); }
        .couple-wrapper .intro-text { font-size: 0.9rem; color: var(--ink, #1a1410); opacity: 0.8; margin-bottom: 2.5rem; font-style: italic; line-height: 1.6; }
        .couple-wrapper .intro-names { font-family: 'Zen Antique', serif; font-size: 1.4rem; color: var(--deep-red, #8b1a2e); margin-top: 0.5rem; letter-spacing: 0.05em; font-style: normal; }

        /* --- Grid & Cards --- */
        .couple-wrapper .couple-grid { display: grid; grid-template-columns: 1fr; align-items: center; gap: 2rem; margin: 2rem 0; }
        @media (min-width: 640px) { .couple-wrapper .couple-grid { grid-template-columns: 1fr auto 1fr; gap: 2rem; margin: 3rem 0; } }
        
        .couple-wrapper .couple-card { padding: 2rem 1.5rem; background: rgba(255,255,255,0.6); backdrop-filter: blur(4px); border: 0.5px solid rgba(201,168,76,0.3); border-radius: 4px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        @media (min-width: 640px) { .couple-wrapper .couple-card { background: transparent; border: none; box-shadow: none; padding: 1.5rem 1rem; } }
        
        /* Floating Animation untuk Foto */
        @keyframes floatPhoto {
          0% { transform: translateY(0px); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          50% { transform: translateY(-8px); box-shadow: 0 12px 25px rgba(0,0,0,0.15); }
          100% { transform: translateY(0px); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        }

        .couple-wrapper .couple-photo-frame { width: 130px; height: 130px; margin: 0 auto 1.5rem; border-radius: 50%; background: linear-gradient(135deg, rgba(201,168,76,0.2), rgba(232,160,176,0.2)); border: 1px solid rgba(201,168,76,0.4); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; animation: floatPhoto 5s ease-in-out infinite; }
        @media (min-width: 640px) { .couple-wrapper .couple-photo-frame { width: 160px; height: 160px; margin-bottom: 1.5rem; } }
        
        /* Memberikan delay pada foto pria agar naiknya bergantian */
        .card-groom .couple-photo-frame { animation-delay: 2.5s; }

        .couple-wrapper .couple-photo-frame::before { content: ''; position: absolute; inset: 5px; border-radius: 50%; border: 0.5px solid rgba(201,168,76,0.5); z-index: 2; pointer-events: none; }
        .couple-wrapper .couple-photo-inner { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; position: relative; z-index: 1; }
        .couple-wrapper .couple-initials { font-family: 'Zen Antique', serif; font-size: 3rem; color: var(--gold); opacity: 0.8; }
        
        .couple-wrapper .couple-name { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: var(--deep-red); font-weight: 600; line-height: 1.2; margin-bottom: 0.5rem; }
        .couple-wrapper .couple-parents { font-size: 0.85rem; color: var(--ink, #1a1410); opacity: 0.8; line-height: 1.6; letter-spacing: 0.05em; margin-bottom: 1.25rem; font-style: italic; }
        
        /* Instagram Button */
        .couple-wrapper .couple-ig { margin-top: auto; }
        .couple-wrapper .couple-ig a { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1rem; border: 1px solid rgba(201,168,76,0.4); border-radius: 20px; font-size: 0.75rem; letter-spacing: 0.1em; color: var(--matcha, #5a7a5e); text-decoration: none; transition: all 0.3s; background: rgba(255,255,255,0.4); }
        .couple-wrapper .couple-ig a:active { transform: scale(0.95); }
        @media (min-width: 640px) { .couple-wrapper .couple-ig a:hover { background: var(--gold); color: #fff; border-color: var(--gold); } }

        .couple-wrapper .couple-divider { display: none; font-family: 'Zen Antique', serif; font-size: 1.5rem; color: var(--gold); opacity: 0.5; }
        @media (min-width: 640px) { .couple-wrapper .couple-divider { display: block; } }

        /* --- Turut Mengundang --- */
        .couple-wrapper .turut-mengundang-wrapper { margin-top: 3rem; padding-top: 2.5rem; border-top: 1px solid rgba(201,168,76,0.3); position: relative; }
        .couple-wrapper .turut-mengundang-wrapper::before { content: '✿'; position: absolute; top: -10px; left: 50%; transform: translateX(-50%); color: var(--gold); font-size: 0.8rem; background: var(--rice-paper, #faf6ee); padding: 0 10px; opacity: 0.6; }
        .couple-wrapper .tm-title { font-size: 0.75rem; letter-spacing: 0.3em; color: var(--matcha, #5a7a5e); text-transform: uppercase; margin-bottom: 1.5rem; font-weight: bold; }
        .couple-wrapper .tm-list { list-style: none; padding: 0; margin: 0; font-size: 0.85rem; color: var(--ink, #1a1410); opacity: 0.8; line-height: 1.8; font-style: italic; }
        .couple-wrapper .tm-list li { margin-bottom: 0.4rem; }

        /* =======================================================
           ANIMASI ENTRANCE (MASUK KE LAYAR)
           ======================================================= */
        
        /* Kondisi Awal (Sembunyi) */
        .anim-bismillah { opacity: 0; transform: translateY(20px); transition: all 0.8s ease 0.2s; }
        .anim-intro { opacity: 0; transform: translateY(20px); transition: all 0.8s ease 0.4s; }
        .anim-bride { opacity: 0; transform: translateX(-40px); transition: all 1s cubic-bezier(0.25, 1, 0.5, 1) 0.6s; }
        .anim-divider { opacity: 0; transform: scale(0.5) rotate(-180deg); transition: all 0.8s ease 0.8s; }
        .anim-groom { opacity: 0; transform: translateX(40px); transition: all 1s cubic-bezier(0.25, 1, 0.5, 1) 0.8s; }
        .anim-tm { opacity: 0; transform: translateY(30px); transition: all 0.8s ease 1s; }

        /* Kondisi Aktif (Tampil) */
        .animate-on .anim-bismillah { opacity: 1; transform: translateY(0); }
        .animate-on .anim-intro { opacity: 1; transform: translateY(0); }
        .animate-on .anim-bride { opacity: 1; transform: translateX(0); }
        .animate-on .anim-divider { opacity: 1; transform: scale(1) rotate(0deg); }
        .animate-on .anim-groom { opacity: 1; transform: translateX(0); }
        .animate-on .anim-tm { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* Kontainer Animasi Lokal */}
      <div ref={innerRef} className={`couple-inner ${isVisible ? 'animate-on' : ''}`}>
        
        {/* 1. Bismillah */}
        <div className="bismillah anim-bismillah">﷽</div>

        {/* 2. Teks Pengantar */}
        <div className="intro-text anim-intro">
          Kami turut mengundang Anda pada pernikahan:
          
        </div>
        
        {/* 3. Grid Mempelai */}
        <div className="couple-grid">
          
          {/* Mempelai Wanita (Masuk dari kiri) */}
          <div className="couple-card card-bride anim-bride">
            <div className="couple-photo-frame">
              {bridePhoto ? (
                <img src={bridePhoto} alt={brideShort} className="couple-photo-inner" />
              ) : (
                <span className="couple-initials">{brideShort.charAt(0)}</span>
              )}
            </div>
            <div className="couple-name">{config?.bride?.name || 'Nama Mempelai Wanita'}</div>
            <div className="couple-parents">
              Putri dari Bpk. {config?.bride?.father || '-'} <br/> & Ibu {config?.bride?.mother || '-'}
            </div>
            <div className="couple-ig">
              <a href={`https://instagram.com/${config?.bride?.instagram || 'hanaputri'}`} target="_blank" rel="noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                @{config?.bride?.instagram || 'hanaputri'}
              </a>
            </div>
          </div>

          {/* Bunga Pemisah di Tengah */}
          <div className="couple-divider anim-divider">✿</div>

          {/* Mempelai Pria (Masuk dari kanan) */}
          <div className="couple-card card-groom anim-groom">
            <div className="couple-photo-frame">
              {groomPhoto ? (
                <img src={groomPhoto} alt={groomShort} className="couple-photo-inner" />
              ) : (
                <span className="couple-initials">{groomShort.charAt(0)}</span>
              )}
            </div>
            <div className="couple-name">{config?.groom?.name || 'Nama Mempelai Pria'}</div>
            <div className="couple-parents">
              Putra dari Bpk. {config?.groom?.father || '-'} <br/> & Ibu {config?.groom?.mother || '-'}
            </div>
            <div className="couple-ig">
              <a href={`https://instagram.com/${config?.groom?.instagram || 'aryapratama'}`} target="_blank" rel="noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                @{config?.groom?.instagram || 'aryapratama'}
              </a>
            </div>
          </div>
        </div>
        {turutMengundang && (
        
        <div className="turut-mengundang-wrapper anim-tm">
          <div className="tm-title">Turut Mengundang:</div>
          <ul className="tm-list">
            {turutMengundang.map((keluarga, index) => (
              <li key={index}>{keluarga}</li>
            ))}
          </ul>
        </div>
          )}

      </div>
    </section>
  );
};

export default CoupleSection;