import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import { useToast } from '../../components/ui/Toast'

export function usePublishPortfolio() {
  const qc = useQueryClient()
  const { toast } = useToast()
  return useMutation({
    mutationFn: async () => { 
      const { data } = await api.post('/settings/publish')
      return data 
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['settings'] })
      toast({ type: 'success', message: data.message || 'Portfolio published successfully' })
    },
    onError: (err: any) => {
      toast({ type: 'error', message: err.response?.data?.message || 'Failed to publish portfolio' })
    }
  })
}
