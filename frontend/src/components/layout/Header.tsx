import { Search, Menu, Sun, Moon, Eye } from 'lucide-react'
import { HeaderProps } from './LayoutTypes'
import { useThemeStore } from '../../store/themeStore'

export default function Header({ onOpenMobileNav, search, onSearchChange }: HeaderProps) {
  const { theme, setTheme } = useThemeStore()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
 

  return (
    <header className="sticky top-0 z-40 h-16 bg-surface/90 backdrop-blur-sm border-b border-outline-variant/10 flex items-center justify-between px-6 gap-4">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onOpenMobileNav} className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface">
          <Menu size={20} />
        </button>
        {/* <div className="relative w-full max-w-sm hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full bg-surface-container-lowest/60 border-none rounded-full py-2 pl-9 pr-4 text-sm focus:ring-2 ring-primary/20 placeholder:text-on-surface-variant/40 outline-none transition-all text-on-surface"
          />
        </div> */}
      </div>
      <div className="flex items-center gap-1">
        <button  
        onClick={() => window.open('/portfolio', '_blank')}
        className='text-sm text-on-surface-variant hover:text-on-surface'>
          <Eye size={14} />
          
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}

