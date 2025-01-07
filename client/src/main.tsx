import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Register from './auth/RegisterForm.tsx'
import Login from './auth/LoginForm.tsx'
import Dashboard from './content/dashboard.tsx'
import Welcome from './welcome.tsx'
import Rpl from './content/Rpl.tsx'
import Tkj from './content/tkj.tsx'
import Dkv from './content/dkv.tsx'
import Pspt from './content/Pspt.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/rpl" element={<Rpl />} />
        <Route path="/tkj" element={<Tkj />} />
        <Route path="/dkv" element={<Dkv />} />
        <Route path="/pspt" element={<Pspt />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
