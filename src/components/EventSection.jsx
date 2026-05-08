import { useState, useEffect, useRef } from 'react';

const EventSection = ({ sectionRef, config }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const scrollRef = useRef(null);

  // Mengambil data events dari config
  const events = config?.events || [];

  // --- 3 Ikon Bunga Berbeda ---
  const popIcons = ['✿', '❀', '❁'];
  
  // State khusus untuk mengontrol animasi dan pergantian ikon
  const [iconData, setIconData] = useState({
    char: popIcons[0],
    animClass: 'popping'
  });

  // Efek Auto-Slide tiap 4 detik
  useEffect(() => {
    if (isInteracting || events.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [isInteracting, events.length]);

  // Sinkronisasi scroll posisi berdasarkan activeIndex
  useEffect(() => {
    if (!isInteracting && scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: activeIndex * width,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, isInteracting]);

  // --- LOGIKA ANIMASI IKON TENGGELAM & TIMBUL ---
  useEffect(() => {
    // 1. Saat slide berganti, suruh ikon lama turun & menghilang
    setIconData(prev => ({ ...prev, animClass: 'dipping' }));

    // 2. Tunggu 250ms, lalu ganti ikonnya dan suruh melompat ke atas
    const timer = setTimeout(() => {
      setIconData({
        char: popIcons[activeIndex % popIcons.length],
        animClass: 'popping'
      });
    }, 250);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const handleScroll = (e) => {
    if (!isInteracting) return;
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: index * width, behavior: 'smooth' });
    }
  };

  if (events.length === 0) return null;

  return (
    <section className="event-wrapper" ref={sectionRef}>
      <style>{`
        .event-wrapper { text-align: center; padding: 4rem 1.25rem; max-width: 900px; margin: 0 auto; width: 100%; position: relative; z-index: 2; }
        @media (min-width: 640px) { .event-wrapper { padding: 5rem 2rem; } }
        
        .event-wrapper .section-heading { font-family: 'Cinzel Decorative', serif; font-size: clamp(1.8rem, 8vw, 2.5rem); color: var(--deep-red, #8b1a2e); letter-spacing: 0.1em; margin-bottom: 0.2rem; }
        .event-wrapper .section-heading-sub { font-size: 0.7rem; color: var(--gold, #c9a84c); letter-spacing: 0.4em; margin-bottom: 1.5rem; opacity: 0.9; text-transform: uppercase; }
        
        .event-wrapper .carousel-container { position: relative; width: 100%; overflow: hidden; padding: 0.5rem 0; }
        .event-wrapper .carousel-track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
        .event-wrapper .carousel-track::-webkit-scrollbar { display: none; }
        .event-wrapper .carousel-slide { min-width: 100%; scroll-snap-align: center; padding: 0 0.5rem; display: flex; flex-direction: column; justify-content: stretch; }
        
        .event-wrapper .event-card { border: 0.5px solid rgba(201,168,76,0.4); padding: 2.5rem 1.5rem; position: relative; background: rgba(255,255,255,0.6); backdrop-filter: blur(4px); height: 100%; display: flex; flex-direction: column; justify-content: center; }
        .event-wrapper .event-card::before, .event-wrapper .event-card::after { content: '◆'; position: absolute; color: var(--gold); font-size: 0.6rem; opacity: 0.6; }
        .event-wrapper .event-card::before { top: -0.4rem; left: 50%; transform: translateX(-50%); }
        .event-wrapper .event-card::after { bottom: -0.4rem; left: 50%; transform: translateX(-50%); }
        
        .event-wrapper .event-title { font-family: 'Zen Antique', serif; font-size: 1.5rem; color: var(--matcha, #5a7a5e); margin-bottom: 1.5rem; }
        .event-wrapper .event-date-num { font-family: 'Zen Antique', serif; font-size: clamp(2.5rem, 12vw, 4.5rem); color: var(--deep-red); line-height: 1; margin: 0.5rem 0; }
        .event-wrapper .event-month { font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: var(--matcha); letter-spacing: 0.2em; margin: 0.3rem 0; text-transform: uppercase; font-weight: bold; }
        .event-wrapper .event-year { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: var(--gold); letter-spacing: 0.3em; }
        
        .event-wrapper .divider { display: flex; align-items: center; gap: 0.5rem; margin: 1.5rem 0; color: var(--gold); opacity: 0.6; }
        .event-wrapper .divider::before, .event-wrapper .divider::after { content: ''; flex: 1; height: 0.5px; background: currentColor; }
        
        .event-wrapper .event-details { font-size: 0.9rem; color: var(--ink, #1a1410); opacity: 0.8; line-height: 1.8; letter-spacing: 0.05em; }
        
        /* =========================================
           Custom Indicators: Sliding Bar
           ========================================= */
        .event-wrapper .indicators-wrapper { display: flex; justify-content: center; margin-top: 3rem; margin-bottom: 1rem; }
        .event-wrapper .indicators-track { position: relative; display: flex; width: 120px; height: 3px; background: rgba(201,168,76,0.2); border-radius: 2px; }
        .event-wrapper .indicator-segment { flex: 1; height: 20px; transform: translateY(-8px); cursor: pointer; position: relative; z-index: 2; }
        
        /* Bar Merah */
        .event-wrapper .indicator-active-bar { 
          position: absolute; top: 0; left: 0; height: 100%; 
          background: var(--deep-red, #8b1a2e); border-radius: 2px; 
          box-shadow: 0 0 8px rgba(139,26,46,0.4); 
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1); 
          z-index: 1; 
        }

        /* --- STASIUN POPUP TENGAH --- */
        .event-wrapper .popup-station {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          display: flex;
          justify-content: center;
          z-index: 5;
        }

        /* --- BASE STYLE UNTUK IKON --- */
        .event-wrapper .game-popup {
          position: absolute;
          bottom: 10px; 
          font-size: 1.5rem; 
          pointer-events: none;
          color: var(--gold, #c9a84c); /* Warna dikunci pada Emas */
          text-shadow: 0 2px 4px rgba(201,168,76,0.3);
        }

        /* --- KELAS ANIMASI DARI REACT STATE --- */
        .event-wrapper .game-popup.dipping {
          animation: dipDown 0.25s ease-in forwards;
        }

        .event-wrapper .game-popup.popping {
          animation: popUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        /* 1. Animasi Tenggelam / Menghilang (Tanpa ubah warna) */
        @keyframes dipDown {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(15px) scale(0.3); opacity: 0; }
        }

        /* 2. Animasi Melompat ke Atas lalu Mendarat (Tanpa ubah warna) */
        @keyframes popUp {
          0% { transform: translateY(15px) scale(0.3) rotate(-45deg); opacity: 0; } 
          50% { transform: translateY(-2px) scale(1.2) rotate(65deg); opacity: 1; } 
          100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; } 
        }
      `}</style>

      <h2 className="section-heading">Jadwal Acara</h2>
      <p className="section-heading-sub">WEDDING EVENTS</p>

      <div className="carousel-container">
        <div 
          className="carousel-track" 
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
          onMouseDown={() => setIsInteracting(true)}
          onMouseUp={() => setIsInteracting(false)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          {events.map((event, idx) => {
            const d = new Date(event.date);
            return (
              <div className="carousel-slide" style={{ overflow: 'hidden' }} key={event._id || idx}>
                <div className="event-card">
                  <div className="event-title">{event.name}</div>
                  
                  <div className="event-date-num">{d.getDate()}</div>
                  <div className="event-month">{d.toLocaleDateString('id-ID', { month: 'long' })}</div>
                  <div className="event-year">{d.getFullYear()}</div>
                  
                  <div className="divider"><span>✿</span></div>
                  
                  <div className="event-details">
                    <div><strong>Pukul {event.time} - Selesai</strong></div>
                    <br/>
                    <div style={{ fontStyle: 'italic', opacity: 0.8, marginTop: '0.5rem' }}>{event.location}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicators: Sliding Bar dengan Game Pop-up di Tengah */}
      <div className="indicators-wrapper">
        <div className="indicators-track">
          
          <div 
            className="indicator-active-bar" 
            style={{ 
              width: `${100 / events.length}%`, 
              transform: `translateX(${activeIndex * 100}%)` 
            }} 
          />

          {/* Stasiun Statis di Tengah untuk Pop-up Bunga Bergantian */}
          <div className="popup-station">
            <span className={`game-popup ${iconData.animClass}`}>
              {iconData.char}
            </span>
          </div>
          
          {events.map((_, idx) => (
            <div
              key={idx}
              className="indicator-segment"
              onClick={() => handleDotClick(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSection;