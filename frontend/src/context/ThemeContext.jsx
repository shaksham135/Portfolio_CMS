import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext(null)

// Apply theme directly to the DOM
function applyTheme(theme) {
  const html = document.documentElement
  const body = document.body

  if (theme === 'light') {
    html.classList.add('light')
    html.classList.remove('dark')
    // Direct style overrides for guaranteed light mode
    body.style.backgroundColor = '#F0F4FF'
    body.style.color = '#0F172A'
    html.style.setProperty('--bg-primary', '#F0F4FF')
    html.style.setProperty('--bg-secondary', '#E8EFF9')
    html.style.setProperty('--text-primary', '#0F172A')
    html.style.setProperty('--text-secondary', '#475569')
    html.style.setProperty('--text-muted', '#94A3B8')
    html.style.setProperty('--glass-bg', 'rgba(255,255,255,0.8)')
    html.style.setProperty('--glass-border', 'rgba(0,0,0,0.1)')
    html.style.setProperty('--scrollbar-track', '#E8EFF9')
    html.style.setProperty('--input-bg', 'rgba(0,0,0,0.04)')
    html.style.setProperty('--input-border', 'rgba(0,0,0,0.15)')
    html.style.setProperty('--input-color', '#0F172A')
    html.style.setProperty('--input-placeholder', '#94A3B8')
    html.style.setProperty('--admin-sidebar-bg', '#FFFFFF')
    html.style.setProperty('--admin-sidebar-border', 'rgba(0,0,0,0.08)')
  } else {
    html.classList.remove('light')
    html.classList.add('dark')
    body.style.backgroundColor = '#050507'
    body.style.color = '#E2E8F0'
    html.style.setProperty('--bg-primary', '#050507')
    html.style.setProperty('--bg-secondary', '#0D0D14')
    html.style.setProperty('--text-primary', '#E2E8F0')
    html.style.setProperty('--text-secondary', '#94A3B8')
    html.style.setProperty('--text-muted', '#64748B')
    html.style.setProperty('--glass-bg', 'rgba(255,255,255,0.04)')
    html.style.setProperty('--glass-border', 'rgba(255,255,255,0.08)')
    html.style.setProperty('--scrollbar-track', '#0D0D14')
    html.style.setProperty('--input-bg', 'rgba(255,255,255,0.04)')
    html.style.setProperty('--input-border', 'rgba(255,255,255,0.1)')
    html.style.setProperty('--input-color', '#E2E8F0')
    html.style.setProperty('--input-placeholder', '#6B7280')
    html.style.setProperty('--admin-sidebar-bg', '#0D0D14')
    html.style.setProperty('--admin-sidebar-border', 'rgba(255,255,255,0.06)')
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'dark'
  })

  // Apply on mount and whenever theme changes
  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('portfolio_theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      applyTheme(next) // immediate DOM update
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
