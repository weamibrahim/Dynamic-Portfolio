import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { imgUrl } from '../../lib/utils'
import { useEffect } from 'react'

interface PortfolioHeroProps {
  headline?: string
  subtitle?: string
  showContact?: boolean
  heroImage?: string
  role?: string
  name?: string
}

export default function PortfolioHero({ headline, subtitle, showContact, heroImage, role, name }: PortfolioHeroProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth out mouse movement
  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Move layers at different speeds
  const layer1X = useTransform(x, [-500, 500], [20, -20])
  const layer1Y = useTransform(y, [-500, 500], [20, -20])
  const layer2X = useTransform(x, [-500, 500], [-35, 35])
  const layer2Y = useTransform(y, [-500, 500], [-35, 35])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-surface" id="hero">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        
        {/* Floating Abstract Shapes */}
        <motion.div 
          style={{ x: layer1X, y: layer1Y }}
          className="absolute top-[10%] left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-[80px]" 
        />
        <motion.div 
          style={{ x: layer2X, y: layer2Y }}
          className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Content (7 columns) */}
          <div className="lg:col-span-7">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-surface-container-high border border-outline-variant/10 mb-8 group"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-5 h-5 rounded-full border-2 border-surface-container-high bg-primary/20" />
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant flex items-center gap-2">
                <Sparkles size={10} className="text-primary animate-pulse" />
                {role || 'Creative Visionary'}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-headline text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
                {headline?.split(' ').map((word, i) => (
                  <span key={i} className="inline-block mr-[0.2em]">
                    {word === 'Speaks.' || word === 'Creative' ? (
                      <span className="text-gradient drop-shadow-sm">{word}</span>
                    ) : word}
                  </span>
                )) || (
                  <>Crafting Work <br /> That <span className="text-gradient">Speaks.</span></>
                )}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-on-surface-variant text-xl leading-relaxed max-w-xl mb-10 font-light"
            >
              {subtitle || 'Merging technical precision with creative flair to build digital experiences that leave a lasting impression.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="#work"
                className="group relative px-10 py-4 bg-primary text-white text-sm font-bold rounded-2xl shadow-xl shadow-primary/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative">Explore Work</span>
              </a>
              {showContact && (
                <a
                  href="#contact"
                  className="px-10 py-4 bg-surface-container-high text-on-surface text-sm font-bold rounded-2xl hover:bg-surface-container-highest transition-all active:scale-95"
                >
                  Start a Project
                </a>
              )}
            </motion.div>
          </div>

          {/* Right Visual (5 columns) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ x: layer1X, y: layer1Y }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-square"
            >
              {/* Main Image/Card */}
              <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] group">
                {heroImage ? (
                  <img src={imgUrl(heroImage)} alt="Hero" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]" />
                ) : (
                  <div className="w-full h-full gradient-primary p-12 flex flex-col justify-end">
                     <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center text-white text-4xl font-bold mb-6">
                        {name ? name[0] : 'S'}
                     </div>
                     <h2 className="text-white text-3xl font-bold mb-2">{name || 'UrbanStride'}</h2>
                     <p className="text-white/60 font-medium">Digital Curator Portfolio</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/10 backdrop-blur-2xl rounded-3xl border border-white/10 p-4 shadow-xl z-20 flex flex-col justify-center items-center text-center"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary mb-2">
                  <Sparkles size={16} />
                </div>
                <p className="text-[10px] font-bold text-on-surface uppercase tracking-tight">Best in Class</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-10 -left-10 bg-surface-container-high/90 backdrop-blur-3xl rounded-[32px] p-6 border border-outline-variant/10 shadow-2xl z-20 w-56"
              >
                <div className="flex items-center gap-4 mb-3">
                   <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">99</div>
                   <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Performance</p>
                </div>
                <div className="h-1 w-full bg-outline-variant/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '99%' }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="h-full bg-primary" 
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-on-surface-variant/30"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

