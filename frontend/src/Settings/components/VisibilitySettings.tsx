import { Eye, Layers, Mail } from 'lucide-react'
import { Card } from '../../components/ui/Card'

export default function VisibilitySettings({ visibility, onToggle }) {
  const options = [
    { key: 'showStack', icon: <Layers size={16} />, label: 'Show Stack', desc: 'Display technologies and tools' },
    { key: 'showContact', icon: <Mail size={16} />, label: 'Show Contact Form', desc: 'Let visitors reach out directly' },
  ]

  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <Eye size={16} className="text-primary" />
        <h3 className="font-headline text-lg font-semibold">Section Visibility</h3>
      </div>
      <div className="space-y-3">
        {options.map(({ key, icon, label, desc }) => (
          <div key={key} className="flex items-center justify-between p-4 bg-surface-container rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {icon}
              </div>
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-on-surface-variant">{desc}</p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={visibility?.[key]}
              onClick={() => onToggle(key)}
              className={`relative w-12 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${
                visibility?.[key] ? 'bg-primary' : 'bg-outline-variant/30'
              }`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                visibility?.[key] ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  )
}
