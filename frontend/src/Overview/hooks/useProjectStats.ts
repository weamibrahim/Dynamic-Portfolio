import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api'
import { projectKeys } from '../../Projects/hooks/useProjects'

export function useProjectStats() {
  return useQuery({
    queryKey: projectKeys.stats(),
    queryFn: async () => {
      const { data } = await api.get('/projects/stats')
      return data
    },
  })
}
