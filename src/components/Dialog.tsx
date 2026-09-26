import type { ReactNode } from 'react'
import { X } from 'lucide-react'

type Props = {
  onClose: () => void
  children: ReactNode
  className?: string
}

function Dialog({ onClose, children, className = '' }: Props) {
  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={`pb-safe relative max-h-[90%] w-full overflow-hidden rounded-t-3xl bg-white shadow-soft sm:max-w-md sm:rounded-3xl ${className}`}
      >
        <button onClick={onClose} aria-label="Cerrar" className="absolute top-3 right-3 z-10 rounded-none bg-white/80 p-1.5 text-ink">
          <X className="size-4" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Dialog
