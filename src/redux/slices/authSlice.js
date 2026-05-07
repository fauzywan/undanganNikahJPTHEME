import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAdmin = createAsyncThunk(
    'auth/loginAdmin',
    async (password,{rejectWithValue})=>{
        try{
            const {data} =  await axios.post('https://undangannikaharirini.onrender.com/api/user/login',{password});
            localStorage.setItem('token',data.token);
            return data;
        }
        catch(error){
            return rejectWithValue(error.response?.data?.message || "Login Gagal")
        }
    }
)
const initialState = {
    token:localStorage.getItem('token') || null,
    isLoading:false,
    error:null,
}
const authSlice =  createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            localStorage.removeItem('token');
            state.token = null;
            state.error = null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginAdmin.pending,(state)=>{
            state.isLoading= true;
            state.error=null;
        })
        .addCase(loginAdmin.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.token= action.payload.token;
        })
        .addCase(loginAdmin.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})
export const {logout} = authSlice.actions;
export default authSlice.reducer;