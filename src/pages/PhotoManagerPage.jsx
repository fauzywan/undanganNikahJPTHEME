import axios from 'axios';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import AdminLayout from '../components/adminLayout';

const BACKEND_URL = 'https://undangannikaharirini.onrender.com'
const API_URL = `${BACKEND_URL}/api`;

const styles = `
  .photo-page { padding: 1.5rem; font-family: system-ui, -apple-system, sans-serif; color: #1e293b; background: #f8fafc; min-height: 100vh; }
  .page-title { font-size: 1.6rem; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
  .page-sub { font-size: 0.9rem; color: #64748b; margin-bottom: 1.5rem; }

  .tab-bar { display: flex; gap: 4px; background: #e2e8f0; border-radius: 8px; padding: 4px; width: fit-content; margin-bottom: 1.5rem; flex-wrap: wrap; }
  .tab-btn { padding: 6px 14px; border-radius: 6px; border: none; background: transparent; font-size: 13px; font-weight: 500; cursor: pointer; color: #64748b; transition: all 0.15s; white-space: nowrap; }
  .tab-btn.active { background: #ffffff; color: #0f172a; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

  .upload-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }

  .drop-zone { border: 2px dashed #cbd5e1; border-radius: 10px; padding: 2.5rem 1rem; text-align: center; cursor: pointer; transition: all 0.2s; background: #f8fafc; position: relative; }
  .drop-zone.dragging { border-color: #3b82f6; background: #eff6ff; }
  .drop-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
  .drop-label { font-size: 14px; font-weight: 600; color: #334155; margin-bottom: 4px; }
  .drop-hint { font-size: 12px; color: #94a3b8; }
  .drop-browse { color: #2563eb; }

  .preview-strip { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 1rem; }
  .preview-thumb { position: relative; width: 76px; height: 76px; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; }
  .preview-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .thumb-remove { position: absolute; top: 2px; right: 2px; background: rgba(0,0,0,0.6); border: none; color: #fff; border-radius: 50%; width: 18px; height: 18px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

  .upload-btn-row { display: flex; align-items: center; gap: 12px; margin-top: 1rem; }
  .btn-primary { padding: 8px 20px; border-radius: 6px; border: none; background: #2563eb; color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
  .btn-primary:hover { background: #1d4ed8; }
  .btn-primary:disabled { background: #94a3b8; cursor: not-allowed; }
  .upload-status { font-size: 12px; color: #64748b; }

  .url-hint { font-size: 13px; color: #64748b; margin-bottom: 0.75rem; }
  .url-row { display: flex; gap: 8px; }
  .url-input { flex: 1; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; outline: none; transition: border-color 0.15s; }
  .url-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
  .tips-box { margin-top: 1rem; padding: 10px 14px; background: #fff8f1; border-left: 3px solid #f59e0b; border-radius: 0 6px 6px 0; font-size: 12px; color: #92400e; }
  .tips-box code { background: rgba(0,0,0,0.06); padding: 1px 5px; border-radius: 3px; font-family: monospace; }

  /* Instagram */
  .ig-header { display: flex; align-items: center; gap: 12px; margin-bottom: 1.25rem; padding: 12px 14px; background: linear-gradient(135deg, #fdf2f8, #fef9f0); border-radius: 10px; border: 1px solid #fce7f3; }
  .ig-logo { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .ig-title { font-size: 14px; font-weight: 700; color: #0f172a; }
  .ig-subtitle { font-size: 12px; color: #64748b; margin-top: 1px; }

  .ig-steps { margin-bottom: 1.25rem; }
  .ig-step { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 8px; font-size: 13px; color: #475569; line-height: 1.5; }
  .ig-step-num { min-width: 22px; height: 22px; border-radius: 50%; background: #fce7f3; color: #be185d; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-top: 1px; }

  .ig-input-wrap { position: relative; margin-bottom: 10px; }
  .ig-input-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 16px; }
  .ig-url-input { width: 100%; padding: 9px 12px 9px 36px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
  .ig-url-input:focus { border-color: #db2777; box-shadow: 0 0 0 3px rgba(219,39,119,0.1); }

  .btn-ig { width: 100%; padding: 10px; border-radius: 8px; border: none; background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: white; font-size: 13px; font-weight: 600; cursor: pointer; transition: opacity 0.15s; }
  .btn-ig:hover { opacity: 0.88; }
  .btn-ig:disabled { opacity: 0.45; cursor: not-allowed; }

  .ig-status { margin-top: 0.75rem; padding: 9px 13px; border-radius: 7px; font-size: 12px; font-weight: 500; }
  .ig-status.loading { background: #eff6ff; color: #1d4ed8; }
  .ig-status.success { background: #f0fdf4; color: #15803d; }
  .ig-status.error { background: #fef2f2; color: #dc2626; }

  .ig-note { margin-top: 1rem; padding: 10px 13px; background: #f0f9ff; border-left: 3px solid #38bdf8; border-radius: 0 6px 6px 0; font-size: 12px; color: #0c4a6e; line-height: 1.6; }
  .ig-note code { background: rgba(0,0,0,0.07); padding: 1px 5px; border-radius: 3px; font-family: monospace; }
  .ig-warn { margin-top: 0.75rem; padding: 10px 13px; background: #fff7ed; border-left: 3px solid #fb923c; border-radius: 0 6px 6px 0; font-size: 12px; color: #9a3412; line-height: 1.6; }

  /* Gallery */
  .divider { border: none; border-top: 1px solid #e2e8f0; margin: 1.5rem 0; }
  .section-label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem; }
  .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
  .gallery-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; }
  .gallery-img-wrap { aspect-ratio: 4/3; position: relative; background: #e2e8f0; overflow: hidden; }
  .gallery-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .source-badge { position: absolute; top: 6px; left: 6px; font-size: 10px; padding: 2px 7px; border-radius: 4px; font-weight: 600; letter-spacing: 0.03em; }
  .badge-url { background: rgba(37,99,235,0.85); color: #fff; }
  .badge-file { background: rgba(15,110,86,0.85); color: #fff; }
  .badge-ig { background: linear-gradient(135deg, #e6683c, #cc2366); color: #fff; }
  .gallery-footer { padding: 8px 10px; display: flex; align-items: center; gap: 6px; border-top: 1px solid #f1f5f9; background: #f8fafc; }
  .role-select { flex: 1; font-size: 11px; border: 1px solid #e2e8f0; border-radius: 4px; padding: 3px 4px; background: #fff; color: #334155; cursor: pointer; min-width: 0; }
  .btn-delete { border: none; background: none; color: #dc2626; cursor: pointer; font-size: 1rem; padding: 2px 4px; line-height: 1; }
  .empty-state { padding: 3rem; text-align: center; color: #94a3b8; font-size: 14px; }
  .empty-state .empty-icon { font-size: 2rem; margin-bottom: 0.5rem; }
`;

