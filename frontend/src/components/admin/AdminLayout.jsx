import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { 
  FiGrid, FiFolder, FiCpu, FiZap, FiBriefcase, 
  FiStar, FiMail, FiUser, FiLogOut, FiMenu, FiX, FiBell,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { adminApi } from '../../api'
import '../../styles/admin-sidebar.css'

const NAV_ITEMS = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: FiGrid },
  { path: '/admin/projects', label: 'Projects', icon: FiFolder },
  { path: '/admin/skills', label: 'Skills', icon: FiCpu },
  { path: '/admin/services', label: 'Services', icon: FiZap },
  { path: '/admin/experience', label: 'Experience', icon: FiBriefcase },
  { path: '/admin/testimonials', label: 'Testimonials', icon: FiStar },
  { path: '/admin/messages', label: 'Messages', icon: FiMail },
  { path: '/admin/about', label: 'Profile', icon: FiUser },
]

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    adminApi.getMessages()
      .then(res => {
        setUnreadCount(res.data.filter(m => !m.isRead).length)
      })
      .catch(() => {
        // Fail silently
      })
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/admin' || path === '/admin/dashboard') return 'Dashboard'
    const item = NAV_ITEMS.find(i => path === i.path)
    return item?.label || 'Dashboard'
  }

  const sidebarClass = `admin-sidebar ${sidebarCollapsed ? 'collapsed' : 'expanded'} ${mobileMenuOpen ? 'mobile-visible' : 'mobile-hidden'}`

  return (
    <div className="admin-layout">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={sidebarClass}>
        {/* Logo */}
        <div className="sidebar-header">
          {!sidebarCollapsed ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div className="sidebar-logo">
                <div className="sidebar-logo-icon">
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem' }}>S</span>
                </div>
                <span className="sidebar-logo-text">Shaksham</span>
              </div>
              <button onClick={() => setSidebarCollapsed(true)} className="sidebar-collapse-btn">
                <FiChevronLeft size={18} />
              </button>
            </div>
          ) : (
            <div className="sidebar-logo-collapsed">
              <div className="sidebar-logo-icon">
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem' }}>S</span>
              </div>
              <button onClick={() => setSidebarCollapsed(false)} className="sidebar-collapse-btn" style={{ marginTop: '12px' }}>
                <FiChevronRight size={18} />
              </button>
            </div>
          )}
          <button onClick={() => setMobileMenuOpen(false)} className="sidebar-mobile-close">
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {!sidebarCollapsed && (
            <p className="nav-section-label">Menu</p>
          )}
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => {
                  const isItemActive = isActive || (item.path === '/admin/dashboard' && location.pathname === '/admin')
                  return `nav-item ${isItemActive ? 'active' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`
                }}
              >
                <Icon size={22} className="nav-item-icon" />
                {!sidebarCollapsed && (
                  <span className="nav-item-label">{item.label}</span>
                )}
                {item.path === '/admin/messages' && unreadCount > 0 && !sidebarCollapsed && (
                  <span className="nav-badge">{unreadCount}</span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* User Card */}
        {!sidebarCollapsed ? (
          <div className="sidebar-user-card">
            <div className="sidebar-user-header">
              <div className="sidebar-user-avatar">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="sidebar-user-info">
                <p className="sidebar-user-name">{user?.name || 'Admin'}</p>
                <p className="sidebar-user-email">{user?.email || 'admin@gmail.com'}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="sidebar-logout-btn">
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        ) : (
          <div className="sidebar-logout-collapsed">
            <button onClick={handleLogout} className="sidebar-logout-collapsed-btn">
              <FiLogOut size={20} />
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-top-header">
          <div className="admin-header-content">
            <div className="admin-header-left">
              <button onClick={() => setMobileMenuOpen(true)} className="mobile-menu-toggle">
                <FiMenu size={20} />
              </button>
              <h1 className="admin-page-title">{getPageTitle()}</h1>
            </div>

            <div className="admin-header-right">
              <button className="notification-btn">
                <FiBell size={20} />
                {unreadCount > 0 && <span className="notification-dot" />}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
