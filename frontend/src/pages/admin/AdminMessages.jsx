import { useEffect, useState } from 'react'
import { FiMail, FiTrash2, FiClock, FiUser, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { adminApi } from '../../api'
import '../../styles/admin-common.css'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    adminApi.getMessages()
      .then(r => setMessages(r.data))
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const markRead = async (id) => {
    try {
      await adminApi.markRead(id)
      toast.success('Marked as read')
      load()
    } catch {
      toast.error('Failed to mark as read')
    }
  }

  const del = async (id) => {
    if (!confirm('Delete this message?')) return
    try {
      await adminApi.deleteMessage(id)
      toast.success('Deleted')
      load()
    } catch {
      toast.error('Delete failed')
    }
  }

  const fmt = (date) => {
    if (!date) return 'Unknown'
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const unreadCount = messages.filter(m => !m.isRead).length

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Messages</h2>
          <p className="page-subtitle">
            {unreadCount > 0 ? <span style={{ color: '#fb7185' }}>{unreadCount} unread</span> : 'Contact form submissions'}
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="category-badge rose">
            <span className="unread-badge"></span>
            {unreadCount} new
          </div>
        )}
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="list-view">
          {[1, 2, 3].map(i => (
            <div key={i} className="list-item skeleton" style={{ height: '140px' }} />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <FiMail size={32} />
          </div>
          <h3 className="empty-title">No messages yet</h3>
          <p className="empty-text">Contact form submissions will appear here</p>
        </div>
      ) : (
        <div className="list-view">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`list-item fade-in ${!msg.isRead ? 'unread' : ''}`}
              style={{ opacity: msg.isRead ? 0.7 : 1 }}
            >
              <div className="list-item-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                  {!msg.isRead && <div className="unread-badge" style={{ position: 'static' }}></div>}
                  <div className="stat-icon-wrapper" style={{ width: '48px', height: '48px' }}>
                    <FiUser size={20} style={{ color: '#64748b' }} />
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontWeight: 600 }}>{msg.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{msg.email}</p>
                  </div>
                </div>

                {msg.subject && (
                  <p style={{ color: '#fb7185', fontWeight: 600, marginBottom: '8px' }}>{msg.subject}</p>
                )}

                <p style={{ color: '#94a3b8', lineHeight: 1.5 }}>{msg.message}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '0.875rem', color: '#64748b' }}>
                  <FiClock size={14} />
                  {fmt(msg.createdAt)}
                </div>
              </div>

              <div className="list-item-actions" style={{ flexDirection: 'column' }}>
                {!msg.isRead && (
                  <button onClick={() => markRead(msg.id)} className="btn-secondary" style={{ fontSize: '0.875rem' }}>
                    <FiCheckCircle size={16} />
                    Mark Read
                  </button>
                )}
                <button onClick={() => del(msg.id)} className="btn-danger">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '24px' }}>
        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
          Total: <strong style={{ color: '#fff' }}>{messages.length}</strong> messages
        </p>
        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
          Unread: <strong style={{ color: unreadCount > 0 ? '#fb7185' : '#fff' }}>{unreadCount}</strong>
        </p>
      </div>
    </div>
  )
}
