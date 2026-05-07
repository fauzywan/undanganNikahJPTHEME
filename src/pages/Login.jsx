import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../redux/slices/authSlice';

function Login() {
    const [password,setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {isLoading,error,token} = useSelector((state)=>state.auth)

    useEffect(()=>{
if(token)
    navigate('/admin/dashboard')
    },[token,navigate])
    const LoginHandler=(e)=>{
        e.preventDefault();
        if(password.trim()=='')return
        dispatch(loginAdmin(password))
    }
    return (
    <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login Dashboard</h1>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={LoginHandler}>
        <input 
          type="password" 
          placeholder="Masukkan Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />
        <br/>
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          {isLoading ? 'Memeriksa...' : 'Masuk'}
        </button>
      </form>
    </div>
  );
};
export default Login