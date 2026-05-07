import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfig, updateConfig } from '../redux/slices/configSlice';
import AdminLayout from '../components/adminLayout';
const Pengaturan = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isUpdating } = useSelector((state) => state.config);

  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    eventDate: '',
    bankAccounts: [{ bank: '', account: '', name: '' }] // Default 1 rekening kosong
  });

  useEffect(() => {
    dispatch(fetchConfig());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const formattedDate = data.eventDate ? new Date(data.eventDate).toISOString().slice(0, 16) : '';
      
      setFormData({
        brideName: data.brideName || '',
        groomName: data.groomName || '',
        eventDate: formattedDate,
        // Jika di database ada rekening, gunakan itu. Jika kosong, beri 1 form kosong.
        bankAccounts: data.bankAccounts && data.bankAccounts.length > 0 
          ? data.bankAccounts 
          : [{ bank: '', account: '', name: '' }]
      });
    }
  }, [data]);

  // Handle perubahan input biasa
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle perubahan khusus untuk input array Rekening
  const handleBankChange = (index, field, value) => {
    const newBankAccounts = [...formData.bankAccounts];
    newBankAccounts[index][field] = value;
    setFormData({ ...formData, bankAccounts: newBankAccounts });
  };

  // Fungsi Tambah Rekening Baru
  const addBankAccount = () => {
    setFormData({
      ...formData,
      bankAccounts: [...formData.bankAccounts, { bank: '', account: '', name: '' }]
    });
  };

  // Fungsi Hapus Rekening
  const removeBankAccount = (index) => {
    const newBankAccounts = formData.bankAccounts.filter((_, i) => i !== index);
    setFormData({ ...formData, bankAccounts: newBankAccounts });
  };

  const handleSaveConfig = () => {
    const payload = {
      brideName: formData.brideName,
      groomName: formData.groomName,
      eventDate: formData.eventDate,
      bankAccounts: formData.bankAccounts // Kirim seluruh array rekening
    };
    dispatch(updateConfig(payload));
    alert('Data acara berhasil disimpan!');
  };

  return (
    <AdminLayout title="Pengaturan">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* KARTU 1: DATA MEMPELAI & ACARA */}
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Data Mempelai & Acara</h3>
          
          {isLoading ? (
            <p className="text-gray-500">Memuat data...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Mempelai Wanita</label>
                  <input type="text" name="brideName" value={formData.brideName} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Mempelai Pria</label>
                  <input type="text" name="groomName" value={formData.groomName} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal & Waktu Acara</label>
                  <input type="datetime-local" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* KARTU 2: REKENING HADIAH DINAMIS */}
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Rekening Hadiah</h3>
            <button 
              onClick={addBankAccount}
              className="text-sm bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition"
            >
              + Tambah Rekening
            </button>
          </div>

          <div className="space-y-6">
            {formData.bankAccounts.map((bank, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Bank</label>
                  <input 
                    type="text" 
                    placeholder="BCA / Mandiri / DANA"
                    value={bank.bank} 
                    onChange={(e) => handleBankChange(index, 'bank', e.target.value)} 
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200" 
                  />
                </div>
                <div className="md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">No. Rekening</label>
                  <input 
                    type="text" 
                    value={bank.account} 
                    onChange={(e) => handleBankChange(index, 'account', e.target.value)} 
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200" 
                  />
                </div>
                <div className="md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Atas Nama (A/N)</label>
                  <input 
                    type="text" 
                    value={bank.name} 
                    onChange={(e) => handleBankChange(index, 'name', e.target.value)} 
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200" 
                  />
                </div>
                <div className="md:col-span-1 flex justify-center pb-1">
                  {formData.bankAccounts.length > 1 && (
                    <button 
                      onClick={() => removeBankAccount(index)}
                      className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition"
                      title="Hapus Rekening"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleSaveConfig}
              disabled={isUpdating}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition shadow-sm"
            >
              {isUpdating ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}
            </button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default Pengaturan;