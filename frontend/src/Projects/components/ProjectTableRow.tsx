import { FolderOpen, Globe, GitFork, Pencil, Trash2 } from 'lucide-react'
import { Badge, TechTag } from '../../components/ui/Card'
import { formatDate, imgUrl } from '../../lib/utils'
import { Project } from '../types'

interface ProjectTableRowProps {
  project: Project;
  onEdit: (id: string) => void;
  onDelete: (project: Project) => void;
}

export default function ProjectTableRow({ project, onEdit, onDelete }: ProjectTableRowProps) {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-surface-container-high/40 transition-colors group">
      {/* Name */}
      <div className="col-span-4 flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-surface-container-highest flex-shrink-0 overflow-hidden">
          {project.thumbnail
            ? <img src={imgUrl(project.thumbnail)} className="w-full h-full object-cover" alt="" />
            : <div className="w-full h-full flex items-center justify-center text-primary"><FolderOpen size={16} /></div>
          }
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-on-surface truncate">{project.title}</p>
          <p className="text-xs text-on-surface-variant truncate">{project.description?.slice(0, 45)}…</p>
        </div>
      </div>
      {/* Status */}
      <div className="col-span-2 flex items-center">
        <Badge variant={project.status}>{project.status}</Badge>
      </div>
      {/* Tech Stack */}
      <div className="col-span-2 flex items-center gap-1 flex-wrap">
        {project.techStack?.slice(0, 2).map(t => (
          <TechTag key={t}>{t}</TechTag>
        ))}
        {project.techStack && project.techStack.length > 2 && (
          <span className="text-[10px] text-on-surface-variant">+{project.techStack.length - 2}</span>
        )}
      </div>
      {/* Date */}
      <div className="col-span-2 flex items-center">
        <span className="text-xs text-on-surface-variant">{formatDate(project.createdAt)}</span>
      </div>
      {/* Actions */}
      <div className="col-span-2 flex items-center justify-end gap-1">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer"
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
            <Globe size={15} />
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer"
            className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">
            <GitFork size={15} />
          </a>
        )}
        <button
          onClick={() => onEdit(project._id)}
          className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
          <Pencil size={15} />
        </button>
        <button
          onClick={() => onDelete(project)}
          className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}
