import { FolderOpen, Eye, Pencil } from 'lucide-react'
import { Card } from '../../components/ui/Card'

export default function ProjectStats({ total, draftCount }: { total: number, draftCount: number }) {
  const stats = [
    { label: 'TOTAL PROJECTS', value: total ?? '—', sub: '+12% from last month', icon: <FolderOpen size={20} /> },
    
    { label: 'ACTIVE DRAFTS', value: String(draftCount).padStart(2, '0'), sub: 'Awaiting final documentation', icon: <Pencil size={20} /> },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {stats.map(s => (
        <Card key={s.label} className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">{s.label}</p>
            <p className="font-headline text-4xl font-bold text-on-surface">{s.value}</p>
            <p className="text-xs text-secondary mt-1">{s.sub}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
            {s.icon}
          </div>
        </Card>
      ))}
    </div>
  )
}
