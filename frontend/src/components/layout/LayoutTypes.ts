import { LucideIcon } from 'lucide-react'

export interface NavItem {
  to: string
  icon: LucideIcon
  label: string
}

export interface SidebarProps {
  onClose?: () => void
  onNewProject?: () => void
  portfolioTitle?: string
}

export interface LayoutFooterProps {
  portfolioTitle?: string
  githubUrl?: string
  linkedinUrl?: string
}

export interface HeaderProps {
  onOpenMobileNav: () => void
  search: string
  onSearchChange: (value: string) => void
}
