import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'

export default function SocialLinks({ about, variant = 'hero' }) {
  if (!about) return null;

  const links = [
    { url: about.githubUrl || 'https://github.com/shaksham', Icon: FiGithub, label: 'GitHub' },
    { url: about.linkedinUrl || 'https://linkedin.com/in/shaksham', Icon: FiLinkedin, label: 'LinkedIn' },
    about.instagramUrl && { url: about.instagramUrl, Icon: FiInstagram, label: 'Instagram' }
  ].filter(Boolean)

  if (variant === 'hero') {
    return (
      <>
        {links.map(({ url, Icon, label }) => (
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
      </>
    )
  }

  if (variant === 'contact') {
    return (
      <>
        {links.map(({ url, Icon, label }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 glass rounded-2xl flex items-center justify-center border border-white/10 hover:border-blue-500 hover:text-blue-500 transition-all"
          >
            <Icon size={22} className="sm:hidden" />
            <Icon size={26} className="hidden sm:block" />
          </a>
        ))}
      </>
    )
  }

  if (variant === 'about') {
    return (
      <>
        {links.map(({ url, Icon, label }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm"
          >
            <Icon size={14} /> {label}
          </a>
        ))}
      </>
    )
  }

  return null
}
