import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiServer, FiGlobe, FiLayout, FiZap, FiPenTool, FiCode, FiArrowRight } from 'react-icons/fi'
import { publicApi } from '../../api'

const ICON_MAP = {
  server: FiServer, globe: FiGlobe, layout: FiLayout,
  zap: FiZap, palette: FiPenTool, building: FiCode, code: FiCode,
}

const DEMO_SERVICES = [
  {
    id: 1, title: 'Backend API Development', icon: 'server',
    description: 'Scalable, secure REST APIs built with Spring Boot, JWT authentication, and clean architecture patterns ready for production.',
    accent: '#3B82F6', grad: 'linear-gradient(135deg,rgba(59,130,246,0.18),rgba(59,130,246,0.04))',
  },
  {
    id: 2, title: 'Full Stack Web Apps', icon: 'globe',
    description: 'End-to-end web applications with a React frontend, Spring Boot backend, MySQL database, and full deployment pipeline.',
    accent: '#8B5CF6', grad: 'linear-gradient(135deg,rgba(139,92,246,0.18),rgba(139,92,246,0.04))',
  },
  {
    id: 3, title: 'Business Websites', icon: 'building',
    description: 'Premium, fully responsive business websites with glassmorphism UI, smooth animations, and blazing fast load times.',
    accent: '#06B6D4', grad: 'linear-gradient(135deg,rgba(6,182,212,0.18),rgba(6,182,212,0.04))',
  },
  {
    id: 4, title: 'Admin Dashboards', icon: 'layout',
    description: 'Feature-rich admin panels and CMS systems with CRUD tables, auth guards, charts, and full content management capabilities.',
    accent: '#10B981', grad: 'linear-gradient(135deg,rgba(16,185,129,0.18),rgba(16,185,129,0.04))',
  },
  {
    id: 5, title: 'Landing Pages', icon: 'zap',
    description: 'High-converting landing pages with compelling copy, smooth Framer Motion animations, and performance-first architecture.',
    accent: '#F59E0B', grad: 'linear-gradient(135deg,rgba(245,158,11,0.18),rgba(245,158,11,0.04))',
  },
  {
    id: 6, title: 'UI / UX Redesign', icon: 'palette',
    description: 'Transform outdated interfaces into modern, premium designs users love — with improved flows, accessibility, and aesthetics.',
    accent: '#EC4899', grad: 'linear-gradient(135deg,rgba(236,72,153,0.18),rgba(236,72,153,0.04))',
  },
]

export default function Services() {
  const [services, setServices] = useState(DEMO_SERVICES)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  useEffect(() => {
    publicApi.getServices()
      .then(r => setServices(r.data || []))
      .catch(() => {
        console.warn("Backend offline, using mock data for Services")
      })
  }, [])

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="blob w-80 h-80 bottom-0 left-10 bg-cyan-600" style={{ animationDelay: '1s' }} />
      <div className="blob w-64 h-64 top-20 -right-10 bg-purple-600" style={{ animationDelay: '4s' }} />

      <div className="container-custom">

        {/* ── Header ── */}
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
            What I Offer
          </p>
          <h2 className="section-title gradient-text">Services</h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
            maxWidth: '440px',
            margin: '0.75rem auto 0',
            lineHeight: 1.65,
            textAlign: 'center',
          }}>
            Expert services to build, grow, and scale your digital presence.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px',
        }}>
          {services.map((service, i) => {
            const IconComp = ICON_MAP[service.icon] || FiCode
            const accent   = service.accent || '#3B82F6'
            const grad     = service.grad || `linear-gradient(135deg,${accent}18,${accent}04)`

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: Math.min(i * 0.08, 0.4) }}
                whileHover={{ y: -6 }}
                style={{
                  borderRadius: '18px',
                  border: `1px solid ${accent}25`,
                  background: grad,
                  backdropFilter: 'blur(12px)',
                  padding: '1.5rem 1.4rem',
                  cursor: 'default',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${accent}60`
                  e.currentTarget.style.boxShadow = `0 12px 40px ${accent}18`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${accent}25`
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Number badge */}
                <div style={{
                  position: 'absolute', top: '1.2rem', right: '1.2rem',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '1.8rem', fontWeight: 800,
                  color: `${accent}15`,
                  lineHeight: 1, userSelect: 'none',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div style={{
                  width: '48px', height: '48px',
                  borderRadius: '14px',
                  background: `${accent}22`,
                  border: `1px solid ${accent}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <IconComp size={22} style={{ color: accent }} />
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.3,
                }}>
                  {service.title}
                </h3>

                {/* Description */}
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}>
                  {service.description}
                </p>

                {/* Learn more */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  color: accent, fontSize: '0.75rem', fontWeight: 600,
                }}>
                  Learn more <FiArrowRight size={12} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
