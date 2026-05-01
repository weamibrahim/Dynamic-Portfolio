import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useThemeStore } from '../../store/themeStore'

interface NavItem {
  label: string
  href: string
  show: boolean
}

export default function PortfolioNav({ title, navItems }: { title?: string; navItems: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const { theme, setTheme } = useThemeStore()
  
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visibleItems = navItems.filter(i => i.show)

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface/80 backdrop-blur-xl border-b border-outline-variant/15 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            to="/portfolio"
            className="font-headline text-base font-bold text-on-surface hover:text-primary transition-colors tracking-tight"
          >
            {title || 'Portfolio'}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {visibleItems.map(n =>
              n.href.startsWith('#') ? (
                <a
                  key={n.label}
                  href={n.href}
                  className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {n.label}
                </a>
              ) : (
                <Link
                  key={n.label}
                  to={n.href}
                  className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {n.label}
                </Link>
              )
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <a
                href={isAuthenticated ? '/overview' : '/login'}
                className="hidden sm:inline-flex gradient-primary text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.03] transition-all"
              >
                Dashboard
              </a>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="fixed top-16 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-outline-variant/15 shadow-lg"
          >
            <div className="max-w-6xl mx-auto px-8 py-6 flex flex-col gap-4">
              {visibleItems.map(n =>
                n.href.startsWith('#') ? (
                  <a
                    key={n.label}
                    href={n.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors py-1"
                  >
                    {n.label}
                  </a>
                ) : (
                  <Link
                    key={n.label}
                    to={n.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors py-1"
                  >
                    {n.label}
                  </Link>
                )
              )}
              {isAuthenticated && (
                <a
                  href='/overview' 
                  className="mt-2 gradient-primary text-white text-sm font-bold px-6 py-3 rounded-full text-center shadow-md shadow-primary/20"
                >
                   Dashboard
                </a>
              )}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-between px-4 py-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-sm font-semibold text-on-surface-variant"
              >
                <span>Theme</span>
                {theme === 'dark' ? <Sun size={18} className="text-primary" /> : <Moon size={18} className="text-primary" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
