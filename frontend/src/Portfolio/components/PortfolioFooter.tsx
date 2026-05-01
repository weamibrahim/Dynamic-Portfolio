const GithubIcon = ({ size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)

const LinkedinIcon = ({ size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

export default function PortfolioFooter({ title, githubUrl, linkedinUrl }: { title?: string, githubUrl?: string, linkedinUrl?: string }) {
  return (
    <footer className="py-16 px-8 border-t border-outline-variant/10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-bold mb-2">© {new Date().getFullYear()} {title || 'Digital Curator'}</p>
          <p className="text-[10px] text-on-surface-variant/40 uppercase tracking-[0.1em]">Built with precision & editorial aesthetics.</p>
        </div>
        
        <div className="flex items-center gap-10">
          <a 
            href={githubUrl || '#'} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant hover:text-primary transition-all duration-300 group"
          >
            <GithubIcon size={14} className="group-hover:rotate-12 transition-transform" />
            GitHub
          </a>
          <a 
            href={linkedinUrl || '#'} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant hover:text-primary transition-all duration-300 group"
          >
            <LinkedinIcon size={14} className="group-hover:-rotate-12 transition-transform" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
