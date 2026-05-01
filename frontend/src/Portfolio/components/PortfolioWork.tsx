import { ArrowUpRight, ArrowRight, Layers } from 'lucide-react'
import { Project } from '../../Projects/types'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { imgUrl, cn } from '../../lib/utils'

function getYear(project: Project) {
  return project.year ?? (project.createdAt ? new Date(project.createdAt).getFullYear() : new Date().getFullYear())
}

function getTechIcon(name: string) {
  const slug = name.toLowerCase()
    .replace(/\.js/g, 'dotjs')
    .replace(/\+/g, 'plus')
    .replace(/\s+/g, '')
    .replace(/#/g, 'sharp')
    .replace(/\./g, 'dot');
    
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
}

function ProjectCard({ project, index, large = false }: { project: Project; index: number; large?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative rounded-[32px] overflow-hidden bg-surface-container-low border border-outline-variant/10 hover:border-primary/20 transition-all duration-500",
        large ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {project.thumbnail ? (
          <img
            src={imgUrl(project.thumbnail)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
            alt={project.title}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-container-high">
             <Layers size={large ? 80 : 40} className="text-on-surface-variant/5" />
          </div>
        )}
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/80 opacity-80 group-hover:opacity-90 transition-opacity" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase tracking-[0.2em]">
            {getYear(project)}
          </span>
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            >
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack?.slice(0, 3).map(t => (
              <span key={t} className="flex items-center gap-1.5 text-[9px] font-bold text-white uppercase tracking-widest px-2.5 py-1 rounded bg-white/10 backdrop-blur-md border border-white/10">
                <img 
                  src={getTechIcon(t)} 
                  alt="" 
                  className="w-3 h-3 object-contain"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                {t}
              </span>
            ))}
          </div>
          <h3 className={cn(
            "font-headline font-bold text-white leading-tight transition-all duration-500 group-hover:translate-x-2",
            large ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"
          )}>
            {project.title}
          </h3>
          {large && (
            <p className="text-white/60 text-sm mt-3 line-clamp-2 max-w-md group-hover:translate-x-2 transition-all duration-500 delay-75">
              {project.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

interface PortfolioWorkProps {
  featured: Project[]
  showViewAll?: boolean
}

export default function PortfolioWork({ featured, showViewAll = true }: PortfolioWorkProps) {
  if (featured.length === 0) return null

  return (
    <section className="py-32 px-8 max-w-7xl mx-auto" id="work">
      {/* Section Header */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-[2px] w-12 bg-primary" />
          <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">The Showcase</span>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline text-5xl lg:text-6xl font-bold max-w-2xl leading-[1.1]"
          >
            Curated works of <span className="text-gradient">creative</span> excellence.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-on-surface-variant max-w-xs text-sm leading-relaxed"
          >
            A diverse selection of projects where technical mastery meets high-end design.
          </motion.p>
        </div>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {featured.map((p, i) => (
          <ProjectCard 
            key={p._id} 
            project={p} 
            index={i} 
            large={i === 0 || i === 5} 
          />
        ))}
      </div>

      {/* Footer Action */}
      {showViewAll && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center"
        >
          <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-6">Want to see more?</p>
          <Link
            to="/all-projects"
            className="group flex items-center gap-4 text-2xl lg:text-3xl font-headline font-bold hover:text-primary transition-colors"
          >
            Explore Full Archive
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={24} />
            </div>
          </Link>
        </motion.div>
      )}
    </section>
  )
}

