import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Undangan from './pages/Undangan'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Pengaturan from './pages/Pengaturan'
import PhotoManagerPage from './pages/PhotoManagerPage'
import MusicManagerPage from './pages/MusicManagerPage'
import LoveStoryManager from './pages/LoveStoryManager'


function App() {
return(
  <Routes>
    <Route path="/" element={<Undangan/>}></Route>
    <Route path="/admin" element={<Login />} />
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/pengaturan-foto" element={<PhotoManagerPage />} />
   <Route path="/admin/music" element={<MusicManagerPage />} />
   <Route path="/admin/lovestory" element={<LoveStoryManager />} />
    <Route path="/admin/pengaturan" element={<Pengaturan />} />
    </Routes>
)
}

export default App