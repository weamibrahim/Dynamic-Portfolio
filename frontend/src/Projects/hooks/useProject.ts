import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api'
import { Project } from '../types'
import { projectKeys } from './useProjects'

export function useProject(id: string | undefined) {
  return useQuery<Project>({
    queryKey: projectKeys.detail(id || ''),
    queryFn: async () => { 
      const { data } = await api.get(`/projects/${id}`)
      return data 
    },
    enabled: !!id,
  })
}
