import { useMutation } from '@tanstack/react-query'
import api from '../../lib/api'
import { useToast } from '../../components/ui/Toast'

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export function useContact() {
  const { toast } = useToast()
  return useMutation({
    mutationFn: async (payload: ContactPayload) => { 
      const { data } = await api.post('/settings/contact', payload)
      return data 
    },
    onSuccess: (data) => {
      toast({ type: 'success', message: data.message || 'Message sent successfully' })
    },
    onError: (err: any) => {
      toast({ type: 'error', message: err.response?.data?.message || 'Failed to send message' })
    }
  })
}
