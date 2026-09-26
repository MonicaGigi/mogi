import { useEffect, useState } from 'react'
import { CheckCircle2, Loader2, Smartphone, XCircle } from 'lucide-react'
import type { PaymentMethod } from '../account/types'
import { formatPrice } from '../data/products'
import { PrimaryButton, SecondaryButton } from './ui'

type Props = {
  method: PaymentMethod
  amount: number
  yappyPhone?: string
  declined?: boolean
  onApproved: () => void
  onClose: () => void
}

type Phase = 'waiting' | 'processing' | 'approved' | 'declined'

// Simula la pasarela: Yappy espera la aprobación en el móvil, la tarjeta se "procesa" y
// el pago contra entrega solo confirma el pedido. No hay conexión real con ningún banco.
function PaymentOverlay({ method, amount, yappyPhone, declined = false, onApproved, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>(method === 'yappy' ? 'waiting' : 'processing')
  const [seconds, setSeconds] = useState(60)

  useEffect(() => {
    if (phase === 'waiting') {
      const tick = window.setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
      const approve = window.setTimeout(() => setPhase('processing'), 6000)
      return () => {
        window.clearInterval(tick)
        window.clearTimeout(approve)
      }
    }
    if (phase === 'processing') {
      const t = window.setTimeout(() => setPhase(declined ? 'declined' : 'approved'), method === 'cod' ? 900 : 2000)
      return () => window.clearTimeout(t)
    }
    if (phase === 'approved') {
      const t = window.setTimeout(onApproved, 1100)
      return () => window.clearTimeout(t)
    }
  }, [phase, declined, method, onApproved])

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-ink/40 p-6 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-card bg-white p-6 text-center shadow-soft">
        {phase === 'waiting' && (
          <>
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#1f6fd1] text-white">
              <Smartphone className="size-7" />
            </div>
            <h3 className="font-semibold">Aprueba el pago en Yappy</h3>
            <p className="mt-2 text-sm text-muted">
              Hemos enviado una solicitud de cobro de <strong className="text-ink">{formatPrice(amount)}</strong> a{' '}
              <strong className="text-ink">{yappyPhone}</strong>. Abre la app de Yappy y confírmala.
            </p>
            <p className="mt-3 text-xs text-muted">La solicitud caduca en {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</p>
            <Loader2 className="mx-auto mt-3 size-5 animate-spin text-muted" />
            <div className="mt-5 space-y-2">
              <PrimaryButton onClick={() => setPhase('processing')}>Simular aprobación ahora</PrimaryButton>
              <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
            </div>
          </>
        )}
        {phase === 'processing' && (
          <>
            <Loader2 className="mx-auto size-10 animate-spin text-ink" />
            <h3 className="mt-4 font-semibold">{method === 'cod' ? 'Confirmando tu pedido…' : 'Procesando el pago…'}</h3>
            <p className="mt-1 text-sm text-muted">No cierres la aplicación.</p>
          </>
        )}
        {phase === 'approved' && (
          <>
            <CheckCircle2 className="mx-auto size-12 text-ink" />
            <h3 className="mt-4 font-semibold">{method === 'cod' ? 'Pedido confirmado' : 'Pago aprobado'}</h3>
          </>
        )}
        {phase === 'declined' && (
          <>
            <XCircle className="mx-auto size-12 text-red-500" />
            <h3 className="mt-4 font-semibold">Pago rechazado</h3>
            <p className="mt-1 text-sm text-muted">Tu banco no ha autorizado la operación. Prueba con otra tarjeta u otro método.</p>
            <SecondaryButton onClick={onClose} className="mt-5">
              Probar otro método
            </SecondaryButton>
          </>
        )}
      </div>
    </div>
  )
}

export default PaymentOverlay
