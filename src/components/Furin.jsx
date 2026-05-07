const Furin = () => (
  <div className="furin-section">
    <style>{`
      .furin-section { padding: 0 1rem 2rem; position: relative; z-index: 2; }
      .furin-container { display: flex; justify-content: center; gap: 1rem; padding: 0.5rem; transform: scale(0.9); }
      @media (min-width: 640px) { .furin-container { gap: 2.5rem; transform: scale(1); } }
      .furin { display: flex; flex-direction: column; align-items: center; gap: 0; }
      .furin-string-top { width: 1px; height: 30px; background: var(--gold, #c9a84c); opacity: 0.6; }
      .furin-body { width: 40px; height: 50px; border: 1px solid var(--gold); border-radius: 50% 50% 40% 40%; background: linear-gradient(160deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05)); position: relative; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(2px); }
      .furin-body::after { content: ''; position: absolute; inset: 6px; border: 0.5px solid rgba(201,168,76,0.3); border-radius: 50% 50% 35% 35%; }
      .furin-deco { font-size: 1rem; color: var(--gold); opacity: 0.8; line-height: 1; }
      .furin-string { width: 1px; height: 50px; background: linear-gradient(to bottom, var(--gold), transparent); opacity: 0.5; }
      .furin-clapper { width: 14px; height: 18px; border: 1px solid var(--gold); border-radius: 2px; opacity: 0.7; background: rgba(201,168,76,0.1); }
      .furin-tanzaku { margin-top: 3px; width: 16px; padding: 6px 0; border: 0.5px solid rgba(201,168,76,0.4); border-radius: 2px; background: rgba(201,168,76,0.05); display: flex; align-items: center; justify-content: center; }
      .furin-tanzaku-text { font-family: 'Zen Antique', serif; font-size: 0.5rem; color: var(--gold); writing-mode: vertical-rl; text-orientation: upright; letter-spacing: 0.2em; opacity: 0.8; }
      .swing1 { animation: swingFurin 3s ease-in-out infinite; transform-origin: top center; will-change: transform; }
      .swing2 { animation: swingFurin 4s ease-in-out infinite 0.5s; transform-origin: top center; will-change: transform; }
      .swing3 { animation: swingFurin 3.5s ease-in-out infinite 1s; transform-origin: top center; will-change: transform; }
      @keyframes swingFurin { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
    `}</style>
    
    <div className="furin-container">
      <div className="furin swing1">
        <div className="furin-string-top"></div>
        <div className="furin-body"><span className="furin-deco">✿</span></div>
        <div className="furin-string"></div>
        <div className="furin-clapper"></div>
        <div className="furin-tanzaku"><span className="furin-tanzaku-text">CINTA</span></div>
      </div>
      
      <div className="furin swing2">
        <div className="furin-string-top" style={{ height: '40px' }}></div>
        <div className="furin-body" style={{ width: '40px', height: '50px' }}><span className="furin-deco">✾</span></div>
        <div className="furin-string" style={{ height: '60px' }}></div>
        <div className="furin-clapper"></div>
        <div className="furin-tanzaku"><span className="furin-tanzaku-text">SETIA</span></div>
      </div>
      
      <div className="furin swing3">
        <div className="furin-string-top"></div>
        <div className="furin-body"><span className="furin-deco">❀</span></div>
        <div className="furin-string"></div>
        <div className="furin-clapper"></div>
        <div className="furin-tanzaku"><span className="furin-tanzaku-text">BAHAGIA</span></div>
      </div>
    </div>
  </div>
);

export default Furin;