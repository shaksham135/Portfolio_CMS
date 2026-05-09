import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink, FiX, FiStar, FiCode } from 'react-icons/fi'
import { publicApi } from '../../api'

/* ── Demo Projects (shown when backend is offline) ── */
const DEMO_PROJECTS = [
  {
    id: 1,
    title: 'Portfolio CMS',
    description: 'Full-stack portfolio with Spring Boot backend, JWT auth, React frontend, and a full admin dashboard for dynamic content management.',
    techStack: '["Java","Spring Boot","React","MySQL","JWT","Tailwind CSS"]',
    features: '["JWT Authentication", "Dynamic Content Management", "Admin Dashboard"]',
    category: 'Full Stack',
    featured: true,
    githubUrl: 'https://github.com/shaksham',
    liveUrl: null,
    thumbnailUrl: null,
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.15))',
    icon: '🖥️',
  },
  {
    id: 2,
    title: 'Social Guardrail System',
    description: 'Spring Boot microservice simulating social media with Redis-backed anti-spam controls, real-time virality engine and batched notification system.',
    techStack: '["Java","Spring Boot","Redis","PostgreSQL","Docker"]',
    features: '["Anti-spam controls", "Real-time virality engine", "Batched notifications"]',
    category: 'Backend',
    featured: true,
    githubUrl: 'https://github.com/shaksham',
    liveUrl: null,
    thumbnailUrl: null,
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(59,130,246,0.15))',
    icon: '🛡️',
  },
  {
    id: 3,
    title: 'Amazon Review Intelligence',
    description: 'AI-powered Amazon product review analysis engine with sentiment scoring, competitive insights, multi-currency support, and PDF reporting.',
    techStack: '["Python","React","Spring Boot","Tailwind CSS","REST API"]',
    features: '["Sentiment scoring", "Competitive insights", "PDF reporting"]',
    category: 'Full Stack',
    featured: false,
    githubUrl: 'https://github.com/shaksham',
    liveUrl: null,
    thumbnailUrl: null,
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(239,68,68,0.12))',
    icon: '📊',
  },
  {
    id: 4,
    title: 'Restaurant Website',
    description: 'Premium, fully responsive restaurant website with glassmorphism design, animated menu, reservation form, and smooth scroll animations.',
    techStack: '["HTML","CSS","JavaScript","Framer Motion"]',
    category: 'Frontend',
    featured: false,
    githubUrl: 'https://github.com/shaksham',
    liveUrl: null,
    thumbnailUrl: null,
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(6,182,212,0.12))',
    icon: '🍽️',
  },
  {
    id: 5,
    title: 'Wellnest Health App',
    description: 'Full-stack wellness platform with user authentication, daily health tracking, goal setting, and detailed analytics dashboard.',
    techStack: '["Spring Boot","React","MySQL","JWT","Chart.js"]',
    category: 'Full Stack',
    featured: false,
    githubUrl: 'https://github.com/shaksham',
    liveUrl: null,
    thumbnailUrl: null,
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(236,72,153,0.12))',
    icon: '💚',
  },
  {
    id: 6,
    title: 'JWT Auth Microservice',
    description: 'Production-grade stateless authentication service with Spring Security, BCrypt, refresh tokens, and role-based access control.',
    techStack: '["Java","Spring Boot","Spring Security","JWT","MySQL"]',
    category: 'Backend',
    featured: false,
    githubUrl: 'https://github.com/shaksham',
    liveUrl: null,
    thumbnailUrl: null,
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(16,185,129,0.12))',
    icon: '🔐',
  },
]

const FILTERS = ['All', 'Backend', 'Full Stack', 'Frontend']

function parseTech(ts) {
  try { return JSON.parse(ts || '[]') } catch { return [] }
}

