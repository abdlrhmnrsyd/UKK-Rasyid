import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Register from './auth/RegisterForm.tsx'
import Login from './auth/LoginForm.tsx'
import Dashboard from './content/dashboard.tsx'
import Welcome from './welcome.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
