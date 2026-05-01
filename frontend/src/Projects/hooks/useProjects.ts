import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api'
import { ProjectFilters, ProjectsResponse } from '../types'

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (f: ProjectFilters) => [...projectKeys.lists(), f] as const,
  stats: () => [...projectKeys.all, 'stats'] as const,
  detail: (id: string) => [...projectKeys.all, id] as const,
}

export function useProjects(filters: ProjectFilters = {}) {
  return useQuery<ProjectsResponse>({
    queryKey: projectKeys.list(filters),
    queryFn: async () => {
      console.log('useProjects filters:', filters)
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== '') params.append(k, String(v))
      })
      const { data } = await api.get(`/projects?${params.toString()}`)
      return data
    },
  })
}
