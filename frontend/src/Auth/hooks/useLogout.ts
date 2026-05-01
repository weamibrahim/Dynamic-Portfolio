import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { useToast } from '../../components/ui/Toast'
import { queryClient } from '../../App'
import api from '../../lib/api'

export function useLogout() {
  const { clearAuth } = useAuthStore()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async () => {
      try {
        await api.post('/auth/logout')
      } catch {
        // Ignore logout errors as we want to clear local state anyway
      }
    },
    onSuccess: () => {
      clearAuth()
      queryClient.clear()
      toast({ type: 'success', message: 'Logged out successfully' })
    }
  })
}
