import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProjectFilters } from '../types'

interface ProjectPaginationProps {
  filters: ProjectFilters & { page: number; limit: number };
  setFilters: React.Dispatch<React.SetStateAction<ProjectFilters>>;
  total: number;
  pages: number;
}

export default function ProjectPagination({ filters, setFilters, total, pages }: ProjectPaginationProps) {
  if (pages <= 1) return null

  return (
    <div className="px-6 py-4 flex items-center justify-between border-t border-outline-variant/10">
      <p className="text-xs text-on-surface-variant">
        Showing {((filters.page - 1) * filters.limit) + 1} to {Math.min(filters.page * filters.limit, total)} of {total} projects
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setFilters(f => ({ ...f, page: (f.page ?? 1) - 1 }))}
          disabled={filters.page <= 1}
          className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setFilters(f => ({ ...f, page: i + 1 }))}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
              filters.page === i + 1
                ? 'gradient-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setFilters(f => ({ ...f, page: (f.page ?? 1) + 1 }))}
          disabled={filters.page >= pages}
          className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
