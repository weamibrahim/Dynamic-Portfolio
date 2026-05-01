import { DEFAULT_STACK } from '../constants'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const getIconUrl = (slug: string) => {
  const logoMap: Record<string, string> = {
    'react': 'logos:react',
    'nextdotjs': 'logos:nextjs-icon',
    'nodedotjs': 'logos:nodejs-icon',
    'typescript': 'logos:typescript-icon',
    'javascript': 'logos:javascript',
    'postgresql': 'logos:postgresql',
    'mongodb': 'logos:mongodb-icon',
    'amazonaws': 'logos:aws',
    'python': 'logos:python',
    'graphql': 'logos:graphql',
    'tailwindcss': 'logos:tailwindcss-icon',
    'docker': 'logos:docker-icon',
    'figma': 'logos:figma',
    'adobe-xd': 'logos:adobe-xd',
    'slack': 'logos:slack-icon',
    'github': 'logos:github-icon',
    'framer': 'logos:framer',
    'sketch': 'logos:sketch',
    'notion': 'logos:notion-icon',
    'jira': 'logos:jira',
    'trello': 'logos:trello',
  };
  const iconId = logoMap[slug] || `simple-icons:${slug}`;
  return `https://api.iconify.design/${iconId}.svg`;
};

export default function PortfolioStack({ stack, sectionTitle }: { stack: { icon: string; name: string }[]; sectionTitle?: string }) {
  const items = stack?.length > 0 ? stack : DEFAULT_STACK

  // Duplicate items for seamless marquee
  const marqueeItems = [...items, ...items, ...items]

  return (
    <section className="py-32 bg-surface overflow-hidden" id="stack">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6"
        >
          <Sparkles size={12} />
          {sectionTitle || 'Capabilities'}
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-headline text-4xl lg:text-5xl font-bold mb-6"
        >
          Tools of the <span className="text-gradient">Trade.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-on-surface-variant max-w-lg mx-auto text-sm leading-relaxed"
        >
          A selection of technologies and platforms used to architect and build high-performance digital products.
        </motion.p>
      </div>

      {/* Marquee Row 1 (Left) */}
      <div className="flex relative">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4 pr-4"
        >
          {marqueeItems.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 group relative bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6 flex items-center gap-4 hover:border-primary/30 transition-colors cursor-default"
            >
              <div className="w-10 h-10 flex-shrink-0 transition-all duration-300 transform group-hover:scale-110">
                <img 
                  src={getIconUrl(item.icon)} 
                  alt={item.name}
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors whitespace-nowrap">
                {item.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 (Right) */}
      <div className="flex relative mt-4">
        <motion.div
          animate={{ x: [-1000, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4 pr-4"
        >
          {[...marqueeItems].reverse().map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 group relative bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6 flex items-center gap-4 hover:border-primary/30 transition-colors cursor-default"
            >
              <div className="w-10 h-10 flex-shrink-0 transition-all duration-300 transform group-hover:scale-110">
                <img 
                  src={getIconUrl(item.icon)} 
                  alt={item.name}
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors whitespace-nowrap">
                {item.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Ambient background glow */}
      <div className="max-w-7xl mx-auto px-8 relative">
         <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      </div>
    </section>
  )
}

