import { useProjects } from '../../Projects/hooks/useProjects'
import { useSettings } from '../../Settings/hooks/useSettings'
import { useAuthStore } from '../../store/authStore'
import PortfolioNav from '../components/PortfolioNav'
import PortfolioHero from '../components/PortfolioHero'
import PortfolioWork from '../components/PortfolioWork'
import PortfolioStack from '../components/PortfolioStack'
import PortfolioContact from '../components/PortfolioContact'
import PortfolioFooter from '../components/PortfolioFooter'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function PortfolioPage() {
  const { data: projectData } = useProjects({ status: 'published', limit: 10 })
  const { data: settings } = useSettings()
  const { user } = useAuthStore()

  const projects = projectData?.projects ?? [];
  const hasMore = projects.length > 3;

  const featured = projects.slice(0, 3); // Use the 3 projects for display

  const visibility = settings?.sectionVisibility || { showStack: true, showContact: true }

  const navItems = [
    { label: 'Work', href: '#work', show: featured.length > 0 },
    { label: 'Capabilities', href: '#stack', show: visibility.showStack },
    { label: 'Contact', href: '#contact', show: visibility.showContact },
  ]

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary/20">
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <PortfolioNav
        title={settings?.portfolioTitle || 'Portfolio'}
        navItems={navItems}
      />

      <main>
        <PortfolioHero
          headline={settings?.heroHeadline || 'Crafting Work That Speaks.'}
          subtitle={settings?.heroSubtitle || 'Merging technical precision with creative flair to build digital experiences that leave a lasting impression.'}
          showContact={visibility.showContact}
          heroImage={settings?.heroImage}
          name={user?.name || settings?.portfolioTitle}
          role={settings?.role}
        />

        <PortfolioWork
          featured={featured}
          showViewAll={hasMore}
        />

        {visibility.showStack && (
          <PortfolioStack
            stack={settings?.stack || []}
            sectionTitle={settings?.stackSectionTitle}
          />
        )}

        {visibility.showContact && (
          <PortfolioContact
            email={settings?.contactEmail}
            location={settings?.contactLocation}
          />
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

