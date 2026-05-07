import React from 'react';
import KoinoboriFamily from "./KoinoboriFamily";

const GuestbookSection = ({ sectionRef, guests:guestsData }) => {
  // Fungsi Pintar untuk Mengubah Waktu Menjadi "Time Ago"
  const timeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit yang lalu`;
    if (hours < 24) return `${hours} jam yang lalu`;
    if (days === 1) return 'Kemarin';
    return `${days} hari yang lalu`;
  };

  // Pastikan guestsData adalah array. 
  // Jika dari parent sudah mem-filter ucapan kosong dan mengurutkan, Anda bisa langsung pakai `guestsData`.
  // Namun, sebagai pengaman tambahan di komponen ini:
  const validMessages = Array.isArray(guestsData) 
    ? guestsData.filter(g => g.message && g.message.trim() !== '')
    : [];

  return (
    <section className="guestbook-wrapper" ref={sectionRef}>
      <style>{`
        .guestbook-wrapper { text-align: center; padding: 4rem 1.25rem; max-width: 900px; margin: 0 auto; width: 100%; position: relative; z-index: 2; overflow: hidden; }
        @media (min-width: 640px) { .guestbook-wrapper { padding: 5rem 2rem; } }
        
        /* PELINDUNG Z-INDEX (Agar teks selalu di depan ikan) */
        .guestbook-inner { position: relative; z-index: 2; }

        .guestbook-wrapper .section-heading { font-family: 'Zen Antique', serif; font-size: clamp(1.8rem, 8vw, 2.5rem); color: var(--deep-red, #8b1a2e); letter-spacing: 0.1em; margin-bottom: 0.2rem; }
        .guestbook-wrapper .section-heading-sub { font-size: 0.7rem; color: var(--gold, #c9a84c); letter-spacing: 0.4em; margin-bottom: 2.5rem; opacity: 0.9; text-transform: uppercase; }

        /* Container List Ucapan */
        .guestbook-wrapper .messages-container { 
          max-height: 450px; 
          overflow-y: auto; 
          padding-right: 10px; 
          text-align: left;
          scrollbar-width: thin;
          scrollbar-color: var(--gold) transparent;
        }

        /* Custom Scrollbar untuk Chrome/Safari */
        .guestbook-wrapper .messages-container::-webkit-scrollbar { width: 4px; }
        .guestbook-wrapper .messages-container::-webkit-scrollbar-thumb { background-color: var(--gold); border-radius: 10px; }

        /* Kartu Ucapan */
        .guestbook-wrapper .message-card { 
          background: rgba(255, 255, 255, 0.5); 
          backdrop-filter: blur(4px); 
          border-left: 3px solid var(--gold); 
          padding: 1.25rem; 
          margin-bottom: 1.5rem; 
          border-radius: 0 4px 4px 0;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          position: relative;
        }

        .guestbook-wrapper .guest-name { 
          font-family: 'Zen Antique', serif; 
          font-size: 1.1rem; 
          color: var(--matcha, #5a7a5e); 
          margin-bottom: 0.4rem; 
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .guestbook-wrapper .guest-name::before {
          content: '✿';
          font-size: 0.7rem;
          color: var(--gold);
        }

        .guestbook-wrapper .guest-message { 
          font-size: 0.9rem; 
          color: var(--ink, #1a1410); 
          line-height: 1.6; 
          font-style: italic;
          opacity: 0.85;
        }

        .guestbook-wrapper .message-time { 
          font-size: 0.65rem; 
          color: var(--gold); 
          text-transform: uppercase; 
          margin-top: 0.8rem; 
          display: block; 
          letter-spacing: 0.1em;
        }

        .guestbook-wrapper .no-message {
          padding: 3rem;
          color: var(--gold);
          font-style: italic;
          opacity: 0.6;
          text-align: center;
        }
      `}</style>

      {/* BACKGROUND KOINOBORI */}
      <KoinoboriFamily variant="outline" position="right" customOpacity={0.4} />

      {/* BUNGKUSAN KONTEN UTAMA */}
      <div className="guestbook-inner">
        <h2 className="section-heading">Untaian Doa</h2>
        <p className="section-heading-sub">GUEST BOOK</p>

        <div className="messages-container">
          {guestsData.length>0 ? (
            guestsData.map((item) => (
              <div className="message-card" key={item._id || item.slug || Math.random()}>
                <div className="guest-name">{item.guestName || item.name}</div>
                <div className="guest-message">"{item.message}"</div>
                <span className="message-time">{timeAgo(item.createdAt)}</span>
              </div>
            ))
          ) : (
            <div className="no-message">Belum ada ucapan. Jadilah yang pertama memberikan doa restu ✿</div>
          )}
        </div>
      </div>

    </section>
  );
};

export default GuestbookSection;