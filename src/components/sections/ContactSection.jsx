import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

const SOCIAL = [
  { label: 'GitHub', url: 'https://github.com/jigneshramawat', icon: '⌥' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/jigneshramawat', icon: '◈' },
  { label: 'Email', url: 'mailto:jigneshramawat21@gmail.com', icon: '✉' },
]

// Your EmailJS credentials
const SERVICE_ID = 'service_f2wfw8r'
const TEMPLATE_ID = 'template_9rvk4y8'
const PUBLIC_KEY = '3RPFGSiXFV0TXEQll'

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const formRef = useRef(null)

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    emailjs.sendForm(
      SERVICE_ID,
      TEMPLATE_ID,
      formRef.current,
      PUBLIC_KEY
    )
    .then(() => {
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    })
    .catch((err) => {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    })
  }

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(225,29,72,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-label block mb-3">
            05 — Contact
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="font-display font-bold text-4xl md:text-6xl mb-4">
            Let's build something<br />
            <span className="gradient-text-red">remarkable.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="text-white/40 font-body text-base max-w-md mx-auto">
            Open to full-time roles, internships, and freelance projects.
            Let's talk about what you're building.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.25 }} className="lg:col-span-2 space-y-8">
            <div>
              <p className="font-mono text-xs text-white/30 tracking-widest mb-3 uppercase">Direct</p>
              <a href="mailto:jigneshramawat21@gmail.com" className="font-body text-sm text-white/60 hover:text-crimson-400 transition-colors break-all">
                jigneshramawat21@gmail.com
              </a>
            </div>

            <div>
              <p className="font-mono text-xs text-white/30 tracking-widest mb-4 uppercase">Social</p>
              <div className="space-y-3">
                {SOCIAL.map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                    <span className="w-8 h-8 glass flex items-center justify-center text-xs text-crimson-400 group-hover:bg-crimson-500/10 transition-all">{s.icon}</span>
                    <span className="font-mono text-sm text-white/40 group-hover:text-white transition-colors">{s.label}</span>
                    <span className="text-white/20 group-hover:text-crimson-400 transition-colors ml-auto text-xs">↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-red rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-green-400">Available</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">Open to new opportunities starting immediately.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-xl p-8 space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs text-white/30 tracking-wider block mb-2">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Jignesh Ramawat" required
                  className="w-full bg-white/3 border border-white/8 rounded px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-crimson-500/50 focus:bg-crimson-500/5 transition-all" />
              </div>
              <div>
                <label className="font-mono text-xs text-white/30 tracking-wider block mb-2">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required
                  className="w-full bg-white/3 border border-white/8 rounded px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-crimson-500/50 focus:bg-crimson-500/5 transition-all" />
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-white/30 tracking-wider block mb-2">Phone (optional)</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210"
                className="w-full bg-white/3 border border-white/8 rounded px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-crimson-500/50 focus:bg-crimson-500/5 transition-all" />
            </div>

            <div>
              <label className="font-mono text-xs text-white/30 tracking-wider block mb-2">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." required rows={5}
                className="w-full bg-white/3 border border-white/8 rounded px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-crimson-500/50 focus:bg-crimson-500/5 transition-all resize-none" />
            </div>

            <button type="submit" disabled={status === 'sending'} className="btn-primary w-full text-white">
              <span className="relative z-10">
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent ✓' : 'Send Message'}
              </span>
            </button>

            {status === 'success' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-green-400 font-mono text-xs">
                Thanks! I'll get back to you within 24 hours.
              </motion.p>
            )}
            {status === 'error' && (
              <p className="text-center text-crimson-400 font-mono text-xs">Something went wrong. Email me directly.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}