export default function Projects() {
  const [projects, setProjects] = useState(DEMO_PROJECTS)
  const [filtered, setFiltered] = useState(DEMO_PROJECTS)
  const [filter, setFilter]     = useState('All')
  const [selected, setSelected] = useState(null)
  const { ref, inView }         = useInView({ threshold: 0.05, triggerOnce: true })

  useEffect(() => {
    publicApi.getProjects()
      .then(r => { 
        setProjects(r.data || [])
        setFiltered(r.data || []) 
      })
      .catch(() => {
        console.warn("Backend offline, using mock data for Projects")
      })
  }, [])

  useEffect(() => {
    setFiltered(filter === 'All' ? projects : projects.filter(p => p.category === filter))
  }, [filter, projects])

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="blob w-80 h-80 top-0 right-0 bg-blue-600" style={{ animationDelay: '1s' }} />

      <div className="container-custom">

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <p style={{
            color: '#3B82F6', fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem',
          }}>
            Portfolio
          </p>
          <h2 className="section-title gradient-text">Featured Projects</h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            maxWidth: '480px',
            margin: '0.75rem auto 0',
            lineHeight: 1.65,
            textAlign: 'center',
          }}>
            Real-world applications built with production-grade architecture and clean code.
          </p>
        </motion.div>

        {/* ── Filter Tabs ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '2rem',
          }}
        >
          {FILTERS.map(f => {
            const isActive = filter === f
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: '100px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: isActive ? '1px solid rgba(59,130,246,0.55)' : '1px solid var(--glass-border)',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(59,130,246,0.28), rgba(139,92,246,0.18))'
                    : 'var(--glass-bg)',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  boxShadow: isActive ? '0 0 14px rgba(59,130,246,0.25)' : 'none',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {f}
              </button>
            )
          })}
        </motion.div>

        {/* ── Grid ──────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '16px',
            }}
          >
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.07, 0.42) }}
                whileHover={{ y: -7 }}
                onClick={() => setSelected(project)}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(12px)',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(59,130,246,0.12)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  height: '150px',
                  background: project.gradient || 'linear-gradient(135deg,rgba(59,130,246,0.18),rgba(139,92,246,0.12))',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  {project.thumbnailUrl ? (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ fontSize: '3rem', opacity: 0.7 }}>
                      {project.icon || '🖥️'}
                    </span>
                  )}

                  {/* Badges */}
                  {project.featured && (
                    <div style={{
                      position: 'absolute', top: '10px', left: '10px',
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      padding: '2px 8px', borderRadius: '100px',
                      background: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.35)',
                      color: '#FBBF24', fontSize: '0.68rem', fontWeight: 600,
                    }}>
                      <FiStar size={9} style={{ fill: '#FBBF24' }} /> Featured
                    </div>
                  )}
                  {project.category && (
                    <div style={{
                      position: 'absolute', top: '10px', right: '10px',
                      padding: '2px 8px', borderRadius: '100px',
                      background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.15)',
                      color: '#ccc', fontSize: '0.68rem', fontWeight: 500,
                      backdropFilter: 'blur(6px)',
                    }}>
                      {project.category}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: '1rem' }}>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.4rem',
                    lineHeight: 1.3,
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.78rem',
                    lineHeight: 1.6,
                    marginBottom: '0.75rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '0.75rem' }}>
                    {parseTech(project.techStack).slice(0, 4).map(t => (
                      <span key={t} style={{
                        fontSize: '0.65rem', fontWeight: 600,
                        padding: '2px 8px', borderRadius: '100px',
                        background: 'rgba(59,130,246,0.1)',
                        border: '1px solid rgba(59,130,246,0.25)',
                        color: '#60A5FA',
                      }}>
                        {t}
                      </span>
                    ))}
                    {parseTech(project.techStack).length > 4 && (
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 600,
                        padding: '2px 8px', borderRadius: '100px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-muted)',
                      }}>
                        +{parseTech(project.techStack).length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div
                    style={{ display: 'flex', gap: '12px' }}
                    onClick={e => e.stopPropagation()}
                  >
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          fontSize: '0.75rem', color: 'var(--text-muted)',
                          textDecoration: 'none', transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
                      >
                        <FiGithub size={13} /> Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          fontSize: '0.75rem', color: '#60A5FA',
                          textDecoration: 'none', transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#93C5FD' }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#60A5FA' }}
                      >
                        <FiExternalLink size={13} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '4rem 0' }}>
            <FiCode size={32} style={{ margin: '0 auto 1rem', opacity: 0.3, display: 'block' }} />
            No projects in this category yet.
          </div>
        )}

      </div>

      {/* ── Project Detail Modal ─────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: '600px',
                maxHeight: '90vh', overflowY: 'auto',
                borderRadius: '20px',
                border: '1px solid var(--glass-border)',
                background: 'var(--bg-secondary)',
                backdropFilter: 'blur(20px)',
                padding: '1.5rem',
              }}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {selected.title}
                  </h3>
                  {selected.category && (
                    <span style={{ color: '#60A5FA', fontSize: '0.8rem' }}>{selected.category}</span>
                  )}
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-bg)',
                    color: 'var(--text-muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FiX size={15} />
                </button>
              </div>

              {/* Thumbnail */}
              {selected.thumbnailUrl ? (
                <img
                  src={selected.thumbnailUrl}
                  alt={selected.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }}
                />
              ) : (
                <div style={{
                  height: '160px', borderRadius: '12px', marginBottom: '1rem',
                  background: selected.gradient || 'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.15))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '4rem',
                }}>
                  {selected.icon || '🖥️'}
                </div>
              )}

              {/* Description */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                {selected.description}
              </p>

              {/* Features */}
              {selected.features && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
                    Key Features
                  </h4>
                  <ul style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', paddingLeft: '1.25rem', listStyleType: 'disc' }}>
                    {(() => {
                      try {
                        return JSON.parse(selected.features).map((feat, index) => (
                          <li key={index} style={{ marginBottom: '0.25rem' }}>{feat}</li>
                        ));
                      } catch (e) {
                        return <li>{selected.features}</li>; // Fallback if not JSON
                      }
                    })()}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                {parseTech(selected.techStack).map(t => (
                  <span key={t} style={{
                    fontSize: '0.78rem', fontWeight: 600,
                    padding: '4px 12px', borderRadius: '100px',
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.3)',
                    color: '#60A5FA',
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {selected.githubUrl && (
                  <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '0.82rem' }}>
                    <FiGithub size={14} /> View Code
                  </a>
                )}
                {selected.liveUrl && (
                  <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.82rem' }}>
                    <FiExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
