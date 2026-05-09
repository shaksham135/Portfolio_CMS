import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiLock, FiUser, FiArrowRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await login(username, password)
      toast.success('Login successful')
      navigate('/admin/dashboard')
    } catch (error) {
      toast.error('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#030305] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 mb-6 shadow-2xl shadow-blue-600/30"
          >
            <span className="text-white font-bold text-3xl">S</span>
          </motion.div>
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-gray-400 text-sm">Sign in to manage your command center</p>
        </div>

        {/* Login Card */}
        <div className="backdrop-blur-xl bg-[#0a0a0f]/80 border border-white/[0.05] rounded-2xl p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-[#05050a]/60 border border-white/[0.05] rounded-xl py-4 !pl-12 pr-4 text-white outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/40 transition-all placeholder:text-gray-600 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#05050a]/60 border border-white/[0.05] rounded-xl py-4 !pl-12 pr-4 text-white outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/40 transition-all placeholder:text-gray-600 text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 disabled:from-blue-600/50 disabled:to-violet-600/50 text-white rounded-xl transition-all font-semibold shadow-lg shadow-blue-600/20 active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <FiArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/[0.03] text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <FiLock size={12} />
              Secure encrypted access
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <p className="text-xs text-gray-600">
            © 2026 Shaksham Portfolio. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
