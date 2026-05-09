import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../redux/slices/authSlice';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lg-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
    background: #fdf8f3;
  }

  /* ── BACKGROUND LAYERS ── */
  .lg-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 10%, rgba(201,133,106,0.10) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 90%, rgba(200,169,110,0.10) 0%, transparent 55%),
      radial-gradient(ellipse 50% 40% at 50% 50%, rgba(244,228,212,0.5) 0%, transparent 70%),
      #fdf8f3;
  }

  /* Decorative corner petals */
  .lg-petal {
    position: fixed;
    pointer-events: none;
    z-index: 0;
    opacity: 0.18;
    font-size: 5rem;
    line-height: 1;
    user-select: none;
  }
  .lg-petal-tl { top: -1rem; left: -1rem; transform: rotate(-20deg); }
  .lg-petal-tr { top: -1rem; right: -1rem; transform: rotate(20deg) scaleX(-1); }
  .lg-petal-bl { bottom: -1rem; left: -1rem; transform: rotate(20deg); }
  .lg-petal-br { bottom: -1rem; right: -1rem; transform: rotate(-20deg) scaleX(-1); }

  /* Thin decorative lines */
  .lg-line-h {
    position: fixed;
    left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent 5%, rgba(200,169,110,0.3) 35%, rgba(200,169,110,0.3) 65%, transparent 95%);
    pointer-events: none; z-index: 0;
  }
  .lg-line-h.top { top: 2rem; }
  .lg-line-h.bottom { bottom: 2rem; }

  /* ── CARD ── */
  .lg-card {
    position: relative;
    z-index: 1;
    width: min(420px, calc(100vw - 2.5rem));
    background: #fffcf8;
    border: 1px solid #e8d8cc;
    border-radius: 20px;
    padding: clamp(2rem, 6vw, 3rem) clamp(1.75rem, 6vw, 2.75rem);
    box-shadow:
      0 4px 24px rgba(44,31,24,0.08),
      0 1px 3px rgba(44,31,24,0.05),
      inset 0 1px 0 rgba(255,255,255,0.9);
    animation: lgSlideUp 0.55s cubic-bezier(0.34, 1.3, 0.64, 1) both;
  }
  @keyframes lgSlideUp {
    from { opacity: 0; transform: translateY(28px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1); }
  }

  /* Top accent line */
  .lg-card::before {
    content: '';
    position: absolute;
    top: 0; left: 2rem; right: 2rem;
    height: 3px;
    border-radius: 0 0 4px 4px;
    background: linear-gradient(90deg, transparent, #c9856a, #c8a96e, #c9856a, transparent);
  }

  /* Corner ornaments */
  .lg-card::after {
    content: '✦';
    position: absolute;
    top: 1rem; left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    color: #c8a96e;
    opacity: 0.6;
    letter-spacing: 0.3em;
  }

  /* ── BRAND ── */
  .lg-brand {
    text-align: center;
    margin-bottom: 2rem;
  }
  .lg-monogram {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px; height: 64px;
    border-radius: 50%;
    border: 1.5px solid rgba(200,169,110,0.4);
    background: linear-gradient(135deg, rgba(244,228,212,0.8), rgba(237,224,196,0.6));
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    color: #a8634c;
    margin-bottom: 1rem;
    box-shadow: 0 4px 16px rgba(168,99,76,0.12), inset 0 1px 0 rgba(255,255,255,0.8);
    animation: lgFadeIn 0.7s 0.15s both;
  }
  @keyframes lgFadeIn { from { opacity: 0; } to { opacity: 1; } }

  .lg-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.6rem, 5vw, 2rem);
    font-weight: 600;
    color: #2c1f18;
    line-height: 1.15;
    margin-bottom: 0.3rem;
    animation: lgFadeIn 0.7s 0.2s both;
  }
  .lg-subtitle {
    font-size: 12px;
    color: #9e8070;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
    animation: lgFadeIn 0.7s 0.28s both;
  }

  /* Divider */
  .lg-divider {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 1.6rem 0;
    animation: lgFadeIn 0.7s 0.33s both;
  }
  .lg-divider-line {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,169,110,0.4));
  }
  .lg-divider-line:last-child {
    background: linear-gradient(90deg, rgba(200,169,110,0.4), transparent);
  }
  .lg-divider-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #c8a96e;
    opacity: 0.5;
  }

  /* ── FORM ── */
  .lg-form { animation: lgFadeIn 0.7s 0.38s both; }

  .lg-field {
    margin-bottom: 1.25rem;
    position: relative;
  }
  .lg-label {
    display: block;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: #9e8070;
    margin-bottom: 6px;
  }
  .lg-input-wrap {
    position: relative;
  }
  .lg-input-icon {
    position: absolute;
    left: 13px; top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    pointer-events: none;
    opacity: 0.5;
    transition: opacity 0.2s;
  }
  .lg-input {
    width: 100%;
    padding: 12px 14px 12px 40px;
    border: 1.5px solid #e8d8cc;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: #2c1f18;
    background: #fdf8f3;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    letter-spacing: 0.08em;
  }
  .lg-input::placeholder { color: #c4aea0; letter-spacing: 0; }
  .lg-input:focus {
    border-color: #c9856a;
    background: #fff;
    box-shadow: 0 0 0 3.5px rgba(201,133,106,0.13);
  }
  .lg-input:focus + .lg-input-icon,
  .lg-input-wrap:focus-within .lg-input-icon { opacity: 0.9; }

  /* ── ERROR ── */
  .lg-error {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 10px 13px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    font-size: 12.5px;
    color: #dc2626;
    margin-bottom: 1.1rem;
    animation: lgShake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
  @keyframes lgShake {
    10%, 90% { transform: translateX(-2px); }
    20%, 80% { transform: translateX(3px); }
    30%, 50%, 70% { transform: translateX(-3px); }
    40%, 60% { transform: translateX(3px); }
  }

  /* ── SUBMIT BUTTON ── */
  .lg-btn {
    width: 100%;
    padding: 13px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #c9856a, #a8634c);
    color: #fff;
    font-size: 14.5px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 16px rgba(168,99,76,0.32);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    letter-spacing: 0.02em;
    margin-top: 0.25rem;
  }
  .lg-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(168,99,76,0.4);
  }
  .lg-btn:active:not(:disabled) { transform: translateY(0); }
  .lg-btn:disabled {
    background: linear-gradient(135deg, #cbb8af, #b0988c);
    box-shadow: none;
    cursor: not-allowed;
  }

  /* Saving dot */
  .lg-dot {
    display: inline-block; width: 7px; height: 7px;
    background: rgba(255,255,255,0.7); border-radius: 50%;
    animation: lgPulse 0.9s ease-in-out infinite;
  }
  @keyframes lgPulse {
    0%,100% { opacity:1; transform:scale(1); }
    50% { opacity:0.35; transform:scale(0.6); }
  }

  /* ── FOOTER NOTE ── */
  .lg-footer {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 11px;
    color: #c4aea0;
    letter-spacing: 0.1em;
    animation: lgFadeIn 0.7s 0.5s both;
  }
`;

function Login() {
  const [password, setPassword] = useState('');
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const { isLoading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) navigate('/admin/dashboard');
  }, [token, navigate]);

  const LoginHandler = (e) => {
    e.preventDefault();
    if (password.trim() === '') return;
    dispatch(loginAdmin(password));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="lg-root">

        {/* Background */}
        <div className="lg-bg" />
        <div className="lg-line-h top" />
        <div className="lg-line-h bottom" />
        <span className="lg-petal lg-petal-tl">✿</span>
        <span className="lg-petal lg-petal-tr">✿</span>
        <span className="lg-petal lg-petal-bl">✿</span>
        <span className="lg-petal lg-petal-br">✿</span>

        {/* Card */}
        <div className="lg-card">

          {/* Brand */}
          <div className="lg-brand">
            <div className="lg-monogram" style={{overflow:'hidden'}}>
              <img src="bridegroom.png" style={{scale:2.3,transform:'translateY(10px)'}} alt='logo'/>
            </div>
            <h1 className="lg-title">Selamat Datang</h1>
            <p className="lg-subtitle">Admin Panel · Undangan Nikah</p>
          </div>

          <div className="lg-divider">
            <span className="lg-divider-line" />
            <span className="lg-divider-dot" />
            <span className="lg-divider-line" />
          </div>

          {/* Form */}
          <form className="lg-form" onSubmit={LoginHandler}>

            {error && (
              <div className="lg-error">
                <span>⚠</span> {error}
              </div>
            )}

            <div className="lg-field">
              <label className="lg-label" htmlFor="lg-pwd">Kata Sandi</label>
              <div className="lg-input-wrap">
                <input
                  id="lg-pwd"
                  type="password"
                  className="lg-input"
                  placeholder="Masukkan password admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <span className="lg-input-icon">🔑</span>
              </div>
            </div>

            <button type="submit" className="lg-btn" disabled={isLoading}>
              {isLoading
                ? <><span className="lg-dot" /> Memeriksa…</>
                : '✦ Masuk ke Dashboard'
              }
            </button>
          </form>

          <p className="lg-footer">✦ &nbsp; Hanya untuk pengelola undangan &nbsp; ✦</p>
        </div>

      </div>
    </>
  );
}

export default Login;