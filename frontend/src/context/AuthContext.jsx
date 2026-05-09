import { createContext, useContext, useState } from 'react'
import { authApi } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_token'))
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('portfolio_admin')
    return saved ? JSON.parse(saved) : null
  })
  const loading = false

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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
