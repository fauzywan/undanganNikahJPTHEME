import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Cek status login di sini. 
  // Contoh ini mengecek 'token' dari localStorage. Sesuaikan dengan logic login-mu.
  const isAuthenticated = localStorage.getItem('token'); 

  if (!isAuthenticated) {
    // Jika tidak ada token (belum login), arahkan ke halaman login
    return <Navigate to="/admin" replace />;
  }

  // Jika sudah login, izinkan render komponen yang ada di dalamnya
  return <Outlet />;
};

export default ProtectedRoute;