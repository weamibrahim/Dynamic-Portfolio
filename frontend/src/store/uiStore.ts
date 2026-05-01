import { create } from 'zustand'

export interface Toast {
  id: number
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

export interface ConfirmDialog {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'destructive'
  onConfirm: () => void | Promise<void>
}

interface UIState {
  sidebarOpen: boolean
  toggleSidebar: () => void
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: number) => void
  confirmDialog: ConfirmDialog | null
  openConfirm: (dialog: ConfirmDialog) => void
  closeConfirm: () => void
}

export const useUIStore = create<UIState>()((set, get) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  toasts: [],
  addToast: (toast) => {
    const id = Date.now()
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }))
    setTimeout(() => get().removeToast(id), toast.duration || 4000)
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  // Confirmation dialog
  confirmDialog: null,
  openConfirm: (dialog) => set({ confirmDialog: dialog }),
  closeConfirm: () => set({ confirmDialog: null }),
}))
