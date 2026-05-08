import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchConfig = createAsyncThunk(
  'config/fetchConfig',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`https://undangannikaharirini.onrender.com/api/config`)
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Terjadi kesalahan');
    }
  }
);
export const updateConfig = createAsyncThunk('config/updateConfig',
  async(newData,{rejectWithValue,getState})=>{
    try{
        const token = getState().auth.token;
        const config = {headers:{Authorization:`Bearer ${token}`}}
      const response = await axios.post('https://undangannikaharirini.onrender.com/api/admin/config',newData,config);
        return response.data.config;

    }
    catch(error){
    return rejectWithValue(error.response?.data?.message || 'Gagal update data');    }
  }
)
const initialState = {
  data: null,
  isLoading: true,
  error: false
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    //  fetch config
    builder.addCase(fetchConfig.pending,(state)=>{
        state.isLoading=true;
        state.error=null;
    })
    .addCase(fetchConfig.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.data=action.payload;
    })
    .addCase(fetchConfig.rejected,(state,action)=>{
        state.isLoading=false,
        state.error=action.payload
    })
    // update config
    builder.addCase(updateConfig.fulfilled,(state,action)=>{
      state.data = action.payload;      
    })
    .addCase(updateConfig.rejected,(state,action)=>{
      state.error = action.payload;
    })
    .addCase(updateConfig.pending,(state)=>{
      state.error=null;
    })
  }
});


export default configSlice.reducer;