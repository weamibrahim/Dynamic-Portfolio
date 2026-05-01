import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../lib/api'
import { useAuthStore } from '../../store/authStore'
import { useToast } from '../../components/ui/Toast'

export function useUpdateProfile() {
  const { updateUser } = useAuthStore()
  const { toast } = useToast()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (updates: { name?: string; email?: string; password?: string }) => { 
      const { data } = await api.put('/auth/profile', updates)
      return data 
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['me'] })
      if (data.user) {
        updateUser(data.user)
      }
      toast({ type: 'success', message: data.message || 'Profile updated successfully!' })
    },
    onError: (err: any) => {
      toast({ type: 'error', message: err.response?.data?.message || 'Failed to update profile' })
    }
  })
}
