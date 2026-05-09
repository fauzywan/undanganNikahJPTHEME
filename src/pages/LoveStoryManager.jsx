import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories, addStory, updateStory, deleteStory, resetState } from '../redux/slices/storySlice';
import AdminLayout from '../components/adminLayout';

const BACKEND_URL = 'https://undangannikaharirini.onrender.com';

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
    --gold-light: #e8d4a8;
    --ink: #2c1f18;
    --ink-light: #6b4f3f;
    --muted: #9e8070;
    --border: #e8d8cc;
    --shadow-sm: 0 2px 12px rgba(44,31,24,0.06);
    --shadow-md: 0 6px 32px rgba(44,31,24,0.10);
    --shadow-lg: 0 16px 56px rgba(44,31,24,0.13);
    --radius: 16px;
    --radius-sm: 10px;
    --transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  }

  * { box-sizing: border-box; }

  .lsm-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    min-height: 100vh;
    padding: 2rem 1.5rem 4rem;
    color: var(--ink);
  }

  /* ─── HERO HEADER ─── */
  .lsm-header {
    text-align: center;
    margin-bottom: 2.5rem;
    position: relative;
    padding-bottom: 2rem;
  }
  .lsm-header::after {
    content: '';
    display: block;
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    margin: 1.5rem auto 0;
  }
  .lsm-header-eyebrow {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    background: var(--gold-light);
    padding: 5px 14px;
    border-radius: 20px;
    margin-bottom: 0.75rem;
  }
  .lsm-header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 600;
    color: var(--ink);
    margin: 0 0 0.4rem;
    line-height: 1.15;
  }
  .lsm-header p {
    font-size: 0.9rem;
    color: var(--muted);
    margin: 0;
    font-weight: 300;
  }

  /* ─── FORM CARD ─── */
  .lsm-form-card {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: clamp(1.5rem, 4vw, 2.25rem);
    margin-bottom: 2.5rem;
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
    transition: var(--transition);
  }
  .lsm-form-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--rose-light), var(--gold), var(--rose-light));
  }
  .lsm-form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0 0 1.5rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .lsm-form-title span {
    font-size: 1.1rem;
  }

  .lsm-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media (max-width: 600px) {
    .lsm-form-grid { grid-template-columns: 1fr; }
    .lsm-form-group.full { grid-column: 1; }
  }
  .lsm-form-group { display: flex; flex-direction: column; gap: 5px; }
  .lsm-form-group.full { grid-column: 1 / -1; }

  .lsm-form-label {
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .lsm-form-input,
  .lsm-form-textarea {
    padding: 11px 14px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    background: var(--cream);
    outline: none;
    transition: var(--transition);
    width: 100%;
  }
  .lsm-form-input::placeholder,
  .lsm-form-textarea::placeholder { color: #c4aea0; }
  .lsm-form-input:focus,
  .lsm-form-textarea:focus {
    border-color: var(--rose);
    background: #fff;
    box-shadow: 0 0 0 3px rgba(201,133,106,0.12);
  }
  .lsm-form-textarea { min-height: 108px; resize: vertical; line-height: 1.55; }

  .lsm-btn-row {
    display: flex;
    gap: 10px;
    margin-top: 1.25rem;
    flex-wrap: wrap;
  }
  .lsm-btn-submit {
    padding: 11px 24px;
    border-radius: var(--radius-sm);
    border: none;
    background: linear-gradient(135deg, var(--rose), var(--rose-dark));
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 4px 14px rgba(168,99,76,0.3);
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .lsm-btn-submit:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(168,99,76,0.38);
  }
  .lsm-btn-submit:active { transform: translateY(0); }
  .lsm-btn-submit:disabled {
    background: linear-gradient(135deg, #cbb8af, #b0988c);
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
  }
  .lsm-btn-cancel {
    padding: 11px 20px;
    border-radius: var(--radius-sm);
    border: 1.5px solid var(--border);
    background: var(--cream);
    color: var(--ink-light);
    font-size: 14px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: var(--transition);
  }
  .lsm-btn-cancel:hover {
    background: var(--blush);
    border-color: var(--rose-light);
    color: var(--rose-dark);
  }

  /* ─── SECTION HEADER ─── */
  .lsm-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .lsm-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .lsm-count-badge {
    background: var(--blush);
    color: var(--rose-dark);
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
  }

  /* ─── TIMELINE ─── */
  .lsm-timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
  }
  .lsm-timeline::before {
    content: '';
    position: absolute;
    left: 19px;
    top: 32px;
    bottom: 32px;
    width: 2px;
    background: linear-gradient(to bottom, var(--rose-light), var(--gold-light), var(--rose-light));
    border-radius: 2px;
  }
  @media (max-width: 480px) {
    .lsm-timeline::before { left: 15px; }
  }

  /* ─── STORY CARD ─── */
  .lsm-story-card {
    display: flex;
    gap: 1rem;
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem 1.25rem 1.25rem 1rem;
    align-items: flex-start;
    transition: var(--transition);
    position: relative;
    margin-bottom: 1rem;
    box-shadow: var(--shadow-sm);
  }
  .lsm-story-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--rose-light);
    transform: translateX(4px);
  }

  .lsm-story-order-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }
  .lsm-story-order {
    background: linear-gradient(135deg, var(--rose), var(--rose-dark));
    color: #fff;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(168,99,76,0.28);
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    letter-spacing: 0;
  }
  @media (max-width: 480px) {
    .lsm-story-order { width: 32px; height: 32px; font-size: 14px; }
  }

  .lsm-story-body { flex: 1; min-width: 0; }
  .lsm-story-meta {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 4px;
  }
  .lsm-story-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0;
    line-height: 1.25;
  }
  .lsm-story-date {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    color: var(--gold);
    font-weight: 600;
    letter-spacing: 0.04em;
    background: var(--gold-light);
    padding: 2px 9px;
    border-radius: 20px;
    white-space: nowrap;
    margin-bottom: 8px;
  }
  .lsm-story-desc {
    font-size: 13.5px;
    color: var(--ink-light);
    line-height: 1.6;
    white-space: pre-wrap;
    margin: 0;
    font-weight: 300;
  }

  .lsm-story-img {
    width: 88px;
    height: 88px;
    border-radius: 10px;
    object-fit: cover;
    border: 2px solid var(--border);
    flex-shrink: 0;
    transition: var(--transition);
  }
  .lsm-story-card:hover .lsm-story-img {
    border-color: var(--rose-light);
    transform: scale(1.03);
  }
  @media (max-width: 480px) {
    .lsm-story-img { width: 64px; height: 64px; }
  }

  /* ─── ACTION BUTTONS ─── */
  .lsm-story-actions {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex-shrink: 0;
  }
  @media (max-width: 480px) {
    .lsm-story-actions { flex-direction: row; }
  }
  .lsm-btn-icon {
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1.5px solid var(--border);
    background: var(--cream);
    cursor: pointer;
    font-size: 14px;
    transition: var(--transition);
    color: var(--muted);
  }
  .lsm-btn-icon:hover { transform: scale(1.1); }
  .lsm-btn-icon.edit:hover { background: #eff6ff; border-color: #93c5fd; color: #2563eb; }
  .lsm-btn-icon.delete:hover { background: #fff1f0; border-color: #fca5a5; color: #ef4444; }

  /* ─── EMPTY STATE ─── */
  .lsm-empty {
    text-align: center;
    padding: 3.5rem 1rem;
    background: var(--warm-white);
    border: 1.5px dashed var(--border);
    border-radius: var(--radius);
  }
  .lsm-empty-icon { font-size: 3rem; margin-bottom: 0.75rem; }
  .lsm-empty h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    color: var(--ink);
    margin: 0 0 0.4rem;
  }
  .lsm-empty p { font-size: 13px; color: var(--muted); margin: 0; }

  /* ─── LOADING ─── */
  .lsm-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 2.5rem;
    color: var(--muted);
    font-size: 14px;
  }
  .lsm-spinner {
    width: 20px; height: 20px;
    border: 2px solid var(--border);
    border-top-color: var(--rose);
    border-radius: 50%;
    animation: lsm-spin 0.7s linear infinite;
  }
  @keyframes lsm-spin { to { transform: rotate(360deg); } }

  /* ─── SAVING INDICATOR ─── */
  .lsm-saving-dot {
    display: inline-block;
    width: 8px; height: 8px;
    background: #fff;
    border-radius: 50%;
    animation: lsm-pulse 1s ease-in-out infinite;
  }
  @keyframes lsm-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.7); }
  }

  /* ─── RESPONSIVE ADJUSTMENTS ─── */
  .lsm-max { max-width: 780px; margin: 0 auto; }

  @media (max-width: 480px) {
    .lsm-root { padding: 1.25rem 1rem 3rem; }
    .lsm-story-card { gap: 0.75rem; padding: 1rem 0.9rem; }
    .lsm-form-card { padding: 1.25rem; }
    .lsm-btn-submit, .lsm-btn-cancel { width: 100%; justify-content: center; }
    .lsm-btn-row { flex-direction: column; }
  }
