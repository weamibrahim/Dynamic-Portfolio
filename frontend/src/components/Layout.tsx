import { useState, ReactNode } from 'react'
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import LayoutFooter from './layout/LayoutFooter'
import { useSettings } from '../Settings/hooks/useSettings'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { data: settings } = useSettings()

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 fixed left-0 top-0 h-screen bg-surface-container-low flex-col z-50">
        <Sidebar portfolioTitle={settings?.portfolioTitle} />
      </aside>

      {/* Mobile Sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-surface-container-low h-full z-50 animate-slide-in">
            <Sidebar 
              onClose={() => setMobileOpen(false)} 
              portfolioTitle={settings?.portfolioTitle}
            />
          </aside>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <Header 
          onOpenMobileNav={() => setMobileOpen(true)} 
          search={search}
          onSearchChange={setSearch}
        />

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 animate-fade-in">
          {children}
        </main>

        <LayoutFooter 
          portfolioTitle={settings?.portfolioTitle}
          githubUrl={settings?.githubUrl}
          linkedinUrl={settings?.linkedinUrl}
        />
      </div>
    </div>
  )
}
