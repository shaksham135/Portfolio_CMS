import { useEffect, useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiZap, FiServer, FiGlobe, FiBox } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { adminApi } from '../../api'
import '../../styles/admin-common.css'

const ICONS = {
  server: FiServer,
  globe: FiGlobe,
  zap: FiZap,
  default: FiBox
}

export default function AdminServices() {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, reset } = useForm()

  const load = () => {
    setLoading(true)
    adminApi.getServices()
      .then(r => setItems(r.data))
      .catch(() => toast.error('Failed to load services'))
      .finally(() => setLoading(false))
  }
  
  useEffect(() => { load() }, [])

  const openCreate = () => { 
    setEditing(null)
    reset({ title: '', description: '', icon: 'server', displayOrder: 0 })
    setShowModal(true)
  }
  
  const openEdit = (s) => { 
    setEditing(s)
    reset(s)
    setShowModal(true)
  }

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, displayOrder: parseInt(data.displayOrder) || 0 }
      console.log('Sending service payload:', payload)
      if (editing) {
        await adminApi.updateService(editing.id, payload)
        toast.success('Service updated')
      } else {
        await adminApi.createService(payload)
        toast.success('Service added')
      }
      setShowModal(false)
      load()
    } catch {
      toast.error('Operation failed')
    }
  }

  const del = async (id) => {
    if (!confirm('Delete this service?')) return
    try {
      await adminApi.deleteService(id)
      toast.success('Service deleted')
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
          <h2 className="page-title">Services</h2>
          <p className="page-subtitle">Manage your service offerings</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <FiPlus size={18} />
          Add Service
        </button>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="card-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="data-card skeleton" style={{ height: '200px' }} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <FiZap size={32} />
          </div>
          <h3 className="empty-title">No services yet</h3>
          <p className="empty-text">Add your first service offering</p>
        </div>
      ) : (
        <div className="card-grid">
          {items.map((item) => {
            const IconComponent = ICONS[item.icon] || ICONS.default
            
            return (
              <div key={item.id} className="data-card fade-in">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div className="stat-icon-wrapper cyan">
                    <IconComponent className="stat-icon cyan" />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => openEdit(item)} className="btn-edit">
                      <FiEdit2 size={16} />
                    </button>
                    <button onClick={() => del(item.id)} className="btn-danger">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>{item.description}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Order: {item.displayOrder}</span>
                  <span className="category-badge cyan">Active</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editing ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setShowModal(false)} className="btn-icon">
                <FiPlus size={20} style={{ transform: 'rotate(45deg)' }} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="form-label">Service Title</label>
                <input 
                  {...register('title', { required: true })} 
                  placeholder="e.g. Backend Development"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  {...register('description')} 
                  placeholder="Describe your service..."
                  rows={4}
                  className="form-textarea"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Icon</label>
                  <select {...register('icon')} className="form-select">
                    <option value="server">Server</option>
                    <option value="globe">Globe</option>
                    <option value="zap">Zap</option>
                    <option value="box">Box</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Display Order</label>
                  <input 
                    {...register('displayOrder')} 
                    type="number"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editing ? 'Update' : 'Add'} Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