`;

const LoveStoryManager = () => {
  const dispatch = useDispatch();
  const { stories, isLoading, isError, message } = useSelector((state) => state.story);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    image: '',
    order: 1
  });

  useEffect(() => {
    dispatch(fetchStories());
    return () => { dispatch(resetState()); };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      alert(`Error: ${message}`);
      dispatch(resetState());
    }
  }, [isError, message, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(updateStory({ id: editId, storyData: formData })).unwrap();
        alert('Cerita berhasil diperbarui!');
      } else {
        await dispatch(addStory(formData)).unwrap();
        alert('Cerita baru berhasil ditambahkan!');
      }
      setFormData({ title: '', date: '', description: '', image: '', order: stories.length + 2 });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (story) => {
    setIsEditing(true);
    setEditId(story._id);
    setFormData({
      title: story.title,
      date: story.date,
      description: story.description,
      image: story.image || '',
      order: story.order
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus cerita ini?')) {
      await dispatch(deleteStory(id));
    }
  };

  return (
    <>
      <style>{styles}</style>
      <AdminLayout title="Love Story">
        <div className="lsm-root">
          <div className="lsm-max">

            {/* ─── HEADER ─── */}
            <div className="lsm-header">
              <div className="lsm-header-eyebrow">✦ Admin Panel</div>
              <h1>Manajemen Love Story</h1>
              <p>Rangkai perjalanan kisah cinta kalian satu momen dalam satu waktu</p>
            </div>

            {/* ─── FORM CARD ─── */}
            <div className="lsm-form-card">
              <div className="lsm-form-title">
                <span>{isEditing ? '✏️' : '✦'}</span>
                {isEditing ? 'Edit Momen Cerita' : 'Tambah Momen Baru'}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="lsm-form-grid">

                  <div className="lsm-form-group">
                    <label className="lsm-form-label">Judul Momen</label>
                    <input
                      type="text"
                      name="title"
                      className="lsm-form-input"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Contoh: Pertama Bertemu"
                      required
                    />
                  </div>

                  <div className="lsm-form-group">
                    <label className="lsm-form-label">Tanggal</label>
                    <input
                      type="text"
                      name="date"
                      className="lsm-form-input"
                      value={formData.date}
                      onChange={handleChange}
                      placeholder="Contoh: Januari 2020"
                      required
                    />
                  </div>

                  <div className="lsm-form-group full">
                    <label className="lsm-form-label">Deskripsi Cerita</label>
                    <textarea
                      name="description"
                      className="lsm-form-textarea"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Ceritakan momen indah ini dengan penuh perasaan…"
                      required
                    />
                  </div>

                  <div className="lsm-form-group">
                    <label className="lsm-form-label">URL Foto (Opsional)</label>
                    <input
                      type="text"
                      name="image"
                      className="lsm-form-input"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="lsm-form-group">
                    <label className="lsm-form-label">Urutan Tampil</label>
                    <input
                      type="number"
                      name="order"
                      className="lsm-form-input"
                      value={formData.order}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="lsm-btn-row">
                  <button type="submit" className="lsm-btn-submit" disabled={isLoading}>
                    {isLoading
                      ? <><span className="lsm-saving-dot" /> Menyimpan…</>
                      : isEditing
                        ? '💾 Simpan Perubahan'
                        : '✦ Tambahkan Cerita'
                    }
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      className="lsm-btn-cancel"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({ title: '', date: '', description: '', image: '', order: 1 });
                      }}
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* ─── SECTION HEADER ─── */}
            <div className="lsm-section-header">
              <h2 className="lsm-section-title">
                💌 Timeline Tersimpan
              </h2>
              <span className="lsm-count-badge">{stories?.length || 0} momen</span>
            </div>

            {/* ─── TIMELINE LIST ─── */}
            {isLoading && stories.length === 0 ? (
              <div className="lsm-loading">
                <span className="lsm-spinner" />
                Sedang memuat cerita…
              </div>
            ) : stories.length === 0 ? (
              <div className="lsm-empty">
                <div className="lsm-empty-icon">💌</div>
                <h3>Belum ada cerita</h3>
                <p>Mulai rangkai kisah cinta kalian dengan menambahkan momen pertama di atas.</p>
              </div>
            ) : (
              <div className="lsm-timeline">
                {stories.map((story) => (
                  <div className="lsm-story-card" key={story._id}>

                    {/* Order Bubble */}
                    <div className="lsm-story-order-wrap">
                      <div className="lsm-story-order">{story.order}</div>
                    </div>

                    {/* Content */}
                    <div className="lsm-story-body">
                      <div className="lsm-story-meta">
                        <h3 className="lsm-story-title">{story.title}</h3>
                      </div>
                      <div className="lsm-story-date">
                        <span>♡</span> {story.date}
                      </div>
                      <p className="lsm-story-desc">{story.description}</p>
                    </div>

                    {/* Image */}
                    {story.image && (
                      <img
                        src={story.image.startsWith('http') ? story.image : `${BACKEND_URL}/${story.image}`}
                        alt={story.title}
                        className="lsm-story-img"
                      />
                    )}

                    {/* Actions */}
                    <div className="lsm-story-actions">
                      <button
                        className="lsm-btn-icon edit"
                        onClick={() => handleEdit(story)}
                        title="Edit cerita"
                      >✏️</button>
                      <button
                        className="lsm-btn-icon delete"
                        onClick={() => handleDelete(story._id)}
                        title="Hapus cerita"
                      >🗑️</button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default LoveStoryManager;