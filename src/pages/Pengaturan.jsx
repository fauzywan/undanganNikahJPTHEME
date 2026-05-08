import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfig, updateConfig } from '../redux/slices/configSlice';
import AdminLayout from '../components/adminLayout';

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600&display=swap');

  .pg-wrap { max-width: 760px; }

  /* Cards */
  .pg-card {
    background: #FFFFFF;
    border: 1px solid #EDE8E0;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(28,25,23,0.04);
    transition: box-shadow 0.2s;
  }
  .pg-card:hover { box-shadow: 0 4px 20px rgba(28,25,23,0.07); }

  .pg-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px 16px;
    border-bottom: 1px solid #F5F1EB;
  }

  .pg-card-title-wrap { display: flex; align-items: center; gap: 12px; }

  .pg-card-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .pg-card-title {
    font-family: 'Fraunces', serif;
    font-size: 16px;
    font-weight: 600;
    color: #1C1917;
  }

  .pg-card-body { padding: 24px; }

  /* Grid */
  .pg-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
  .pg-grid-full { grid-column: 1 / -1; }

  /* Form elements */
  .pg-field { display: flex; flex-direction: column; gap: 6px; }
  .pg-label {
    font-size: 11.5px;
    font-weight: 600;
    color: #A8A29E;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }
  .pg-input {
    width: 100%;
    border: 1px solid #DDD8D0;
    border-radius: 10px;
    background: #FAFAF8;
    padding: 10px 14px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: #1C1917;
    outline: none;
    transition: all 0.15s;
  }
  .pg-input:focus { background: #FFFFFF; border-color: #C2432A; box-shadow: 0 0 0 3px #FEE8E4; }
  .pg-input::placeholder { color: #C4BDB5; }

  .pg-textarea {
    width: 100%;
    border: 1px solid #DDD8D0;
    border-radius: 10px;
    background: #FAFAF8;
    padding: 10px 14px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: #1C1917;
    outline: none;
    resize: vertical;
    transition: all 0.15s;
  }
  .pg-textarea:focus { background: #FFFFFF; border-color: #C2432A; box-shadow: 0 0 0 3px #FEE8E4; }

  /* Dynamic row items */
  .pg-row-item {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #FAFAF8;
    border: 1px solid #EDE8E0;
    border-radius: 12px;
    padding: 14px 16px;
  }

  .pg-row-item-grid { flex: 1; display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }

  .pg-add-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px;
    border-radius: 8px;
    border: 1.5px dashed #D6D0C8;
    background: transparent;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12.5px;
    font-weight: 600;
    color: #78716C;
    cursor: pointer;
    transition: all 0.15s;
  }
  .pg-add-btn:hover { border-color: #C2432A; color: #C2432A; background: #FFF8F6; }

  .pg-del-btn {
    width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    border: none; border-radius: 8px; background: transparent;
    color: #C4BDB5; cursor: pointer; flex-shrink: 0;
    transition: all 0.15s;
  }
  .pg-del-btn:hover { background: #FEE2E2; color: #DC2626; }

  .pg-space-y { display: flex; flex-direction: column; gap: 10px; }

  /* Save button area */
  .pg-save-bar {
    background: #FFFFFF;
    border: 1px solid #EDE8E0;
    border-radius: 16px;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 8px;
  }

  .pg-save-hint {
    font-size: 13px;
    color: #A8A29E;
  }

  .pg-save-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 28px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #D97B6C, #C2432A);
    color: #FFFFFF;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(194,67,42,0.3);
    white-space: nowrap;
  }
  .pg-save-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(194,67,42,0.35); }
  .pg-save-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; box-shadow: none; }

  .pg-loading {
    padding: 80px;
    text-align: center;
    color: #A8A29E;
    font-size: 14px;
  }

  @media (max-width: 600px) {
    .pg-grid { grid-template-columns: 1fr; }
    .pg-row-item-grid { grid-template-columns: 1fr; }
    .pg-card-body { padding: 16px; }
    .pg-save-bar { flex-direction: column; align-items: stretch; }
    .pg-save-btn { justify-content: center; }
  }
`;

const FieldInput = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div className="pg-field">
    <label className="pg-label">{label}</label>
    <input className="pg-input" type={type} value={value || ''} onChange={onChange} placeholder={placeholder} />
  </div>
);

const SectionCard = ({ icon, iconBg, title, children, action }) => (
  <div className="pg-card">
    <div className="pg-card-header">
      <div className="pg-card-title-wrap">
        <div className="pg-card-icon" style={{ background: iconBg }}>{icon}</div>
        <div className="pg-card-title">{title}</div>
      </div>
      {action}
    </div>
    <div className="pg-card-body">{children}</div>
  </div>
);

const formatDateTimeLocal = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d - tz).toISOString().slice(0, 16);
};

const formatDateOnly = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d - tz).toISOString().split('T')[0];
};

const Pengaturan = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isUpdating } = useSelector((state) => state.config);

  const [formData, setFormData] = useState({
    bride: { name: '', father: '', mother: '', address: '' },
    groom: { name: '', father: '', mother: '', address: '' },
    events: [{ name: '', date: '', time: '', location: '' }],
    otherFamily: [{ name: '' }],
    // UPDATE: State awal disesuaikan dengan skema maps
    maps: { href:'',iframe: '', address: '', venue: '' }, 
    eventDate: '',
    bankAccounts: [{ bank: '', account: '', name: '' }],
  });

  useEffect(() => { dispatch(fetchConfig()); }, [dispatch]);

  useEffect(() => {
    const actualData = data?.config ? data.config : data;

    if (actualData && Object.keys(actualData).length > 0) {
      setFormData({
        bride: actualData.bride || { name: '', father: '', mother: '', address: '', instagram: '' },
        groom: actualData.groom || { name: '', father: '', mother: '', address: '', instagram: '' },
        otherFamily: actualData.otherFamily?.length ? actualData.otherFamily : [{ name: '' }],
        
        // UPDATE: Penarikan data menyesuaikan object maps
        maps: actualData.maps || { href:'',iframe: '', address: '', venue: '' },
        
        eventDate: formatDateTimeLocal(actualData.eventDate),
        events: actualData.events?.length 
          ? actualData.events.map(ev => ({
              ...ev,
              date: formatDateOnly(ev.date)
            })) 
          : [{ name: '', date: '', time: '', location: '' }],
          
        bankAccounts: actualData.bankAccounts?.length ? actualData.bankAccounts : [{ bank: '', account: '', name: '' }],
      });
    }
  }, [data]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  // Fungsi nested ini bisa digunakan untuk maps juga karena strukturnya mirip bride/groom (object 1 level)
  const nested = (key, field) => (e) => setFormData({ ...formData, [key]: { ...formData[key], [field]: e.target.value } });

  const listChange = (key, index, field) => (e) => {
    const arr = [...formData[key]];
    arr[index] = { ...arr[index], [field]: e.target.value };
    setFormData({ ...formData, [key]: arr });
  };
  
  const listAdd = (key, template) => () => setFormData({ ...formData, [key]: [...formData[key], template] });
  const listRemove = (key, index) => () => setFormData({ ...formData, [key]: formData[key].filter((_, i) => i !== index) });

  const handleSave = () => {
    dispatch(updateConfig(formData));
    alert('Data berhasil disimpan!');
  };

  return (
    <AdminLayout title="Data Mempelai">
      <style>{S}</style>
      <div className="pg-wrap">

        {isLoading ? (
          <div className="pg-loading">Memuat data...</div>
        ) : (
          <>
            {/* Mempelai Wanita */}
            <SectionCard
              iconBg="#FFF0EB"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C2432A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
              title="Mempelai Wanita"
            >
              <div className="pg-grid">
                <div className="pg-grid-full">
                  <FieldInput label="Nama Lengkap" value={formData.bride.name} onChange={nested('bride', 'name')} placeholder="Nama lengkap mempelai wanita" />
                </div>
                <FieldInput label="Nama Bapak" value={formData.bride.father} onChange={nested('bride', 'father')} placeholder="Nama ayah" />
                <FieldInput label="Nama Ibu" value={formData.bride.mother} onChange={nested('bride', 'mother')} placeholder="Nama ibu" />
                <FieldInput label="Instagram" value={formData.bride.instagram} onChange={nested('bride', 'instagram')} placeholder="Instagram" />
                <div className="pg-grid-full pg-field">
                  <label className="pg-label">Alamat Domisili</label>
                  <textarea className="pg-textarea" rows="2" value={formData.bride.address} onChange={nested('bride', 'address')} placeholder="Alamat tempat tinggal" />
                </div>
              </div>
            </SectionCard>

            {/* Mempelai Pria */}
            <SectionCard
              iconBg="#EFF6FF"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              title="Mempelai Pria"
            >
              <div className="pg-grid">
                <div className="pg-grid-full">
                  <FieldInput label="Nama Lengkap" value={formData.groom.name} onChange={nested('groom', 'name')} placeholder="Nama lengkap mempelai pria" />
                </div>
                <FieldInput label="Nama Bapak" value={formData.groom.father} onChange={nested('groom', 'father')} placeholder="Nama ayah" />
                <FieldInput label="Nama Ibu" value={formData.groom.mother} onChange={nested('groom', 'mother')} placeholder="Nama ibu" />
                <FieldInput label="Instagram" value={formData.groom.instagram} onChange={nested('groom', 'instagram')} placeholder="Instagram" />
                <div className="pg-grid-full pg-field">
                  <label className="pg-label">Alamat Domisili</label>
                  <textarea className="pg-textarea" rows="2" value={formData.groom.address} onChange={nested('groom', 'address')} placeholder="Alamat tempat tinggal" />
                </div>
              </div>
            </SectionCard>

            {/* Turut Mengundang */}
            <SectionCard
              iconBg="#F0FDF4"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              title="Keluarga Besar (Turut Mengundang)"
              action={
                <button className="pg-add-btn" onClick={listAdd('otherFamily', { name: '' })}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                  Tambah
                </button>
              }
            >
              <div className="pg-space-y">
                {formData.otherFamily.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <input className="pg-input" style={{ flex: 1 }} type="text" value={f.name} onChange={listChange('otherFamily', i, 'name')} placeholder="Contoh: Keluarga Besar Bapak Ahmad" />
                    <button className="pg-del-btn" onClick={listRemove('otherFamily', i)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Jadwal & Lokasi */}
            <SectionCard
              iconBg="#FEF9EE"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
              title="Jadwal & Lokasi Acara Utama"
            >
              <div className="pg-grid">
                <div className="pg-grid-full pg-field">
                  <label className="pg-label">Tanggal & Waktu Countdown</label>
                  <input className="pg-input" type="datetime-local" name="eventDate" value={formData.eventDate} onChange={handleChange} />
                </div>
                
                {/* UPDATE: Area form baru untuk object `maps` */}
                <div className="pg-grid-full">
                  <FieldInput label="Nama Tempat / Gedung (Venue)" value={formData.maps.venue} onChange={nested('maps', 'venue')} placeholder="Contoh: Gedung Serbaguna XYZ" />
                </div>
                
                <div className="pg-grid-full pg-field">
                  <label className="pg-label">Alamat Lengkap</label>
                  <textarea className="pg-textarea" rows="2" value={formData.maps.address} onChange={nested('maps', 'address')} placeholder="Contoh: Jl. Sudirman No. 123, Kota Bandung" />
                </div>

                <div className="pg-grid-full">
                  <FieldInput label="Iframe Maps" value={formData.maps.iframe} onChange={nested('maps', 'iframe')} placeholder="iframe" />
                </div>
                <div className="pg-grid-full">
                  <FieldInput label="Link Google Maps" value={formData.maps.href} onChange={nested('maps', 'href')} placeholder="https://goo.gl/maps/..." />
                </div>
              </div>
            </SectionCard>

            {/* Rekening Hadiah */}
            <SectionCard
              iconBg="#F5F3FF"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
              title="Rekening Hadiah"
              action={
                <button className="pg-add-btn" onClick={listAdd('bankAccounts', { bank: '', account: '', name: '' })}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                  Tambah
                </button>
              }
            >
              <div className="pg-space-y">
                {formData.bankAccounts.map((bank, i) => (
                  <div key={i} className="pg-row-item">
                    <div className="pg-row-item-grid">
                      <div className="pg-field">
                        <label className="pg-label">Bank</label>
                        <input className="pg-input" type="text" value={bank.bank} onChange={listChange('bankAccounts', i, 'bank')} placeholder="BCA, BNI..." />
                      </div>
                      <div className="pg-field">
                        <label className="pg-label">No. Rekening</label>
                        <input className="pg-input" type="text" value={bank.account} onChange={listChange('bankAccounts', i, 'account')} placeholder="0000-0000-0000" />
                      </div>
                      <div className="pg-field">
                        <label className="pg-label">Atas Nama</label>
                        <input className="pg-input" type="text" value={bank.name} onChange={listChange('bankAccounts', i, 'name')} placeholder="Nama pemilik" />
                      </div>
                    </div>
                    {formData.bankAccounts.length > 1 && (
                      <button className="pg-del-btn" onClick={listRemove('bankAccounts', i)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Daftar Kegiatan */}
            <SectionCard
              iconBg="#F0FDF4"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>}
              title="Daftar Kegiatan (Akad, Resepsi, dll)"
              action={
                <button className="pg-add-btn" onClick={listAdd('events', { name: '', date: '', time: '', location: '' })}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                  Tambah
                </button>
              }
            >
              <div className="pg-space-y">
                {formData.events.map((event, i) => (
                  <div key={i} className="pg-row-item">
                    <div className="pg-row-item-grid">
                      <div className="pg-field">
                        <label className="pg-label">Nama Acara</label>
                        <input className="pg-input" type="text" value={event.name} onChange={listChange('events', i, 'name')} placeholder="Akad Nikah" />
                      </div>
                      <div className="pg-field">
                        <label className="pg-label">Tanggal</label>
                        <input className="pg-input" type="date" value={event.date} onChange={listChange('events', i, 'date')} />
                      </div>
                      <div className="pg-field">
                        <label className="pg-label">Waktu</label>
                        <input className="pg-input" type="time" value={event.time} onChange={listChange('events', i, 'time')} />
                      </div>
                      <div className="pg-field">
                        <label className="pg-label">Lokasi</label>
                        <input className="pg-input" type="text" value={event.location} onChange={listChange('events', i, 'location')} placeholder="Nama gedung" />
                      </div>
                    </div>
                    {formData.events.length > 1 && (
                      <button className="pg-del-btn" onClick={listRemove('events', i)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Save bar */}
            <div className="pg-save-bar">
              <div className="pg-save-hint">Semua perubahan akan diterapkan ke undangan secara langsung.</div>
              <button className="pg-save-btn" onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? (
                  'Menyimpan...'
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                    Simpan Semua Pengaturan
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Pengaturan;