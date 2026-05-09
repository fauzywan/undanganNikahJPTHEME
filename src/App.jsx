import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Import Halaman
import Undangan from './pages/Undangan'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Pengaturan from './pages/Pengaturan'
import PhotoManagerPage from './pages/PhotoManagerPage'
import MusicManagerPage from './pages/MusicManagerPage'
import LoveStoryManager from './pages/LoveStoryManager'

// Import Protected Route
import ProtectedRoute from './components/ProtectedRoute' 

function App() {
  return(
    <Routes>
      {/* Rute Publik: Bisa diakses siapa saja */}
      <Route path="/" element={<Undangan/>}></Route>
      <Route path="/admin" element={<Login />} />

      {/* Rute Privat: Harus Login */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/pengaturan-foto" element={<PhotoManagerPage />} />
        <Route path="/admin/music" element={<MusicManagerPage />} />
        <Route path="/admin/lovestory" element={<LoveStoryManager />} />
        <Route path="/admin/pengaturan" element={<Pengaturan />} />
      </Route>
    </Routes>
  )
}

export default App