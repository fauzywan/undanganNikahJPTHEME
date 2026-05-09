import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGuests, addGuest, deleteGuest } from '../redux/slices/guestSlice';
import AdminLayout from '../components/adminLayout';

const DEFAULT_TEMPLATE = `Bismillahirrohmanirrohim.

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i *[NAMA_TAMU]* untuk hadir di acara pernikahan kami.

Detail acara dan konfirmasi kehadiran dapat diakses melalui tautan berikut:
[LINK_UNDANGAN]

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.

Terima kasih.`;

/* ── Shared token styles ─────────────────────────────────── */
const S = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600&display=swap');

  .d-stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 28px;
  }
  .d-stat-card {
    background: #FFFFFF;
    border: 1px solid #EDE8E0;
    border-radius: 16px;
    padding: 20px 18px;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .d-stat-card:hover { box-shadow: 0 4px 20px rgba(28,25,23,0.07); transform: translateY(-1px); }
  .d-stat-accent {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 16px 16px 0 0;
  }
  .d-stat-label {
    font-size: 11.5px;
    font-weight: 500;
    color: #A8A29E;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .d-stat-value {
    font-family: 'Fraunces', serif;
    font-size: 32px;
    font-weight: 600;
    line-height: 1;
    color: #1C1917;
  }
  .d-stat-value.green { color: #16A34A; }
  .d-stat-value.red   { color: #DC2626; }
  .d-stat-value.amber { color: #D97706; }

  /* Section header */
  .d-section-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 16px;
  }
  .d-section-title {
    font-family: 'Fraunces', serif;
    font-size: 17px;
    font-weight: 600;
    color: #1C1917;
  }
  .d-btn-row { display: flex; gap: 8px; flex-wrap: wrap; }

  /* Buttons */
  .d-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px;
    border-radius: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    border: 1px solid transparent;
    text-decoration: none;
    white-space: nowrap;
  }
  .d-btn-primary {
    background: #1C1917;
    color: #FFFFFF;
    border-color: #1C1917;
  }
  .d-btn-primary:hover { background: #292524; }
  .d-btn-outline {
    background: #FFFFFF;
    color: #44403C;
    border-color: #E8E4DC;
  }
  .d-btn-outline:hover { background: #F5F1EB; }
  .d-btn-wa {
    background: #DCFCE7;
    color: #15803D;
    border-color: #BBF7D0;
  }
  .d-btn-wa:hover { background: #BBF7D0; }
  .d-btn-danger {
    background: transparent;
    color: #A8A29E;
    border: none;
    padding: 6px;
    border-radius: 8px;
  }
  .d-btn-danger:hover { background: #FEF2F2; color: #DC2626; }

  /* Template editor panel */
  .d-panel {
    border-radius: 16px;
    padding: 22px;
    margin-bottom: 18px;
    border: 1px solid;
    animation: slideDown 0.2s ease;
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .d-panel-wa  { background: #F0FDF4; border-color: #BBF7D0; }
  .d-panel-add { background: #FFF8F6; border-color: #FCDDD6; }

  .d-panel-title {
    font-family: 'Fraunces', serif;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .d-panel-hint { font-size: 12.5px; color: #78716C; margin-bottom: 14px; line-height: 1.6; }
  .d-panel-hint code { background: rgba(0,0,0,0.06); padding: 1px 6px; border-radius: 5px; font-size: 12px; font-family: monospace; }

  .d-textarea {
    width: 100%;
    border-radius: 10px;
    border: 1px solid #D6D0C8;
    background: #FFFFFF;
    padding: 12px 14px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    line-height: 1.6;
    color: #1C1917;
    resize: vertical;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .d-textarea:focus { border-color: #C2432A; box-shadow: 0 0 0 3px #FEE8E4; }

  .d-input {
    width: 100%;
    border-radius: 10px;
    border: 1px solid #D6D0C8;
    background: #FFFFFF;
    padding: 10px 14px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: #1C1917;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .d-input:focus { border-color: #C2432A; box-shadow: 0 0 0 3px #FEE8E4; }
  .d-input::placeholder { color: #A8A29E; }

  /* Table */
  .d-table-wrap {
    background: #FFFFFF;
    border-radius: 16px;
    border: 1px solid #EDE8E0;
    overflow: hidden;
  }
  .d-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 700px;
  }
  .d-table th {
    background: #FAFAF8;
    border-bottom: 1px solid #EDE8E0;
    padding: 12px 16px;
    font-size: 11px;
    font-weight: 600;
    color: #A8A29E;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    text-align: left;
  }
  .d-table td {
    padding: 14px 16px;
    border-bottom: 1px solid #F5F1EB;
    font-size: 13.5px;
    color: #44403C;
    vertical-align: middle;
  }
  .d-table tr:last-child td { border-bottom: none; }
  .d-table tr:hover td { background: #FAFAF8; }

  .d-guest-name {
    font-weight: 600;
    color: #1C1917;
    font-size: 14px;
  }

  /* Badges */
  .d-badge {
    display: inline-flex; align-items: center;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11.5px;
    font-weight: 600;
    white-space: nowrap;
  }
  .d-badge-green  { background: #DCFCE7; color: #15803D; }
  .d-badge-red    { background: #FEE2E2; color: #DC2626; }
  .d-badge-amber  { background: #FEF3C7; color: #D97706; }

  .d-link-btn {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 4px 0;
    border-radius: 6px;
    transition: opacity 0.15s;
    text-decoration: none;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .d-link-btn:hover { opacity: 0.7; }
  .d-link-purple { color: #7C3AED; }
  .d-link-green  { color: #16A34A; }

  .d-empty {
    padding: 56px;
    text-align: center;
    color: #A8A29E;
    font-size: 14px;
  }
  .d-empty-icon { font-size: 36px; display: block; margin-bottom: 10px; }

  /* Modal */
  .d-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(28,25,23,0.45);
    backdrop-filter: blur(4px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .d-modal {
    background: #FFFFFF;
    border-radius: 20px;
    width: 100%;
    max-width: 520px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(28,25,23,0.18);
    animation: modalUp 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes modalUp {
    from { opacity: 0; transform: scale(0.94) translateY(12px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  .d-modal-header {
    background: #15803D;
    padding: 18px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #FFFFFF;
  }
  .d-modal-header-title {
    font-family: 'Fraunces', serif;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .d-modal-close {
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.8);
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    transition: color 0.15s;
    display: flex;
  }
  .d-modal-close:hover { color: #FFFFFF; }
  .d-modal-body { padding: 22px; }
  .d-modal-label { font-size: 12.5px; font-weight: 600; color: #78716C; margin-bottom: 8px; letter-spacing: 0.04em; text-transform: uppercase; }
  .d-modal-footer {
    background: #FAFAF8;
    padding: 16px 22px;
    border-top: 1px solid #EDE8E0;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  .d-panel-footer { display: flex; justify-content: flex-end; align-items: center; gap: 12px; margin-top: 12px; }
  .d-reset-link { font-size: 12.5px; color: #A8A29E; background: none; border: none; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; text-decoration: underline; }
  .d-reset-link:hover { color: #78716C; }

  .d-form-row { display: flex; gap: 10px; align-items: flex-end; }
  .d-form-label { font-size: 12.5px; font-weight: 600; color: #78716C; margin-bottom: 6px; letter-spacing: 0.04em; text-transform: uppercase; }

  @media (max-width: 900px) {
    .d-stat-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 500px) {
    .d-stat-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .d-stat-value { font-size: 26px; }
    .d-btn-row { gap: 6px; }
    .d-btn { padding: 8px 12px; font-size: 12px; }
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: guests, isLoading, isAdding } = useSelector((state) => state.guest);

  const [showForm, setShowForm] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestWA, setNewGuestWA] = useState('');
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [globalTemplate, setGlobalTemplate] = useState(DEFAULT_TEMPLATE);
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);
  const [waMessage, setWaMessage] = useState('');
  const [currentGuestWa, setCurrentGuestWa] = useState(null);

  useEffect(() => {
    dispatch(fetchGuests());
    const saved = localStorage.getItem('waTemplate');
    if (saved) setGlobalTemplate(saved);
  }, [dispatch]);

  const handleAddGuest = (e) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    dispatch(addGuest({ guestName: newGuestName,whatsappNumber:newGuestWA })).then((res) => {
      if (!res.error) { setNewGuestName(''); setShowForm(false); }
      else alert(res.payload);
    });
  };

  const handleSaveTemplate = () => {
    localStorage.setItem('waTemplate', globalTemplate);
    alert('Template WhatsApp berhasil disimpan!');
    setShowTemplateEditor(false);
  };

  const totalGuests = guests.length;
  const attending = guests.filter(g => g.isAttending === true).length;
  const notAttending = guests.filter(g => g.isAttending === false && g.message !== undefined).length;
  const pending = totalGuests - attending - notAttending;

  const copyLink = (slug) => {
    const url = `${window.location.origin}/?to=${slug}`;
    navigator.clipboard.writeText(url);
    alert('Link undangan disalin!\n' + url);
  };

  const openWaModal = (guest) => {
    const url = `${window.location.origin}/?to=${guest.slug}`;
    const msg = globalTemplate.replace(/\[NAMA_TAMU\]/g, guest.guestName).replace(/\[LINK_UNDANGAN\]/g, url);
    setWaMessage(msg);
    setCurrentGuestWa(guest);
    setIsWaModalOpen(true);
  };

  const handleSendWa = () => {
    if (!waMessage.trim()) { alert('Pesan tidak boleh kosong!'); return; }
    window.open(`https://wa.me/${currentGuestWa.whatsappNumber}?text=${encodeURIComponent(waMessage)}`, '_blank');
    setIsWaModalOpen(false);
  };

  return (
    <AdminLayout title="Daftar Tamu">
      <style>{S}</style>

      {/* WA Modal */}
      {isWaModalOpen && (
        <div className="d-modal-backdrop" onClick={(e) => e.target === e.currentTarget && setIsWaModalOpen(false)}>
          <div className="d-modal">
            <div className="d-modal-header">
              <div className="d-modal-header-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Preview Pesan WhatsApp
              </div>
              <button className="d-modal-close" onClick={() => setIsWaModalOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="d-modal-body">
              <div className="d-modal-label">Edit pesan (opsional)</div>
              <textarea className="d-textarea" rows="8" value={waMessage} onChange={(e) => setWaMessage(e.target.value)} />
            </div>
            <div className="d-modal-footer">
              <button className="d-btn d-btn-outline" onClick={() => setIsWaModalOpen(false)}>Batal</button>
              <button className="d-btn d-btn-wa" onClick={handleSendWa}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Kirim WA Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className="d-stat-grid">
        {[
          { label: 'Total Undangan', value: totalGuests, cls: '', accent: '#1C1917' },
          { label: 'Hadir',          value: attending,   cls: 'green', accent: '#16A34A' },
          { label: 'Tidak Hadir',    value: notAttending,cls: 'red',   accent: '#DC2626' },
          { label: 'Belum Respon',   value: pending,     cls: 'amber', accent: '#D97706' },
        ].map((s) => (
          <div className="d-stat-card" key={s.label}>
            <div className="d-stat-accent" style={{ background: s.accent }} />
            <div className="d-stat-label">{s.label}</div>
            <div className={`d-stat-value ${s.cls}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Section header */}
      <div className="d-section-bar">
        <div className="d-section-title">Daftar RSVP</div>
        <div className="d-btn-row">
          <button className="d-btn d-btn-outline" onClick={() => { setShowTemplateEditor(!showTemplateEditor); setShowForm(false); }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Template WA
          </button>
          <button className="d-btn d-btn-primary" onClick={() => { setShowForm(!showForm); setShowTemplateEditor(false); }}>
            {showForm ? (
              <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>Batal</>
            ) : (
              <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>Tambah Tamu</>
            )}
          </button>
        </div>
      </div>

      {/* Template editor */}
      {showTemplateEditor && (
        <div className="d-panel d-panel-wa">
          <div className="d-panel-title" style={{ color: '#15803D' }}>Template Master WhatsApp</div>
          <div className="d-panel-hint">
            Gunakan <code>[NAMA_TAMU]</code> untuk nama tamu dan <code>[LINK_UNDANGAN]</code> untuk link unik mereka.
          </div>
          <textarea className="d-textarea" rows="7" value={globalTemplate} onChange={(e) => setGlobalTemplate(e.target.value)} />
          <div className="d-panel-footer">
            <button className="d-reset-link" onClick={() => setGlobalTemplate(DEFAULT_TEMPLATE)}>Kembalikan ke default</button>
            <button className="d-btn d-btn-primary" style={{ background: '#16A34A', borderColor: '#16A34A' }} onClick={handleSaveTemplate}>Simpan Template</button>
          </div>
        </div>
      )}

      {/* Add guest form */}
      {showForm && (
        <div className="d-panel d-panel-add">
          <div className="d-panel-title" style={{ color: '#9A2D1A' }}>Tambah Tamu Baru</div>
          <form onSubmit={handleAddGuest} style={{ marginTop: 12 }}>
            <div className="d-form-label">Nama Tamu</div>
            <div className="d-form-row">
              <input className="d-input" style={{ flex: 1 }} type="text" autoFocus placeholder="Contoh: Keluarga Budi Santoso" value={newGuestName} onChange={(e) => setNewGuestName(e.target.value)} />
              <button type="submit" className="d-btn d-btn-primary" disabled={isAdding} style={{ flexShrink: 0 }}>
                {isAdding ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
            {/* Nomor WA */}
            <div className="d-form-label">Nomor WA</div>
            <div className="d-form-row">
              <input className="d-input" style={{ flex: 1 }} type="text" autoFocus placeholder="Contoh: 08123456789" value={newGuestWA} onChange={(e) => setNewGuestWA(e.target.value)} />
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="d-table-wrap">
        {isLoading ? (
          <div className="d-empty"><span className="d-empty-icon">⏳</span>Memuat data tamu...</div>
        ) : guests.length === 0 ? (
          <div className="d-empty"><span className="d-empty-icon">📋</span>Belum ada tamu yang ditambahkan.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="d-table">
              <thead>
                <tr>
                  <th>Nama Tamu</th>
                  <th>Link & Bagikan</th>
                  <th style={{ textAlign: 'center' }}>Status</th>
                  <th style={{ textAlign: 'center' }}>Orang</th>
                  <th>Pesan</th>
                  <th style={{ textAlign: 'center' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest._id}>
                    <td><div className="d-guest-name">{guest.guestName}</div></td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <button className="d-link-btn d-link-purple" onClick={() => copyLink(guest.slug)}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                          Copy Link
                        </button>
                        <button className="d-link-btn d-link-green" onClick={() => openWaModal(guest)}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          Kirim via WA
                        </button>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {guest.message
                        ? guest.isAttending
                          ? <span className="d-badge d-badge-green">Hadir</span>
                          : <span className="d-badge d-badge-red">Tidak Hadir</span>
                        : <span className="d-badge d-badge-amber">Pending</span>
                      }
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 600, color: '#1C1917' }}>{guest.headcount > 0 ? guest.headcount : '—'}</td>
                    <td style={{ fontStyle: 'italic', color: '#78716C', fontSize: 13, maxWidth: 200 }}>{guest.message || 'Belum ada pesan.'}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="d-btn d-btn-danger" title="Hapus Tamu" onClick={() => { if (window.confirm(`Yakin ingin menghapus tamu ${guest.guestName}?`)) dispatch(deleteGuest(guest._id)); }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard; 