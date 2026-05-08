import React from 'react';

const FooterSection = ({ brideShort, groomShort, eventDateObj, year, config }) => {
  // Mengambil inisial huruf pertama dari nama panggilan
  const brideInitial = brideShort ? brideShort.charAt(0).toUpperCase() : 'W';
  const groomInitial = groomShort ? groomShort.charAt(0).toUpperCase() : 'P';

  // Format tanggal yang lebih estetik: DD . MM . YYYY
  const formattedDate = eventDateObj 
    ? `${String(eventDateObj.getDate()).padStart(2, '0')} . ${String(eventDateObj.getMonth() + 1).padStart(2, '0')} . ${eventDateObj.getFullYear()}` 
    : '2026';

  return (
    <footer className="footer-wrapper">
      <style>{`
        .footer-wrapper { 
          text-align: center; 
          padding: 6rem 1.5rem 2rem; 
          background: var(--ink, #1a1410); 
          color: var(--washi, #f5f0e8); 
          position: relative; 
          overflow: hidden; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
        }
        
        /* Latar Belakang Teks Transparan (Yang Kakak Suka) */
        .footer-wrapper::before { 
          content: ''; 
          font-family: 'Zen Antique', serif; 
          font-size: clamp(3rem, 15vw, 8rem); 
          position: absolute; 
          top: 30%; 
          left: 50%; 
          transform: translate(-50%, -50%); 
          color: rgba(255,255,255,0.02); 
          line-height: 1; 
          pointer-events: none; 
          user-select: none; 
          letter-spacing: 0.2em; 
          width: 100%; 
          white-space: nowrap; 
        }

        /* Bingkai Lingkaran Inisial / Foto */
        .footer-wrapper .footer-badge { 
          width: 110px; 
          height: 110px; 
          border-radius: 50%; 
          background: linear-gradient(135deg, rgba(201,168,76,0.1), rgba(232,160,176,0.1)); 
          border: 1px solid rgba(201,168,76,0.5); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          position: relative; 
          margin: 0 auto 3rem; 
          z-index: 2; 
          box-shadow: 0 0 30px rgba(232,160,176,0.05);
        }
        .footer-wrapper .footer-badge::after {
          content: ''; position: absolute; inset: 4px; border-radius: 50%; 
          border: 1px dashed rgba(232,160,176,0.4); pointer-events: none;
        }
        .footer-wrapper .footer-initials {
          font-family: 'Zen Antique', serif; font-size: 2.2rem; 
          color: var(--gold, #c9a84c); letter-spacing: 0.05em;
        }

        /* Area Judul dengan Kanji Transparan */
        .footer-wrapper .title-group {
          position: relative; margin-bottom: 2rem; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
        }
        .footer-wrapper .kanji-bg {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          font-size: 6rem; color: var(--sakura, #E8A0B0); opacity: 0.08;
          font-weight: normal; user-select: none; pointer-events: none;
        }
        .footer-wrapper .footer-title { 
          font-family: 'Zen Antique', serif; font-size: 2.2rem; 
          color: var(--gold, #c9a84c); letter-spacing: 0.15em; 
          text-transform: uppercase; margin: 0;
        }

        /* Teks Pesan yang Lebih Rapi */
        .footer-wrapper .footer-message { 
          font-size: 1rem; color: rgba(245,240,232,0.85); 
          line-height: 1.8; max-width: 480px; margin: 0 auto 3rem; 
          position: relative; z-index: 2; font-style: italic;
          letter-spacing: 0.05em;
        }
        
        /* Garis Pemisah Elegan */
        .footer-wrapper .elegant-divider {
          width: 100%; max-width: 250px; height: 1px; 
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
          margin: 0 auto 3rem; position: relative; z-index: 2;
        }
        .footer-wrapper .elegant-divider::after {
          content: '✧'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          color: var(--sakura, #E8A0B0); font-size: 1.2rem; background: var(--ink); padding: 0 10px;
        }

        /* Area Nama & Tanggal */
        .footer-wrapper .footer-names { 
          font-family: 'Zen Antique', serif; font-size: clamp(2.5rem, 8vw, 3rem); 
          color: var(--sakura, #E8A0B0); letter-spacing: 0.1em; 
          margin-bottom: 0.5rem; position: relative; z-index: 2; line-height: 1;
        }
        .footer-wrapper .footer-date { 
          font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; 
          letter-spacing: 0.3em; color: rgba(245,240,232,0.6); 
          position: relative; z-index: 2; margin-bottom: 4rem;
        }
        
        .footer-wrapper .footer-closing { 
          font-size: 0.8rem; letter-spacing: 0.25em; 
          color: var(--gold, #c9a84c); text-transform: uppercase; 
          position: relative; z-index: 2; opacity: 0.8; 
          margin-bottom: 6rem;
        }
        
        /* Watermark Credit */
        .footer-wrapper .watermark { 
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.7rem; letter-spacing: 0.1em; 
          color: rgba(255,255,255,0.3); text-transform: uppercase; 
          position: relative; z-index: 2; display: flex; flex-direction: column; gap: 4px;
        }
        .footer-wrapper .watermark a {
          color: var(--gold, #c9a84c); text-decoration: none; font-weight: 600;
          transition: opacity 0.3s;
        }
        .footer-wrapper .watermark a:hover { opacity: 0.7; }
      `}</style>
      
  

      {/* 2. Judul dengan Kanji */}
      <div className="title-group">
        <span className="kanji-bg"></span>
        <h2 className="footer-title"></h2>
      </div>

      {/* 3. Teks Pesan Rapi */}
      <p className="footer-message">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
      </p>

      {/* 4. Garis Pembatas Estetik */}
      <div className="elegant-divider"></div>

      {/* 5. Nama Mempelai & Tanggal */}
      <img src='bridegroom.png' alt=''></img>
      <div className="footer-names">{groomShort} & {brideShort}</div>
      <div className="footer-date">{formattedDate}</div>

      <div className="footer-closing">Sampai Jumpa di Hari Bahagia Kami</div>
      {/* 6. Credit Developer */}
      <div className="watermark">
        <span>Made with love by</span>
        <a href="https://instagram.com/fauzywanz" target="_blank" rel="noreferrer">
          @fauzywanz
        </a>
      </div>
    </footer>
  );
};

export default FooterSection;