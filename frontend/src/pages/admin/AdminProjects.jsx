import { useState, useEffect } from 'react'
import { 
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiExternalLink, FiGithub, FiStar, 
  FiFolder, FiGrid, FiList, FiImage
} from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { adminApi } from '../../api'
import toast from 'react-hot-toast'
import '../../styles/admin-common.css'

const CATEGORY_COLORS = {
  'Full Stack': 'blue',
  'Backend': 'violet',
  'Frontend': 'emerald',
  'Mobile': 'amber'
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState('list')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, setValue, watch } = useForm()
  const currentThumbnailUrl = watch('thumbnailUrl')

  const fetchProjects = async () => {
    try {
      const res = await adminApi.getProjects()
      setProjects(res.data)
    } catch {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    adminApi.getProjects()
      .then(res => setProjects(res.data))
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setLoading(false))
  }, [])

  const openCreate = () => {
    setEditing(null)
    reset({ title: '', description: '', category: 'Full Stack', thumbnailUrl: '', liveUrl: '', githubUrl: '', featured: false, techStack: '', features: '' })
    setShowModal(true)
  }

  const openEdit = (p) => {
    setEditing(p)
    const formattedProject = { ...p }
    try {
      if (p.techStack) {
        formattedProject.techStack = JSON.parse(p.techStack).join(', ')
      }
      if (p.features) {
        formattedProject.features = JSON.parse(p.features).join(', ')
      }
    } catch (e) {
      console.error('Failed to parse JSON', e)
    }
    reset(formattedProject)
    setShowModal(true)
  }

  const onSubmit = async (data) => {
    try {
      const payload = { ...data }
      if (data.techStack) {
        payload.techStack = JSON.stringify(data.techStack.split(',').map(s => s.trim()).filter(Boolean))
      } else {
        payload.techStack = '[]'
      }
      if (data.features) {
        payload.features = JSON.stringify(data.features.split(',').map(s => s.trim()).filter(Boolean))
      } else {
        payload.features = '[]'
      }

      if (editing) {
        await adminApi.updateProject(editing.id, payload)
        toast.success('Project updated')
      } else {
        await adminApi.createProject(payload)
        toast.success('Project added')
      }
      setShowModal(false)
      fetchProjects()
    } catch {
      toast.error('Operation failed')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return
    try {
      await adminApi.deleteProject(id)
      toast.success('Project deleted')
      fetchProjects()
    } catch {
      toast.error('Failed to delete')
    }
  }

  const filtered = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || (filter === 'featured' && p.featured)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Projects</h2>
          <p className="page-subtitle">Manage your portfolio projects</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <FiPlus size={18} />
          Add Project
        </button>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-actions">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-select"
          >
            <option value="all">All Projects</option>
            <option value="featured">Featured Only</option>
          </select>
          
          <div className="view-toggle">
            <button 
              onClick={() => setViewMode('grid')}
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            >
              <FiGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            >
              <FiList size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="card-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="data-card skeleton" style={{ height: '200px' }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <FiSearch size={32} />
          </div>
          <h3 className="empty-title">No projects found</h3>
          <p className="empty-text">Try adjusting your search or filters</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="card-grid">
          {filtered.map((p) => (
            <div key={p.id} className="data-card fade-in">
              {p.featured && (
                <div className="featured-badge">
                  <FiStar size={12} />
                  Featured
                </div>
              )}
              <div style={{ 
                height: '160px', 
                background: '#0a0a0f',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                overflow: 'hidden'
              }}>
                {p.thumbnailUrl ? (
                  <img src={p.thumbnailUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <FiImage size={40} style={{ color: '#374151' }} />
                )}
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>{p.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>
                {p.description?.substring(0, 80) || 'No description'}...
              </p>
              <div style={{ marginBottom: '16px' }}>
                <span className={`category-badge ${CATEGORY_COLORS[p.category] || 'blue'}`}>
                  {p.category || 'Uncategorized'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="link-btn">
                    <FiExternalLink size={16} />
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="link-btn">
                    <FiGithub size={16} />
                  </a>
                )}
                <button onClick={() => openEdit(p)} className="btn-edit">
                  <FiEdit2 size={16} />
                </button>
                <button onClick={() => handleDelete(p.id)} className="btn-danger">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="list-view">
          {filtered.map((p) => (
            <div key={p.id} className="list-item fade-in">
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                background: '#0a0a0f',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden'
              }}>
                {p.thumbnailUrl ? (
                  <img src={p.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <FiFolder size={20} style={{ color: '#4b5563' }} />
                )}
              </div>
              <div className="list-item-content">
                <div className="list-item-title">{p.title}</div>
                <div className="list-item-subtitle">{p.description?.substring(0, 60)}...</div>
              </div>
              <span className={`category-badge ${CATEGORY_COLORS[p.category] || 'blue'}`}>
                {p.category || 'Uncategorized'}
              </span>
              <div className="list-item-actions">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-icon">
                    <FiExternalLink size={18} />
                  </a>
                )}
                <button onClick={() => openEdit(p)} className="btn-edit">
                  <FiEdit2 size={16} />
                </button>
                <button onClick={() => handleDelete(p.id)} className="btn-danger">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px' }}>
        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
          Showing <strong style={{ color: '#fff' }}>{filtered.length}</strong> of{' '}
          <strong style={{ color: '#fff' }}>{projects.length}</strong> projects
        </p>
        {filter !== 'all' && (
          <button onClick={() => setFilter('all')} className="btn-secondary">
            Clear filters
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editing ? 'Edit Project' : 'Add Project'}</h3>
              <button onClick={() => setShowModal(false)} className="btn-icon">
                <FiPlus size={20} style={{ transform: 'rotate(45deg)' }} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input 
                  {...register('title', { required: true })} 
                  placeholder="e.g. E-Commerce Platform"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  {...register('description')} 
                  placeholder="Describe your project..."
                  className="form-input"
                  style={{ minHeight: '100px' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tech Stack (comma separated)</label>
                <input 
                  {...register('techStack')} 
                  placeholder="e.g. React, Spring Boot, PostgreSQL"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Key Features (comma separated)</label>
                <textarea 
                  {...register('features')} 
                  placeholder="e.g. Real-time chat, OAuth2 login"
                  className="form-input"
                  style={{ minHeight: '80px' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select {...register('category')} className="form-select">
                  <option value="Full Stack">Full Stack</option>
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Live URL</label>
                  <input {...register('liveUrl')} placeholder="https://..." className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input {...register('githubUrl')} placeholder="https://github.com/..." className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Thumbnail</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0]
                      if (!file) return
                      try {
                        toast.loading('Uploading image...', { id: 'upload' })
                        const res = await adminApi.uploadImage(file, 'projects')
                        setValue('thumbnailUrl', res.data.url)
                        toast.success('Image uploaded', { id: 'upload' })
                      } catch {
                        toast.error('Failed to upload image', { id: 'upload' })
                      }
                    }} 
                    className="form-input" 
                    style={{ flex: 1 }}
                  />
                  {currentThumbnailUrl && (
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <img src={currentThumbnailUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
                <input type="hidden" {...register('thumbnailUrl')} />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" {...register('featured')} />
                  <span>Featured Project</span>
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editing ? 'Update' : 'Add'} Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
