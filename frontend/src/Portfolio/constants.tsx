import { 
  Layout, Smartphone, Server, Palette, 
  Code, FileText, HelpCircle, Database, 
  Layers, Zap, Shield, Cpu 
} from 'lucide-react'

export const CAT_ICONS = {
  'Web Application': <Layout size={14} className="text-primary" />,
  'Mobile App': <Smartphone size={14} className="text-secondary" />,
  'API / Backend': <Server size={14} className="text-tertiary" />,
  'Design System': <Palette size={14} className="text-rose-500" />,
  'Open Source': <Code size={14} className="text-emerald-500" />,
  'Case Study': <FileText size={14} className="text-amber-500" />,
  'E-commerce': <Zap size={14} className="text-yellow-500" />,
  'Security': <Shield size={14} className="text-blue-500" />,
  'Infrastructure': <Database size={14} className="text-purple-500" />,
  'Architecture': <Layers size={14} className="text-indigo-500" />,
  'Hardware / IoT': <Cpu size={14} className="text-orange-500" />,
  'Other': <HelpCircle size={14} className="text-on-surface-variant" />,
}

export const DEFAULT_STACK = [
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Node.js', icon: 'nodedotjs' },
  { name: 'Next.js', icon: 'nextdotjs' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Tailwind CSS', icon: 'tailwindcss' },
  { name: 'Figma', icon: 'figma' },
  { name: 'Docker', icon: 'docker' },
  { name: 'AWS', icon: 'amazonaws' },
  { name: 'Python', icon: 'python' },
]
