import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiDownload, FiMapPin, FiMail, FiGithub, FiLinkedin, FiCode, FiCpu } from 'react-icons/fi'
import { publicApi } from '../../api'

const STATS = [
  { label: 'Projects Built', value: '15+', icon: '🚀' },
  { label: 'Technologies', value: '12+', icon: '⚙️' },
  { label: 'Months Exp.', value: '18+', icon: '📅' },
]

export default function About() {
  const [about, setAbout] = useState(null)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    publicApi.getAbout().then(r => setAbout(r.data)).catch(() => {})
  }, [])

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="blob w-72 h-72 md:w-96 md:h-96 -top-20 -right-16 bg-purple-500" />
      <div className="blob w-56 h-56 bottom-10 -left-10 bg-blue-500" style={{ animationDelay: '4s' }} />

      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">About Me</p>
          <h2 className="section-title gradient-text">Who I Am</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-xs">
              {/* Main Avatar Card */}
              <div className="gradient-border mx-auto w-60 h-60 sm:w-72 sm:h-72 rounded-2xl overflow-hidden">
                {about?.profileImageUrl ? (
                  <img
                    src={about.profileImageUrl}
                    alt="Shaksham Agarwal"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-3"
                    style={{
                      background: 'linear-gradient(145deg, #0D0D1E 0%, #13132A 50%, #0D1535 100%)',
                    }}
                  >
                    {/* Decorative rings */}
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-32 h-32 rounded-full border border-blue-500/10 animate-ping" style={{ animationDuration: '3s' }} />
                      <div className="absolute w-24 h-24 rounded-full border border-purple-500/15" />
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black"
                        style={{
                          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)',
                          fontFamily: 'Space Grotesk, sans-serif',
                          color: 'white',
                          boxShadow: '0 0 30px rgba(59,130,246,0.4)',
                        }}
                      >
                        SA
                      </div>
                    </div>
                    <div className="text-center mt-1">
                      <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Space Grotesk' }}>Shaksham Agarwal</p>
                      <p className="text-blue-400 text-xs">Java Backend Dev</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating stat badges */}
              <div
                className="absolute -bottom-4 -right-2 glass border border-white/10 rounded-xl px-3 py-2 text-center"
                style={{ background: 'rgba(59,130,246,0.12)' }}
              >
                <div className="text-xl font-bold gradient-text-2" style={{ fontFamily: 'Space Grotesk' }}>18+</div>
                <div className="text-gray-400 text-xs">Months Exp.</div>
              </div>

              <div
                className="absolute -top-3 -left-2 glass border border-white/10 rounded-xl px-3 py-2 text-center"
                style={{ background: 'rgba(139,92,246,0.12)' }}
              >
                <div className="text-xl font-bold" style={{ background: 'linear-gradient(135deg,#8B5CF6,#06B6D4)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Space Grotesk' }}>15+</div>
                <div className="text-gray-400 text-xs">Projects</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h3
              className="text-xl sm:text-2xl font-bold"
              style={{ fontFamily: 'Space Grotesk', color: 'var(--text-primary)' }}
            >
              {about?.intro || "Hi! I'm Shaksham Agarwal 👋"}
            </h3>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {about?.summary ||
                'A passionate Java Backend Developer & Full Stack Developer with expertise in building scalable, production-ready applications. I love creating elegant solutions to complex problems.'}
            </p>

            <div
              className="glass border border-blue-500/20 rounded-xl p-4"
              style={{ background: 'rgba(59,130,246,0.05)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="text-blue-400 font-semibold">🎯 Currently focused on: </span>
                {about?.currentFocus ||
                  'Building microservices with Spring Boot and exploring cloud-native architectures.'}
              </p>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-3">
              {about?.location && (
                <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <FiMapPin className="text-blue-400 shrink-0" size={13} />
                  {about.location}
                </div>
              )}
              {about?.email && (
                <a
                  href={`mailto:${about.email}`}
                  className="flex items-center gap-1.5 text-sm transition-colors hover:text-blue-400"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <FiMail className="text-blue-400 shrink-0" size={13} />
                  {about.email}
                </a>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              {about?.resumeUrl && (
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  <FiDownload size={14} /> Download Resume
                </a>
              )}
              {about?.githubUrl && (
                <a
                  href={about.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm"
                >
                  <FiGithub size={14} /> GitHub
                </a>
              )}
              {about?.linkedinUrl && (
                <a
                  href={about.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm"
                >
                  <FiLinkedin size={14} /> LinkedIn
                </a>
              )}
              {/* Fallback buttons when no backend */}
              {!about && (
                <>
                  <a href="#contact" className="btn-primary text-sm"><FiMail size={14} /> Hire Me</a>
                  <a href="#projects" className="btn-outline text-sm"><FiCode size={14} /> My Work</a>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
