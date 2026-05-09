import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { publicApi } from '../../api'

const DEMO_TESTIMONIALS = [
  {
    id: 1, name: 'Priya Sharma', role: 'CEO', company: 'TechStartup', rating: 5,
    message: 'Shaksham delivered an exceptional backend API for our platform. His Spring Boot expertise and attention to clean architecture truly impressed the entire team. Highly recommended!',
    initials: 'PS', color: '#3B82F6',
  },
  {
    id: 2, name: 'Rahul Mehta', role: 'Product Manager', company: 'DigitalAgency', rating: 5,
    message: 'Working with Shaksham was a fantastic experience. He built our complete admin dashboard ahead of schedule with excellent code quality, solid documentation, and zero bugs in production.',
    initials: 'RM', color: '#8B5CF6',
  },
  {
    id: 3, name: 'Ananya Singh', role: 'Founder', company: 'WebStudio', rating: 5,
    message: 'Incredibly talented full-stack developer. He delivered far more than expected — the portfolio website he created looks stunning, loads super fast, and is fully mobile-responsive.',
    initials: 'AS', color: '#06B6D4',
  },
]

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: '3px', justifyContent: 'center' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24" style={{ flexShrink: 0 }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [items, setItems]   = useState(DEMO_TESTIMONIALS)
  const [idx, setIdx]       = useState(0)
  const [dir, setDir]       = useState(1)
  const { ref, inView }     = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    publicApi.getTestimonials()
      .then(r => setItems(r.data || []))
      .catch(() => {
        console.warn("Backend offline, using mock data for Testimonials")
      })
  }, [])

  const go = useCallback((next) => {
    setDir(next > idx ? 1 : -1)
    setIdx(next)
  }, [idx])

  const prev = () => go(idx === 0 ? items.length - 1 : idx - 1)
  const next = () => go(idx === items.length - 1 ? 0 : idx + 1)

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setDir(1)
      setIdx(i => (i + 1) % items.length)
    }, 5500)
    return () => clearInterval(t)
  }, [items.length])

  const cur = items[idx]

  const variants = {
    enter:  d => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit:   d => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  }

  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="blob w-80 h-80 top-0 right-10 bg-purple-500" />
      <div className="blob w-64 h-64 bottom-0 -left-10 bg-blue-500" style={{ animationDelay: '4s' }} />

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
            letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem',
          }}>
            Testimonials
          </p>
          <h2 className="section-title gradient-text">What People Say</h2>
        </motion.div>

        {/* ── Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ maxWidth: '680px', margin: '0 auto' }}
        >
          {/* Card Wrapper (fixed height prevents layout shift) */}
          <div style={{ position: 'relative', minHeight: '260px' }}>
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={idx}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: 'easeInOut' }}
                style={{
                  borderRadius: '20px',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(16px)',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Big quotation mark */}
                <div style={{
                  position: 'absolute', top: '-8px', left: '20px',
                  fontSize: '8rem', lineHeight: 1,
                  color: cur?.color || '#3B82F6',
                  opacity: 0.08,
                  fontFamily: 'Georgia, serif',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}>
                  "
                </div>

                {/* Stars */}
                <div style={{ marginBottom: '1.2rem' }}>
                  <StarRating count={cur?.rating || 5} />
                </div>

                {/* Quote */}
                <blockquote style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(0.88rem, 2.2vw, 1.05rem)',
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                  textAlign: 'center',
                  marginBottom: '1.75rem',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  "{cur?.message}"
                </blockquote>

                {/* Divider */}
                <div style={{
                  width: '48px', height: '2px',
                  background: `linear-gradient(90deg, ${cur?.color || '#3B82F6'}, transparent)`,
                  margin: '0 auto 1.25rem',
                  borderRadius: '1px',
                }} />

                {/* Author */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '12px',
                }}>
                  {cur?.imageUrl ? (
                    <img
                      src={cur.imageUrl}
                      alt={cur.name}
                      style={{
                        width: '48px', height: '48px',
                        borderRadius: '50%', objectFit: 'cover',
                        border: `2px solid ${cur?.color || '#3B82F6'}50`,
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '48px', height: '48px',
                      borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg, ${cur?.color || '#3B82F6'}, ${cur?.color || '#3B82F6'}99)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                      fontFamily: 'Space Grotesk, sans-serif',
                      border: `2px solid ${cur?.color || '#3B82F6'}40`,
                    }}>
                      {cur?.initials || cur?.name?.charAt(0)}
                    </div>
                  )}
                  <div style={{ textAlign: 'left' }}>
                    <p style={{
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      fontFamily: 'Space Grotesk, sans-serif',
                      marginBottom: '2px',
                    }}>
                      {cur?.name}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      {cur?.role}{cur?.company ? ` · ${cur.company}` : ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '16px',
            marginTop: '1.5rem',
          }}>
            <button
              onClick={prev}
              style={{
                width: '38px', height: '38px', borderRadius: '50%',
                border: '1px solid var(--glass-border)',
                background: 'var(--glass-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-secondary)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.color = '#60A5FA' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              <FiChevronLeft size={16} />
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  style={{
                    borderRadius: '100px',
                    height: '6px',
                    width: i === idx ? '24px' : '6px',
                    background: i === idx ? (item.color || '#3B82F6') : 'rgba(255,255,255,0.2)',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: '38px', height: '38px', borderRadius: '50%',
                border: '1px solid var(--glass-border)',
                background: 'var(--glass-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-secondary)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.color = '#60A5FA' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
