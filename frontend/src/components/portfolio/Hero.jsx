import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { publicApi } from '../../api'

const ROLES = [
  'Java Backend Developer', 2200,
  'Spring Boot Expert', 2000,
  'Full Stack Developer', 2200,
  'React Developer', 2000,
  'API Architect', 2000,
]

const STATS = [
  { value: '15+', label: 'Projects Built' },
  { value: '12+', label: 'Technologies' },
  { value: '18+', label: 'Months Learning' },
]

export default function Hero() {
  const [about, setAbout] = useState(null)

  useEffect(() => {
    publicApi.getAbout().then(r => setAbout(r.data)).catch(() => {})
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.18), transparent)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '120px',
      }}
    >
      {/* Floating Blobs */}
      <div className="blob w-64 h-64 md:w-96 md:h-96 top-10 -left-20 bg-blue-500" style={{ animationDelay: '0s' }} />
      <div className="blob w-56 h-56 md:w-80 md:h-80 top-1/2 -right-16 bg-purple-500" style={{ animationDelay: '3s' }} />
      <div className="blob w-48 h-48 md:w-64 md:h-64 bottom-10 left-1/3 bg-cyan-500" style={{ animationDelay: '6s' }} />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── CONTENT COLUMN ── fully centered ───────────────── */}
      <div
        className="relative z-10 w-full max-w-[780px] mx-auto flex flex-col items-center text-center gap-0 pt-4 pb-12 px-4 md:pt-8 md:pb-20 md:px-5"
      >
        {/* 1. Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-full px-4 py-2 mb-6"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', /* Use clamp for font size */
            maxWidth: '100%', /* Prevent overflow */
          }}
        >
          <span
            style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: '#4ADE80',
              flexShrink: 0,
              animation: 'pulse-glow 2s ease infinite',
            }}
          />
          Available for Freelance &amp; Full-time Roles
        </motion.div>

        {/* 2. Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', /* Reduced min font size */
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            width: '100%',
            wordBreak: 'break-word', /* Added to prevent overflow */
          }}
        >
          Hi, I'm{' '}
          <span className="gradient-text">Shaksham Agarwal</span>
        </motion.h1>

        {/* 3. Typing Role */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: 'clamp(1rem, 3.5vw, 1.75rem)',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            minHeight: '2.5rem',
            marginBottom: '1.25rem',
            width: '100%',
          }}
        >
          <TypeAnimation
            sequence={ROLES}
            wrapper="span"
            repeat={Infinity}
            style={{ color: '#06B6D4' }}
          />
        </motion.div>

        {/* 4. Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.85rem, 2.2vw, 1.05rem)',
            lineHeight: 1.75,
            maxWidth: '560px',
            width: '100%',
            marginBottom: '2rem',
          }}
        >
          Building scalable, production-ready web applications with clean architecture.
          Turning complex problems into elegant, high-performance solutions.
        </motion.p>

        {/* 5. CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '1.5rem',
            width: '100%',
          }}
        >
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          {about?.resumeUrl ? (
            <a href={about.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <FiDownload size={15} /> Download Resume
            </a>
          ) : (
            <a href="#contact" className="btn-outline">
              Get In Touch
            </a>
          )}
        </motion.div>

        {/* 6. Social Icons — OWN CENTERED ROW */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '2.5rem',
            width: '100%',
          }}
        >
          {[
            { url: about?.githubUrl || 'https://github.com/shaksham', Icon: FiGithub, label: 'GitHub' },
            { url: about?.linkedinUrl || 'https://linkedin.com/in/shaksham', Icon: FiLinkedin, label: 'LinkedIn' },
          ].map(({ url, Icon, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="glass"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-muted)',
                transition: 'all 0.25s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#3B82F6'
                e.currentTarget.style.color = '#60A5FA'
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.08)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(59,130,246,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--glass-border)'
                e.currentTarget.style.color = 'var(--text-muted)'
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>

        {/* 7. Stats — CENTERED GRID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem', /* Reduced gap */
            width: '100%',
            maxWidth: '300px', /* Reduced max width */
            margin: '0 auto',
          }}
        >
          {STATS.map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                className="gradient-text-2"
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(1.25rem, 4vw, 1.6rem)',
                  fontWeight: 800,
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.7rem',
                  lineHeight: 1.3,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── centered absolutely ─────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          zIndex: 10,
        }}
      >
        <span>Scroll Down</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FiArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
