const FooterSection = ({ brideShort, groomShort, eventDateObj, year, config }) => (
  <footer className="footer-wrapper">
    <style>{`
      .footer-wrapper { text-align: center; padding: 5rem 1.5rem 3rem; background: var(--ink, #1a1410); color: var(--washi, #f5f0e8); position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; }
      
      /* Latar Belakang Teks Transparan */
      .footer-wrapper::before { content: 'TERIMA KASIH'; font-family: 'Zen Antique', serif; font-size: clamp(3rem, 15vw, 8rem); position: absolute; top: 25%; left: 50%; transform: translate(-50%, -50%); color: rgba(255,255,255,0.02); line-height: 1; pointer-events: none; user-select: none; letter-spacing: 0.2em; width: 100%; white-space: nowrap; }

      /* Bingkai Foto Penutup */
      .footer-wrapper .footer-photo-frame { width: 140px; height: 140px; border-radius: 50%; background: linear-gradient(135deg, rgba(201,168,76,0.2), rgba(232,160,176,0.2)); border: 1px solid rgba(201,168,76,0.4); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3); margin: 0 auto 2rem; z-index: 2; }
      @media (min-width: 640px) { .footer-wrapper .footer-photo-frame { width: 160px; height: 160px; } }
      .footer-wrapper .footer-photo-frame::before { content: ''; position: absolute; inset: 5px; border-radius: 50%; border: 0.5px solid rgba(201,168,76,0.5); z-index: 2; pointer-events: none; }
      .footer-wrapper .footer-photo-inner { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; position: relative; z-index: 1; }
      .footer-wrapper .footer-photo-placeholder { font-family: 'Zen Antique', serif; font-size: 3rem; color: var(--gold, #c9a84c); opacity: 0.6; }

      /* Teks Ucapan */
      .footer-wrapper .footer-title { font-family: 'Zen Antique', serif; font-size: 2rem; color: var(--gold, #c9a84c); letter-spacing: 0.1em; margin-bottom: 1rem; position: relative; z-index: 2; }
      .footer-wrapper .footer-message { font-size: 0.95rem; color: rgba(245,240,232,0.8); line-height: 1.8; max-width: 500px; margin: 0 auto 2.5rem; position: relative; z-index: 2; font-style: italic; }
      
      /* Nama & Tanggal */
      .footer-wrapper .footer-names { font-family: 'Zen Antique', serif; font-size: clamp(2rem, 8vw, 2.5rem); color: var(--sakura, #E8A0B0); letter-spacing: 0.2em; margin-bottom: 0.5rem; position: relative; z-index: 2; }
      .footer-wrapper .footer-date { font-family: 'Cormorant Garamond', serif; font-size: 1rem; letter-spacing: 0.2em; color: rgba(245,240,232,0.6); position: relative; z-index: 2; text-transform: uppercase; }
      
      .footer-wrapper .divider { color: rgba(201,168,76,0.3); max-width: 200px; margin: 2rem auto; position: relative; z-index: 2; }
      
      .footer-wrapper .footer-closing { font-size: 0.8rem; letter-spacing: 0.2em; color: var(--gold, #c9a84c); text-transform: uppercase; position: relative; z-index: 2; opacity: 0.8; }
      
      /* Watermark */
      .footer-wrapper .watermark { margin-top: 4rem; font-size: 0.65rem; letter-spacing: 0.2em; color: rgba(255,255,255,0.2); text-transform: uppercase; position: relative; z-index: 2; }
    `}</style>
    
    {/* 1. Foto Penutup */}
   
    {/* 2. Ucapan Terima Kasih & Harapan Hadir */}
    <h2 className="footer-title">Terima Kasih</h2>
    <p className="footer-message">
      Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
      <br /><br />
      Kami yang berbahagia,
    </p>

    {/* 3. Nama Mempelai */}
    <div className="footer-names">{brideShort} & {groomShort}</div>
    <div className="footer-date">
      {eventDateObj ? `${eventDateObj.getDate()} · ${eventDateObj.getMonth() + 1} · ${eventDateObj.getFullYear()}` : '2026'}
    </div>

    <div className="divider"><span>✿</span></div>
    
    <div className="footer-closing">Sampai Jumpa di Hari Bahagia Kami</div>

    <p className="watermark">
    <a href="https://instagram.com/fauzywanz">  fauzywanz</a>
    </p>
  </footer>
);

export default FooterSection;