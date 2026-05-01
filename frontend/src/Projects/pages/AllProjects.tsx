import { useState } from 'react'
import { imgUrl } from '../../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useProjects } from '../hooks/useProjects'
import { useSettings } from '../../Settings/hooks/useSettings'
import PortfolioNav from '../../Portfolio/components/PortfolioNav'
import PortfolioFooter from '../../Portfolio/components/PortfolioFooter'
import { TechTag } from '../../components/ui/Card'
import { ArrowLeft, Globe, GitFork, ArrowRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AllProjectsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { data: settings } = useSettings()
  const { data: projectData, isLoading } = useProjects({ 
    status: 'published', 
    page, 
    limit: 6,
    search 
  })

  const projects = projectData?.projects ?? []
  const totalPages = projectData?.pages ?? 1

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body">
     
      <PortfolioNav 
        title={settings?.portfolioTitle || 'The Digital Curator'} 
        navItems={[{ label: 'Back to Home', href: '/portfolio', show: true }]} 
      />

      <main className="pt-32 pb-20 px-8 max-w-6xl mx-auto">
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <Link to="/portfolio" className="p-2 rounded-full hover:bg-surface-variant transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-headline text-4xl font-bold">All Projects</h1>
          </motion.div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-on-surface-variant max-w-2xl">
              Exploring the intersection of design and technology through a diverse range of digital products and experiments.
            </p>
            
            <div className="relative group max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-3 bg-surface-container border border-outline-variant/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-surface-container animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <AnimatePresence mode="popLayout">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-surface-container rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col border border-outline-variant/10"
                  >
                    <div className="aspect-video bg-surface-container-high relative overflow-hidden">
                      {project.thumbnail ? (
                        <img 
                          src={imgUrl(project.thumbnail)} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          alt={project.title} 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-on-surface-variant/10 font-headline text-5xl font-bold">
                          {project.title[0]}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                          {project.year || new Date(project.createdAt).getFullYear()}
                        </span>
                        <div className="flex gap-3">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                              <GitFork size={16} />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                              <Globe size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-sm text-on-surface-variant mb-6 line-clamp-3 flex-1">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack?.slice(0, 3).map(t => (
                          <TechTag key={t}>{t}</TechTag>
                        ))}
                      </div>

                      {project.liveUrl ? (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-primary group/link">
                          VIEW PROJECT <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      ) : (
                        <span className="text-sm font-bold text-on-surface-variant/50">COMMERCIAL PROJECT</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-xl border border-outline-variant/20 disabled:opacity-30 hover:bg-surface-variant transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-xl font-bold transition-all ${
                        page === i + 1 
                          ? 'bg-primary text-on-primary' 
                          : 'hover:bg-surface-variant'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-xl border border-outline-variant/20 disabled:opacity-30 hover:bg-surface-variant transition-colors"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </>
        )}

        {projects.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <p className="text-on-surface-variant text-lg">No projects found matching your search.</p>
            <button 
              onClick={() => { setSearch(''); setPage(1); }}
              className="mt-4 text-primary font-bold underline"
            >
              Clear search
            </button>
          </div>
        )}
      </main>

      <PortfolioFooter 
        title={settings?.portfolioTitle} 
        githubUrl={settings?.githubUrl}
        linkedinUrl={settings?.linkedinUrl}
      />
    </div>
  )
}
