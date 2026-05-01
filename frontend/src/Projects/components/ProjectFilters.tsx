import { Search } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { ProjectFilters as ProjectFiltersType } from '../types'

interface ProjectFiltersProps {
  filters: ProjectFiltersType;
  setFilters: React.Dispatch<React.SetStateAction<ProjectFiltersType>>;
  searchInput: string;
  setSearchInput: (val: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const STATUS_OPTS = ['', 'published', 'draft', 'archived']


export default function ProjectFilters({ filters, setFilters, searchInput, setSearchInput, handleSearch }: ProjectFiltersProps) {
  return (
    <Card className="mb-4">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-surface-container-lowest text-on-surface text-sm py-2.5 pl-9 pr-4 rounded-xl outline-none focus:ring-2 ring-primary/20 placeholder:text-on-surface-variant/40"
          />
        </div>
        <select
          value={filters.status || ''}
          onChange={e => setFilters(f => ({ ...f, status: e.target.value, page: 1 }))}
          className="bg-surface-container-lowest text-on-surface text-sm py-2.5 px-4 rounded-xl outline-none focus:ring-2 ring-primary/20 cursor-pointer"
        >
          {STATUS_OPTS.map(s => <option key={s} value={s}>{s || 'All Status'}</option>)}
        </select>

        <Button type="submit" size="md">Search</Button>
      </form>
    </Card>
  )
}
