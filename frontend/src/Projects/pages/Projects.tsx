import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'
import { useDeleteProject } from '../hooks/useDeleteProject'
import { useUIStore } from '../../store/uiStore'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Plus, Filter, FolderOpen } from 'lucide-react'
import { Project, ProjectFilters as ProjectFiltersType } from '../types'

// Modular Components
import ProjectFiltersComponent from '../components/ProjectFilters'
import ProjectStats from '../components/ProjectStats'
import ProjectTableRow from '../components/ProjectTableRow'
import ProjectPagination from '../components/ProjectPagination'
import ProjectSkeleton from '../components/ProjectSkeleton'

import { useToast } from '../../components/ui/Toast'

export default function ProjectsPage() {
  const navigate = useNavigate()
  const { openConfirm } = useUIStore()
  const { toast } = useToast()
  const [filters, setFilters] = useState<ProjectFiltersType>({ 
    page: 1, 
    limit: 5, 
    status: '', 
    search: '', 
  })
  const [searchInput, setSearchInput] = useState('')

  const { data, isLoading, isFetching } = useProjects(filters)
  const deleteMutation = useDeleteProject()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters(f => ({ ...f, search: searchInput, page: 1 }))
  }

  const handleDelete = (project: Project) => {
    openConfirm({
      title: 'Delete Project',
      message: `Are you sure you want to delete "${project.title}"? This cannot be undone.`,
      confirmLabel: 'Delete',
      variant: 'destructive',
      onConfirm: async () => {
        try {
          await deleteMutation.mutateAsync(project._id)
          // Toast is handled in the mutation hook onSuccess
        } catch (err) {
          // Toast is handled in the mutation hook onError
        }
      },
    })
  }

  const projects = data?.projects ?? []
  const total = data?.total ?? 0
  const pages = data?.pages ?? 1
  const draftCount = projects.filter(p => p.status === 'draft').length

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-headline text-3xl font-bold">Management Console</h1>
          <p className="text-on-surface-variant mt-1">Curate and deploy your technical architectural portfolio.</p>
        </div>
        <div className="flex gap-3">
          
          <Button onClick={() => navigate('/projects/new')} size="md">
            <Plus size={15} /> Add New Project
          </Button>
        </div>
      </div>

      <ProjectStats total={total} draftCount={draftCount} />

      <ProjectFiltersComponent 
        filters={filters} 
        setFilters={setFilters} 
        searchInput={searchInput} 
        setSearchInput={setSearchInput} 
        handleSearch={handleSearch} 
      />

      {/* Table Container */}
      <Card className="overflow-hidden p-0">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-outline-variant/10">
          {['PROJECT NAME', 'STATUS', 'TECH STACK', 'DATE ADDED', 'ACTIONS'].map((h, i) => (
            <div key={h} className={`text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant ${
              i === 0 ? 'col-span-4' : i === 1 ? 'col-span-2' : i === 2 ? 'col-span-2' : i === 3 ? 'col-span-2' : 'col-span-2 text-right'
            }`}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {isLoading ? (
          <ProjectSkeleton />
        ) : projects.length === 0 ? (
          <div className="py-20 text-center">
            <FolderOpen size={40} className="mx-auto text-on-surface-variant/20 mb-4" />
            <p className="text-on-surface-variant font-medium">No projects found.</p>
            <Link to="/projects/new">
              <Button className="mt-4" size="md"><Plus size={14} /> Create your first project</Button>
            </Link>
          </div>
        ) : (
          <div className={`divide-y divide-outline-variant/5 transition-opacity ${isFetching ? 'opacity-60' : ''}`}>
            {projects.map(project => (
              <ProjectTableRow 
                key={project._id} 
                project={project} 
                onEdit={(id: string) => navigate(`/projects/${id}/edit`)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <ProjectPagination 
          filters={filters as ProjectFiltersType & { page: number; limit: number }} 
          setFilters={setFilters} 
          total={total} 
          pages={pages} 
        />
      </Card>
    </div>
  )
}
