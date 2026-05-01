import { Link } from 'react-router-dom'
import { useAnalyticsOverview } from '../hooks/useAnalytics'
import { useProjectStats } from '../hooks/useProjectStats'
import { useAuthStore } from '../../store/authStore'
import { StatCard, Card } from '../../components/ui/Card'

import { FolderOpen, Plus, Layers, ExternalLink, Eye } from 'lucide-react'

export default function OverviewPage() {
  const { data: analytics, isLoading: loadingAnalytics } = useAnalyticsOverview()
  const { data: stats } = useProjectStats()
  const { user } = useAuthStore()

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const statCards = [
    {
      icon: <FolderOpen size={20} />,
      label: 'Total Projects',
      value: stats?.total ?? analytics?.totalProjects ?? '—',
    },
    {
      icon: <Eye size={20} />,
      label: 'Published',
      value: stats?.published ?? '—',
    },
    {
      icon: <Layers size={20} />,
      label: 'Skills & Tools',
      value: analytics?.stackCount ?? 0,
    },
  ]

  if (loadingAnalytics) return <SkeletonOverview />

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-on-surface-variant text-sm mb-1">{greeting}{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋</p>
        <h1 className="font-headline text-3xl font-bold text-on-surface">Dashboard</h1>
        <p className="text-on-surface-variant mt-1 text-sm">Here's an overview of your portfolio activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statCards.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <h3 className="font-headline text-base font-semibold mb-5 text-on-surface">Quick Actions</h3>
          <div className="space-y-3">
            <ActionLink
              to="/projects/new"
              icon={<Plus size={18} />}
              label="Add New Project"
              sub="Upload images, links, and details"
              color="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
            />
            <ActionLink
              to="/portfolio"
              icon={<ExternalLink size={18} />}
              label="View Public Portfolio"
              sub="See how visitors see your work"
              color="bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white"
            />
            <ActionLink
              to="/settings"
              icon={<Layers size={18} />}
              label="Customize Portfolio"
              sub="Update theme, bio, links, and more"
              color="bg-tertiary/10 text-tertiary group-hover:bg-tertiary group-hover:text-white"
            />
          </div>
        </Card>

        {/* Portfolio Health */}
        {stats && (
          <Card>
            <h3 className="font-headline text-base font-semibold text-on-surface mb-6">Portfolio Health</h3>
            <div className="space-y-6">
              <ProgressBar
                label="Published"
                value={stats.published}
                total={stats.total}
                color="bg-secondary"
                textColor="text-secondary"
              />
              <ProgressBar
                label="Drafts"
                value={stats.drafts}
                total={stats.total}
                color="bg-tertiary"
                textColor="text-tertiary"
              />
              {stats.archived > 0 && (
                <ProgressBar
                  label="Archived"
                  value={stats.archived}
                  total={stats.total}
                  color="bg-outline"
                  textColor="text-on-surface-variant"
                />
              )}
            </div>

            <div className="mt-8 pt-5 border-t border-outline-variant/10">
              <Link
                to="/portfolio"
                target="_blank"
                className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
              >
                <ExternalLink size={14} /> Open portfolio in new tab
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

function ActionLink({ to, icon, label, sub, color }: { to: string; icon: React.ReactNode; label: string; sub: string; color: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-surface-container-high transition-all duration-200 group"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-on-surface">{label}</p>
        <p className="text-xs text-on-surface-variant">{sub}</p>
      </div>
    </Link>
  )
}

function ProgressBar({ label, value, total, color, textColor }: { label: string; value: number; total: number; color: string; textColor: string }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-on-surface">{label}</span>
        <span className={`text-sm font-bold ${textColor}`}>{value} <span className="text-on-surface-variant font-normal text-xs">({pct}%)</span></span>
      </div>
      <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function SkeletonOverview() {
  return (
    <div className="max-w-5xl animate-pulse">
      <div className="h-4 w-36 bg-surface-container rounded-xl mb-2" />
      <div className="h-8 w-40 bg-surface-container rounded-xl mb-2" />
      <div className="h-4 w-64 bg-surface-container rounded-xl mb-8" />
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[...Array(3)].map((_, i) => <div key={i} className="h-28 bg-surface-container-low rounded-2xl" />)}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="h-64 bg-surface-container-low rounded-2xl" />
        <div className="h-64 bg-surface-container-low rounded-2xl" />
      </div>
    </div>
  )
}
