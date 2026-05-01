import { useUIStore } from '../../store/uiStore'
import { Button } from './Button'
import { AlertTriangle } from 'lucide-react'

export function ConfirmDialog() {
  const { confirmDialog, closeConfirm } = useUIStore()
  if (!confirmDialog) return null

  const { title, message, confirmLabel = 'Confirm', variant = 'primary', onConfirm } = confirmDialog

  const handleConfirm = async () => {
    await onConfirm?.()
    closeConfirm()
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={closeConfirm} />
      <div className="relative bg-surface-container-low rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            variant === 'destructive' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
          }`}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">{title}</h3>
            <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={closeConfirm}>Cancel</Button>
          <Button variant={variant === 'destructive' ? 'destructive' : 'primary'} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
