import { useEffect, useState } from 'react'
import { 
  FiPlus, FiEdit2, FiTrash2, FiCpu, FiLayout, FiDatabase, 
  FiTool, FiCode
} from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { adminApi } from '../../api'
import '../../styles/admin-common.css'

const CATEGORIES = [
  { id: 'BACKEND', label: 'Backend', icon: FiCpu, color: 'blue' },
  { id: 'FRONTEND', label: 'Frontend', icon: FiLayout, color: 'violet' },
  { id: 'DATABASE', label: 'Database', icon: FiDatabase, color: 'cyan' },
  { id: 'TOOLS', label: 'Tools', icon: FiTool, color: 'emerald' },
]

const getColorClasses = (color) => {
  const colors = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', fill: 'bg-blue-500' },
    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', fill: 'bg-violet-500' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', fill: 'bg-cyan-500' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', fill: 'bg-emerald-500' },
  }
  return colors[color] || colors.blue
}

export default function AdminSkills() {
  const [skills, setSkills] = useState([])
  const [activeTab, setActiveTab] = useState('BACKEND')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, reset } = useForm()

  const load = () => {
    setLoading(true)
    adminApi.getSkills()
      .then(r => setSkills(r.data))
      .catch(() => toast.error('Failed to load skills'))
      .finally(() => setLoading(false))
  }
  
  useEffect(() => { load() }, [])

  const openCreate = () => { 
    setEditing(null)
    reset({ name: '', icon: '', category: activeTab, level: 80, displayOrder: 0 })
    setShowModal(true)
  }
  
  const openEdit = (s) => { 
    setEditing(s)
    reset(s)
    setShowModal(true)
  }

  const onSubmit = async (data) => {
    try {
      const payload = { 
        ...data, 
        level: parseInt(data.level) || 80, 
        displayOrder: parseInt(data.displayOrder) || 0 
      }
      if (editing) {
        await adminApi.updateSkill(editing.id, payload)
        toast.success('Skill updated')
      } else {
        await adminApi.createSkill(payload)
        toast.success('Skill added')
      }
      setShowModal(false)
      load()
    } catch {
      toast.error('Operation failed')
    }
  }

  const del = async (id) => {
    if (!confirm('Delete this skill?')) return
    try {
      await adminApi.deleteSkill(id)
      toast.success('Skill deleted')
      load()
    } catch {
      toast.error('Delete failed')
    }
  }

  const filteredSkills = skills.filter(s => s.category === activeTab)
  const activeCategory = CATEGORIES.find(c => c.id === activeTab)

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Skills</h2>
          <p className="page-subtitle">Manage your technical skills</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <FiPlus size={18} />
          Add Skill
        </button>
      </div>

      {/* Category Tabs */}
      <div className="tabs">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const count = skills.filter(s => s.category === cat.id).length
          const isActive = activeTab === cat.id
          
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`tab ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{cat.label}</span>
              <span style={{ 
                padding: '2px 8px', 
                borderRadius: '999px', 
                background: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                fontSize: '0.75rem'
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="card-grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="data-card skeleton" style={{ height: '160px' }} />
          ))}
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <FiCode size={32} />
          </div>
          <h3 className="empty-title">No skills in this category</h3>
          <p className="empty-text">Add your first {activeCategory?.label} skill</p>
        </div>
      ) : (
        <div className="card-grid">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="data-card fade-in">
              <div className="skill-item" style={{ padding: 0, background: 'transparent', border: 'none' }}>
                <div className={`skill-icon stat-icon-wrapper ${activeCategory?.color || 'blue'}`}>
                  {skill.icon ? (
                    <img 
                      src={`https://cdn.simpleicons.org/${skill.icon}/ffffff`} 
                      alt={skill.name} 
                      style={{ width: '24px', height: '24px' }}
                    />
                  ) : (
                    <FiCode className={`stat-icon ${activeCategory?.color || 'blue'}`} />
                  )}
                </div>
                <div className="skill-info">
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-level">
                    <div className="progress-bar" style={{ flex: 1 }}>
                      <div 
                        className={`progress-fill ${activeCategory?.color || 'blue'}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="skill-level-text">{skill.level}%</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button onClick={() => openEdit(skill)} className="btn-edit">
                  <FiEdit2 size={16} />
                </button>
                <button onClick={() => del(skill.id)} className="btn-danger">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '24px' }}>
        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
          Total: <strong style={{ color: '#fff' }}>{skills.length}</strong> skills
        </p>
        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
          {activeCategory?.label}: <strong style={{ color: '#fff' }}>{filteredSkills.length}</strong>
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editing ? 'Edit Skill' : 'Add Skill'}</h3>
              <button onClick={() => setShowModal(false)} className="btn-icon">
                <FiPlus size={20} style={{ transform: 'rotate(45deg)' }} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="form-label">Skill Name</label>
                <input 
                  {...register('name', { required: true })} 
                  placeholder="e.g. React.js"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Icon (SimpleIcon slug)</label>
                <input 
                  {...register('icon')} 
                  placeholder="react, nodedotjs"
                  className="form-input"
                />
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>
                  Find icons at simpleicons.org
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select {...register('category')} className="form-select">
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Level (0-100)</label>
                  <input 
                    {...register('level')} 
                    type="number" 
                    min="0" 
                    max="100"
                    className="form-input"
                  />
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
                  {editing ? 'Update' : 'Add'} Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
