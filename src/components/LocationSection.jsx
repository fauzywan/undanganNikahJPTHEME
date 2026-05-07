const LocationSection = ({ sectionRef, config }) => {
  // Data fallback jika di database belum ada (hanya untuk preview)
  const venue = config?.maps.venue || "Grand Ballroom, Hotel Sakura Bandung";
  const address = config?.maps.address || "Jl. Asia Afrika No. 81, Braga, Kec. Sumur Bandung, Kota Bandung, Jawa Barat";
  const mapsLink = config?.maps.iframe;
  return (
    <section className="location-wrapper" ref={sectionRef}>
      <style>{`
        .location-wrapper { text-align: center; padding: 4rem 1.25rem; max-width: 900px; margin: 0 auto; width: 100%; position: relative; z-index: 2; }
        @media (min-width: 640px) { .location-wrapper { padding: 5rem 2rem; } }
        
        .location-wrapper .section-heading { 
        font-weight:800;
        font-family: 'Zen Antique', serif; font-size: clamp(1.8rem, 8vw, 2.5rem); color: var(--deep-red, #8b1a2e); letter-spacing: 0.1em; margin-bottom: 0.2rem; }
        .location-wrapper .section-heading-sub { font-size: 0.7rem; color: var(--gold, #c9a84c); letter-spacing: 0.4em; margin-bottom: 2rem; opacity: 0.9; text-transform: uppercase; }

        .location-wrapper .location-card { background: rgba(255,255,255,0.6); backdrop-filter: blur(4px); border: 0.5px solid rgba(201,168,76,0.4); padding: 2rem 1.25rem; border-radius: 4px; position: relative; display: flex; flex-direction: column; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        @media (min-width: 640px) { .location-wrapper .location-card { padding: 3rem 2rem; } }
        
        /* Ornamen Sudut Kartu */
        .location-wrapper .location-card::before { content: '◆'; position: absolute; top: -0.4rem; left: 50%; transform: translateX(-50%); color: var(--gold); font-size: 0.6rem; opacity: 0.6; }
        .location-wrapper .location-card::after { content: '◆'; position: absolute; bottom: -0.4rem; left: 50%; transform: translateX(-50%); color: var(--gold); font-size: 0.6rem; opacity: 0.6; }

        .location-wrapper .venue-name { font-family: 'Zen Antique', serif; font-size: 1.4rem; color: var(--deep-red, #5a7a5e); margin-bottom: 0.5rem; line-height: 1.3; }
        .location-wrapper .venue-address { font-size: 0.85rem; color: var(--deep-red, #1a1410); opacity: 0.8; line-height: 1.6; letter-spacing: 0.05em; max-width: 400px; margin: 0 auto 1.5rem; }

        /* Container Peta Iframe */
        .location-wrapper .map-container { width: 100%; aspect-ratio: 4/3; max-width: 600px; margin: 0 auto 1.5rem; border-radius: 4px; overflow: hidden; border: 1px solid rgba(201,168,76,0.3); background: rgba(201,168,76,0.1); position: relative; }
        @media (min-width: 640px) { .location-wrapper .map-container { aspect-ratio: 16/9; } }
        .location-wrapper .map-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; filter: grayscale(20%) sepia(20%) hue-rotate(15deg); transition: filter 0.3s; }
        .location-wrapper .map-container:hover iframe { filter: none; }

        /* Tombol Peta */
        .location-wrapper .btn-map { background: var(--deep-red); color: var(--washi, #f5f0e8); font-family: 'Cormorant Garamond', serif; font-size: 0.85rem; letter-spacing: 0.15em; padding: 0.8rem 2rem; cursor: pointer; transition: all 0.3s; border-radius: 2px; text-transform: uppercase; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border: none; }
        .location-wrapper .btn-map:active { transform: scale(0.95); }
        @media (min-width: 640px) { .location-wrapper .btn-map:hover { background: var(--fusuma-dark, #3d2b1f); transform: translateY(-2px); } }
      `}</style>

      <h2 className="section-heading">Lokasi Acara</h2>
      <p className="section-heading-sub">LOCATION MAP</p>

      <div className="location-card">
        <div className="venue-name">{venue}</div>
        <div className="venue-address">{address}</div>

     {config.maps.iframe && (
  <div className="w-full rounded-xl overflow-hidden shadow-md mt-6">
    <iframe 
      src={config.maps.iframe} 
      width="100%" 
      height="400" 
      style={{ border: 0 }} 
      allowFullScreen="" 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
)}

        <a href={config.maps.href} target="_blank" rel="noreferrer" className="btn-map">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          Buka Google Maps
        </a>
      </div>
    </section>
  );
};

export default LocationSection;