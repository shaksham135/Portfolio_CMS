import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { FiSend, FiMail, FiMapPin, FiUser, FiEdit3, FiMessageSquare } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { publicApi } from '../../api'
import SocialLinks from './SocialLinks'

export default function Contact() {
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    publicApi.getAbout().then(r => setAbout(r.data)).catch(() => {})
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await publicApi.submitContact(data)
      toast.success("Message sent successfully! 🚀")
      reset()
    } catch {
      toast.error('Failed to send message.')
    } finally {
      setLoading(false)
    }
  }

  const email = about?.email || 'shaksham@email.com'
  const whatsapp = about?.whatsappNumber
  const location = about?.location || 'New Delhi, India'

  return (
    <section id="contact" className="section-padding relative">
      <div className="blob w-[600px] h-[600px] -bottom-20 -right-20 bg-blue-500/5" style={{ filter: 'blur(150px)', zIndex: -1 }} />
      <div className="blob w-[500px] h-[500px] -top-20 -left-20 bg-purple-500/5" style={{ filter: 'blur(150px)', zIndex: -1 }} />

      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vw, 5rem)' }}
        >
          <p style={{
            color: '#3B82F6', fontSize: '0.8rem', fontWeight: 800,
            letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem',
          }}>
            Get In Touch
          </p>
          <h2 className="section-title gradient-text">Contact Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* ── Left Side: Contact Information ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass p-5 sm:p-10 lg:p-14 rounded-3xl sm:rounded-[40px] border border-white/10"
                 style={{ 
                   background: 'var(--glass-bg)', 
                   backdropFilter: 'blur(20px)',
                   minHeight: '100%'
                 }}>
              
              <h3 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', fontWeight: 800,
                color: 'var(--text-primary)', marginBottom: 'clamp(2rem, 8vw, 4rem)',
                lineHeight: 1.2
              }}>
                Contact <span className="text-blue-500">Information</span>
              </h3>

              <div className="space-y-6 sm:space-y-12">
                <div className="flex items-center gap-4 sm:gap-7 group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white flex-shrink-0">
                    <FiMail size={24} className="text-blue-400 group-hover:text-white sm:hidden" />
                    <FiMail size={30} className="text-blue-400 group-hover:text-white hidden sm:block" />
                  </div>
                  <div className="min-w-0">
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Email</p>
                    <a href={`mailto:${email}`} className="text-lg sm:text-xl font-bold hover:text-blue-500 transition-colors break-all" style={{ color: 'var(--text-primary)' }}>
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-7 group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 transition-all duration-300 group-hover:bg-purple-500 group-hover:text-white flex-shrink-0">
                    <FiMapPin size={24} className="text-purple-400 group-hover:text-white sm:hidden" />
                    <FiMapPin size={30} className="text-purple-400 group-hover:text-white hidden sm:block" />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Location</p>
                    <p className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {location}
                    </p>
                  </div>
                </div>

                {whatsapp && (
                  <div className="flex items-center gap-4 sm:gap-7 group">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 transition-all duration-300 group-hover:bg-green-500 group-hover:text-white flex-shrink-0">
                      <FaWhatsapp size={24} className="text-green-400 group-hover:text-white sm:hidden" />
                      <FaWhatsapp size={30} className="text-green-400 group-hover:text-white hidden sm:block" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>WhatsApp</p>
                      <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-lg sm:text-xl font-bold hover:text-green-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
                        Chat Online
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 'clamp(3rem, 10vw, 6rem)' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '1.5rem' }}>
                  Connect With Me
                </p>
                <div className="flex gap-4 sm:gap-6">
                  <SocialLinks about={about} variant="contact" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right Side: Send Message Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="glass p-5 sm:p-10 lg:p-14 rounded-3xl sm:rounded-[40px] border border-white/10"
                 style={{ 
                   background: 'var(--glass-bg)', 
                   backdropFilter: 'blur(20px)'
                 }}>
              
              <h3 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', fontWeight: 800,
                color: 'var(--text-primary)', marginBottom: 'clamp(2rem, 8vw, 4rem)',
                lineHeight: 1.2
              }}>
                Send a <span className="text-purple-500">Message</span>
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-10">
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
                  <div className="space-y-4">
                    <label style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 700, marginLeft: '4px' }}>Full Name</label>
                    <div className="relative group">
                      <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={22} />
                      <input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="John Doe"
                        className="input-field"
                        style={{ paddingLeft: '4rem', borderRadius: '20px', height: '65px', fontSize: '1rem' }}
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs mt-2 ml-2">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-4">
                    <label style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 700, marginLeft: '4px' }}>Email Address</label>
                    <div className="relative group">
                      <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={22} />
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
                        })}
                        placeholder="john@example.com"
                        className="input-field"
                        style={{ paddingLeft: '4rem', borderRadius: '20px', height: '65px', fontSize: '1rem' }}
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-2 ml-2">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <label style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 700, marginLeft: '4px' }}>Subject</label>
                  <div className="relative group">
                    <FiEdit3 className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={22} />
                    <input
                      {...register('subject')}
                      placeholder="Project Opportunity"
                      className="input-field"
                      style={{ paddingLeft: '4rem', borderRadius: '20px', height: '65px', fontSize: '1rem' }}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 700, marginLeft: '4px' }}>Your Message</label>
                  <div className="relative group">
                    <FiMessageSquare className="absolute left-6 top-6 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={22} />
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      placeholder="Tell me about your project..."
                      rows={6}
                      className="input-field"
                      style={{ paddingLeft: '4rem', paddingTop: '1.5rem', borderRadius: '20px', resize: 'none', fontSize: '1rem' }}
                    />
                  </div>
                  {errors.message && <p className="text-red-400 text-xs mt-2 ml-2">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-5 rounded-2xl text-xl font-extrabold flex items-center justify-center gap-4 transition-all hover:scale-[1.01] active:scale-[0.98]"
                  style={{ 
                    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                    boxShadow: '0 15px 35px rgba(59, 130, 246, 0.4)',
                    marginTop: '2rem'
                  }}
                >
                  {loading ? 'Sending...' : <><FiSend size={26} /> Send Message</>}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
