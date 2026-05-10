import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const BACKEND_URL = 'https://undangannikaharirini.onrender.com/api';

/* ── Custom Tooltip ─────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#fffcf8',
      border: '1px solid #e8d8cc',
      borderRadius: 12,
      padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(44,31,24,0.12)',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9e8070', marginBottom: 6 }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ fontSize: 13, fontWeight: 600, color: entry.color, margin: '2px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color, display: 'inline-block' }} />
          {entry.name}: <span style={{ color: '#2c1f18', marginLeft: 2 }}>{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --cream: #fdf8f3;
    --warm-white: #fffcf8;
    --blush: #f4e4d4;
    --rose: #c9856a;
    --rose-dark: #a8634c;
    --rose-light: #e8b49a;
    --gold: #c8a96e;
    --gold-light: #ede0c4;
    --ink: #2c1f18;
    --ink-light: #6b4f3f;
    --muted: #9e8070;
    --border: #e8d8cc;
    --matcha: #5a7a5e;
    --matcha-light: #ddeedd;
    --deep-red: #8b1a2e;
    --deep-red-light: #fde8eb;
    --shadow-sm: 0 2px 10px rgba(44,31,24,0.05);
    --shadow-md: 0 6px 28px rgba(44,31,24,0.09);
    --radius: 16px;
    --radius-sm: 10px;
    --transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
  }

  * { box-sizing: border-box; }

  .ov-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    min-height: 100%;
    padding: 0 0 2rem;
    color: var(--ink);
  }

  /* ── Header ── */
  .ov-header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .ov-header-eyebrow {
    display: inline-block;
    font-size: 10.5px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold);
    background: var(--gold-light);
    padding: 4px 12px; border-radius: 20px;
    margin-bottom: 0.5rem;
  }
  .ov-header h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    font-weight: 600; color: var(--ink);
    margin: 0; line-height: 1.15;
  }
  .ov-header-date {
    font-size: 12px; color: var(--muted);
    font-weight: 400; margin-top: 3px;
  }
  .ov-refresh-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 14px;
    border-radius: 20px;
    border: 1.5px solid var(--border);
    background: var(--warm-white);
    color: var(--muted);
    font-size: 12px; font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: var(--transition);
    white-space: nowrap;
  }
  .ov-refresh-btn:hover { border-color: var(--rose-light); color: var(--rose-dark); background: var(--blush); }

  /* ── Stat cards ── */
  .ov-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 640px) { .ov-cards { grid-template-columns: 1fr; } }
  @media (min-width: 480px) and (max-width: 640px) { .ov-cards { grid-template-columns: repeat(2, 1fr); } }

  .ov-card {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.4rem 1.5rem;
    box-shadow: var(--shadow-sm);
    position: relative;
    overflow: hidden;
    transition: var(--transition);
  }
  .ov-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
  .ov-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
  }
  .ov-card--unique::before  { background: linear-gradient(90deg, var(--matcha), #7aaa7e); }
  .ov-card--total::before   { background: linear-gradient(90deg, var(--gold), #d4b87a); }
  .ov-card--today::before   { background: linear-gradient(90deg, var(--deep-red), #b8243c); }

  .ov-card-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; margin-bottom: 0.9rem;
  }
  .ov-card--unique  .ov-card-icon { background: var(--matcha-light); }
  .ov-card--total   .ov-card-icon { background: var(--gold-light); }
  .ov-card--today   .ov-card-icon { background: var(--deep-red-light); }

  .ov-card-label {
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 6px;
  }
  .ov-card-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 2.6rem);
    font-weight: 600; line-height: 1;
    margin-bottom: 6px;
  }
  .ov-card--unique  .ov-card-value { color: var(--matcha); }
  .ov-card--total   .ov-card-value { color: var(--gold); }
  .ov-card--today   .ov-card-value { color: var(--deep-red); }

  .ov-card-sub {
    font-size: 11.5px; color: var(--muted); font-weight: 300;
  }

  /* ── Chart card ── */
  .ov-chart-card {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem 1.5rem 1.25rem;
    box-shadow: var(--shadow-sm);
  }
  .ov-chart-header {
    display: flex; align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap; gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .ov-chart-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem; font-weight: 600;
    color: var(--ink); margin: 0 0 3px;
  }
  .ov-chart-subtitle {
    font-size: 12px; color: var(--muted); font-weight: 300;
  }
  .ov-legend {
    display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
  }
  .ov-legend-item {
    display: flex; align-items: center; gap: 5px;
    font-size: 11.5px; font-weight: 500; color: var(--ink-light);
  }
  .ov-legend-dot {
    width: 8px; height: 8px; border-radius: 50%;
  }

  /* ── Empty state ── */
  .ov-empty {
    height: 280px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 0.6rem;
    background: var(--cream);
    border: 1.5px dashed var(--border);
    border-radius: var(--radius-sm);
  }
  .ov-empty-icon { font-size: 2.2rem; }
  .ov-empty p { font-size: 13px; color: var(--muted); }

  /* ── Loading ── */
  .ov-loading {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 12px; height: 60vh;
    color: var(--muted); font-size: 14px;
  }
  .ov-spinner {
    width: 28px; height: 28px;
    border: 2px solid var(--border);
    border-top-color: var(--rose);
    border-radius: 50%;
    animation: ovSpin 0.7s linear infinite;
  }
  @keyframes ovSpin { to { transform: rotate(360deg); } }

  /* ── Responsive ── */
  @media (max-width: 480px) {
    .ov-chart-card { padding: 1.25rem 1rem 1rem; }
    .ov-card { padding: 1.1rem 1.2rem; }
  }
`;

const OverView = () => {
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    viewsToday: 0,
    chartData: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/analytics/stats`);
      setStats(response.data);
    } catch (error) {
      console.error("Gagal load statistik", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  if (isLoading) {
    return (
      <>
        <style>{styles}</style>
        <div className="ov-root">
          <div className="ov-loading">
            <span className="ov-spinner" />
            Memuat statistik dashboard…
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="ov-root">

        {/* ── Header ── */}
        <div className="ov-header">
          <div>
            <div className="ov-header-eyebrow">✦ Dashboard</div>
            <h2>Ringkasan Traffic Undangan</h2>
            <p className="ov-header-date">{today}</p>
          </div>
          <button className="ov-refresh-btn" onClick={fetchStats}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Perbarui
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="ov-cards">

          <div className="ov-card ov-card--unique">
            <div className="ov-card-icon">👥</div>
            <div className="ov-card-label">Tamu Unik</div>
            <div className="ov-card-value">{stats.uniqueVisitors.toLocaleString('id-ID')}</div>
            <div className="ov-card-sub">Perangkat berbeda</div>
          </div>

          <div className="ov-card ov-card--total">
            <div className="ov-card-icon">📖</div>
            <div className="ov-card-label">Total Dibuka</div>
            <div className="ov-card-value">{stats.totalViews.toLocaleString('id-ID')}</div>
            <div className="ov-card-sub">Halaman dilihat</div>
          </div>

          <div className="ov-card ov-card--today">
            <div className="ov-card-icon">📅</div>
            <div className="ov-card-label">Hari Ini</div>
            <div className="ov-card-value">{stats.viewsToday.toLocaleString('id-ID')}</div>
            <div className="ov-card-sub">Kunjungan hari ini</div>
          </div>

        </div>

        {/* ── Chart Card ── */}
        <div className="ov-chart-card">
          <div className="ov-chart-header">
            <div>
              <h3 className="ov-chart-title">Grafik Kunjungan</h3>
              <p className="ov-chart-subtitle">7 hari terakhir</p>
            </div>
            <div className="ov-legend">
              <span className="ov-legend-item">
                <span className="ov-legend-dot" style={{ background: '#8b1a2e' }} />
                Total Dibuka
              </span>
              <span className="ov-legend-item">
                <span className="ov-legend-dot" style={{ background: '#5a7a5e' }} />
                Tamu Unik
              </span>
            </div>
          </div>

          {stats.chartData?.length > 0 ? (
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#8b1a2e" stopOpacity={0.18}/>
                      <stop offset="95%" stopColor="#8b1a2e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#5a7a5e" stopOpacity={0.18}/>
                      <stop offset="95%" stopColor="#5a7a5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3" vertical={false}
                    stroke="#e8d8cc" strokeOpacity={0.7}
                  />
                  <XAxis
                    dataKey="displayDate"
                    axisLine={false} tickLine={false}
                    tick={{ fill: '#9e8070', fontSize: 11.5, fontFamily: "'DM Sans', sans-serif" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false} tickLine={false}
                    tick={{ fill: '#9e8070', fontSize: 11.5, fontFamily: "'DM Sans', sans-serif" }}
                    dx={-4}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e8d8cc', strokeWidth: 1.5, strokeDasharray: '4 2' }} />

                  <Area
                    type="monotone"
                    name="Total Dibuka"
                    dataKey="views"
                    stroke="#8b1a2e"
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: '#8b1a2e', strokeWidth: 0 }}
                    activeDot={{ r: 5.5, fill: '#8b1a2e', stroke: '#fffcf8', strokeWidth: 2 }}
                    fillOpacity={1}
                    fill="url(#colorViews)"
                  />
                  <Area
                    type="monotone"
                    name="Tamu Unik"
                    dataKey="unique"
                    stroke="#5a7a5e"
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: '#5a7a5e', strokeWidth: 0 }}
                    activeDot={{ r: 5.5, fill: '#5a7a5e', stroke: '#fffcf8', strokeWidth: 2 }}
                    fillOpacity={1}
                    fill="url(#colorUnique)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="ov-empty">
              <span className="ov-empty-icon">📊</span>
              <p>Belum ada data kunjungan dalam 7 hari terakhir.</p>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default OverView;