import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { getInitials, cn } from '../../lib/utils'
import {
  LayoutDashboard, FolderOpen, Settings, Plus,
  LogOut, X, User, ExternalLink
} from 'lucide-react'
import { SidebarProps, NavItem } from './LayoutTypes'
import { useLogout } from '../../Auth/hooks/useLogout'
const NAV_ITEMS: NavItem[] = [
  { to: '/overview', icon: LayoutDashboard, label: 'Overview' },
  { to: '/projects', icon: FolderOpen, label: 'Projects' },
  { to: '/settings', icon: Settings, label: 'Settings' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function Sidebar({ onNewProject, onClose, portfolioTitle }: SidebarProps) {
  
  const logoutMutation = useLogout()
    const { user } = useAuthStore()
  const navigate = useNavigate()
  
  
  const handleLogout = async () => {
    await logoutMutation.mutateAsync()
    navigate('/login')
  }
  const handleNew = () => { if (onClose) onClose(); onNewProject?.(); navigate('/projects/new') }

  return (
    <div className="flex flex-col h-full bg-surface-container-low">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 flex items-start justify-between border-b border-outline-variant/8">
        <div>
          <h1 className="font-headline text-base font-bold text-on-surface tracking-tight">
            {portfolioTitle || 'My Portfolio'}
          </h1>
          <p className="text-[10px] text-on-surface-variant/50 font-medium tracking-widest uppercase mt-0.5">Dashboard</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 text-on-surface-variant hover:text-on-surface lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-4 space-y-0.5">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) => cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200',
              isActive
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            )}
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}

        {/* Divider */}
        <div className="pt-3 pb-1">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant/40 px-3 mb-1">Public</p>
        </div>

        <a
          href="/portfolio"
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all duration-200"
        >
          <ExternalLink size={17} />
          View Portfolio
        </a>
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-6 mt-4 space-y-4">
        <button
          onClick={handleNew}
          className="w-full gradient-primary text-white text-sm font-semibold py-2.5 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all duration-200 active:scale-95"
        >
          <Plus size={16} /> New Project
        </button>

        <div className="pt-3 border-t border-outline-variant/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-error transition-colors text-xs uppercase tracking-wider rounded-xl hover:bg-error/5"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>

        {/* User */}
        {user && (
          <NavLink
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-3 px-2 pt-3 border-t border-outline-variant/10 group hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0 overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                getInitials(user.name)
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-on-surface truncate group-hover:text-primary transition-colors">{user.name}</p>
              <p className="text-[10px] text-on-surface-variant truncate">{user.email}</p>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  )
}
