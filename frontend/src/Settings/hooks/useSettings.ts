import { useQuery } from '@tanstack/react-query'
import api from '../../lib/api'
import { PortfolioSettings } from '../types'

export function useSettings() {
  return useQuery<PortfolioSettings>({
    queryKey: ['settings'],
    queryFn: async () => { 
      const { data } = await api.get('/settings')
      return data 
    },
  })
}
