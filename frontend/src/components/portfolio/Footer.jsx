import { FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer
      className="py-8 sm:py-10"
      style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)' }}
    >
      <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="text-center sm:text-left">
          <span className="font-bold text-lg gradient-text" style={{ fontFamily: 'Space Grotesk' }}>SA.</span>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Shaksham Agarwal — Java Backend & Full Stack Developer
          </p>
        </div>

        {/* Built with */}
        <p className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
          Built with <FiHeart className="text-red-400" size={11} /> Spring Boot & React
        </p>

        {/* Socials */}
        <div className="flex gap-3">
          {[
            { href: 'https://github.com/shaksham', Icon: FiGithub },
            { href: 'https://linkedin.com/in/shaksham', Icon: FiLinkedin },
          ].map(({ href, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#60A5FA' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="container-custom mt-4 pt-4 text-center text-xs" style={{ borderTop: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Shaksham Agarwal. All rights reserved.
      </div>
    </footer>
  )
}
