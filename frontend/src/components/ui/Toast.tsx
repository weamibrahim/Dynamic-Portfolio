import { useUIStore } from '../../store/uiStore'
import { cn } from '../../lib/utils'
import { CheckCircle, XCircle, Info, X, AlertTriangle } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={16} />,
  error:   <XCircle size={16} />,
  info:    <Info size={16} />,
  warning: <AlertTriangle size={16} />,
}

const STYLES: Record<ToastType, string> = {
  success: 'bg-secondary/10 text-secondary border-secondary/20',
  error:   'bg-error/10 text-error border-error/20',
  info:    'bg-primary/10 text-primary border-primary/20',
  warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, removeToast } = useUIStore()
  return (
    <>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => {
          const type = t.type || 'info'
          return (
            <div
              key={t.id}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium',
                'border shadow-xl pointer-events-auto animate-fade-in',
                'backdrop-blur-sm',
                STYLES[type]
              )}
            >
              {ICONS[type]}
              <span>{t.message}</span>
              <button onClick={() => removeToast(t.id)} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
                <X size={13} />
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}

// Hook — thin wrapper around Zustand
export function useToast() {
  const { addToast } = useUIStore()
  return { toast: addToast }
}
