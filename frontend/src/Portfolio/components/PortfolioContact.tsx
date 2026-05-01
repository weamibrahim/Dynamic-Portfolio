import { useState } from 'react'
import { Mail, MapPin, Send, Clock } from 'lucide-react'
import { useContact } from '../hooks/useContact'
import { motion } from 'framer-motion'

function ContactForm({ contactEmail }: { contactEmail?: string }) {
  const contact = useContact()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await contact.mutateAsync(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 6000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="bg-surface-container border border-outline-variant/10 rounded-3xl p-8 shadow-xl space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name">
          <input
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Jane Smith"
            className="form-input"
          />
        </Field>
        <Field label="Email Address">
          <input
            required
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="jane@example.com"
            className="form-input"
          />
        </Field>
      </div>

      <Field label="Subject">
        <input
          required
          value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
          placeholder="Project inquiry, collaboration, etc."
          className="form-input"
        />
      </Field>

      <Field label="Message">
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me about your project or what you have in mind..."
          className="form-input resize-none"
        />
      </Field>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full gradient-primary text-white text-sm font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === 'loading' ? (
          'Sending...'
        ) : status === 'success' ? (
          'Message Sent ✓'
        ) : (
          <>Send Message <Send size={14} /></>
        )}
      </button>

      {status === 'success' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-center text-secondary font-semibold">
          Your message has been sent to {contactEmail}. Expect a reply soon!
        </motion.p>
      )}
      {status === 'error' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-center text-error font-semibold">
          Something went wrong. Please try again or reach out directly.
        </motion.p>
      )}
    </motion.form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">{label}</label>
      {children}
    </div>
  )
}

export default function PortfolioContact({ email, location }: { email?: string; location?: string }) {
  return (
    <section className="py-24 px-8 max-w-6xl mx-auto" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-28"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Contact</p>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold mb-5 leading-tight">
            Let's work<br />
            <span className="text-gradient">together.</span>
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-10 max-w-md">
            Whether you have a project in mind, a question, or just want to connect — feel free to reach out. I'm always open to new opportunities and conversations.
          </p>

          <div className="space-y-4">
            <ContactDetail icon={<Mail size={16} />} color="primary" value={email || 'hello@portfolio.dev'} />
            <ContactDetail icon={<MapPin size={16} />} color="secondary" value={location || 'Remote • Worldwide'} />
            <ContactDetail icon={<Clock size={16} />} color="tertiary" value="Response within 24 hours" />
          </div>
        </motion.div>

        {/* Right: Form */}
        <ContactForm contactEmail={email} />
      </div>
    </section>
  )
}

function ContactDetail({ icon, color, value }: { icon: React.ReactNode; color: string; value: string }) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    tertiary: 'bg-tertiary/10 text-tertiary',
  }
  return (
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorMap[color]}`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-on-surface">{value}</span>
    </div>
  )
}
