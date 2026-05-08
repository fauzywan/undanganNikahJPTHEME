import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://undangannikaharirini.onrender.com/api/admin/stories';

// --- ASYNC THUNKS ---

// 1. Get All Stories
export const fetchStories = createAsyncThunk('story/fetchStories', async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Array dari cerita
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// 2. Add Story
export const addStory = createAsyncThunk('story/addStory', async (storyData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL, storyData);
    return response.data.story; // Objek cerita yang baru ditambahkan
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// 3. Update Story
export const updateStory = createAsyncThunk('story/updateStory', async ({ id, storyData }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, storyData);
    return response.data.story; // Objek cerita yang diupdate
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// 4. Delete Story
export const deleteStory = createAsyncThunk('story/deleteStory', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id; // Kembalikan ID untuk dihapus dari state lokal Redux
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});


// --- SLICE ---

const storySlice = createSlice({
  name: 'story',
  initialState: {
    stories: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
  },
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Stories
      .addCase(fetchStories.pending, (state) => { state.isLoading = true; })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Add Story
      .addCase(addStory.pending, (state) => { state.isLoading = true; })
      .addCase(addStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stories.push(action.payload); // Tambahkan langsung ke state
        // Sortir ulang berdasarkan order setelah ditambah
        state.stories.sort((a, b) => a.order - b.order);
      })
      .addCase(addStory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update Story
      .addCase(updateStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.stories.findIndex(story => story._id === action.payload._id);
        if (index !== -1) {
          state.stories[index] = action.payload;
        }
        state.stories.sort((a, b) => a.order - b.order);
      })

      // Delete Story
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stories = state.stories.filter(story => story._id !== action.payload);
      });
  }
});

export const { resetState } = storySlice.actions;
export default storySlice.reducer;