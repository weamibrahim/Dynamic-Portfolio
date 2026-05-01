import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import { PortfolioSettings } from '../types'
import { useToast } from '../../components/ui/Toast'

export function useUpdateSettings() {
  const qc = useQueryClient()
  const { toast } = useToast()
  return useMutation({
    mutationFn: async (updates: FormData | Partial<PortfolioSettings>) => { 
      const headers = updates instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {}
      const { data } = await api.put('/settings', updates, { headers })
      return data 
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['settings'] })
      toast({ type: 'success', message: data.message || 'Settings saved successfully' })
    },
    onError: (err: any) => {
      toast({ type: 'error', message: err.response?.data?.message || 'Failed to update settings' })
    }
  })
}
