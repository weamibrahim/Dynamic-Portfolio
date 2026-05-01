import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import api from '../../lib/api'
import { useEffect } from 'react'

export function useCheckAuth() {
  const { setAuth, clearAuth } = useAuthStore()
  
  const query = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await api.get('/auth/me')
      return data
    },
    retry: false,
    staleTime: Infinity, // Only check once or when explicitly invalidated
  })

  useEffect(() => {
    if (query.data) {
      setAuth(query.data)
    } else if (query.isError) {
      clearAuth()
    }
  }, [query.data, query.isError, setAuth, clearAuth])

  return query
}
