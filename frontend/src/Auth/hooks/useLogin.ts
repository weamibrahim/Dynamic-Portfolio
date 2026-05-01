import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { useToast } from '../../components/ui/Toast'
import api from '../../lib/api'

export function useLogin() {
  const { setAuth } = useAuthStore()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ email, password }: any) => {
      const { data } = await api.post('/auth/login', { email, password })
      return data
    },
    onSuccess: (data) => {
      setAuth(data.user)
      toast({ type: 'success', message: data.message || 'Logged in successfully' })
    },
    onError: (err: any) => {
      toast({ type: 'error', message: err.response?.data?.message || 'Login failed' })
    }
  })
}
