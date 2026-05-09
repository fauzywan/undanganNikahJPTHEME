import { useState, useEffect } from 'react';

const CountdownSection = ({ eventDate,bride,groom }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const target = new Date(eventDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  // Fungsi untuk membuat link Google Calendar
  const addToCalendar = () => {
    const date = new Date(eventDate).toISOString().replace(/-|:|\.\d\d\d/g, "");
    const title = `Pernikahan ${bride} & ${groom}`;
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${date}/${date}`;
    window.open(url, '_blank');
  };

  return (
    <section className="countdown-wrapper">
      <style>{`
        .countdown-wrapper { text-align: center; padding: 4rem 1.25rem; background: rgba(255,255,255,0.3); position: relative; z-index: 2; }
        .countdown-wrapper .save-date-label { font-family: 'Zen Antique', serif; font-size: 1.2rem; color: var(--gold, #c9a84c); letter-spacing: 0.3em; margin-bottom: 2rem; display: block; }
        
        .countdown-wrapper .timer-container { display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 2.5rem; }
        
        .countdown-wrapper .timer-box { background: var(--rice-paper, #faf6ee); border: 1px solid rgba(201,168,76,0.3); padding: 1rem 0.5rem; width: 70px; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        @media (min-width: 640px) { .countdown-wrapper .timer-box { width: 90px; padding: 1.5rem 1rem; } }

        .countdown-wrapper .timer-val { display: block; font-family: 'Zen Antique', serif; font-size: 1.5rem; color: var(--deep-red, #8b1a2e); line-height: 1; margin-bottom: 0.5rem; }
        .countdown-wrapper .timer-unit { display: block; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--matcha, #5a7a5e); font-weight: bold; }

        .countdown-wrapper .btn-calendar { background: transparent; border: 1px solid var(--gold, #c9a84c); color: var(--gold, #c9a84c); padding: 0.8rem 1.5rem; font-family: 'Cormorant Garamond', serif; font-size: 0.9rem; letter-spacing: 0.15em; cursor: pointer; transition: all 0.3s; text-transform: uppercase; }
        .countdown-wrapper .btn-calendar:hover { background: var(--gold, #c9a84c); color: #fff; }
      `}</style>

      <span className="save-date-label">SAVE THE DATE</span>

      <div className="timer-container">
        <div className="timer-box">
          <span className="timer-val">{timeLeft.days}</span>
          <span className="timer-unit">Hari</span>
        </div>
        <div className="timer-box">
          <span className="timer-val">{timeLeft.hours}</span>
          <span className="timer-unit">Jam</span>
        </div>
        <div className="timer-box">
          <span className="timer-val">{timeLeft.minutes}</span>
          <span className="timer-unit">Menit</span>
        </div>
        <div className="timer-box">
          <span className="timer-val">{timeLeft.seconds}</span>
          <span className="timer-unit">Detik</span>
        </div>
      </div>

      <button className="btn-calendar" onClick={addToCalendar}>
        ✿ Simpan ke Kalender
      </button>
    </section>
  );
};

export default CountdownSection;