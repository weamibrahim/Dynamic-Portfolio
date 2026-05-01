import { LayoutFooterProps } from './LayoutTypes'

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

export default function LayoutFooter({ portfolioTitle, githubUrl, linkedinUrl }: LayoutFooterProps) {
  return (
    <footer className="px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-outline-variant/10">
      <div>
        <span className="text-primary font-bold text-sm font-headline">
          {portfolioTitle || 'The Digital Curator'}
        </span>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-0.5">© {new Date().getFullYear()} Digital Curator Portfolio</p>
      </div>
      <div className="flex gap-6">
        <a href={githubUrl || '#'} target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
          <GithubIcon size={16} />
        </a>
        <a href={linkedinUrl || '#'} target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
          <LinkedinIcon size={16} />
        </a>
      </div>
    </footer>
  )
}
