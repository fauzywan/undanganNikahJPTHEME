import { useEffect, useState, useRef, Suspense,lazy } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; 

// --- Redux Slices ---
import { fetchConfig } from '../redux/slices/configSlice';
import { submitGuestRSVP, fetchGuestBySlug } from '../redux/slices/rsvpSlice'; 

// --- Import Components ---
import CoverSection from '../components/CoverSection';
import FusumaGate from '../components/FusumaGate';
import Petals from '../components/Petals';
import { fetchStories } from '../redux/slices/storySlice';

const HeroSection       = lazy(() => import('../components/HeroSection'));
const EventSection      = lazy(() => import('../components/EventSection'));
const CoupleSection     = lazy(() => import('../components/CoupleSection'));
const GallerySection    = lazy(() => import('../components/GallerySection'));
const RsvpSection       = lazy(() => import('../components/RsvpSection'));
const FooterSection     = lazy(() => import('../components/FooterSection'));
const CountdownSection  = lazy(() => import('../components/CountdownSection'));
const GiftSection       = lazy(() => import('../components/GIftSection'));
const LocationSection   = lazy(() => import('../components/LocationSection'));
const GuestbookSection  = lazy(() => import('../components/GuestbookSection'));
const LoveStory         = lazy(() => import('../components/StoryLove'));

const API_URL = 'https://undangannikaharirini.onrender.com/api';

