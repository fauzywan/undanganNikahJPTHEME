const LocationSection = ({ sectionRef, config }) => {
  const venue = config?.maps?.venue || "Grand Ballroom, Hotel Sakura Bandung";
  const address = config?.maps?.address || "Jl. Asia Afrika No. 81, Braga, Kec. Sumur Bandung, Kota Bandung, Jawa Barat";

  return (
    <section className="loc-wrapper" ref={sectionRef}>
      <style>{`
        /* ── WRAPPER: full width ── */
        .loc-wrapper {
          width: 100%;
          position: relative;
          z-index: 2;
          padding: 5rem 1.25rem 6rem;
          box-sizing: border-box;
          overflow: hidden;
        }
        @media (min-width: 640px) {
          .loc-wrapper { padding: 6rem 2rem 7rem; }
        }

        /* ── Dekorasi latar: lingkaran samar ── */
        .loc-wrapper::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 320px; height: 320px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.12);
          pointer-events: none;
        }
        .loc-wrapper::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 240px; height: 240px;
          border-radius: 50%;
          border: 1px solid rgba(232,160,176,0.15);
          pointer-events: none;
        }

        /* ── INNER ── */
        .loc-inner {
          max-width: 860px;
          margin: 0 auto;
          width: 100%;
        }

        /* ── Heading ── */
        .loc-kamon {
          font-size: 1.6rem;
          color: rgba(201,168,76,0.5);
          display: block;
          margin-bottom: 0.5rem;
          letter-spacing: 0.3em;
        }
        .loc-heading {
          font-family: 'Zen Antique', serif;
          font-size: clamp(1.8rem, 8vw, 2.6rem);
          color: var(--deep-red, #8b1a2e);
          letter-spacing: 0.12em;
          margin-bottom: 0.3rem;
          font-weight: 400;
          line-height: 1.2;
        }
        .loc-sub {
          font-size: 0.65rem;
          color: var(--gold, #c9a84c);
          letter-spacing: 0.5em;
          text-transform: uppercase;
          opacity: 0.85;
          margin-bottom: 3rem;
          display: block;
        }

        /* ── Divider garis tipis dengan ornamen ── */
        .loc-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 2.5rem;
        }
        .loc-divider-line {
          flex: 1;
          max-width: 80px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.5));
        }
        .loc-divider-line.right {
          background: linear-gradient(to left, transparent, rgba(201,168,76,0.5));
        }
        .loc-divider-diamond {
          width: 6px; height: 6px;
          background: var(--gold, #c9a84c);
          transform: rotate(45deg);
          opacity: 0.7;
        }

        /* ── Card utama ── */
        .loc-card {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 8px;
          overflow: hidden;
          box-shadow:
            0 2px 4px rgba(0,0,0,0.04),
            0 12px 40px rgba(0,0,0,0.07),
            inset 0 1px 0 rgba(255,255,255,0.8);
          position: relative;
        }

        /* garis aksen atas */
        .loc-card-accent {
          height: 3px;
          background: linear-gradient(90deg, var(--sakura, #E8A0B0), var(--gold, #c9a84c), var(--deep-red, #8b1a2e));
        }

        /* ── Info venue ── */
        .loc-venue-info {
          padding: 2rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }
        @media (min-width: 640px) {
          .loc-venue-info { padding: 2.5rem 3rem 2rem; }
        }

        .loc-venue-icon {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(232,160,176,0.2), rgba(201,168,76,0.15));
          border: 1px solid rgba(201,168,76,0.3);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 0.5rem;
          color: var(--deep-red, #8b1a2e);
        }

        .loc-venue-name {
          font-family: 'Zen Antique', serif;
          font-size: clamp(1.05rem, 4vw, 1.3rem);
          color: var(--deep-red, #8b1a2e);
          line-height: 1.4;
          text-align: center;
        }

        .loc-venue-address {
          font-size: 0.8rem;
          color: rgba(26,20,16,0.6);
          line-height: 1.7;
          letter-spacing: 0.04em;
          max-width: 420px;
          text-align: center;
          margin-top: 0.25rem;
        }

        /* ── Peta ── */
        .loc-map-container {
          width: 100%;
          aspect-ratio: 16/8;
          position: relative;
          border-top: 1px solid rgba(201,168,76,0.15);
          border-bottom: 1px solid rgba(201,168,76,0.15);
          overflow: hidden;
        }
        @media (max-width: 639px) {
          .loc-map-container { aspect-ratio: 4/3; }
        }

        .loc-map-container iframe {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          border: none;
          filter: sepia(15%) saturate(0.85) hue-rotate(10deg) brightness(1.02);
          transition: filter 0.4s ease;
        }
        .loc-map-container:hover iframe {
          filter: sepia(0%) saturate(1) hue-rotate(0deg) brightness(1);
        }

        /* overlay halus di peta */
        .loc-map-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(250,246,238,0.12) 0%,
            transparent 20%,
            transparent 80%,
            rgba(250,246,238,0.12) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* ── Footer card: tombol ── */
        .loc-card-footer {
          padding: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        @media (min-width: 640px) {
          .loc-card-footer { padding: 2rem 3rem; }
        }

        .loc-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--deep-red, #8b1a2e);
          color: #faf6ee;
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.85rem 2.25rem;
          border-radius: 2px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(139,26,46,0.25);
        }
        .loc-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent);
          pointer-events: none;
        }
        .loc-btn:active { transform: scale(0.97); }
        @media (min-width: 640px) {
          .loc-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(139,26,46,0.3);
          }
        }

        /* ── Petunjuk kecil ── */
        .loc-hint {
          margin-top: 1.25rem;
          font-size: 0.7rem;
          color: rgba(26,20,16,0.35);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }
        .loc-hint-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(201,168,76,0.5);
        }
      `}</style>

      <div className="loc-inner" style={{ textAlign: 'center' }}>
        {/* Heading */}
        <span className="loc-kamon">⌘</span>
        <h2 className="loc-heading">Lokasi Acara</h2>
        <span className="loc-sub">Location &amp; Venue</span>

        {/* Divider */}
        <div className="loc-divider">
          <span className="loc-divider-line"></span>
          <span className="loc-divider-diamond"></span>
          <span className="loc-divider-diamond" style={{ opacity: 0.4, width: 4, height: 4 }}></span>
          <span className="loc-divider-diamond"></span>
          <span className="loc-divider-line right"></span>
        </div>

        {/* Card */}
        <div className="loc-card">
          <div className="loc-card-accent"></div>

          {/* Info venue */}
          <div className="loc-venue-info">
            <div className="loc-venue-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="loc-venue-name">{venue}</div>
            <div className="loc-venue-address">{address}</div>
          </div>

          {/* Peta iframe */}
          {config?.maps?.iframe && (
            <div className="loc-map-container">
              <iframe
                src={config.maps.iframe}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Venue"
              />
              <div className="loc-map-overlay" />
            </div>
          )}

          {/* Tombol */}
          <div className="loc-card-footer">
            <a
              href={config?.maps?.href}
              target="_blank"
              rel="noreferrer"
              className="loc-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Buka Google Maps
            </a>
          </div>
        </div>

        {/* Hint kecil */}
        <p className="loc-hint">
          <span className="loc-hint-dot"></span>
          Ketuk peta untuk melihat lebih detail
          <span className="loc-hint-dot"></span>
        </p>
      </div>
    </section>
  );
};

export default LocationSection;