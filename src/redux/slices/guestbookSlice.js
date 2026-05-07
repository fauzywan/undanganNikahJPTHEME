import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL ='https://undangannikaharirini.onrender.com/api';

export const fetchGuestMessages = createAsyncThunk(
  'guestbook/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
  
      const response = await axios.get(`${API_URL}/guestbook`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Gagal mengambil data buku tamu' });
    }
  }
);

const guestbookSlice = createSlice({
  name: 'guestbook',
  initialState: {
    messages: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuestMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGuestMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchGuestMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      });
  }
});

export default guestbookSlice.reducer;