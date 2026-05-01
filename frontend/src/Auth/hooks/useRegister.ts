import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { useToast } from '../../components/ui/Toast'
import api from '../../lib/api'

export function useRegister() {
  const { setAuth } = useAuthStore()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ name, email, password }: any) => {
      const { data } = await api.post('/auth/register', { name, email, password })
      return data
    },
    onSuccess: (data) => {
      setAuth(data.user)
      toast({ type: 'success', message: data.message || 'Account created successfully' })
    },
    onError: (err: any) => {
      toast({ type: 'error', message: err.response?.data?.message || 'Registration failed' })
    }
  })
}
