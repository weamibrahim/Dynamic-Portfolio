import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api'

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: async () => { 
      const { data } = await api.get('/analytics/overview')
      return data 
    },
    refetchInterval: 30000,
  })
}
