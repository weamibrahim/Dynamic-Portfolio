import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import { useToast } from '../../components/ui/Toast'
import { projectKeys } from './useProjects'

export function useCreateProject() {
  const qc = useQueryClient()
  const { toast } = useToast()
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post('/projects', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      return data
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: projectKeys.all })
      toast({ type: 'success', message: data.message || 'Project created successfully' })
    },
    onError: (err: any) => {
      toast({ type: 'error', message: err.response?.data?.message || 'Failed to create project' })
    }
  })
}
