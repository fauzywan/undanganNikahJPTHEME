import React from 'react';
import { 
  KoinoboriLove, 
  SensuFan, 
  OrigamiCrane, 
  KoinoboriKite, 
  KoinoboriFan, 
  KoinoboriStar 
} from './Ornaments';
// Mengambil dari story slice
import { useSelector } from 'react-redux';


const storyData = [
  { 
    id: 1, 
    date: "02 Februari 2023", 
    title: "Awal Cerita Kita", 
    description: "Hari di mana 'aku' dan 'kamu' akhirnya sepakat menjadi 'kita'. Dari sekadar obrolan ringan hingga hati yang saling terpaut, momen sederhana ini menjadi awal dari perjalanan panjang yang tak pernah kami sangka akan seindah ini." 
  },

  { 
    id: 3, 
    date: "07 Juni 2026", 
    title: "Mengikat Janji Suci", 
    description: "Puncak dari segala doa dan penantian. Di hari bahagia ini, kami siap mengucap janji suci di hadapan-Nya untuk menua bersama, membangun kebahagiaan, dan saling melengkapi seumur hidup. Mohon doa restunya." 
  }
];

const StoryLove = ({stories}) => {
  const storyData = stories?.map((item) => ({
    id: item._id,
    date: item.date,
    title: item.title,
    description: item.description,
  }));
  return (
    // bg1.jpg sebagai background, background-size: cover, background-position: center, background-repeat: no-repeat
    <section className="story-wrapper-neko" >
      <style>{`
        .story-wrapper-neko { 
          padding: 6rem 1.25rem; 
          background: var(--bg-alt, #ffffff); 
          position: relative; 
          z-index: 2; 
          overflow: hidden; 
        }
        
        .story-wrapper-neko .story-subtitle { 
          font-family: 'Cormorant Garamond', serif; 
          font-size: 0.9rem; 
          color: var(--matcha, #5a7a5e); 
          letter-spacing: 0.3em; 
          margin-bottom: 0.5rem; 
          display: block; 
          text-align: center; 
          text-transform: uppercase; 
          font-weight: 600; 
          position: relative;
          z-index: 10;
        }
        
        .story-wrapper-neko .story-title { 
          font-family: 'Cinzel Decorative', serif; 
          font-weight:600;
          font-size: 2.2rem; 
          color: var(--deep-red, #8b1a2e); 
          text-align: center; 
          margin-bottom: 4rem; 
          position: relative;
          z-index: 10;
        }

        .story-wrapper-neko .timeline-container { 
          position: relative; 
          max-width: 800px; 
          margin: 0 auto; 
          padding-left: 30px; 
          z-index: 10;
        }
        
        .story-wrapper-neko .timeline-line { 
          position: absolute; 
          left: 30px; 
          top: 0; 
          bottom: 0; 
          width: 1px; 
          background: rgba(201,168,76,0.3); 
        }

        .story-wrapper-neko .timeline-item { 
          position: relative; 
          margin-bottom: 4rem; 
          display: flex; 
          flex-direction: column; 
        }
        .story-wrapper-neko .timeline-item:last-child { margin-bottom: 0; }

        /* --- DESAIN NEKO-NOBORI (KUCING KOINOBORI) --- */
        .story-wrapper-neko .neko-head { 
          position: absolute; left: 0; width: 20px; height: 18px; 
          border-radius: 50% 50% 45% 45%; 
          transform: translate(-10px, 22px); z-index: 3; 
          border: 1.5px solid var(--ink, #1a1410);
        }
        .story-wrapper-neko .timeline-item:nth-child(odd) .neko-head { background: var(--ink, #1a1410); }
        .story-wrapper-neko .timeline-item:nth-child(even) .neko-head { background: var(--washi, #faf6ee); border-color: var(--gold, #c9a84c); }

        .story-wrapper-neko .neko-head::before,
        .story-wrapper-neko .neko-head::after {
          content: ''; position: absolute; top: -5px; width: 0; height: 0; 
          border-left: 4px solid transparent; border-right: 4px solid transparent; 
        }
        .story-wrapper-neko .timeline-item:nth-child(odd) .neko-head::before,
        .story-wrapper-neko .timeline-item:nth-child(odd) .neko-head::after { border-bottom: 6px solid var(--ink, #1a1410); }
        .story-wrapper-neko .timeline-item:nth-child(even) .neko-head::before,
        .story-wrapper-neko .timeline-item:nth-child(even) .neko-head::after { border-bottom: 6px solid var(--gold, #c9a84c); }
        .story-wrapper-neko .neko-head::before { left: 1px; transform: rotate(-15deg); }
        .story-wrapper-neko .neko-head::after { right: 1px; transform: rotate(15deg); }

        .story-wrapper-neko .neko-streamer {
          position: absolute; left: 0; top: 22px; width: 1px; height: 50px;
          background: transparent; z-index: 2; transform: translateX(-0.5px);
        }
        .story-wrapper-neko .neko-streamer::before {
          content: '彡'; position: absolute; top: 18px; left: -6px; color: var(--sakura, #E8A0B0);
          font-size: 1rem; opacity: 0.7; writing-mode: vertical-rl;
        }

        /* --- KONTEN KARTU --- */
        .story-wrapper-neko .timeline-content { 
          background: var(--rice-paper, #faf6ee); border: 1px solid rgba(201,168,76,0.25); 
          padding: 1.5rem; border-radius: 4px; margin-left: 28px; width: calc(100% - 28px); position: relative;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03); transition: transform 0.3s ease;
        }
        .story-wrapper-neko .timeline-content:hover { transform: translateY(-3px); }
        .story-wrapper-neko .timeline-content::after {
          content: 'U U U'; position: absolute; bottom: 8px; right: 10px; font-size: 0.7rem; 
          color: var(--gold, #c9a84c); opacity: 0.15; font-family: Arial, sans-serif; letter-spacing: 2px;
        }

        .story-wrapper-neko .timeline-date { font-family: 'Cormorant Garamond', serif; font-size: 0.8rem; letter-spacing: 0.15em; color: var(--gold, #c9a84c); text-transform: uppercase; font-weight: bold; margin-bottom: 0.5rem; display: block; }
        .story-wrapper-neko .timeline-heading { font-family: 'Zen Antique', serif; font-size: 1.3rem; color: var(--ink, #1a1410); margin-bottom: 0.75rem; line-height: 1.2; }
        .story-wrapper-neko .timeline-text { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; color: var(--ink, #1a1410); line-height: 1.6; opacity: 0.85; }

        /* --- DESKTOP VIEW --- */
        @media (min-width: 768px) { 
          .story-wrapper-neko .story-title { font-size: 2.8rem; }
          .story-wrapper-neko .timeline-container { padding-left: 0; }
          .story-wrapper-neko .timeline-line { left: 50%; transform: translateX(-50%); }
          .story-wrapper-neko .timeline-item { flex-direction: row; justify-content: space-between; align-items: center; }
          .story-wrapper-neko .timeline-item:nth-child(odd) { flex-direction: row-reverse; }
          .story-wrapper-neko .neko-head { left: 50%; transform: translate(-50%, -50%); top: 50%; }
          .story-wrapper-neko .neko-streamer { left: 50%; top: 50%; height: 60px;}
          .story-wrapper-neko .neko-streamer::before { top: 12px; }
          .story-wrapper-neko .timeline-content { width: 44%; margin-left: 0; padding: 2rem; }
          .story-wrapper-neko .timeline-item:nth-child(even) .timeline-content { text-align: right; }
          .story-wrapper-neko .timeline-item:nth-child(odd) .timeline-content { text-align: left; }
        }
      `}</style>

      {/* ========================================================
          DEKORASI ORNAMEN MELAYANG (Dari Koleksi Kakak)
          ======================================================== */}
      
      {/* 1. Koinobori Love di Kiri Atas */}
      <div className="absolute top-10 left-2 md:left-12 w-24 h-24 opacity-25 -rotate-12 z-0" style={{ color: 'var(--sakura)' }}>
        <KoinoboriLove className="w-full h-full" />
      </div>

      {/* 2. Koinobori Kite (Layangan) di Kanan Atas */}
      <div className="absolute top-28 right-4 md:right-16 w-20 h-20 opacity-20 rotate-12 z-0" style={{ color: 'var(--deep-red)' }}>
        <KoinoboriKite className="w-full h-full" />
      </div>

      {/* 3. Koinobori Fan (Kipas) di Kiri Tengah */}
      <div className="absolute top-1/2 left-[-10px] md:left-8 w-24 h-24 opacity-20 -rotate-6 z-0" style={{ color: 'var(--gold)' }}>
        <KoinoboriFan className="w-full h-full" />
      </div>

      {/* 4. Koinobori Star (Bintang) di Kanan Tengah */}
      <div className="absolute top-2/3 right-0 md:right-10 w-16 h-16 opacity-25 rotate-45 z-0" style={{ color: 'var(--sakura)' }}>
        <KoinoboriStar className="w-full h-full" />
      </div>

      {/* 5. Bangau Tsuru di Kiri Bawah */}
      <div className="absolute bottom-24 left-4 md:left-16 w-20 h-20 opacity-25 rotate-12 z-0" style={{ color: 'var(--washi)' }}>
        <OrigamiCrane className="w-full h-full" />
      </div>

      {/* 6. Sensu Fan Klasik di Kanan Bawah */}
      <div className="absolute bottom-10 right-4 md:right-12 w-24 h-24 opacity-15 -rotate-12 z-0" style={{ color: 'var(--deep-red)' }}>
        <SensuFan className="w-full h-full" />
      </div>

      {/* ======================================================== */}

      <span className="story-subtitle">Perjalanan Kami</span>
      <h2 className="story-title">Kisah Cinta</h2>

      <div className="timeline-container">
        <div className="timeline-line"></div>

        {storyData?.map((item,index) => (
          <div key={index} className="timeline-item">
            {/* Ikon Kucing & Pita Timeline */}
            <div className="neko-head"></div>
            <div className="neko-streamer"></div>

            {/* Kotak Konten */}
            <div className="timeline-content">
              <span className="timeline-date">🐾 {item.date}</span>
              <h3 className="timeline-heading">{item.title}</h3>
              <p className="timeline-text">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoryLove;