import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfig } from '../redux/slices/configSlice';
import AdminLayout from '../components/adminLayout';

const BACKEND_URL = 'http://undangannikaharirini.onrender.com';
const API_URL = `${BACKEND_URL}/api`;

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600&display=swap');

  .mu-wrap { max-width: 680px; }

  .mu-page-title {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: 600;
    color: #1C1917;
    margin-bottom: 4px;
    letter-spacing: -0.4px;
  }
  .mu-page-sub {
    font-size: 13.5px;
    color: #A8A29E;
    margin-bottom: 28px;
  }

  /* Current music card */
  .mu-current-card {
    background: #FFFFFF;
    border: 1px solid #EDE8E0;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(28,25,23,0.05);
  }

  .mu-current-header {
    background: linear-gradient(135deg, #FFF8F6, #FDF2EF);
    border-bottom: 1px solid #FCDDD6;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .mu-music-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: linear-gradient(135deg, #D97B6C, #C2432A);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(194,67,42,0.3);
  }

  .mu-current-label {
    font-size: 11px;
    font-weight: 600;
    color: #C2432A;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 3px;
  }

  .mu-current-title {
    font-family: 'Fraunces', serif;
    font-size: 17px;
    font-weight: 600;
    color: #1C1917;
  }

  .mu-current-body {
    padding: 20px 24px;
  }

  .mu-audio-player {
    width: 100%;
    border-radius: 10px;
    outline: none;
    height: 44px;
  }

  .mu-empty-music {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    background: #F5F1EB;
    border-radius: 12px;
    font-size: 13.5px;
    color: #A8A29E;
  }

  /* Upload card */
  .mu-upload-card {
    background: #FFFFFF;
    border: 1px solid #EDE8E0;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(28,25,23,0.05);
  }

  .mu-upload-header {
    padding: 20px 24px 16px;
    border-bottom: 1px solid #F5F1EB;
  }

  .mu-section-title {
    font-family: 'Fraunces', serif;
    font-size: 16px;
    font-weight: 600;
    color: #1C1917;
    margin-bottom: 3px;
  }

  .mu-section-sub { font-size: 12.5px; color: #A8A29E; }

  .mu-upload-body { padding: 20px 24px; }

  /* Drop zone */
  .mu-dropzone {
    border: 2px dashed #D6D0C8;
    border-radius: 14px;
    padding: 36px 24px;
    text-align: center;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
    background: #FAFAF8;
  }
  .mu-dropzone:hover {
    border-color: #C2432A;
    background: #FFF8F6;
  }

  .mu-dropzone input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .mu-dropzone-icon {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: #F5F1EB;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 14px;
  }

  .mu-dropzone-label {
    font-size: 14px;
    font-weight: 600;
    color: #1C1917;
    margin-bottom: 5px;
  }

  .mu-dropzone-hint { font-size: 12.5px; color: #A8A29E; }
  .mu-dropzone-file { font-size: 14px; font-weight: 600; color: #C2432A; }

  /* Preview */
  .mu-preview {
    background: #FFFBF0;
    border: 1px solid #FDE68A;
    border-radius: 12px;
    padding: 14px 16px;
    margin-top: 14px;
  }
  .mu-preview-label {
    font-size: 11px;
    font-weight: 600;
    color: #92400E;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 8px;
  }

  /* Upload footer */
  .mu-upload-footer {
    padding: 16px 24px;
    border-top: 1px solid #F5F1EB;
    display: flex;
    justify-content: flex-end;
    background: #FAFAF8;
  }

  .mu-btn-upload {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 24px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #D97B6C, #C2432A);
    color: #FFFFFF;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(194,67,42,0.3);
  }
  .mu-btn-upload:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(194,67,42,0.35); }
  .mu-btn-upload:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

  .mu-loading {
    padding: 60px;
    text-align: center;
    color: #A8A29E;
    font-size: 14px;
  }
`;

const MusicManagerPage = () => {
  const dispatch = useDispatch();
  const { data: configData, isLoading } = useSelector((state) => state.config);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => { dispatch(fetchConfig()); }, [dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('audio/')) { alert('Harap pilih file audio (MP3, WAV, dsb)!'); return; }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUploadMusic = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert('Silakan pilih file lagu terlebih dahulu!');
    setIsUploading(true);
    const formData = new FormData();
    formData.append('musicFile', selectedFile);
    try {
      await axios.post(`${API_URL}/admin/config/music`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Musik latar berhasil diunggah!');
      setSelectedFile(null);
      setPreviewUrl('');
      dispatch(fetchConfig());
    } catch (error) {
      alert(error.response?.data?.message || 'Terjadi kesalahan saat mengunggah musik latar.');
    } finally {
      setIsUploading(false);
    }
  };

  const getAudioSource = () => {
    const dbUrl = configData?.config?.bgmUrl;
    if (dbUrl) return dbUrl.startsWith('/uploads/') ? `${BACKEND_URL}${dbUrl}` : dbUrl;
    return '';
  };

  return (
    <AdminLayout title="Musik Latar">
      <style>{S}</style>
      <div className="mu-wrap">
        <div className="mu-page-title">Pengaturan Musik Latar</div>
        <div className="mu-page-sub">Unggah lagu berformat MP3 yang akan diputar otomatis pada undangan.</div>

        {isLoading ? (
          <div className="mu-loading">Memuat pengaturan...</div>
        ) : (
          <>
            {/* Current music */}
            <div className="mu-current-card">
              <div className="mu-current-header">
                <div className="mu-music-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                  </svg>
                </div>
                <div>
                  <div className="mu-current-label">Musik Aktif</div>
                  <div className="mu-current-title">Musik Undangan Saat Ini</div>
                </div>
              </div>
              <div className="mu-current-body">
                {getAudioSource() ? (
                  <audio className="mu-audio-player" controls src={getAudioSource()} controlsList="nodownload">
                    Browser Anda tidak mendukung elemen audio.
                  </audio>
                ) : (
                  <div className="mu-empty-music">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    Belum ada musik yang diunggah.
                  </div>
                )}
              </div>
            </div>

            {/* Upload form */}
            <div className="mu-upload-card">
              <div className="mu-upload-header">
                <div className="mu-section-title">Upload Musik Baru</div>
                <div className="mu-section-sub">File baru akan menggantikan musik yang sedang aktif.</div>
              </div>
              <form onSubmit={handleUploadMusic}>
                <div className="mu-upload-body">
                  <div className="mu-dropzone">
                    <input type="file" accept="audio/*" onChange={handleFileChange} />
                    <div className="mu-dropzone-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#78716C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                      </svg>
                    </div>
                    {selectedFile ? (
                      <div className="mu-dropzone-file">{selectedFile.name}</div>
                    ) : (
                      <>
                        <div className="mu-dropzone-label">Klik atau seret file MP3 ke sini</div>
                        <div className="mu-dropzone-hint">MP3, WAV, OGG — maks 20MB</div>
                      </>
                    )}
                  </div>

                  {previewUrl && (
                    <div className="mu-preview">
                      <div className="mu-preview-label">Preview sebelum upload</div>
                      <audio controls src={previewUrl} style={{ width: '100%', height: 40 }} />
                    </div>
                  )}
                </div>

                <div className="mu-upload-footer">
                  <button type="submit" className="mu-btn-upload" disabled={isUploading || !selectedFile}>
                    {isUploading ? (
                      'Mengunggah...'
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        Upload Musik
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default MusicManagerPage;