const Undangan = () => {
  const dispatch = useDispatch();
  
  const [isPlaying, setIsPlaying] = useState(false);

  // Ambil state config dari Redux
  const { data, isLoading } = useSelector((state) => state.config);
  const dataStory = useSelector((state) => state.story.stories);
  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);
  const [searchParams] = useSearchParams();
  const guestSlug = searchParams.get('to');
  
  const guestNameFormat = guestSlug 
    ? guestSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : ''; 

  // --- States ---
  const [isOpened, setIsOpened] = useState(false);
  const [fusumaProgress, setFusumaProgress] = useState(0);
  const [rsvpStatus, setRsvpStatus] = useState('idle');
  const [rsvpData, setRsvpData] = useState({ 
    name: guestNameFormat, 
    headcount: 1, 
    isAttending: 'true', 
    message: '',
    hasRSVPed: false 
  });

  // --- Refs ---
  const scrollSpaceRef = useRef(null);
  const sectionRefs = useRef([]);
  const audioRef = useRef(null);

  const [isRegistered,setIsRegistered] = useState(false);

  // ==========================================
  // 1. INITIAL FETCH
  // ==========================================
  useEffect(() => { 
    dispatch(fetchConfig()); 

    if (guestSlug) {
      dispatch(fetchGuestBySlug(guestSlug)).unwrap()
        .then((guest) => {
          if ((guest.isAttending !== undefined && guest.headcount > 0) || guest.message) {
            setRsvpData({
              slug: guest.slug,
              name: guest.guestName,
              headcount: guest.headcount,
              isAttending: guest.isAttending,
              message: guest.message || '',
              hasRSVPed: true 
            });
            setIsRegistered(true)
            setRsvpStatus('success');
        } else {
            if(guestSlug != ''){
              setIsRegistered(true)
            } else {
              setIsRegistered(false)
            }
          }
        })
        .catch((err) => console.log("Info Tamu:", err.message));
    }
  }, [dispatch, guestSlug]);

  // ==========================================
  // 2. EFEK SCROLL PINTU FUSUMA
  // ==========================================
  useEffect(() => {
    if (!isOpened) return;
    const handleScroll = () => {
      if (!scrollSpaceRef.current) return;
      const rect = scrollSpaceRef.current.getBoundingClientRect();
      const totalScroll = scrollSpaceRef.current.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
      setFusumaProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpened]);
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const handleStalled = () => {
    audio.load();
    audio.play().catch(() => {});
  };

  const handleEnded = () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  audio.addEventListener('stalled', handleStalled);
  audio.addEventListener('ended', handleEnded);
  audio.addEventListener('error', handleStalled);

  return () => {
    audio.removeEventListener('stalled', handleStalled);
    audio.removeEventListener('ended', handleEnded);
    audio.removeEventListener('error', handleStalled);
  };
}, []);
  // ==========================================
  // 3. EFEK FADE-UP OBSERVER
  // ==========================================
  useEffect(() => {
    if (!isOpened) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    sectionRefs.current.forEach(section => {
      if (section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(25px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
      }
    });
    return () => observer.disconnect();
  }, [isOpened]);

  // ==========================================
  // 4. HANDLERS
  // ==========================================
  const handleOpenInvitation = () => {
    setIsOpened(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio diblokir browser:", err));
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

const getBgmUrl = () => {
    const dbUrl = config?.bgmUrl;
  
    if (dbUrl) {
      return dbUrl;
    }
    // Lapis 1: Jika API tidak mereturn apa-apa, gunakan fallback dari folder public
    return dbUrl || '/music/bgm.mp3'; 
  };
  // ==========================================
  // 5. NAVIGATION SCROLL HANDLERS
  // ==========================================
  const scrollToNextSection = () => {
    const offset = 50; // Toleransi threshold dalam pixel
    const nextSection = sectionRefs.current.find(section => {
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.top > offset; // Cari section yang posisinya masih di bawah viewport
    });

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Jika sudah di paling bawah
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const scrollToPrevSection = () => {
    const offset = -50; 
    // Loop dari belakang untuk mencari section terdekat yang posisinya di atas viewport
    for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
      const section = sectionRefs.current[i];
      if (!section) continue;
      const rect = section.getBoundingClientRect();
      if (rect.top < offset) {
        section.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    // Jika sudah di paling atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================
  // 6. SUBMIT RSVP
  // ==========================================
  const submitRSVP = async (e) => {
    e.preventDefault();
    if (!rsvpData.name.trim()) {
      alert("Silakan isi nama Anda terlebih dahulu ✿");
      return;
    }
    setRsvpStatus('loading');
    let targetSlug = guestSlug;
    
    try {
      if (!targetSlug) {
        const createRes = await axios.post(`${API_URL}/admin/guests`, {
            guestName: rsvpData.name
        });
        targetSlug = createRes.data.guest.slug;
      }
        
      const attendingBoolean = String(rsvpData.isAttending) === 'true' || rsvpData.isAttending === true;

      const updatedGuest = await dispatch(submitGuestRSVP({
        slug: targetSlug,
        payloadData: {
          isAttending: attendingBoolean,
          headcount: attendingBoolean ? parseInt(rsvpData.headcount) : 0,
          message: rsvpData.message
        }
      })).unwrap();

      setRsvpStatus('success');
      setRsvpData({
        ...rsvpData,
        hasRSVPed: true,
        isAttending: updatedGuest.isAttending,
        headcount: updatedGuest.headcount,
        message: updatedGuest.message
      });
    } catch (error) {
      console.log("Gagal mengirim RSVP:", error);
      setRsvpStatus('idle');
      alert(error.message || "Gagal menyimpan konfirmasi kehadiran. Silakan coba lagi.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center bg-[#1a1410] text-[#c9a84c] tracking-widest font-serif text-sm">
        Mempersiapkan Undangan...
      </div>
    );
  }

  const { config, photos, guests } = data || {};
  const brideShort = config?.bride?.name?.split(' ')[0] || 'Wanita';
  const groomShort = config?.groom?.name?.split(' ')[0] || 'Pria';
  const eventDateObj = config?.eventDate ? new Date(config.eventDate) : null;
  const year = eventDateObj != null ? config.eventDate.substr(0,4) : new Date().getFullYear();
  const formattedDate = eventDateObj ? eventDateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' }) : 'Tanggal Belum Ditentukan';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Zen+Antique&display=swap');

        :root {
         --sakura: #E8A0B0; --ink: #1a1410; --washi: #f5f0e8; --gold: #c9a84c;
         --matcha: #5a7a5e; --deep-red: #8b1a2e; --fusuma-dark: #3d2b1f; --rice-paper: #faf6ee;
         --bg-alt: #ffffff; 
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 14px; } 
        @media (min-width: 640px) { html { font-size: 16px; } }
        h2{ font-weight:800; }

        .spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        body { 
         font-family: 'Cormorant Garamond', serif; 
         background: var(--ink); 
         color: var(--ink); 
         overflow-x: hidden; 
         -webkit-tap-highlight-color: transparent; 
        }
        .footer-wrapper{
          background: var(--ink) !important; 
        }

        #main-content { 
         position: relative; 
         min-height: 100svh; 
         overflow-x: hidden; 
         z-index: 1; 
        }
        #main-content::before { 
         content: ''; position: fixed; inset: 0; 
         background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E"); 
         pointer-events: none; z-index: 0; opacity: 0.5; 
        }

        #main-content > * {
          background-color: var(--rice-paper); 
          margin-top: 0 !important; 
          margin-bottom: 0 !important;
        }

        #main-content > *:nth-child(even) {
          background-color: var(--bg-alt); 
        }

        .petal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10; overflow: hidden; opacity: 0; transition: opacity 1s; }
        .petal-overlay.visible { opacity: 1; }
      `}</style>

    <audio 
  ref={audioRef} 
  src={getBgmUrl()} 
  preload="auto"
  // hapus loop, ganti dengan event listener di atas
/>

      {/* Floating Action Buttons (Hanya muncul jika isOpened true) */}
      {isOpened && (
        <>
          {/* Tombol Musik */}
          <button
            onClick={toggleAudio}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-[var(--gold)] shadow-lg transition-transform hover:scale-110"
            style={{ width: '45px', height: '45px', borderRadius: '50%' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--deep-red)" className={`w-6 h-6 ${isPlaying ? 'spin-slow' : ''}`}>
              {isPlaying ? (
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 13.5a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zM12 11a1 1 0 110 2 1 1 0 010-2z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" clipRule="evenodd" />
              )}
            </svg>
          </button>

          {/* Tombol Navigasi Section Atas & Bawah */}
          <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
            {/* Tombol Atas */}
            <button
              onClick={scrollToPrevSection}
              className="w-10 h-10 flex items-center justify-center bg-white/70 backdrop-blur-sm border border-[var(--gold)] text-[var(--deep-red)] rounded-full shadow-lg transition-transform hover:scale-110 hover:bg-white"
              aria-label="Scroll ke atas"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
            
            {/* Tombol Bawah */}
            <button
              onClick={scrollToNextSection}
              className="w-10 h-10 flex items-center justify-center bg-white/70 backdrop-blur-sm border border-[var(--gold)] text-[var(--deep-red)] rounded-full shadow-lg transition-transform hover:scale-110 hover:bg-white"
              aria-label="Scroll ke bawah"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
        </>
      )}

      {/* RENDER KOMPONEN */}
      <CoverSection isOpened={isOpened} handleOpenInvitation={handleOpenInvitation} brideShort={brideShort} groomShort={groomShort} guestName={guestSlug} photos={photos} />
      
      <div className={`petal-overlay ${isOpened ? 'visible' : ''}`}>
        {isOpened && <Petals count={12} />}
      </div>

      <FusumaGate isOpened={isOpened} fusumaProgress={fusumaProgress} scrollSpaceRef={scrollSpaceRef} />
      
      <div id="main-content" style={{ opacity: fusumaProgress > 0.8 ? (fusumaProgress - 0.8) / 0.2 : 0, display: isOpened ? 'block' : 'none' }}>
         <Suspense fallback={
    <div className="min-h-screen flex items-center justify-center text-[var(--gold)]">
      Memuat...
    </div>
  }>

       {/* Pastikan urutan index sectionRefs dari 0 sampai seterusnya untuk perhitungan scroll yang akurat */}
        <div ref={el => sectionRefs.current[0] = el}>
          <CoupleSection brideShort={brideShort} groomShort={groomShort} config={config} photos={photos}/>
        </div>
      
        <div ref={el => sectionRefs.current[2] = el}>
          <HeroSection brideShort={brideShort} groomShort={groomShort} photos={photos}/>
        </div>
          <div ref={el => sectionRefs.current[1] = el}>
          <LoveStory stories={dataStory} />
          <CountdownSection eventDate={config?.events.find(item => item.name.toLowerCase().includes("akad") || item.name.toLowerCase().includes("resepsi") ).date || '2026-06-01'} />
        </div>
        <div ref={el => sectionRefs.current[3] = el}>
          <EventSection formattedDate={formattedDate} year={year} config={config} />
        </div>
      {photos.length>0 && photos.filter(item => item.role === 'gallery').length > 0 && (
        <div ref={el => sectionRefs.current[4] = el}>
          <GallerySection config={config} galleries={photos} />
        </div>
        )}
        <div ref={el => sectionRefs.current[5] = el}>
          <GiftSection config={config} />
        </div>
        <div ref={el => sectionRefs.current[6] = el}>
          <GuestbookSection guests={guests} />
        </div>
        <div ref={el => sectionRefs.current[7] = el}>
          <RsvpSection rsvpData={rsvpData} setRsvpData={setRsvpData} submitRSVP={submitRSVP} rsvpStatus={rsvpStatus} isUserRegistered={isRegistered} />
        </div>
     
        <div ref={el => sectionRefs.current[9] = el}>
          <LocationSection config={config} />
        </div>
        
        <FooterSection brideShort={brideShort} groomShort={groomShort} eventDateObj={eventDateObj} year={year} />
  </Suspense>
     
      </div>
    </>
  );
};

export default Undangan;