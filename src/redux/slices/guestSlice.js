import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. Ambil Semua Tamu
export const fetchGuests = createAsyncThunk(
  'guest/fetchGuests',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const guests = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('https://undangannikaharirini.onrender.com/api/admin/guests', guests);
      return response.data.guests;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal mengambil data tamu');
    }
  }
);

// 2. Tambah Tamu Baru
export const addGuest = createAsyncThunk(
  'guest/addGuest',
  async (guestData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post('https://undangannikaharirini.onrender.com/api/admin/guests', guestData, config);
      return response.data.guest; // Mengembalikan data tamu yang baru dibuat
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menambah tamu');
    }
  }
);

export const deleteGuest = createAsyncThunk(
  'guest/deleteGuest',
  async (guestId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete(`https://undangannikaharirini.onrender.com/api/admin/guests/${guestId}`, config);
      return response.data.guest; // Mengembalikan data tamu yang baru dibuat
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menghapus tamu');
    }
  }
);
const initialState = {
  data: [],
  isLoading: true,
  isAdding: false,
  error: null
};

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteGuest.fulfilled, (state, action) => {
        state.data = state.data.filter((guest) => guest._id !== action.payload._id);
      })
      .addCase(deleteGuest.rejected, (state, action) => {
        state.error = action.payload;
      })
    builder
      // Fetch Guests
      .addCase(fetchGuests.pending, (state) => { state.isLoading = true; })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add Guest
      .addCase(addGuest.pending, (state) => { state.isAdding = true; })
      .addCase(addGuest.fulfilled, (state, action) => {
        state.isAdding = false;
        state.data.unshift(action.payload); // Tambahkan tamu baru ke urutan paling atas di tabel
      })
      .addCase(addGuest.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload;
      });
  }
});

export default guestSlice.reducer;