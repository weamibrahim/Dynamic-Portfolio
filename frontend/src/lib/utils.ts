import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

export function formatDate(date: string | Date | undefined) {
  if (!date) return '—'
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))
}

export function formatNumber(n: number | undefined) {
  if (n === undefined || (n !== 0 && !n)) return '0'
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
}

export function truncate(str: string | undefined, n: number) { 
  if (!str) return ''
  return str.length > n ? str.slice(0, n) + '...' : str 
}

export function getInitials(name: string | undefined) {
  if (!name) return '??'
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

// Images are now Cloudinary URLs (full https://). Legacy local paths (/uploads/...)
// are resolved against the API base for backwards compatibility.
export function imgUrl(path: string | undefined | null): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const base = (import.meta.env.VITE_API_URL as string | undefined)?.replace('/api', '') || 'http://localhost:5000'
  return `${base}${path}`
}
