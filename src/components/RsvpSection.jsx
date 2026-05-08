import SakuraBlossom from "./SakuraBlossom";

const RsvpSection = ({ sectionRef, rsvpData, setRsvpData, submitRSVP, rsvpStatus,isUserRegistered }) => {
  // Pengecekan apakah tamu sudah pernah RSVP sebelumnya (dari database) 
  // ATAU baru saja berhasil submit di sesi ini
  const isAlreadySubmitted = rsvpData.hasRSVPed || rsvpStatus === 'success';

  return (
    <section className="rsvp-wrapper" ref={sectionRef}>
      <style>{`
        .rsvp-wrapper { text-align: center; padding: 4rem 1.25rem; max-width: 900px; margin: 0 auto; width: 100%; position: relative; z-index: 2; }
        @media (min-width: 640px) { .rsvp-wrapper { padding: 5rem 2rem; } }
        
        .rsvp-wrapper .section-heading { font-family: 'Cinzel Decorative', serif; font-size: clamp(1.8rem, 8vw, 2.5rem); color: var(--deep-red, #8b1a2e); letter-spacing: 0.1em; margin-bottom: 0.2rem; }
        .rsvp-wrapper .section-heading-sub { font-size: 0.7rem; color: var(--gold, #c9a84c); letter-spacing: 0.4em; margin-bottom: 1.5rem; opacity: 0.9; text-transform: uppercase; }
        
        .rsvp-wrapper .rsvp-form { max-width: 100%; margin: 1.5rem auto 0; padding: 1.5rem 1rem; background: rgba(255,255,255,0.5); border: 0.5px solid rgba(201,168,76,0.3); }
        @media (min-width: 640px) { .rsvp-wrapper .rsvp-form { max-width: 500px; padding: 0; background: transparent; border: none; } }
        
        .rsvp-wrapper .form-group { margin-bottom: 1.25rem; text-align: left; }
        .rsvp-wrapper .form-label { display: block; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--matcha, #5a7a5e); margin-bottom: 0.5rem; font-weight: 600; }
        .rsvp-wrapper .form-input { width: 100%; padding: 0.8rem; border: 0.5px solid rgba(201,168,76,0.4); background: rgba(255,255,255,0.8); font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: var(--ink, #1a1410); outline: none; transition: border-color 0.3s; border-radius: 0; -webkit-appearance: none; }
        .rsvp-wrapper .form-input:focus { border-color: var(--deep-red); background: #fff; }
        .rsvp-wrapper select.form-input { background-image: linear-gradient(45deg, transparent 50%, var(--gold) 50%), linear-gradient(135deg, var(--gold) 50%, transparent 50%); background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px); background-size: 5px 5px, 5px 5px; background-repeat: no-repeat; }
        
        .rsvp-wrapper .rsvp-submit { width: 100%; padding: 1rem; background: var(--deep-red); color: var(--washi, #f5f0e8); border: none; font-family: 'Cormorant Garamond', serif; font-size: 0.9rem; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; border-radius: 2px; }
        .rsvp-wrapper .rsvp-submit:active { transform: scale(0.98); }
        @media (min-width: 640px) { .rsvp-wrapper .rsvp-submit:hover { background: var(--fusuma-dark, #3d2b1f); transform: translateY(-2px); } }

        /* --- KARTU RINGKASAN JIKA SUDAH RSVP --- */
        .summary-card { max-width: 500px; margin: 2rem auto 0; padding: 2rem; background: rgba(255, 255, 255, 0.85); border: 1px solid var(--gold); border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); backdrop-filter: blur(4px); }
        .summary-icon { font-size: 2.5rem; margin-bottom: 1rem; color: var(--matcha); }
        .summary-title { font-family: 'Zen Antique', serif; color: var(--deep-red); font-size: 1.5rem; margin-bottom: 1.2rem; }
        .summary-detail { font-size: 1rem; color: var(--ink); margin-bottom: 0.8rem; border-bottom: 1px dashed rgba(201,168,76,0.3); padding-bottom: 0.5rem; display: flex; justify-content: space-between; }
        .summary-message { margin-top: 1.5rem; padding: 1rem; background: rgba(201,168,76,0.1); border-radius: 4px; font-style: italic; font-size: 0.95rem; color: var(--ink); }
      `}</style>

      <h2 className="section-heading">Kehadiran</h2>
      <p className="section-heading-sub">RESERVATION</p>
      
      {!isAlreadySubmitted && (
        <p style={{ color: 'var(--ink)', opacity: 0.7, fontStyle: 'italic', maxWidth: '400px', margin: '0 auto 1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
          Merupakan suatu kehormatan apabila Anda berkenan hadir.
        </p>
      )}

      {/* RENDER BERSYARAT: Form vs Ringkasan */}
      {isAlreadySubmitted ? (
        <div className="summary-card">
          <div className="summary-icon">✿</div>
          <h3 className="summary-title">Terima Kasih, {rsvpData.name}!</h3>
          
          <div className="summary-detail">
            <span>Status Kehadiran</span>
            <strong>{String(rsvpData.isAttending) === 'true' || rsvpData.isAttending === true ? 'Hadir' : 'Tidak Hadir'}</strong>
          </div>
          {(String(rsvpData.isAttending) === 'true' || rsvpData.isAttending === true) && (
            <div className="summary-detail">
              <span>Jumlah Tamu</span>
              <strong>{rsvpData.headcount} Orang</strong>
            </div>
          )}

          {rsvpData.message && (
            <div className="summary-message">
              "{rsvpData.message}"
            </div>
          )}
        </div>
      ) : (
        <form className="rsvp-form" onSubmit={submitRSVP}>
          <div className="form-group">
            <label className="form-label">Nama Tamu</label>
          
        {isUserRegistered?(
           <input type="text" className="form-input" value={rsvpData.name} onChange={(e) => setRsvpData({...rsvpData, name: e.target.value})} readOnly />
          ):(
          <input type="text" className="form-input" value={rsvpData.name} onChange={(e) => setRsvpData({...rsvpData, name: e.target.value})} required />
          
        )}
          </div>
          <div className="form-group">
            <label className="form-label">Jumlah Tamu</label>
            <select className="form-input form-select" value={rsvpData.headcount} onChange={(e) => setRsvpData({...rsvpData, headcount: parseInt(e.target.value)})}>
              {[1,2,3,4].map(num => <option key={num} value={num}>{num} orang</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Kehadiran</label>
            <select className="form-input form-select" value={rsvpData.isAttending} onChange={(e) => setRsvpData({...rsvpData, isAttending: e.target.value})}>
              <option value="true">Insya Allah hadir</option>
              <option value="false">Tidak dapat hadir</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Ucapan & Doa</label>
            <textarea className="form-input" rows="3" placeholder="Tulis ucapan dan doa untuk kami..." value={rsvpData.message} onChange={(e) => setRsvpData({...rsvpData, message: e.target.value})}></textarea>
          </div>
          <button type="submit" className="rsvp-submit">
            Kirim Konfirmasi ✿
          </button>
        </form>
      )}
    </section>
  );
};

export default RsvpSection;