// src/components/AdminLayout.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const NAV_ITEMS = [
  {
    to: '/admin/dashboard',
    label: 'Daftar Tamu',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    to: '/admin/pengaturan',
    label: 'Data Mempelai',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    to: '/admin/music',
    label: 'Musik Latar',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
    ),
  },
  {
    to: '/admin/pengaturan-foto',
    label: 'Galeri Foto',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
  },
];

const AdminLayout = ({ children, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .al-root {
          display: flex;
          height: 100dvh;
          background: #FAFAF8;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #1C1917;
          overflow: hidden;
        }

        /* ── Sidebar ─────────────────────────────── */
        .al-sidebar {
          width: 240px;
          flex-shrink: 0;
          background: #FFFFFF;
          border-right: 1px solid #E8E4DC;
          display: flex;
          flex-direction: column;
          z-index: 40;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }

        .al-brand {
          padding: 24px 20px 20px;
          border-bottom: 1px solid #F0EDE6;
        }

        .al-brand-name {
          font-family: 'Fraunces', serif;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: -0.5px;
          color: #1C1917;
          line-height: 1;
        }

        .al-brand-dot {
          color: #D97B6C;
        }

        .al-brand-sub {
          font-size: 11px;
          color: #A8A29E;
          margin-top: 4px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .al-nav {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }

        .al-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          color: #78716C;
          text-decoration: none;
          transition: all 0.15s ease;
          position: relative;
        }

        .al-nav-link:hover {
          background: #F5F1EB;
          color: #1C1917;
        }

        .al-nav-link.active {
          background: #FDF2EF;
          color: #C2432A;
        }

        .al-nav-link.active .al-nav-icon {
          color: #C2432A;
        }

        .al-nav-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          flex-shrink: 0;
          transition: background 0.15s;
        }

        .al-nav-link.active .al-nav-icon {
          background: #FCDDD6;
        }

        .al-nav-link:hover:not(.active) .al-nav-icon {
          background: #EDE9E3;
        }

        /* Info card in sidebar */
        .al-info-card {
          margin: 12px;
          padding: 16px;
          border-radius: 14px;
          background: linear-gradient(135deg, #FFF5F3 0%, #FFF0EB 100%);
          border: 1px solid #FCDDD6;
        }

        .al-info-card-emoji {
          font-size: 22px;
          margin-bottom: 8px;
          display: block;
        }

        .al-info-card-title {
          font-family: 'Fraunces', serif;
          font-size: 14px;
          font-weight: 600;
          color: #9A2D1A;
          margin-bottom: 3px;
        }

        .al-info-card-sub {
          font-size: 11.5px;
          color: #C86B5A;
          line-height: 1.5;
        }

        .al-sidebar-footer {
          padding: 12px;
          border-top: 1px solid #F0EDE6;
        }

        .al-logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 9px 12px;
          border-radius: 8px;
          border: none;
          background: transparent;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #A8A29E;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
        }

        .al-logout-btn:hover {
          background: #FEF2F2;
          color: #DC2626;
        }

        /* ── Main area ───────────────────────────── */
        .al-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }

        .al-header {
          height: 64px;
          background: #FFFFFF;
          border-bottom: 1px solid #E8E4DC;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          flex-shrink: 0;
          gap: 16px;
        }

        .al-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .al-mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid #E8E4DC;
          background: transparent;
          cursor: pointer;
          color: #78716C;
          transition: all 0.15s;
        }

        .al-mobile-toggle:hover {
          background: #F5F1EB;
          color: #1C1917;
        }

        .al-page-title {
          font-family: 'Fraunces', serif;
          font-size: 18px;
          font-weight: 600;
          color: #1C1917;
          letter-spacing: -0.3px;
        }

        .al-header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .al-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #F5F1EB;
          border: 1px solid #E8E4DC;
          border-radius: 20px;
          padding: 7px 14px;
          transition: all 0.2s;
        }

        .al-search:focus-within {
          background: #FFFFFF;
          border-color: #D97B6C;
          box-shadow: 0 0 0 3px #FEE8E4;
        }

        .al-search input {
          border: none;
          background: transparent;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          color: #1C1917;
          outline: none;
          width: 180px;
        }

        .al-search input::placeholder {
          color: #A8A29E;
        }

        .al-search-icon {
          color: #A8A29E;
          flex-shrink: 0;
        }

        .al-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #D97B6C, #C2432A);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          color: #FFFFFF;
          flex-shrink: 0;
          letter-spacing: 0.5px;
        }

        .al-content {
          flex: 1;
          overflow-y: auto;
          padding: 28px 28px;
          scroll-behavior: smooth;
        }

        /* ── Mobile overlay ──────────────────────── */
        .al-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(28,25,23,0.4);
          z-index: 30;
          backdrop-filter: blur(2px);
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ── Mobile bottom nav ───────────────────── */
        .al-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: #FFFFFF;
          border-top: 1px solid #E8E4DC;
          z-index: 20;
          padding: 0 8px;
          align-items: center;
          justify-content: space-around;
          gap: 4px;
        }

        .al-bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 6px 10px;
          border-radius: 10px;
          text-decoration: none;
          color: #A8A29E;
          font-size: 10px;
          font-weight: 500;
          transition: all 0.15s;
          flex: 1;
          min-width: 0;
        }

        .al-bottom-nav-item.active {
          color: #C2432A;
          background: #FDF2EF;
        }

        .al-bottom-nav-item span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        /* ── Responsive ──────────────────────────── */
        @media (max-width: 768px) {
          .al-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            transform: translateX(-100%);
            box-shadow: 4px 0 32px rgba(28,25,23,0.12);
          }

          .al-sidebar.open {
            transform: translateX(0);
          }

          .al-overlay.open {
            display: block;
          }

          .al-mobile-toggle {
            display: flex;
          }

          .al-bottom-nav {
            display: flex;
          }

          .al-content {
            padding: 20px 16px 84px;
          }

          .al-search {
            display: none;
          }

          .al-header {
            padding: 0 16px;
          }
        }

        @media (max-width: 480px) {
          .al-page-title {
            font-size: 16px;
          }
        }

        /* Scrollbar styling */
        .al-content::-webkit-scrollbar {
          width: 4px;
        }
        .al-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .al-content::-webkit-scrollbar-thumb {
          background: #D6CFC6;
          border-radius: 4px;
        }
        .al-content::-webkit-scrollbar-thumb:hover {
          background: #A8A29E;
        }
      `}</style>

      <div className="al-root">

        {/* Mobile overlay */}
        <div
          className={`al-overlay${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`al-sidebar${mobileOpen ? ' open' : ''}`}>
          <div className="al-brand">
            <div className="al-brand-name">
              Undangan<span className="al-brand-dot">.</span>
            </div>
            <div className="al-brand-sub">Admin Panel</div>
          </div>

          <nav className="al-nav">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`al-nav-link${isActive ? ' active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="al-nav-icon">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="al-info-card">
            <span className="al-info-card-emoji">💍</span>
            <div className="al-info-card-title">Hari Bahagia</div>
            <div className="al-info-card-sub">Kelola undangan pernikahan Anda dengan mudah.</div>
          </div>

          <div className="al-sidebar-footer">
            <button className="al-logout-btn" onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Keluar
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="al-main">
          <header className="al-header">
            <div className="al-header-left">
              <button
                className="al-mobile-toggle"
                onClick={() => setMobileOpen(true)}
                aria-label="Buka menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
              <h2 className="al-page-title">{title}</h2>
            </div>

            <div className="al-header-right">
              <div className="al-search">
                <svg className="al-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input type="text" placeholder="Cari tamu..." />
              </div>
              <div className="al-avatar">A</div>
            </div>
          </header>

          <div className="al-content">
            {children}
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="al-bottom-nav">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`al-bottom-nav-item${isActive ? ' active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default AdminLayout;