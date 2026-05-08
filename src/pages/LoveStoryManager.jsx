import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories, addStory, updateStory, deleteStory, resetState } from '../redux/slices/storySlice'; // Sesuaikan path-nya jika berbeda
import AdminLayout from '../components/adminLayout';

const BACKEND_URL = 'https://undangannikaharirini.onrender.com';

const styles = `
  .story-page { padding: 1.5rem; font-family: system-ui, -apple-system, sans-serif; color: #1e293b; background: #f8fafc; min-height: 100vh; }
  .page-title { font-size: 1.6rem; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
  .page-sub { font-size: 0.9rem; color: #64748b; margin-bottom: 1.5rem; }

  .form-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group.full { grid-column: 1 / -1; }
  
  .form-label { font-size: 13px; font-weight: 600; color: #475569; }
  .form-input, .form-textarea { padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; outline: none; transition: border-color 0.15s; font-family: inherit; }
  .form-input:focus, .form-textarea:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
  .form-textarea { min-height: 100px; resize: vertical; }
  
  .btn-submit { margin-top: 1rem; padding: 10px 20px; border-radius: 6px; border: none; background: #2563eb; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
  .btn-submit:hover { background: #1d4ed8; }
  .btn-submit:disabled { background: #94a3b8; cursor: not-allowed; }
  .btn-cancel { margin-top: 1rem; margin-left: 8px; padding: 10px 20px; border-radius: 6px; border: 1px solid #cbd5e1; background: #fff; color: #475569; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
  .btn-cancel:hover { background: #f1f5f9; }

  .timeline-list { display: flex; flex-direction: column; gap: 1rem; }
  .story-card { display: flex; gap: 1rem; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.2rem; align-items: flex-start; }
  .story-order { background: #eff6ff; color: #2563eb; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0; }
  .story-content { flex: 1; }
  .story-title { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
  .story-date { font-size: 12px; color: #64748b; margin-bottom: 8px; font-weight: 500; }
  .story-desc { font-size: 13px; color: #475569; line-height: 1.5; white-space: pre-wrap; }
  .story-img-preview { width: 80px; height: 80px; border-radius: 8px; object-fit: cover; border: 1px solid #e2e8f0; }
  
  .story-actions { display: flex; gap: 8px; }
  .btn-action { background: none; border: none; font-size: 16px; cursor: pointer; opacity: 0.6; transition: opacity 0.2s; }
  .btn-action:hover { opacity: 1; }
`;

const LoveStoryManager = () => {
  const dispatch = useDispatch();
  
  // Ambil state dari Redux Store
  const { stories, isLoading, isError, message } = useSelector((state) => state.story);

  // State lokal untuk mengatur nilai form
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    image: '',
    order: 1
  });

  // Ambil data saat komponen pertama kali dirender
  useEffect(() => {
    dispatch(fetchStories());
    
    // Cleanup ketika komponen unmount
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  // Pantau jika ada error dari Redux
  useEffect(() => {
    if (isError) {
      alert(`Error: ${message}`);
      dispatch(resetState());
    }
  }, [isError, message, dispatch]);

  // Update nilai form lokal saat mengetik
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form untuk Tambah atau Update data
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        // Panggil thunk Update
        await dispatch(updateStory({ id: editId, storyData: formData })).unwrap();
        alert('Cerita berhasil diperbarui!');
      } else {
        // Panggil thunk Add
        await dispatch(addStory(formData)).unwrap();
        alert('Cerita baru berhasil ditambahkan!');
      }
      
      // Reset form ke kondisi awal
      setFormData({ 
        title: '', 
        date: '', 
        description: '', 
        image: '', 
        order: stories.length + 2 
      });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      // Error akan ditangkap otomatis oleh alert isError di atas, 
      // tapi blok try-catch dengan .unwrap() memastikan eksekusi bawahnya tidak jalan jika gagal
      console.error(error);
    }
  };

  // Siapkan form dengan data cerita yang ingin diedit
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
    // Gulir kembali ke form paling atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hapus data cerita
  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus cerita ini?')) {
      await dispatch(deleteStory(id));
    }
  };

  return (
    <>
      <style>{styles}</style>
      <AdminLayout title="Love Story">
        <div className="max-w-4xl mx-auto pb-10 story-page">
          <h1 className="page-title">Manajemen Love Story</h1>
          <p className="page-sub">Buat dan atur urutan perjalanan kisah cinta Anda berdua.</p>

          {/* Kartu Form Input */}
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Judul Momen (Contoh: Pertama Bertemu)</label>
                  <input 
                    type="text" 
                    name="title" 
                    className="form-input" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tanggal (Contoh: Januari 2020)</label>
                  <input 
                    type="text" 
                    name="date" 
                    className="form-input" 
                    value={formData.date} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="form-group full">
                  <label className="form-label">Deskripsi Cerita</label>
                  <textarea 
                    name="description" 
                    className="form-textarea" 
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">URL Foto (Opsional, ambil dari Galeri)</label>
                  <input 
                    type="text" 
                    name="image" 
                    className="form-input" 
                    value={formData.image} 
                    onChange={handleChange} 
                    placeholder="https://..." 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Urutan Tampil (Angka)</label>
                  <input 
                    type="number" 
                    name="order" 
                    className="form-input" 
                    value={formData.order} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambahkan Cerita')}
              </button>
              
              {isEditing && (
                <button 
                  type="button" 
                  className="btn-cancel" 
                  onClick={() => { 
                    setIsEditing(false); 
                    setFormData({ title: '', date: '', description: '', image: '', order: 1 }); 
                  }}
                >
                  Batal
                </button>
              )}
            </form>
          </div>

          {/* List Preview / Timeline Tersimpan */}
          <h2 className="page-title" style={{ fontSize: '1.2rem', marginTop: '2rem' }}>
            Timeline Tersimpan ({stories?.length || 0})
          </h2>
          
          {isLoading && stories.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: '20px', color: '#64748b' }}>
              ⏳ Sedang memuat data...
            </p>
          ) : (
            <div className="timeline-list">
              {stories.map((story) => (
                <div className="story-card" key={story._id}>
                  <div className="story-order">{story.order}</div>
                  
                  <div className="story-content">
                    <h3 className="story-title">{story.title}</h3>
                    <div className="story-date">📅 {story.date}</div>
                    <p className="story-desc">{story.description}</p>
                  </div>
                  
                  {story.image && (
                    <img 
                      src={story.image.startsWith('http') ? story.image : `${BACKEND_URL}/${story.image}`} 
                      alt="Story preview" 
                      className="story-img-preview" 
                    />
                  )}
                  
                  <div className="story-actions">
                    <button className="btn-action" onClick={() => handleEdit(story)} title="Edit">✏️</button>
                    <button className="btn-action" onClick={() => handleDelete(story._id)} title="Hapus">🗑️</button>
                  </div>
                </div>
              ))}
              
              {stories.length === 0 && !isLoading && (
                <div style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
                  Belum ada cerita yang ditambahkan.
                </div>
              )}
            </div>
          )}

        </div>
      </AdminLayout>
    </>
  );
};

export default LoveStoryManager;