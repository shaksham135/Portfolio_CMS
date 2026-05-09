import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('portfolio_token')
    const savedAdmin = localStorage.getItem('portfolio_admin')
    if (savedToken && savedAdmin) {
      setToken(savedToken)
      setAdmin(JSON.parse(savedAdmin))
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    const res = await authApi.login({ username, password })
    const { token: newToken, ...adminData } = res.data
    setToken(newToken)
    setAdmin(adminData)
    localStorage.setItem('portfolio_token', newToken)
    localStorage.setItem('portfolio_admin', JSON.stringify(adminData))
    return adminData
  }

  const logout = () => {
    setToken(null)
    setAdmin(null)
    localStorage.removeItem('portfolio_token')
    localStorage.removeItem('portfolio_admin')
  }

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
