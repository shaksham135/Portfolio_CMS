import { useEffect, useState } from 'react'
import { FiSave, FiUser, FiInfo, FiLink, FiMapPin, FiMail, FiPhone, FiGithub, FiLinkedin, FiInstagram, FiMessageSquare, FiActivity } from 'react-icons/fi'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { adminApi } from '../../api'
import '../../styles/admin-common.css'

const FIELDS = [
  { name: 'intro', label: 'Intro / Greeting', placeholder: "Hi! I'm Shaksham 👋", type: 'text', icon: FiUser, section: 'bio', color: 'blue' },
  { name: 'summary', label: 'Career Summary', placeholder: 'Passionate developer...', type: 'textarea', icon: FiInfo, section: 'bio', color: 'blue' },
  { name: 'currentFocus', label: 'Current Focus', placeholder: 'Building with Spring Boot...', type: 'textarea', icon: FiActivity, section: 'bio', color: 'blue' },
  { name: 'resumeUrl', label: 'Resume URL', placeholder: 'https://...', type: 'url', icon: FiLink, section: 'links', color: 'violet' },
  { name: 'profileImageUrl', label: 'Profile Image URL', placeholder: 'https://...', type: 'url', icon: FiLink, section: 'links', color: 'violet' },
  { name: 'location', label: 'Location', placeholder: 'India', type: 'text', icon: FiMapPin, section: 'contact', color: 'emerald' },
  { name: 'email', label: 'Email', placeholder: 'email@example.com', type: 'email', icon: FiMail, section: 'contact', color: 'emerald' },
  { name: 'phone', label: 'Phone', placeholder: '+91...', type: 'text', icon: FiPhone, section: 'contact', color: 'emerald' },
  { name: 'githubUrl', label: 'GitHub URL', placeholder: 'https://github.com/...', type: 'url', icon: FiGithub, section: 'social', color: 'cyan' },
  { name: 'linkedinUrl', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...', type: 'url', icon: FiLinkedin, section: 'social', color: 'cyan' },
  { name: 'instagramUrl', label: 'Instagram URL', placeholder: 'https://instagram.com/...', type: 'url', icon: FiInstagram, section: 'social', color: 'cyan' },
  { name: 'whatsappNumber', label: 'WhatsApp Number', placeholder: '+91...', type: 'text', icon: FiMessageSquare, section: 'contact', color: 'emerald' },
]

const SECTIONS = {
  bio: { title: 'About You', icon: FiInfo, color: 'blue' },
  links: { title: 'Links', icon: FiLink, color: 'violet' },
  contact: { title: 'Contact', icon: FiMail, color: 'emerald' },
  social: { title: 'Social', icon: FiGithub, color: 'cyan' }
}

export default function AdminAbout() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, reset, setValue, control } = useForm()

  useEffect(() => {
    adminApi.getAbout()
      .then(r => {
        reset(r.data)
        setLoading(false)
      })
      .catch(() => {
        toast.error('Failed to load profile')
        setLoading(false)
      })
  }, [reset])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      await adminApi.updateAbout(data)
      toast.success('Profile updated')
    } catch {
      toast.error('Update failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-container" style={{ height: '300px' }}>
        <div className="loading-spinner"></div>
      </div>
    )
  }

  const InputField = ({ field }) => {
    const currentUrl = useWatch({ control, name: field.name })
    
    return (
      <div className="form-group" style={{ marginBottom: '16px' }}>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <field.icon size={14} />
          {field.label}
        </label>
        {field.type === 'textarea' ? (
          <textarea {...register(field.name)} placeholder={field.placeholder} rows={field.name === 'summary' ? 4 : 3} className="form-textarea" />
        ) : field.name === 'profileImageUrl' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input 
              type="file" 
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0]
                if (!file) return
                try {
                  toast.loading('Uploading image...', { id: 'upload' })
                  const res = await adminApi.uploadImage(file, 'about')
                  setValue(field.name, res.data.url)
                  toast.success('Image uploaded', { id: 'upload' })
                } catch {
                  toast.error('Failed to upload image', { id: 'upload' })
                }
              }} 
              className="form-input" 
              style={{ flex: 1 }}
            />
            {currentUrl && (
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src={currentUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <input type="hidden" {...register(field.name)} />
          </div>
        ) : (
          <input {...register(field.name)} type={field.type} placeholder={field.placeholder} className="form-input" />
        )}
      </div>
    )
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="page-title">Profile</h2>
          <p className="page-subtitle">Manage your about information</p>
        </div>
        <button type="submit" form="about-form" disabled={saving} className="btn-primary" style={{ opacity: saving ? 0.7 : 1 }}>
          <FiSave size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <form id="about-form" onSubmit={handleSubmit(onSubmit)} className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {Object.entries(SECTIONS).map(([key, section]) => {
          const Icon = section.icon
          return (
            <div key={key} className="panel-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '20px' }}>
                <Icon className={`stat-icon ${section.color}`} size={20} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#fff' }}>{section.title}</h3>
              </div>
              {FIELDS.filter(f => f.section === key).map(field => (
                <InputField key={field.name} field={field} />
              ))}
            </div>
          )
        })}
      </form>

      {/* Preview hint */}
      <div className="tip-card" style={{ marginTop: '24px' }}>
        <p className="tip-text">Changes will be reflected immediately on your public portfolio page.</p>
      </div>
    </div>
  )
}
