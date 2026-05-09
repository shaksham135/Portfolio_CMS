import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiFolder,
  FiCpu,
  FiStar,
  FiMail,
  FiTrendingUp,
  FiPlus,
  FiActivity,
  FiClock,
  FiZap,
  FiBriefcase,
  FiUser
} from 'react-icons/fi'
import { adminApi } from '../../api'
import { getRelativeTime } from '../../utils/dateFormatter'
import '../../styles/admin-dashboard.css'

// Icon mapping for backend activity types
const ICON_MAP = {
  mail: FiMail,
  folder: FiFolder,
  star: FiStar,
  plus: FiPlus,
}

// Color theme configuration
const COLORS = {
  blue: { bg: 'blue', icon: 'blue', border: 'blue' },
  violet: { bg: 'violet', icon: 'violet', border: 'violet' },
  amber: { bg: 'amber', icon: 'amber', border: 'amber' },
  rose: { bg: 'rose', icon: 'rose', border: 'rose' },
  emerald: { bg: 'emerald', icon: 'emerald', border: 'emerald' },
  cyan: { bg: 'cyan', icon: 'cyan', border: 'cyan' }
}

// Stat Card Component
// delay prop drives the stagger via inline style (avoids cascade conflict with .fade-in)
const StatCard = ({ icon: Icon, label, value, color, trend, delay = 0 }) => (
  <div className="stat-card fade-in" style={{ animationDelay: `${delay}s` }}>
    <div className="stat-card-header">
      <div className={`stat-icon-wrapper ${color.bg}`}>
        <Icon className={`stat-icon ${color.icon}`} />
      </div>
      {trend && (
        <div className="stat-trend">
          <FiTrendingUp className="stat-trend-icon" />
          <span className="stat-trend-value">+12%</span>
        </div>
      )}
    </div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
)

// Quick Action Card Component
const ActionCard = ({ icon: Icon, label, path, color, delay = 0 }) => (
  <Link to={path} className="action-card fade-in" style={{ animationDelay: `${delay}s` }}>
    <div className={`stat-icon-wrapper ${color.bg}`}>
      <Icon className={`stat-icon ${color.icon}`} />
    </div>
    <div className="action-title">{label}</div>
    <div className="action-subtitle">Manage →</div>
  </Link>
)

// Activity Item Component
const ActivityItem = ({ icon: Icon, title, time, color }) => (
  <div className="activity-item">
    {/* Fix: use single stat-icon-wrapper class */}
    <div className={`stat-icon-wrapper ${color.bg}`}>
      <Icon className={`stat-icon ${color.icon}`} />
    </div>
    <div className="activity-content">
      <div className="activity-title">{title}</div>
      <div className="activity-time">
        <FiClock className="activity-time-icon" />
        {time}
      </div>
    </div>
  </div>
)

// Status Item Component
const StatusItem = ({ name, status }) => (
  <div className="status-item">
    <div className="status-left">
      <div className="status-indicator"></div>
      <span className="status-name">{name}</span>
    </div>
    <span className="status-value">{status}</span>
  </div>
)

// Loading Spinner Component
const LoadingState = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
)

// Main Dashboard Component
export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.getStats()
      .then(res => setStats(res.data))
      .catch(() => setStats({ projects: 0, skills: 0, testimonials: 0, messages: 0 }))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingState />

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        
        {/* Header */}
        <header className="dashboard-header">
          <h1 className="dashboard-title">Welcome back! 👋</h1>
          <p className="dashboard-subtitle">
            Here's what's happening with your portfolio today.
          </p>
        </header>

        {/* Stats Grid — delay passed as prop to avoid CSS cascade conflict with .fade-in */}
        <section className="stats-grid">
          <StatCard
            icon={FiFolder}
            label="Total Projects"
            value={stats?.projects || 0}
            color={COLORS.blue}
            trend
            delay={0.1}
          />
          <StatCard
            icon={FiCpu}
            label="Skills"
            value={stats?.skills || 0}
            color={COLORS.violet}
            delay={0.15}
          />
          <StatCard
            icon={FiStar}
            label="Testimonials"
            value={stats?.testimonials || 0}
            color={COLORS.amber}
            delay={0.2}
          />
          <StatCard
            icon={FiMail}
            label="Messages"
            value={stats?.messages || 0}
            color={COLORS.rose}
            delay={0.25}
          />
        </section>

        {/* Quick Actions */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Quick Actions</h2>
          </div>
          <div className="actions-grid">
            <ActionCard
              icon={FiPlus}
              label="Add Project"
              path="/admin/projects"
              color={COLORS.blue}
              delay={0.1}
            />
            <ActionCard
              icon={FiCpu}
              label="Add Skill"
              path="/admin/skills"
              color={COLORS.violet}
              delay={0.15}
            />
            <ActionCard
              icon={FiZap}
              label="Add Service"
              path="/admin/services"
              color={COLORS.cyan}
              delay={0.2}
            />
            <ActionCard
              icon={FiBriefcase}
              label="Add Experience"
              path="/admin/experience"
              color={COLORS.emerald}
              delay={0.25}
            />
            <ActionCard
              icon={FiStar}
              label="Add Testimonial"
              path="/admin/testimonials"
              color={COLORS.amber}
              delay={0.3}
            />
            <ActionCard
              icon={FiUser}
              label="Edit Profile"
              path="/admin/about"
              color={COLORS.rose}
              delay={0.35}
            />
          </div>
        </section>

        {/* Lower Section: Activity + Status */}
        <section className="lower-grid">
          {/* Recent Activity */}
          <div className="panel-card">
            <div className="panel-header">
              <h3 className="panel-title">Recent Activity</h3>
              <Link to="/admin/messages" className="panel-link">
                View all →
              </Link>
            </div>
            <div className="activity-list">
              {stats?.activities && stats.activities.length > 0 ? (
                stats.activities.map((activity, index) => {
                  const Icon = ICON_MAP[activity.icon] || FiActivity;
                  const colorConfig = COLORS[activity.color] || COLORS.blue;
                  return (
                    <ActivityItem
                      key={activity.id || index}
                      icon={Icon}
                      title={activity.title}
                      time={getRelativeTime(activity.timestamp)}
                      color={colorConfig}
                    />
                  )
                })
              ) : (
                <div style={{ color: '#94a3b8', fontSize: '0.875rem', padding: '16px' }}>
                  No recent activity found.
                </div>
              )}
            </div>
          </div>

          {/* System Status */}
          <div className="panel-card">
            <h3 className="panel-title">System Status</h3>
            <div className="status-list">
              <StatusItem name="API Server" status="Operational" />
              <StatusItem name="Database" status="Connected" />
              <StatusItem name="Storage" status="Healthy" />
            </div>
          </div>
        </section>

        {/* Pro Tip */}
        <div className="tip-card">
          <div className="tip-content">
            <div className="tip-icon-wrapper">
              <FiActivity className="tip-icon" />
            </div>
            <div className="tip-body">
              <h4 className="tip-title">Pro Tip</h4>
              <p className="tip-text">
                Keep your portfolio updated regularly. Fresh content attracts
                more visitors and showcases your growth as a developer.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}