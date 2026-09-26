import { CheckCircle2 } from 'lucide-react'
import { formatAddress } from '../account/types'
import { useAccount } from '../account/useAccount'
import { Card, PrimaryButton, SecondaryButton } from '../components/ui'
import { formatPrice } from '../data/products'
import { useNav } from '../nav'

function ConfirmationScreen({ orderId }: { orderId: string }) {
  const { user, orders } = useAccount()
  const { go, replace } = useNav()
  const order = orders.find((o) => o.id === orderId)
  if (!order) return null

  return (
    <div className="mx-auto max-w-md text-center">
      <CheckCircle2 className="mx-auto mt-4 size-14 text-ink" strokeWidth={1.5} />
      <h2 className="mt-3 text-2xl">¡Gracias por tu compra{user ? `, ${user.firstName}` : ''}!</h2>
      <p className="mt-1 text-sm text-muted">
        Tu pedido <strong className="text-ink">{order.id}</strong> está confirmado. Te avisaremos cuando salga hacia tu dirección.
      </p>

      <Card className="mt-5 text-left text-sm">
        <dl className="space-y-2">
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Total</dt>
            <dd className="font-semibold">{formatPrice(order.total)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Pago</dt>
            <dd className="text-right">{order.payment.detail}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Entrega</dt>
            <dd className="text-right">{formatAddress(order.address)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Llega</dt>
            <dd>En 24–48 h</dd>
          </div>
        </dl>
      </Card>

      <div className="mt-5 space-y-2">
        <PrimaryButton onClick={() => replace({ name: 'order', id: order.id })}>Ver mi pedido</PrimaryButton>
        <SecondaryButton onClick={() => go({ name: 'catalog', listing: { kind: 'new' } })}>Seguir comprando</SecondaryButton>
      </div>
    </div>
  )
}

export default ConfirmationScreen
