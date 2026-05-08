import Petals from './Petals';

const CoverSection = ({ isOpened, handleOpenInvitation, brideShort,photos, groomShort, guestName, config }) => {
const coverPhoto = photos.find(p => p.role === 'cover')?.url ||null;

  return(
<div id="cover-wrapper" className={isOpened ? 'hidden' : ''} >
    <style>{`
      #cover-wrapper { position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center; background: var(--ink, #1a1410); transition: opacity 0.8s ease, visibility 0.8s; overflow: hidden; height: 100svh; }
      #cover-wrapper.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
      #cover-wrapper .cover-fuji { position: absolute; bottom: -5vh; left: 50%; transform: translateX(-50%); width: 200%; max-width: 1000px; opacity: 0.08; pointer-events: none; z-index: 0; }
      #cover-wrapper .cover-petals { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 1; }
      
      #cover-wrapper .cover-content { text-align: center; color: var(--washi, #f5f0e8); padding: 1.5rem; position: relative; z-index: 2; width: 100%; max-width: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
      
      #cover-wrapper .cover-the-wedding { font-size: 0.75rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold, #c9a84c); margin-bottom: 1.5rem; opacity: 0.9; }
      
      #cover-wrapper .cover-photo-frame { width: 140px; height: 140px; border-radius: 50%; background: linear-gradient(135deg, rgba(201,168,76,0.2), rgba(232,160,176,0.2)); border: 1px solid rgba(201,168,76,0.4); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; margin: 0 auto 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
      #cover-wrapper .cover-photo-frame::before { content: ''; position: absolute; inset: 6px; border-radius: 50%; border: 0.5px solid rgba(201,168,76,0.5); z-index: 2; pointer-events: none; }
      #cover-wrapper .cover-photo-inner { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; position: relative; z-index: 1; }
      #cover-wrapper .cover-photo-placeholder { font-family: 'Zen Antique', serif; font-size: 3rem; color: var(--gold, #c9a84c); opacity: 0.6; }

      #cover-wrapper .cover-names { font-family: 'Zen Antique', serif; font-size: clamp(2rem, 8vw, 3.5rem); color: var(--washi, #f5f0e8); letter-spacing: 0.1em; line-height: 1.2; text-shadow: 0 2px 10px rgba(0,0,0,0.5); margin-bottom: 2rem; }
      #cover-wrapper .cover-names span { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: clamp(1.2rem, 5vw, 2rem); color: var(--gold, #c9a84c); margin: 0 0.5rem; display: inline-block; }

      #cover-wrapper .cover-guest-box { background: rgba(26, 20, 16, 0.6); backdrop-filter: blur(8px); border: 1px solid rgba(201,168,76,0.3); padding: 1.5rem; border-radius: 4px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
      #cover-wrapper .cover-dear { font-size: 0.75rem; letter-spacing: 0.2em; color: rgba(245,240,232,0.7); margin-bottom: 0.5rem; text-transform: uppercase; }
      #cover-wrapper .cover-guest-name { font-family: 'Zen Antique', serif; font-size: 1.5rem; color: var(--gold, #c9a84c); margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(201,168,76,0.3); }

      #cover-wrapper .open-btn { background: transparent; border: 1px solid var(--gold, #c9a84c); color: var(--gold, #c9a84c); font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; letter-spacing: 0.2em; padding: 1rem 1rem; cursor: pointer; transition: all 0.4s; position: relative; overflow: hidden; width: 100%; border-radius: 2px; text-transform: uppercase; }
      #cover-wrapper .open-btn::before { content: ''; position: absolute; inset: 0; background: var(--gold, #c9a84c); transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease; z-index: -1; }
      #cover-wrapper .open-btn:active, #cover-wrapper .open-btn:hover { color: var(--ink, #1a1410); }
      #cover-wrapper .open-btn:active::before, #cover-wrapper .open-btn:hover::before { transform: scaleX(1); }
    `}</style>
  

    <svg className="cover-fuji" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <path d="M400 80 L750 400 L50 400 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M400 80 L480 160 Q400 135 320 160 Z" fill="currentColor" stroke="none" opacity="0.3"/>
    </svg>
    
    <div className="cover-petals"><Petals count={15} /></div>
    
    <div className="cover-content">
      <div className="cover-the-wedding">The Wedding Of</div>
      
      <div className="cover-photo-frame">
        {coverPhoto? (
          <img src={coverPhoto} alt="Cover" className="cover-photo-inner" />
        ) : (
            <img src="https://backend.parador-hotels.com/wp-content/uploads/2023/11/Berapa-Orang-Intimate-Wedding.webp" alt="Cover" className="cover-photo-inner" />
                )}
      </div>

      <div className="cover-names">
        {groomShort} <span>&amp;</span> {brideShort }
      </div>

      <div className="cover-guest-box">
        <div className="cover-dear">Dear,</div>
        <div className="cover-guest-name">{guestName || 'Tamu Kehormatan'}</div>
        <button className="open-btn" onClick={handleOpenInvitation}>
          ✦  Buka Undangan✦
        </button>
      </div>
    </div>
  </div>
);

}
export default CoverSection;