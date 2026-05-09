import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#services', label: 'Services' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { toggle, isDark } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navBg = scrolled
    ? isDark
      ? 'rgba(5,5,7,0.88)'
      : 'rgba(240,244,255,0.92)'
    : 'transparent'

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-[50] transition-all duration-300"
        style={{
          background: navBg,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
          padding: scrolled ? '0.6rem 0' : '1rem 0',
        }}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="font-display text-xl font-bold gradient-text" style={{ fontFamily: 'Space Grotesk, sans-serif', textDecoration: 'none' }}>
            SA<span className="text-blue-400">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-blue-400"
                style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-full glass transition-all hover:scale-105"
              style={{ border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
              aria-label="Toggle theme"
            >
              {isDark
                ? <FiSun size={15} className="text-yellow-400" />
                : <FiMoon size={15} className="text-blue-600" />}
            </button>

            {/* Hire Me — desktop */}
            <a href="#contact" className="!hidden md:!inline-flex btn-primary text-sm py-2 px-4">
              Hire Me
            </a>

            {/* Mobile Burger */}
            <button
              className="md:hidden p-2 rounded-full glass"
              style={{ border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu size={18} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar (Premium Side Menu) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-[60]"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}
              onClick={() => setOpen(false)}
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, type: 'spring', bounce: 0, stiffness: 90 }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-[70] w-[280px] shadow-2xl flex flex-col"
              style={{
                background: isDark ? 'rgba(10,10,15,0.98)' : 'rgba(250,252,255,0.98)',
                backdropFilter: 'blur(20px)',
                borderLeft: '1px solid var(--glass-border)',
              }}
            >
              {/* Header inside Sidebar */}
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--glass-border)' }}>
                <span className="font-display text-lg font-bold gradient-text" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Menu
                </span>
                <button
                  className="p-2 rounded-full glass transition-transform active:scale-95"
                  style={{ border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Links List */}
              <div className="flex flex-col px-6 py-4 gap-1 overflow-y-auto" style={{ flex: 1 }}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                    className="text-base font-semibold py-3 transition-colors hover:text-blue-500"
                    style={{
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(150,150,150,0.1)',
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="p-6 border-t" style={{ borderColor: 'var(--glass-border)' }}>
                <a
                  href="#contact"
                  className="btn-primary w-full flex items-center justify-center py-4 text-sm font-bold shadow-lg"
                  style={{ borderRadius: '14px' }}
                  onClick={() => setOpen(false)}
                >
                  Let's Work Together
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
