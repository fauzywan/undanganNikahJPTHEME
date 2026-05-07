const FusumaGate = ({ isOpened, fusumaProgress, scrollSpaceRef }) => (
  <div id="fusuma-scroll-space" ref={scrollSpaceRef} style={{ display: isOpened ? 'block' : 'none' }}>
    <style>{`
      #fusuma-scroll-space { height: 250svh; position: relative; }
      #fusuma-scroll-space .fusuma-wrapper { position: sticky; top: 0; height: 100svh; overflow: hidden; z-index: 50; pointer-events: none; }
      #fusuma-scroll-space .fusuma-panel { position: absolute; top: 0; height: 100%; width: 50%; background: linear-gradient(160deg, #2c1a12, #1a0d08); display: flex; align-items: center; justify-content: center; overflow: hidden; pointer-events: auto; will-change: transform; }
      #fusuma-scroll-space .fusuma-panel::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(255,255,255,0.02) 15px, rgba(255,255,255,0.02) 16px); }
      #fusuma-scroll-space .fusuma-panel::after { content: ''; position: absolute; inset: 6px; border: 1px solid rgba(201,168,76,0.3); pointer-events: none; }
      #fusuma-scroll-space .fusuma-left { left: 0; transform-origin: left; }
      #fusuma-scroll-space .fusuma-right { right: 0; transform-origin: right; }
      #fusuma-scroll-space .fusuma-art { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
      #fusuma-scroll-space .fusuma-handle { position: absolute; top: 50%; transform: translateY(-50%); width: 20px; height: 60px; background: var(--gold, #c9a84c); border-radius: 10px; box-shadow: 0 0 15px rgba(201,168,76,0.4); }
      #fusuma-scroll-space .fusuma-left .fusuma-handle { right: 15px; }
      #fusuma-scroll-space .fusuma-right .fusuma-handle { left: 15px; }
      #fusuma-scroll-space .fusuma-text { font-family: 'Zen Antique', serif; font-size: clamp(1.2rem, 5vw, 2rem); color: rgba(201,168,76,0.7); letter-spacing: 0.6em; writing-mode: vertical-rl; text-orientation: upright; position: absolute; top: 50%; transform: translateY(-50%); }
      #fusuma-scroll-space .fusuma-left .fusuma-text { right: 45px; }
      #fusuma-scroll-space .fusuma-right .fusuma-text { left: 45px; }
      #fusuma-scroll-space .scroll-hint { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); color: rgba(201,168,76,0.6); font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; animation: bounceHint 2s infinite; z-index: 60; text-align: center; }
      @keyframes bounceHint { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-6px); } }
    `}</style>
    
    <div className="fusuma-wrapper">
      <div className="fusuma-panel fusuma-left" style={{ transform: `translateX(-${fusumaProgress * 102}%)` }}>
        <div className="fusuma-art">
          <svg width="100%" height="100%" viewBox="0 0 300 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.15">
              <rect x="80" y="0" width="8" height="600" fill="#5a7a5e"/><rect x="78" y="80" width="12" height="3" rx="1" fill="#5a7a5e"/><rect x="78" y="180" width="12" height="3" rx="1" fill="#5a7a5e"/><ellipse cx="100" cy="75" rx="30" ry="8" fill="#5a7a5e" transform="rotate(-30 100 75)"/>
            </g>
            <g opacity="0.12" transform="translate(150,150) scale(0.8)"><path d="M0,-40 Q20,-20 40,0 Q20,0 0,10 Q-20,0 -40,0 Q-20,-20 0,-40Z" fill="#c9a84c"/><path d="M0,10 Q10,30 5,60 Q0,40 -5,60 Q-10,30 0,10Z" fill="#c9a84c"/></g>
          </svg>
        </div>
        <div className="fusuma-text">CINTA</div>
        <div className="fusuma-handle"></div>
      </div>
      <div className="fusuma-panel fusuma-right" style={{ transform: `translateX(${fusumaProgress * 102}%)` }}>
        <div className="fusuma-art">
          <svg width="100%" height="100%" viewBox="0 0 300 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.15"><path d="M250,0 Q220,100 180,150 Q140,200 160,300" stroke="#c9a84c" strokeWidth="2" fill="none"/><circle cx="215" cy="200" r="4" fill="#E8A0B0" opacity="0.7"/></g>
            <circle cx="150" cy="100" r="40" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="1"/>
          </svg>
        </div>
        <div className="fusuma-text">SETIA</div>
        <div className="fusuma-handle"></div>
      </div>
      <div className="scroll-hint" style={{ opacity: Math.max(0, 1 - fusumaProgress * 4) }}>
        <svg width="18" height="26" viewBox="0 0 20 30" fill="none">
          <rect x="7" y="0" width="6" height="18" rx="3" stroke="rgba(201,168,76,0.6)" strokeWidth="1"/>
          <circle cx="10" cy="5" r="2" fill="rgba(201,168,76,0.6)"><animateTransform attributeName="transform" type="translate" values="0,0;0,8;0,0" dur="2s" repeatCount="indefinite"/></circle>
        </svg>
        <div style={{ marginTop: '6px', fontSize: '0.6rem' }}>scroll</div>
      </div>
    </div>
  </div>
);

export default FusumaGate;