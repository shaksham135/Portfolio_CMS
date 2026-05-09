import { useEffect, useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { adminApi } from '../../api'
import '../../styles/admin-common.css'

const TYPE_OPTS = ['INTERNSHIP', 'FREELANCE', 'LEARNING', 'JOB', 'PROJECT']

const TYPE_BADGES = {
  INTERNSHIP: 'blue',
  FREELANCE: 'violet',
  LEARNING: 'cyan',
  JOB: 'emerald',
  PROJECT: 'amber'
}

function fmt(d) {
  if (!d) return 'Present'
  try {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  } catch {
    return d
  }
}

export default function AdminExperience() {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, reset } = useForm()

  const load = () => {
    setLoading(true)
    adminApi.getExperience()
      .then(r => setItems(r.data))
      .catch(() => toast.error('Failed to load experience'))
      .finally(() => setLoading(false))
  }
  
  useEffect(() => {
    adminApi.getExperience()
      .then(r => setItems(r.data))
      .catch(() => toast.error('Failed to load experience'))
      .finally(() => setLoading(false))
  }, [])

  const openCreate = () => {
    setEditing(null)
    reset({ title: '', company: '', type: 'LEARNING', startDate: '', endDate: '', description: '', location: '', displayOrder: 0 })
    setShowModal(true)
  }

  const openEdit = (e) => {
    setEditing(e)
    reset({
      ...e,
      startDate: e.startDate ? e.startDate.substring(0, 10) : '',
      endDate: e.endDate ? e.endDate.substring(0, 10) : ''
    })
    setShowModal(true)
  }

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        displayOrder: parseInt(data.displayOrder) || 0,
        endDate: data.endDate || null
      }
      if (editing) {
        await adminApi.updateExperience(editing.id, payload)
        toast.success('Experience updated')
      } else {
        await adminApi.createExperience(payload)
        toast.success('Experience added')
      }
      setShowModal(false)
      load()
    } catch {
      toast.error('Operation failed')
    }
  }

  const del = async (id) => {
    if (!confirm('Delete this experience entry?')) return
    try {
      await adminApi.deleteExperience(id)
      toast.success('Deleted')
      load()
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Experience</h2>
          <p className="page-subtitle">Manage your career timeline</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <FiPlus size={18} />
          Add Entry
        </button>
      </div>

      {/* Experience List */}
      {loading ? (
        <div className="list-view">
          {[1, 2, 3].map(i => (
            <div key={i} className="list-item skeleton" style={{ height: '140px' }} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <FiBriefcase size={32} />
          </div>
          <h3 className="empty-title">No experience entries</h3>
          <p className="empty-text">Add your first experience</p>
        </div>
      ) : (
        <div className="list-view">
          {items.map((item) => (
            <div key={item.id} className="list-item fade-in">
              <div className="list-item-content">
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  {item.type && (
                    <span className={`category-badge ${TYPE_BADGES[item.type] || 'blue'}`}>
                      {item.type}
                    </span>
                  )}
                  <span style={{ fontSize: '0.875rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiCalendar size={14} />
                    {fmt(item.startDate)} - {fmt(item.endDate)}
                  </span>
                  {item.location && (
                    <span style={{ fontSize: '0.875rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FiMapPin size={14} />
                      {item.location}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', marginBottom: '8px' }}>{item.company}</p>
                {item.description && (
                  <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5 }}>{item.description}</p>
                )}
              </div>

              <div className="list-item-actions">
                <button onClick={() => openEdit(item)} className="btn-edit">
                  <FiEdit2 size={16} />
                </button>
                <button onClick={() => del(item.id)} className="btn-danger">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editing ? 'Edit Experience' : 'Add Experience'}</h3>
              <button onClick={() => setShowModal(false)} className="btn-icon">
                <FiPlus size={20} style={{ transform: 'rotate(45deg)' }} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input {...register('title', { required: true })} placeholder="e.g. Senior Developer" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input {...register('company')} placeholder="e.g. Google" className="form-input" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select {...register('type')} className="form-select">
                    {TYPE_OPTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input {...register('location')} placeholder="e.g. Remote" className="form-input" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input {...register('startDate')} type="date" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input {...register('endDate')} type="date" className="form-input" />
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>Leave empty for "Present"</p>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea {...register('description')} placeholder="Describe your role and achievements..." rows={4} className="form-textarea" />
              </div>

              <div className="form-group">
                <label className="form-label">Display Order</label>
                <input {...register('displayOrder')} type="number" className="form-input" />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">{editing ? 'Update' : 'Add'} Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
