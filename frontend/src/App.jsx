import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Portfolio from './pages/Portfolio'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProjects from './pages/admin/AdminProjects'
import AdminSkills from './pages/admin/AdminSkills'
import AdminServices from './pages/admin/AdminServices'
import AdminExperience from './pages/admin/AdminExperience'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminMessages from './pages/admin/AdminMessages'
import AdminAbout from './pages/admin/AdminAbout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import CursorGlow from './components/ui/CursorGlow'
import ScrollProgress from './components/ui/ScrollProgress'

function App() {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <Routes>
        {/* Public Portfolio */}
        <Route path="/" element={<Portfolio />} />

        {/* Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="experience" element={<AdminExperience />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="about" element={<AdminAbout />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
