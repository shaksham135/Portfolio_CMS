import { useEffect, useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiMessageSquare, FiUser } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { adminApi } from '../../api'
import '../../styles/admin-common.css'

export default function AdminTestimonials() {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, reset, setValue, watch } = useForm()
  const currentImageUrl = watch('imageUrl')

  const load = () => {
    setLoading(true)
    adminApi.getTestimonials()
      .then(r => setItems(r.data))
      .catch(() => toast.error('Failed to load testimonials'))
      .finally(() => setLoading(false))
  }
  
  useEffect(() => {
    adminApi.getTestimonials()
      .then(r => setItems(r.data))
      .catch(() => toast.error('Failed to load testimonials'))
      .finally(() => setLoading(false))
  }, [])

  const openCreate = () => {
    setEditing(null)
    reset({ name: '', role: '', company: '', message: '', imageUrl: '', rating: 5, displayOrder: 0 })
    setShowModal(true)
  }

  const openEdit = (t) => {
    setEditing(t)
    reset(t)
    setShowModal(true)
  }

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        rating: parseInt(data.rating) || 5,
        displayOrder: parseInt(data.displayOrder) || 0
      }
      if (editing) {
        await adminApi.updateTestimonial(editing.id, payload)
        toast.success('Testimonial updated')
      } else {
        await adminApi.createTestimonial(payload)
        toast.success('Testimonial added')
      }
      setShowModal(false)
      load()
    } catch {
      toast.error('Operation failed')
    }
  }

  const del = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      await adminApi.deleteTestimonial(id)
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
          <h2 className="page-title">Testimonials</h2>
          <p className="page-subtitle">Client reviews and endorsements</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <FiPlus size={18} />
          Add Testimonial
        </button>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="card-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="data-card skeleton" style={{ height: '250px' }} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <FiMessageSquare size={32} />
          </div>
          <h3 className="empty-title">No testimonials yet</h3>
          <p className="empty-text">Add your first client testimonial</p>
        </div>
      ) : (
        <div className="card-grid">
          {items.map((item) => (
            <div key={item.id} className="data-card fade-in">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    width: '56px', 
                    height: '56px', 
                    borderRadius: '14px', 
                    background: 'rgba(255,255,255,0.04)', 
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <FiUser size={24} style={{ color: '#4b5563' }} />
                    )}
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontWeight: 600 }}>{item.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{item.role || 'Client'}</p>
                  </div>
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

              {/* Star Rating */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={18}
                    style={{ color: i < (item.rating || 5) ? '#fbbf24' : '#374151' }}
                  />
                ))}
              </div>

              <p style={{ color: '#94a3b8', marginBottom: '16px', lineHeight: 1.6 }}>
                "{item.message}"
              </p>

              {item.company && (
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>— {item.company}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '24px' }}>
        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
          Total: <strong style={{ color: '#fff' }}>{items.length}</strong> testimonials
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setShowModal(false)} className="btn-icon">
                <FiPlus size={20} style={{ transform: 'rotate(45deg)' }} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input {...register('name', { required: true })} placeholder="Client name" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <input {...register('role')} placeholder="e.g. CEO" className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Company</label>
                <input {...register('company')} placeholder="Company name" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Photo</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0]
                      if (!file) return
                      try {
                        toast.loading('Uploading image...', { id: 'upload' })
                        const res = await adminApi.uploadImage(file, 'testimonials')
                        setValue('imageUrl', res.data.url)
                        toast.success('Image uploaded', { id: 'upload' })
                      } catch {
                        toast.error('Failed to upload image', { id: 'upload' })
                      }
                    }} 
                    className="form-input" 
                    style={{ flex: 1 }}
                  />
                  {currentImageUrl && (
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <img src={currentImageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
                <input type="hidden" {...register('imageUrl')} />
              </div>

              <div className="form-group">
                <label className="form-label">Rating</label>
                <select {...register('rating')} className="form-select">
                  {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea {...register('message', { required: true })} placeholder="Client testimonial..." rows={4} className="form-textarea" />
              </div>

              <div className="form-group">
                <label className="form-label">Display Order</label>
                <input {...register('displayOrder')} type="number" className="form-input" />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">{editing ? 'Update' : 'Add'} Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
