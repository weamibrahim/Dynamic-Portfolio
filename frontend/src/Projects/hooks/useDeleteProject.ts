import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import { useToast } from '../../components/ui/Toast'
import { projectKeys } from './useProjects'

export function useDeleteProject() {
  const qc = useQueryClient()
  const { toast } = useToast()
  return useMutation({
    mutationFn: async (id: string) => { 
      const { data } = await api.delete(`/projects/${id}`)
      return data 
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: projectKeys.all })
      toast({ type: 'success', message: data.message || 'Project deleted successfully' })
    },
    onError: (err: any) => {
      toast({ type: 'error', message: err.response?.data?.message || 'Failed to delete project' })
    }
  })
}
