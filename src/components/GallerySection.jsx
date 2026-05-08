import { useEffect, useState, useRef, useCallback } from 'react';
import KoinoboriGarland from './KoinoboriGarland';

const GallerySection = ({ sectionRef, config, galleries }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lightbox, setLightbox]   = useState(null); // index foto yang dibuka, atau null
  const innerRef = useRef(null);

  let photos = galleries?.filter(item => item.role === 'gallery');
  photos = photos?.map(item => item.url) ?? [];

  // ── Intersection Observer ─────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (innerRef.current) observer.observe(innerRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Tutup lightbox dengan Escape / klik backdrop ──────────
  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft')  setLightbox(i => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, photos.length, closeLightbox]);

    return (
      <section className="gallery-wrapper" ref={sectionRef}>
        <style>{`
        
            .gallery-wrapper {
    text-align: center;
    padding: 4rem 1.25rem;
    width: 100%;           /* full width dulu */
    position: relative;
    z-index: 2;
    box-sizing: border-box;
  }

  .gallery-wrapper .gallery-inner {
    max-width: 900px;      /* max-width dipindah ke inner, bukan wrapper */
    margin: 0 auto;
    width: 100%;
  }
          @media (min-width: 640px) { .gallery-wrapper { padding: 5rem 2rem; } }

          .gallery-wrapper .section-heading {
            font-family: 'Zen Antique', serif;
            font-size: clamp(1.8rem, 8vw, 2.5rem);
            color: var(--deep-red, #8b1a2e);
            letter-spacing: 0.1em;
            margin-bottom: 0.2rem;
          }
          .gallery-wrapper .section-heading-sub {
            font-size: 0.7rem;
            color: var(--gold, #c9a84c);
            letter-spacing: 0.4em;
            margin-bottom: 1.5rem;
            opacity: 0.9;
            text-transform: uppercase;
          }

          .gallery-wrapper .gallery-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-top: 2rem;
          }
          @media (min-width: 640px) { .gallery-wrapper .gallery-grid { gap: 1.5rem; } }

          .gallery-wrapper .gallery-item {
            aspect-ratio: 3/4;
            border: 0.5px solid rgba(201,168,76,0.4);
            background: linear-gradient(135deg, rgba(232,160,176,0.1), rgba(201,168,76,0.05));
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border-radius: 4px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            cursor: pointer;
            position: relative;
          }
          .gallery-wrapper .gallery-photo {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
            display: block;
          }
          .gallery-wrapper .gallery-item:hover .gallery-photo { transform: scale(1.05); }

          .gallery-wrapper .gallery-photo {
            width: 100%; height: 100%; object-fit: cover;
            transition: transform 0.5s;
            display: block;
          }
          .gallery-wrapper .gallery-item:hover .gallery-photo,
          .gallery-wrapper .gallery-item:active .gallery-photo { transform: scale(1.05); }

          /* Overlay gelap saat hover/active */
          .gallery-wrapper .gallery-item::after {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0);
            transition: background 0.3s;
            pointer-events: none;
            z-index: 2;
          }
          .gallery-wrapper .gallery-item:hover::after { background: rgba(0,0,0,0.35); }
          .gallery-wrapper .gallery-item:active::after { background: rgba(139,26,46,0.45); }

          /* Ikon zoom di tengah — muncul saat hover/active */
          .gallery-wrapper .gallery-zoom-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.6);
            z-index: 3;
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: rgba(201,168,76,0.15);
            border: 1.5px solid rgba(201,168,76,0.8);
            color: rgba(201,168,76,1);
            font-size: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.2s;
            backdrop-filter: blur(2px);
          }
          .gallery-wrapper .gallery-item:hover .gallery-zoom-icon {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          .gallery-wrapper .gallery-item:active .gallery-zoom-icon {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.9);
            background: rgba(139,26,46,0.3);
            border-color: rgba(255,255,255,0.6);
            color: #fff;
          }

          /* ── LIGHTBOX ─────────────────────────────────────── */
          .lb-backdrop {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: rgba(10, 6, 4, 0.92);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            animation: lbFadeIn 0.2s ease;
          }
          @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }

          .lb-inner {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            width: 100%;
            max-width: 860px;
          }

          .lb-img-wrap {
            position: relative;
            max-height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: lbZoomIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          @keyframes lbZoomIn { from { transform: scale(0.88); opacity: 0; } to { transform: scale(1); opacity: 1; } }

          .lb-img {
            max-width: 100%;
            max-height: 85vh;
            object-fit: contain;
            border-radius: 6px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6);
            border: 0.5px solid rgba(201,168,76,0.3);
            display: block;
          }

          .lb-counter {
            position: absolute;
            bottom: -2rem;
            left: 50%;
            transform: translateX(-50%);
            font-size: 11px;
            color: rgba(201,168,76,0.7);
            letter-spacing: 0.25em;
            white-space: nowrap;
            font-family: 'Zen Antique', serif;
          }

          .lb-btn {
            background: rgba(255,255,255,0.08);
            border: 0.5px solid rgba(201,168,76,0.3);
            color: rgba(201,168,76,0.9);
            width: 42px;
            height: 42px;
            border-radius: 50%;
            font-size: 1.1rem;
            cursor: pointer;
            flex-shrink: 0;
            transition: background 0.2s, transform 0.15s;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
          }
          .lb-btn:hover { background: rgba(201,168,76,0.15); transform: scale(1.1); }

          .lb-close {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            background: rgba(255,255,255,0.08);
            border: 0.5px solid rgba(201,168,76,0.3);
            color: rgba(201,168,76,0.9);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            font-size: 1rem;
            cursor: pointer;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
          }
          .lb-close:hover { background: rgba(201,168,76,0.2); }

          /* Dot indicator */
          .lb-dots {
            position: absolute;
            bottom: -3.5rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 6px;
          }
          .lb-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(201,168,76,0.3);
            cursor: pointer;
            transition: background 0.2s, transform 0.2s;
          }
          .lb-dot.active {
            background: rgba(201,168,76,0.9);
            transform: scale(1.3);
          }

          /* ── Animasi entrance galeri ─────────────────────── */
          .anim-fade-up {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          }
          .animate-on .anim-fade-up { opacity: 1; transform: translateY(0); }
          .anim-heading { transition-delay: 0.1s; }
          .anim-sub     { transition-delay: 0.2s; }
          .index-higher { z-index: 1000; }
        `}</style>

        {/* ── Lightbox ────────────────────────────────────── */}
        {lightbox !== null && (
          <div className="lb-backdrop" onClick={closeLightbox}>
            {/* Tombol tutup */}
            <button className="lb-close" onClick={closeLightbox} title="Tutup (Esc)">✕</button>

            <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
              {/* Prev */}
              {photos.length > 1 && (
                <button
                  className="lb-btn"
                  onClick={() => setLightbox(i => (i - 1 + photos.length) % photos.length)}
                  title="Sebelumnya (←)"
                >
                  ‹
                </button>
              )}

              {/* Gambar */}
              <div className="lb-img-wrap">
                <img
                  key={lightbox}
                  src={photos[lightbox]}
                  alt={`Foto ${lightbox + 1}`}
                  className="lb-img"
                />
                <span className="lb-counter">{lightbox + 1} / {photos.length}</span>

                {/* Dot indicator */}
                {photos.length > 1 && (
                  <div className="lb-dots">
                    {photos.map((_, i) => (
                      <span
                        key={i}
                        className={`lb-dot${i === lightbox ? ' active' : ''}`}
                        onClick={() => setLightbox(i)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Next */}
              {photos.length > 1 && (
                <button
                  className="lb-btn"
                  onClick={() => setLightbox(i => (i + 1) % photos.length)}
                  title="Selanjutnya (→)"
                >
                  ›
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Gallery grid ────────────────────────────────── */}
        <div ref={innerRef} className={`gallery-inner ${isVisible ? 'animate-on' : ''}`}>
          <h2 className="section-heading anim-fade-up anim-heading">Galeri</h2>
          <p className="section-heading-sub anim-fade-up anim-sub">MEMORIES</p>

          <div className="gallery-grid">
            {photos.map((item, index) => (
              <div
                key={index}
                className="gallery-item anim-fade-up"
                style={{ transitionDelay: `${0.3 + index * 0.15}s` }}
                onClick={() => item && setLightbox(index)}
              >
                {item ? (
                  <>
                    <img
                      src={item}
                      alt={`Gallery ${index + 1}`}
                      className="index-higher gallery-photo"
                    />
                    <span className="gallery-zoom-icon">⊕</span>
                  </>
                ) : (
                  <span style={{ fontFamily: '"Zen Antique", serif', fontSize: '2rem', color: 'rgba(201,168,76,0.3)' }}>
                    ✿
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <KoinoboriGarland variant="traditional" position="right" customOpacity={0.4} />
      </section>
    );
    
};

export default GallerySection;