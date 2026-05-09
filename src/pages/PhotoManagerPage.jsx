import axios from 'axios';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import AdminLayout from '../components/adminLayout';

const BACKEND_URL = 'https://undangannikaharirini.onrender.com'
const API_URL = `${BACKEND_URL}/api`;

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
    --success: #16a34a;
    --success-bg: #f0fdf4;
    --error: #dc2626;
    --error-bg: #fef2f2;
    --info-bg: #eff6ff;
    --info: #2563eb;
    --shadow-sm: 0 2px 10px rgba(44,31,24,0.05);
    --shadow-md: 0 6px 28px rgba(44,31,24,0.09);
    --radius: 16px;
    --radius-sm: 10px;
    --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  * { box-sizing: border-box; }

  /* ── ROOT PAGE ── */
  .pm-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    min-height: 100vh;
    padding: 2rem 1.5rem 4rem;
    color: var(--ink);
  }
  .pm-max { max-width: 860px; margin: 0 auto; }

  /* ── HEADER ── */
  .pm-header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    position: relative;
  }
  .pm-header::after {
    content: '';
    display: block;
    width: 80px; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    margin: 1.5rem auto 0;
  }
  .pm-eyebrow {
    display: inline-block;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold);
    background: var(--gold-light);
    padding: 5px 14px; border-radius: 20px;
    margin-bottom: 0.75rem;
  }
  .pm-header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.9rem, 5vw, 2.8rem);
    font-weight: 600; color: var(--ink);
    margin: 0 0 0.4rem; line-height: 1.15;
  }
  .pm-header p {
    font-size: 0.88rem; color: var(--muted);
    margin: 0; font-weight: 300;
  }

  /* ── TAB BAR ── */
  .pm-tabs {
    display: flex; gap: 4px;
    background: var(--blush);
    border-radius: 12px; padding: 5px;
    width: fit-content;
    margin-bottom: 1.75rem;
    flex-wrap: wrap;
    box-shadow: inset 0 1px 3px rgba(44,31,24,0.07);
  }
  .pm-tab {
    padding: 8px 16px;
    border-radius: 9px; border: none;
    background: transparent;
    font-size: 13px; font-weight: 500;
    cursor: pointer; color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    transition: var(--transition);
    white-space: nowrap;
  }
  .pm-tab.active {
    background: var(--warm-white);
    color: var(--ink);
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(44,31,24,0.1);
  }
  .pm-tab:not(.active):hover { color: var(--rose-dark); background: rgba(255,255,255,0.5); }

  /* ── UPLOAD CARD ── */
  .pm-card {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: clamp(1.4rem, 4vw, 2rem);
    margin-bottom: 2rem;
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
  }
  .pm-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--rose-light), var(--gold), var(--rose-light));
  }

  /* ── DROP ZONE ── */
  .pm-drop {
    border: 2px dashed var(--border);
    border-radius: var(--radius-sm);
    padding: 3rem 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
    background: var(--cream);
    position: relative;
  }
  .pm-drop:hover { border-color: var(--rose-light); background: #fdf4ee; }
  .pm-drop.dragging { border-color: var(--rose); background: #fdf0e8; box-shadow: 0 0 0 4px rgba(201,133,106,0.1); }
  .pm-drop-icon { font-size: 2.8rem; margin-bottom: 0.6rem; display: block; }
  .pm-drop-label { font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 5px; }
  .pm-drop-hint { font-size: 12.5px; color: var(--muted); }
  .pm-drop-browse { color: var(--rose-dark); font-weight: 600; }

  /* ── PREVIEW STRIP ── */
  .pm-preview { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 1.1rem; }
  .pm-thumb {
    position: relative; width: 80px; height: 80px;
    border-radius: 10px; overflow: hidden;
    border: 1.5px solid var(--border);
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
  }
  .pm-thumb:hover { border-color: var(--rose-light); transform: scale(1.04); }
  .pm-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .pm-thumb-rm {
    position: absolute; top: 3px; right: 3px;
    background: rgba(44,31,24,0.65);
    border: none; color: #fff;
    border-radius: 50%; width: 18px; height: 18px;
    font-size: 10px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: var(--transition);
  }
  .pm-thumb-rm:hover { background: var(--error); }

  /* ── BUTTONS ── */
  .pm-btn-row { display: flex; align-items: center; gap: 12px; margin-top: 1.1rem; flex-wrap: wrap; }
  .pm-btn-primary {
    padding: 10px 22px;
    border-radius: var(--radius-sm); border: none;
    background: linear-gradient(135deg, var(--rose), var(--rose-dark));
    color: #fff; font-size: 13.5px; font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 4px 14px rgba(168,99,76,0.28);
    display: inline-flex; align-items: center; gap: 7px;
  }
  .pm-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(168,99,76,0.38); }
  .pm-btn-primary:active { transform: translateY(0); }
  .pm-btn-primary:disabled { background: linear-gradient(135deg, #cbb8af, #b0988c); box-shadow: none; cursor: not-allowed; transform: none; }
  .pm-status { font-size: 12.5px; color: var(--muted); font-weight: 500; }
  .pm-status.ok { color: var(--success); }
  .pm-status.err { color: var(--error); }

  /* ── URL TAB ── */
  .pm-url-hint { font-size: 13px; color: var(--muted); margin-bottom: 0.9rem; line-height: 1.55; }
  .pm-url-row { display: flex; gap: 8px; }
  .pm-url-input {
    flex: 1; padding: 10px 14px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: 13.5px; font-family: 'DM Sans', sans-serif;
    color: var(--ink); background: var(--cream);
    outline: none; transition: var(--transition);
  }
  .pm-url-input::placeholder { color: #c4aea0; }
  .pm-url-input:focus { border-color: var(--rose); background: #fff; box-shadow: 0 0 0 3px rgba(201,133,106,0.12); }
  .pm-tips {
    margin-top: 1rem; padding: 11px 14px;
    background: #fffbf0; border-left: 3px solid var(--gold);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    font-size: 12.5px; color: var(--ink-light); line-height: 1.6;
  }
  .pm-tips code { background: rgba(44,31,24,0.07); padding: 1px 5px; border-radius: 4px; font-family: monospace; }

  /* ── DIVIDER / SECTION ── */
  .pm-divider { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }
  .pm-section-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;
  }
  .pm-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem; font-weight: 600;
    color: var(--ink); margin: 0;
    display: flex; align-items: center; gap: 8px;
  }
  .pm-count-badge {
    background: var(--blush); color: var(--rose-dark);
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 700;
    padding: 3px 10px; border-radius: 20px;
  }

  /* ── GALLERY GRID ── */
  .pm-gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
  @media (max-width: 480px) {
    .pm-gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  }

  .pm-gallery-card {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
  }
  .pm-gallery-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: var(--rose-light); }

  .pm-img-wrap {
    aspect-ratio: 4/3;
    position: relative; background: var(--blush);
    overflow: hidden;
  }
  .pm-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
  .pm-gallery-card:hover .pm-img-wrap img { transform: scale(1.06); }

  .pm-src-badge {
    position: absolute; top: 7px; left: 7px;
    font-size: 9.5px; padding: 2px 8px;
    border-radius: 5px; font-weight: 700;
    letter-spacing: 0.05em;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
  .badge-url  { background: rgba(37,99,235,0.82); color: #fff; }
  .badge-file { background: rgba(15,110,86,0.82); color: #fff; }
  .badge-ig   { background: linear-gradient(135deg, rgba(230,104,60,0.9), rgba(204,35,102,0.9)); color: #fff; }

  .pm-card-footer {
    padding: 8px 10px;
    display: flex; align-items: center; gap: 6px;
    border-top: 1px solid var(--border);
    background: var(--cream);
  }
  .pm-role-select {
    flex: 1;
    font-size: 11px; font-family: 'DM Sans', sans-serif;
    border: 1px solid var(--border);
    border-radius: 5px; padding: 4px 5px;
    background: var(--warm-white); color: var(--ink);
    cursor: pointer; min-width: 0;
    transition: var(--transition);
  }
  .pm-role-select:focus { border-color: var(--rose); outline: none; }
  .pm-btn-delete {
    border: 1.5px solid var(--border);
    background: var(--warm-white); color: var(--muted);
    cursor: pointer; font-size: 13px;
    padding: 3px 7px; border-radius: 6px;
    line-height: 1; transition: var(--transition);
    display: flex; align-items: center;
  }
  .pm-btn-delete:hover { background: var(--error-bg); border-color: #fca5a5; color: var(--error); }

  /* ── EMPTY STATE ── */
  .pm-empty {
    text-align: center; padding: 3.5rem 1rem;
    background: var(--warm-white);
    border: 1.5px dashed var(--border);
    border-radius: var(--radius);
  }
  .pm-empty-icon { font-size: 2.5rem; margin-bottom: 0.6rem; }
  .pm-empty h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem; color: var(--ink); margin: 0 0 0.4rem;
  }
  .pm-empty p { font-size: 13px; color: var(--muted); margin: 0; }

  /* ── SAVING DOT ── */
  .pm-saving-dot {
    display: inline-block; width: 7px; height: 7px;
    background: #fff; border-radius: 50%;
    animation: pmPulse 0.9s ease-in-out infinite;
  }
  @keyframes pmPulse {
    0%,100% { opacity:1; transform:scale(1); }
    50% { opacity:0.4; transform:scale(0.65); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 480px) {
    .pm-root { padding: 1.25rem 1rem 3rem; }
    .pm-card { padding: 1.25rem; }
    .pm-url-row { flex-direction: column; }
    .pm-btn-primary { width: 100%; justify-content: center; }
    .pm-tabs { width: 100%; }
    .pm-tab { flex: 1; text-align: center; }
  }
`;

const ROLES = [
  { value: 'gallery',  label: 'Galeri Umum' },
  { value: 'polaroid', label: 'Polaroid' },
  { value: 'bride',    label: 'Mempelai Wanita' },
  { value: 'groom',    label: 'Mempelai Pria' },
  { value: 'cover',    label: 'Cover Depan' },
];

const getDisplayUrl = (url) => {
  if (!url) return '';
  const result = url;
  return result;
};

const getSourceBadge = (source) => {
  if (source === 'ig')   return { cls: 'badge-ig',   label: 'IG' };
  if (source === 'url')  return { cls: 'badge-url',  label: 'URL' };
  return                        { cls: 'badge-file', label: 'File' };
};

const PhotoManagerPage = () => {
  const [activeTab, setActiveTab]       = useState('file');
  const [photos, setPhotos]             = useState([]);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [isDragging, setIsDragging]     = useState(false);
  const [isUploading, setIsUploading]   = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [urlInput, setUrlInput]         = useState('');
  const [isAddingUrl, setIsAddingUrl]   = useState(false);
  const [igInput, setIgInput]           = useState('');
  const [igStatus, setIgStatus]         = useState(null);
  const [isIgLoading, setIsIgLoading]   = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.get(`${API_URL}/admin/photos`)
      .then(res => setPhotos(res.data))
      .catch(err => console.error('Gagal memuat galeri:', err));
  }, []);

  // ─── FILE UPLOAD ────────────────────────────────────────────
  const readFiles = useCallback((files) => {
    Array.from(files).filter(f => f.type.startsWith('image/')).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => setPendingFiles(prev => [...prev, {
        id: `${Date.now()}-${Math.random()}`, file, dataUrl: e.target.result,
      }]);
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileInputChange = (e) => { if (e.target.files.length) readFiles(e.target.files); e.target.value = ''; };
  const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files.length) readFiles(e.dataTransfer.files); };
  const removePending = (id) => setPendingFiles(prev => prev.filter(pf => pf.id !== id));

  const handleUpload = async () => {
    if (!pendingFiles.length) return;
    setIsUploading(true);
    setUploadStatus('Menyimpan ke server...');
    try {
      const formData = new FormData();
      pendingFiles.forEach(pf => formData.append('photos', pf.file));
      const res = await axios.post(`${API_URL}/admin/photos/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPhotos(prev => [...res.data.photos, ...prev]);
      setPendingFiles([]);
      setUploadStatus(`${res.data.photos.length} foto berhasil disimpan.`);
      setTimeout(() => setUploadStatus(''), 3000);
    } catch (err) {
      console.error('Upload error:', err);
      setUploadStatus('Gagal menyimpan. Pastikan server berjalan.');
    } finally {
      setIsUploading(false);
    }
  };

  // ─── URL ADD ────────────────────────────────────────────────
  const handleAddUrl = async () => {
    if (!urlInput.trim()) return;
    setIsAddingUrl(true);
    try {
      const res = await axios.post(`${API_URL}/admin/photos`, { url: urlInput, role: 'gallery' });
      setPhotos(prev => [res.data.photo, ...prev]);
      setUrlInput('');
    } catch (err) {
      alert('Gagal menyimpan URL ke database.');
    } finally {
      setIsAddingUrl(false);
    }
  };

  // ─── INSTAGRAM ──────────────────────────────────────────────
  const handleIgSubmit = async () => {
    if (!igInput.trim()) return;
    setIsIgLoading(true);
    setIgStatus({ type: 'loading', msg: '⏳ Mengambil gambar dari Instagram...' });
    try {
      const res = await axios.post(`${API_URL}/admin/photos/from-ig`, { url: igInput.trim() });
      setPhotos(prev => [{ ...res.data.photo, source: 'ig' }, ...prev]);
      setIgInput('');
      setIgStatus({ type: 'success', msg: '✓ Foto berhasil diambil dan disimpan ke server!' });
      setTimeout(() => setIgStatus(null), 4000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal mengambil gambar.';
      setIgStatus({ type: 'error', msg: `✕ ${msg}` });
    } finally {
      setIsIgLoading(false);
    }
  };

  // ─── GALLERY ACTIONS ────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus foto ini secara permanen?')) return;
    try {
      await axios.delete(`${API_URL}/admin/photos/${id}`);
      setPhotos(prev => prev.filter(p => (p.id || p._id) !== id));
    } catch (err) { alert('Gagal menghapus foto.'); }
  };

  const handleRoleChange = async (id, role) => {
    setPhotos(prev => prev.map(p => (p.id || p._id) === id ? { ...p, role } : p));
    try {
      await axios.patch(`${API_URL}/admin/photos/${id}`, { role });
    } catch (err) { alert('Gagal mengubah role foto.'); }
  };

  // ─── RENDER ─────────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>
      <AdminLayout title="Pengaturan">
        <div className="pm-root">
          <div className="pm-max">

            {/* ── HEADER ── */}
            <div className="pm-header">
              <div className="pm-eyebrow">✦ Admin Panel</div>
              <h1>Manajemen Foto & Galeri</h1>
              <p>Unggah dan atur foto untuk ditampilkan di undangan</p>
            </div>

            {/* ── TAB BAR ── */}
            <div className="pm-tabs">
              {[
                { key: 'file', label: '↑ Upload File' },
                { key: 'url',  label: '🔗 Via URL' },
              ].map(t => (
                <button
                  key={t.key}
                  className={`pm-tab${activeTab === t.key ? ' active' : ''}`}
                  onClick={() => setActiveTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* ── UPLOAD CARD ── */}
            <div className="pm-card">

              {/* Upload File */}
              {activeTab === 'file' && (
                <div>
                  <div
                    className={`pm-drop${isDragging ? ' dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef} type="file" multiple accept="image/*"
                      style={{ display: 'none' }} onChange={handleFileInputChange}
                    />
                    <span className="pm-drop-icon">🖼️</span>
                    <p className="pm-drop-label">Seret & lepas foto di sini</p>
                    <p className="pm-drop-hint">atau <span className="pm-drop-browse">pilih dari perangkat</span> · PNG, JPG, WEBP, GIF</p>
                  </div>

                  {pendingFiles.length > 0 && (
                    <div className="pm-preview">
                      {pendingFiles.map(pf => (
                        <div className="pm-thumb" key={pf.id}>
                          <img src={pf.dataUrl} alt="preview" />
                          <button className="pm-thumb-rm" onClick={() => removePending(pf.id)}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {pendingFiles.length > 0 && (
                    <div className="pm-btn-row">
                      <button className="pm-btn-primary" onClick={handleUpload} disabled={isUploading}>
                        {isUploading
                          ? <><span className="pm-saving-dot" /> Menyimpan…</>
                          : `✦ Simpan ${pendingFiles.length} Foto`
                        }
                      </button>
                      {uploadStatus && (
                        <span className={`pm-status${uploadStatus.includes('Gagal') ? ' err' : ' ok'}`}>
                          {uploadStatus}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Via URL */}
              {activeTab === 'url' && (
                <div>
                  <p className="pm-url-hint">
                    Masukkan tautan gambar publik dari Google Drive, Imgur, Cloudinary, atau layanan hosting gambar lainnya.
                  </p>
                  <div className="pm-url-row">
                    <input
                      type="url" className="pm-url-input"
                      placeholder="https://contoh.com/gambar.jpg"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
                    />
                    <button className="pm-btn-primary" onClick={handleAddUrl} disabled={isAddingUrl}>
                      {isAddingUrl
                        ? <><span className="pm-saving-dot" /> Menyimpan…</>
                        : '+ Tambahkan'
                      }
                    </button>
                  </div>
                </div>
              )}

              {/* Instagram (hidden tab, tetap ada di DOM untuk fungsionalitas) */}
              {activeTab === 'ig' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem', padding: '12px 14px', background: 'linear-gradient(135deg, #fdf2f8, #fef9f0)', borderRadius: 10, border: '1px solid #fce7f3' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>📷</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>Ambil Foto dari Instagram</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>Server akan mengunduh & menyimpan gambar secara otomatis</div>
                    </div>
                  </div>
                  <div style={{ position: 'relative', marginBottom: 10 }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>📎</span>
                    <input
                      type="url" className="pm-url-input" style={{ paddingLeft: 36, width: '100%' }}
                      placeholder="https://www.instagram.com/p/ABC123xyz/"
                      value={igInput} onChange={(e) => setIgInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleIgSubmit()}
                    />
                  </div>
                  <button className="pm-btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleIgSubmit} disabled={isIgLoading || !igInput.trim()}>
                    {isIgLoading ? <><span className="pm-saving-dot" /> Mengambil gambar…</> : '📸 Ambil Foto dari Instagram'}
                  </button>
                  {igStatus && (
                    <div style={{ marginTop: '0.75rem', padding: '9px 13px', borderRadius: 7, fontSize: 12.5, fontWeight: 500, background: igStatus.type === 'success' ? 'var(--success-bg)' : igStatus.type === 'error' ? 'var(--error-bg)' : 'var(--info-bg)', color: igStatus.type === 'success' ? 'var(--success)' : igStatus.type === 'error' ? 'var(--error)' : 'var(--info)' }}>
                      {igStatus.msg}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── GALLERY ── */}
            <hr className="pm-divider" />
            <div className="pm-section-header">
              <h2 className="pm-section-title">🖼 Foto Tersimpan</h2>
              <span className="pm-count-badge">{photos.length} foto</span>
            </div>

            {photos.length === 0 ? (
              <div className="pm-empty">
                <div className="pm-empty-icon">📭</div>
                <h3>Belum ada foto</h3>
                <p>Mulai unggah foto menggunakan tab di atas.</p>
              </div>
            ) : (
              <div className="pm-gallery-grid">
                {photos.map((photo) => {
                  const badge = getSourceBadge(photo.source);
                  return (
                    <div className="pm-gallery-card" key={photo.id || photo._id}>
                      <div className="pm-img-wrap">
                        <span className={`pm-src-badge ${badge.cls}`}>{badge.label}</span>
                        <img
                          src={getDisplayUrl(photo.url)} alt="Foto" loading="lazy"
                          onError={(e) => { e.target.onerror = null; e.target.src = ''; }}
                        />
                      </div>
                      <div className="pm-card-footer">
                        <select
                          className="pm-role-select"
                          value={photo.role}
                          onChange={(e) => handleRoleChange(photo.id || photo._id, e.target.value)}
                        >
                          {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                        </select>
                        <button
                          className="pm-btn-delete"
                          onClick={() => handleDelete(photo.id || photo._id)}
                          title="Hapus foto"
                        >🗑</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default PhotoManagerPage;