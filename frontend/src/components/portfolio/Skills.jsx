import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { publicApi } from '../../api'

/* ── Demo data shown when backend is offline ── */
const DEMO_SKILLS = {
  BACKEND: [
    { id: 1,  name: 'Java',            icon: 'java',    level: 90 },
    { id: 2,  name: 'Spring Boot',     icon: 'spring',  level: 88 },
    { id: 3,  name: 'Spring Security', icon: 'spring',  level: 82 },
    { id: 4,  name: 'REST APIs',       icon: 'api',     level: 90 },
    { id: 5,  name: 'JWT Auth',        icon: 'jwt',     level: 85 },
    { id: 6,  name: 'Hibernate / JPA', icon: 'java',    level: 80 },
  ],
  FRONTEND: [
    { id: 7,  name: 'React',           icon: 'react',       level: 82 },
    { id: 8,  name: 'JavaScript',      icon: 'javascript',  level: 85 },
    { id: 9,  name: 'Tailwind CSS',    icon: 'tailwind',    level: 80 },
    { id: 10, name: 'HTML / CSS',      icon: 'html',        level: 90 },
  ],
  DATABASE: [
    { id: 11, name: 'MySQL',           icon: 'mysql',       level: 85 },
    { id: 12, name: 'PostgreSQL',      icon: 'postgresql',  level: 75 },
    { id: 13, name: 'Redis',           icon: 'redis',       level: 70 },
  ],
  TOOLS: [
    { id: 14, name: 'Git',            icon: 'git',     level: 88 },
    { id: 15, name: 'Docker',         icon: 'docker',  level: 72 },
    { id: 16, name: 'Maven',          icon: 'maven',   level: 82 },
  ],
}

/* ── Category meta ── */
const CATS = {
  BACKEND:  { label: 'Backend',  emoji: '⚙️',  accent: '#3B82F6' },
  FRONTEND: { label: 'Frontend', emoji: '🎨',  accent: '#8B5CF6' },
  DATABASE: { label: 'Database', emoji: '🗄️', accent: '#06B6D4' },
  TOOLS:    { label: 'Tools',    emoji: '🔧',  accent: '#10B981' },
}

/* ── Skill icon map ── */
function skillEmoji(icon = '') {
  const m = {
    java: '☕', spring: '🌱', react: '⚛️', javascript: '🟨',
    typescript: '🔷', tailwind: '🎨', html: '🌐', css: '🎨',
    mysql: '🐬', postgresql: '🐘', redis: '🔴', docker: '🐳',
    git: '📦', maven: '📋', jwt: '🔐', api: '🔌',
    node: '💚', python: '🐍', aws: '☁️', mongodb: '🍃',
  }
  return m[icon.toLowerCase()] || '💻'
}

/* ── Progress bar colors per category ── */
const BAR_GRAD = {
  BACKEND:  'linear-gradient(90deg,#3B82F6,#60A5FA)',
  FRONTEND: 'linear-gradient(90deg,#8B5CF6,#A78BFA)',
  DATABASE: 'linear-gradient(90deg,#06B6D4,#22D3EE)',
  TOOLS:    'linear-gradient(90deg,#10B981,#34D399)',
}

export default function Skills() {
  const [skills, setSkills]     = useState(DEMO_SKILLS)
  const [active, setActive]     = useState('BACKEND')
  const { ref, inView }         = useInView({ threshold: 0.05, triggerOnce: true })

  useEffect(() => {
    publicApi.getSkills()
      .then(r => {
        const d = r.data || {}
        setSkills(d)
        if (Object.keys(d).length > 0) {
          setActive(Object.keys(d)[0])
        } else {
          setActive('')
        }
      })
      .catch(() => {
        console.warn("Backend offline, using mock data for Skills")
      })
  }, [])

  const cats    = Object.keys(skills)
  const current = skills[active] || []
  const accent  = CATS[active]?.accent || '#3B82F6'

  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Blobs */}
      <div className="blob w-72 h-72 -bottom-16 -left-16 bg-blue-600" style={{ animationDelay: '2s' }} />
      <div className="blob w-56 h-56 top-10 -right-10 bg-purple-500" style={{ animationDelay: '5s' }} />

      <div className="container-custom">

        {/* ── Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <p style={{
            color: '#3B82F6', fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem',
          }}>
            Technical Arsenal
          </p>
          <h2 className="section-title gradient-text">Skills &amp; Technologies</h2>
          <p style={{
            color: 'var(--text-muted)', marginTop: '0.75rem',
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            maxWidth: '480px', margin: '0.75rem auto 0',
            lineHeight: 1.6, textAlign: 'center',
          }}>
            Tools and technologies I use to build production-ready applications
          </p>
        </motion.div>

        {/* ── Category Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '2rem',
          }}
        >
          {cats.map(cat => {
            const meta    = CATS[cat] || { label: cat, emoji: '💡', accent: '#3B82F6' }
            const isActive = active === cat
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '100px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: isActive ? `1px solid ${meta.accent}55` : '1px solid var(--glass-border)',
                  background: isActive
                    ? `linear-gradient(135deg, ${meta.accent}28, ${meta.accent}10)`
                    : 'var(--glass-bg)',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  boxShadow: isActive ? `0 0 14px ${meta.accent}30` : 'none',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>{meta.emoji}</span>
                <span>{meta.label}</span>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '1px 6px',
                  borderRadius: '100px',
                  background: isActive ? `${meta.accent}30` : 'rgba(255,255,255,0.08)',
                  color: isActive ? '#ddd' : 'var(--text-muted)',
                  fontWeight: 700,
                }}>
                  {(skills[cat] || []).length}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* ── Skill Cards Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              /* 2 cols on phone, 3 on small tablet, 4 on desktop, 6 if >1200 */
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '12px',
            }}
          >
            {current.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.06, 0.36) }}
                whileHover={{ y: -6, scale: 1.04 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1.1rem 0.75rem',
                  borderRadius: '14px',
                  border: `1px solid ${accent}22`,
                  background: `linear-gradient(145deg, ${accent}0d, var(--glass-bg))`,
                  backdropFilter: 'blur(10px)',
                  cursor: 'default',
                  transition: 'border-color 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}55` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${accent}22` }}
              >
                {/* Emoji Icon */}
                <div style={{
                  width: '48px', height: '48px',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.6rem', lineHeight: 1,
                  background: `${accent}18`,
                  marginBottom: '0.6rem',
                  flexShrink: 0,
                }}>
                  {skillEmoji(skill.icon || skill.name)}
                </div>

                {/* Name */}
                <p style={{
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  textAlign: 'center',
                  marginBottom: '0.65rem',
                  lineHeight: 1.3,
                  wordBreak: 'break-word',
                  width: '100%',
                }}>
                  {skill.name}
                </p>

                {/* Progress bar */}
                <div style={{
                  width: '100%',
                  height: '4px',
                  borderRadius: '100px',
                  background: 'rgba(255,255,255,0.07)',
                  overflow: 'hidden',
                  marginBottom: '4px',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.1, delay: Math.min(i * 0.06, 0.36) + 0.2, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      borderRadius: '100px',
                      background: BAR_GRAD[active] || BAR_GRAD.BACKEND,
                    }}
                  />
                </div>

                {/* Level */}
                <span style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  marginTop: '2px',
                }}>
                  {skill.level}%
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {current.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>
            No skills in this category yet.
          </p>
        )}

      </div>
    </section>
  )
}