const ROLES = [
  { value: 'gallery', label: 'Galeri Umum' },
  { value: 'polaroid', label: 'Polaroid' },
  { value: 'bride', label: 'Mempelai Wanita' },
  { value: 'groom', label: 'Mempelai Pria' },
  { value: 'cover', label: 'Cover Depan' },
];

const getDisplayUrl = (url) => {
  if (url && url.startsWith('/uploads/')) return `${BACKEND_URL}${url}`;
  return url;
};

const getSourceBadge = (source) => {
  if (source === 'ig')   return { cls: 'badge-ig',   label: 'IG' };
  if (source === 'url')  return { cls: 'badge-url',  label: 'URL' };
  return                        { cls: 'badge-file', label: 'File' };
};

const PhotoManagerPage = () => {
  const [activeTab, setActiveTab]         = useState('file');
  const [photos, setPhotos]               = useState([]);
  const [pendingFiles, setPendingFiles]   = useState([]);
  const [isDragging, setIsDragging]       = useState(false);
  const [isUploading, setIsUploading]     = useState(false);
  const [uploadStatus, setUploadStatus]   = useState('');
  const [urlInput, setUrlInput]           = useState('');
  const [isAddingUrl, setIsAddingUrl]     = useState(false);
  const [igInput, setIgInput]             = useState('');
  const [igStatus, setIgStatus]           = useState(null); // { type, msg }
  const [isIgLoading, setIsIgLoading]     = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.get(`${API_URL}/admin/photos`)
      .then(res => setPhotos(res.data))
      .catch(err => console.error('Gagal memuat galeri:', err));
  }, []);

  // ─── FILE UPLOAD ─────────────────────────────────────────────
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

  // ─── URL ADD ─────────────────────────────────────────────────
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

  // ─── INSTAGRAM ───────────────────────────────────────────────
  const handleIgSubmit = async () => {
    if (!igInput.trim()) return;
    setIsIgLoading(true);
    setIgStatus({ type: 'loading', msg: '⏳ Mengambil gambar dari Instagram...' });
    try {
      // Backend route: POST /api/admin/photos/from-ig
      // Backend download gambar → simpan ke /uploads → return Photo document
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

  // ─── GALLERY ACTIONS ─────────────────────────────────────────
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

  // ─── RENDER ──────────────────────────────────────────────────
  return (
    <>
          
      <style>{styles}</style>
            <AdminLayout title="Pengaturan">
          <div className="max-w-4xl mx-auto space-y-8 pb-10 photo-page">
        <h1 className="page-title">Manajemen Foto & Galeri</h1>
        <p className="page-sub">Tambahkan foto via upload file, URL</p>

        <div className="tab-bar">
          {[
            { key: 'file', label: '↑ Upload File' },
            { key: 'url',  label: '🔗 Via URL' },
          ].map(t => (
            <button key={t.key} className={`tab-btn${activeTab === t.key ? ' active' : ''}`} onClick={() => setActiveTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="upload-card">

          {/* ── Upload File ── */}
          {activeTab === 'file' && (
            <div>
              <div
                className={`drop-zone${isDragging ? ' dragging' : ''}`}
                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input ref={fileInputRef} type="file" multiple accept="image/*" style={{ display: 'none' }} onChange={handleFileInputChange} />
                <div className="drop-icon">🖼️</div>
                <p className="drop-label">Seret & lepas foto di sini</p>
                <p className="drop-hint">atau <span className="drop-browse">pilih dari perangkat</span> · PNG, JPG, WEBP, GIF</p>
              </div>

              {pendingFiles.length > 0 && (
                <div className="preview-strip">
                  {pendingFiles.map(pf => (
                    <div className="preview-thumb" key={pf.id}>
                      <img src={pf.dataUrl} alt="preview" />
                      <button className="thumb-remove" onClick={() => removePending(pf.id)}>✕</button>
                    </div>
                  ))}
                </div>
              )}

              {pendingFiles.length > 0 && (
                <div className="upload-btn-row">
                  <button className="btn-primary" onClick={handleUpload} disabled={isUploading}>
                    {isUploading ? 'Menyimpan...' : `Simpan ${pendingFiles.length} Foto`}
                  </button>
                  {uploadStatus && <span className="upload-status">{uploadStatus}</span>}
                </div>
              )}
            </div>
          )}

          {/* ── Via URL ── */}
          {activeTab === 'url' && (
            <div>
              <p className="url-hint">Masukkan tautan gambar publik (Google Drive, Imgur, Cloudinary, dll).</p>
              <div className="url-row">
                <input
                  type="url" className="url-input" placeholder="https://contoh.com/gambar.jpg"
                  value={urlInput} onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
                />
                <button className="btn-primary" onClick={handleAddUrl} disabled={isAddingUrl}>
                  {isAddingUrl ? 'Menyimpan...' : 'Tambahkan'}
                </button>
              </div>
         
            </div>
          )}

          {/* ── Instagram ── */}
          {activeTab === 'ig' && (
            <div>
              <div className="ig-header">
                <div className="ig-logo">📷</div>
                <div>
                  <div className="ig-title">Ambil Foto dari Instagram</div>
                  <div className="ig-subtitle">Server akan mengunduh & menyimpan gambar secara otomatis</div>
                </div>
              </div>

              <div className="ig-steps">
                <div className="ig-step">
                  <span className="ig-step-num">1</span>
                  <span>Buka foto di Instagram → klik <strong>⋯</strong> → pilih <strong>Salin tautan</strong></span>
                </div>
                <div className="ig-step">
                  <span className="ig-step-num">2</span>
                  <span>Tempel tautan di bawah lalu klik <strong>Ambil Foto</strong></span>
                </div>
                <div className="ig-step">
                  <span className="ig-step-num">3</span>
                  <span>Gambar diunduh server & langsung muncul di galeri</span>
                </div>
              </div>

              <div className="ig-input-wrap">
                <span className="ig-input-icon">📎</span>
                <input
                  type="url" className="ig-url-input"
                  placeholder="https://www.instagram.com/p/ABC123xyz/"
                  value={igInput} onChange={(e) => setIgInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleIgSubmit()}
                />
              </div>

              <button className="btn-ig" onClick={handleIgSubmit} disabled={isIgLoading || !igInput.trim()}>
                {isIgLoading ? '⏳ Mengambil gambar...' : '📸 Ambil Foto dari Instagram'}
              </button>

              {igStatus && (
                <div className={`ig-status ${igStatus.type}`}>{igStatus.msg}</div>
              )}

              <div className="ig-note">
                <strong>ℹ️ Cara kerja:</strong> Tautan Instagram dikirim ke backend → backend mengunduh gambarnya menggunakan axios + header browser → gambar disimpan di <code>/uploads</code> server kamu secara permanen.
              </div>

              <div className="ig-warn">
                <strong>⚠️ Perlu route backend:</strong> Pastikan sudah menambahkan <code>POST /api/admin/photos/from-ig</code> di router Express. Jika gagal, download manual lalu upload via tab <strong>Upload File</strong>.
              </div>
            </div>
          )}
        </div>

        {/* ── Gallery ── */}
        <hr className="divider" />
        <p className="section-label">Foto Tersimpan ({photos.length})</p>

        {photos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            Belum ada foto yang tersimpan di database.
          </div>
        ) : (
          <div className="gallery-grid">
            {photos.map((photo) => {
              const badge = getSourceBadge(photo.source);
              return (
                <div className="gallery-card" key={photo.id || photo._id}>
                  <div className="gallery-img-wrap">
                    <span className={`source-badge ${badge.cls}`}>{badge.label}</span>
                    <img
                      src={getDisplayUrl(photo.url)} alt="Foto" loading="lazy"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x225?text=Error'; }}
                    />
                  </div>
                  <div className="gallery-footer">
                    <select
                      className="role-select" value={photo.role}
                      onChange={(e) => handleRoleChange(photo.id || photo._id, e.target.value)}
                    >
                      {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                    <button className="btn-delete" onClick={() => handleDelete(photo.id || photo._id)} title="Hapus">🗑</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      </AdminLayout>
    </>
  );
};

export default PhotoManagerPage;