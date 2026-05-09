import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiBook, FiCode, FiAward, FiCalendar, FiMapPin } from 'react-icons/fi'
import { publicApi } from '../../api'

/* ─────────────────────────────────────────────────────────
   Type Config — icon, colour, label, dot colour
───────────────────────────────────────────────────────── */
const TYPE_CONFIG = {
  LEARNING:   { Icon: FiBook,     accent: '#06B6D4', label: 'Learning',   dot: '#06B6D4', bg: 'rgba(6,182,212,0.1)',   border: 'rgba(6,182,212,0.3)'   },
  FREELANCE:  { Icon: FiCode,     accent: '#8B5CF6', label: 'Freelance',  dot: '#8B5CF6', bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.3)'  },
  INTERNSHIP: { Icon: FiBriefcase,accent: '#3B82F6', label: 'Internship', dot: '#3B82F6', bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.3)'  },
  JOB:        { Icon: FiBriefcase,accent: '#10B981', label: 'Full-time',  dot: '#10B981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.3)'  },
  PROJECT:    { Icon: FiAward,    accent: '#F59E0B', label: 'Project',    dot: '#F59E0B', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.3)'  },
}

/* ─────────────────────────────────────────────────────────
   Rich demo data
───────────────────────────────────────────────────────── */
const DEMO_EXPERIENCE = [
  {
    id: 1,
    title: 'Java Full Stack Development',
    company: 'Self-Learning / Personal',
    type: 'LEARNING',
    startDate: '2023-01-01',
    endDate: null,
    location: 'Remote, India',
    description: 'Deep-dived into Java ecosystem — Spring Boot, Spring Security, JPA/Hibernate, REST APIs, and MySQL. Built 15+ production-grade applications from backend APIs to full-stack portals.',
    tags: ['Java', 'Spring Boot', 'MySQL', 'React', 'JWT'],
  },
  {
    id: 2,
    title: 'Freelance Full Stack Developer',
    company: 'Independent Clients',
    type: 'FREELANCE',
    startDate: '2024-01-01',
    endDate: null,
    location: 'Remote',
    description: 'Delivered custom web solutions for multiple clients — ranging from premium portfolio websites and admin CMS systems to scalable REST APIs and Spring Boot microservices.',
    tags: ['Spring Boot', 'React', 'Tailwind CSS', 'MySQL'],
  },
  {
    id: 3,
    title: 'Premium Portfolio CMS',
    company: 'Open Source / Personal Project',
    type: 'PROJECT',
    startDate: '2024-06-01',
    endDate: '2024-08-01',
    location: 'Remote',
    description: 'Built a production-grade developer portfolio with a secure Spring Boot backend, JWT authentication, Cloudinary media uploads, and a React admin dashboard for full content management.',
    tags: ['Spring Boot', 'React', 'JWT', 'Cloudinary', 'MySQL'],
  },
  {
    id: 4,
    title: 'Microservices & Cloud Architecture',
    company: 'Self-Learning',
    type: 'LEARNING',
    startDate: '2024-09-01',
    endDate: null,
    location: 'Remote',
    description: 'Currently exploring Docker, Redis caching, PostgreSQL advanced features, Spring Cloud, and cloud-native deployment patterns on Render and Railway.',
    tags: ['Docker', 'Redis', 'PostgreSQL', 'Spring Cloud'],
  },
]

/* ─────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────── */
function fmtDate(d) {
  if (!d) return 'Present'
  try { return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) } catch { return d }
}

function calcDuration(start, end) {
  if (!start) return ''
  const s = new Date(start)
  const e = end ? new Date(end) : new Date()
  let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
  if (months < 1) months = 1
  const years  = Math.floor(months / 12)
  const rem    = months % 12
  const parts  = []
  if (years > 0)  parts.push(`${years}y`)
  if (rem > 0)    parts.push(`${rem}m`)
  return parts.join(' ')
}

