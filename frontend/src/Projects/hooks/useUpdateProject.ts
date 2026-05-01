import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import { useToast } from '../../components/ui/Toast'
import { projectKeys } from './useProjects'

export function useUpdateProject() {
  const qc = useQueryClient()
  const { toast } = useToast()
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const { data } = await api.put(`/projects/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      return data
    },
    onSuccess: (data, { id }) => {
      qc.invalidateQueries({ queryKey: projectKeys.all })
      qc.invalidateQueries({ queryKey: projectKeys.detail(id) })
      toast({ type: 'success', message: data.message || 'Project updated successfully' })
    },
    onError: (err: any) => {
      toast({ type: 'error', message: err.response?.data?.message || 'Failed to update project' })
    }
  })
}
