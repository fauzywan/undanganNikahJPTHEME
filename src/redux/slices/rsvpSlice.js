import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://undangannikaharirini.onrender.com/api';

// 1. Thunk untuk submit RSVP
export const submitGuestRSVP = createAsyncThunk(
  'rsvp/submitGuestRSVP',
  async ({ slug, payloadData }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_URL}/rsvp/${slug}`, payloadData);
      return response.data.guest; // Mengembalikan dokumen tamu terbaru dari MongoDB
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Terjadi kesalahan jaringan' });
    }
  }
);

// 2. Thunk opsional: Untuk mengecek apakah tamu sudah pernah RSVP saat halaman pertama kali dibuka
export const fetchGuestBySlug = createAsyncThunk(
  'rsvp/fetchGuestBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/guest/${slug}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Tamu tidak ditemukan' });
    }
  }
);

const rsvpSlice = createSlice({
  name: 'rsvp',
  initialState: {
    currentGuest: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetRsvpStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- Handle Submit RSVP ---
      .addCase(submitGuestRSVP.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitGuestRSVP.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentGuest = action.payload;
      })
      .addCase(submitGuestRSVP.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Gagal mengirim RSVP';
      })
      
      // --- Handle Fetch Guest Initial Data ---
      .addCase(fetchGuestBySlug.fulfilled, (state, action) => {
        state.currentGuest = action.payload;
      });
  }
});

export const { resetRsvpStatus } = rsvpSlice.actions;
export default rsvpSlice.reducer;