/* ─────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────── */
export default function Experience() {
  const [items, setItems]   = useState(DEMO_EXPERIENCE)
  const { ref, inView }     = useInView({ threshold: 0.05, triggerOnce: true })

  useEffect(() => {
    publicApi.getExperience()
      .then(r => setItems(r.data || []))
      .catch(() => {
        console.warn("Backend offline, using mock data for Experience")
      })
  }, [])

  return (
    <section
      id="experience"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background blobs */}
      <div className="blob w-80 h-80 top-0 -right-20 bg-purple-600" style={{ animationDelay: '2s' }} />
      <div className="blob w-64 h-64 bottom-0 -left-10 bg-blue-600" style={{ animationDelay: '5s' }} />

      <div className="container-custom">

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{
            color: '#3B82F6', fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem',
          }}>
            My Journey
          </p>
          <h2 className="section-title gradient-text">Experience &amp; Timeline</h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            maxWidth: '460px',
            margin: '0.75rem auto 0',
            lineHeight: 1.65,
            textAlign: 'center',
          }}>
            My learning path and project milestones in the world of software development
          </p>
        </motion.div>

        {/* ── Timeline ───────────────────────────────────── */}
        <div style={{ position: 'relative', maxWidth: '760px', margin: '0 auto' }}>

          {/* Central vertical line */}
          <div style={{
            position: 'absolute',
            /* mobile: left-aligned line; desktop: centered */
            left: '20px',
            top: 0, bottom: 0,
            width: '2px',
            background: 'linear-gradient(180deg, rgba(59,130,246,0.7) 0%, rgba(139,92,246,0.5) 50%, transparent 100%)',
            borderRadius: '1px',
          }}
          className="md-center-line"
          />

          {items.map((item, i) => {
            const cfg      = TYPE_CONFIG[item.type] || TYPE_CONFIG.LEARNING
            const TypeIcon = cfg.Icon
            const dur      = calcDuration(item.startDate, item.endDate)

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                style={{
                  position: 'relative',
                  /* mobile: always shift right of left line */
                  paddingLeft: '52px',
                  marginBottom: i < items.length - 1 ? '2rem' : 0,
                }}
              >
                {/* ── Timeline Dot ── */}
                <div style={{
                  position: 'absolute',
                  left: '12px',
                  top: '20px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: cfg.dot,
                  border: `3px solid var(--bg-secondary)`,
                  boxShadow: `0 0 0 3px ${cfg.dot}30, 0 0 16px ${cfg.dot}50`,
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }} />

                {/* ── Card ── */}
                <div
                  style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${cfg.border}`,
                    borderRadius: '16px',
                    padding: '1.25rem 1.4rem',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = cfg.accent
                    e.currentTarget.style.boxShadow = `0 8px 32px ${cfg.dot}20`
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = cfg.border
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'none'
                  }}
                >
                  {/* Row 1: Type badge + Duration */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: '8px',
                    marginBottom: '0.65rem',
                  }}>
                    {/* Type badge */}
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      padding: '3px 10px', borderRadius: '100px',
                      background: cfg.bg, border: `1px solid ${cfg.border}`,
                      fontSize: '0.7rem', fontWeight: 700,
                      color: cfg.accent,
                    }}>
                      <TypeIcon size={11} />
                      {cfg.label}
                    </div>

                    {/* Date range + duration */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      color: 'var(--text-muted)', fontSize: '0.72rem',
                    }}>
                      <FiCalendar size={11} />
                      <span>{fmtDate(item.startDate)} — {fmtDate(item.endDate)}</span>
                      {dur && (
                        <span style={{
                          padding: '1px 7px', borderRadius: '100px',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid var(--glass-border)',
                          fontWeight: 600,
                        }}>
                          {dur}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Title */}
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                    color: 'var(--text-primary)',
                    marginBottom: '3px',
                    lineHeight: 1.3,
                  }}>
                    {item.title}
                  </h3>

                  {/* Row 3: Company + Location */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    flexWrap: 'wrap', gap: '10px',
                    marginBottom: '0.75rem',
                  }}>
                    {item.company && (
                      <span style={{
                        color: cfg.accent,
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}>
                        {item.company}
                      </span>
                    )}
                    {item.location && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '3px',
                        color: 'var(--text-muted)', fontSize: '0.75rem',
                      }}>
                        <FiMapPin size={11} /> {item.location}
                      </span>
                    )}
                  </div>

                  {/* Row 4: Description */}
                  {item.description && (
                    <p style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.82rem',
                      lineHeight: 1.7,
                      marginBottom: item.tags?.length ? '0.85rem' : 0,
                    }}>
                      {item.description}
                    </p>
                  )}

                  {/* Row 5: Tech Tags */}
                  {item.tags?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {item.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '0.65rem', fontWeight: 600,
                          padding: '2px 9px', borderRadius: '100px',
                          background: `${cfg.dot}15`,
                          border: `1px solid ${cfg.dot}35`,
                          color: cfg.accent,
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Bottom CTA ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <a
            href="#contact"
            className="btn-primary"
            style={{ display: 'inline-flex' }}
          >
            Let's Work Together →
          </a>
        </motion.div>

      </div>

      {/* Inline media query for desktop center line */}
      <style>{`
        @media (min-width: 768px) {
          .md-center-line {
            left: 50% !important;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}
