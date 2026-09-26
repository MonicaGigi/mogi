import { useState } from 'react'
import { canCancel, formatDate, orderProgress } from '../account/orderStatus'
import { formatAddress, formatPhone } from '../account/types'
import { useAccount } from '../account/useAccount'
import OrderTimeline from '../components/OrderTimeline'
import ProductImage from '../components/ProductImage'
import { Card, ScreenTitle, SecondaryButton } from '../components/ui'
import { formatPrice, productById } from '../data/products'
import { useNav } from '../nav'
import { useNow } from '../useNow'
import { useShop } from '../useShop'

function OrderDetailScreen({ id }: { id: string }) {
  const { orders, cancelOrder } = useAccount()
  const { addToBag, notify } = useShop()
  const { go } = useNav()
  const [confirming, setConfirming] = useState(false)
  useNow()
  const order = orders.find((o) => o.id === id)
  if (!order) return <ScreenTitle title="Pedido no encontrado" />

  const { label } = orderProgress(order)
  const isCod = order.payment.method === 'cod'

  const reorder = () => {
    order.lines.forEach((l) => {
      for (let i = 0; i < l.qty; i++) addToBag(l.productId, l.color, l.size)
    })
    notify('Artículos añadidos a tu bolsa')
    go({ name: 'bag' })
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <ScreenTitle title={`Pedido ${order.id}`} subtitle={formatDate(order.createdAt)} />

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Estado: {label}</h3>
          {!order.cancelledAt && label !== 'Entregado' && <span className="text-xs text-muted">Llega en 24–48 h</span>}
        </div>
        <OrderTimeline order={order} />
      </Card>

      <Card>
        <h3 className="mb-3 text-sm font-semibold">Artículos</h3>
        <ul className="space-y-3">
          {order.lines.map((l) => {
            const product = productById(l.productId)
            return (
              <li key={`${l.productId}|${l.color}|${l.size}`} className="flex gap-3">
                {product && (
                  <button onClick={() => go({ name: 'product', id: product.id })} className="w-14 shrink-0">
                    <ProductImage product={product} width={160} className="aspect-[3/4] rounded-lg" />
                  </button>
                )}
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-medium">{l.name}</p>
                  <p className="text-xs text-muted">
                    {l.color} · Talla {l.size} · x{l.qty}
                  </p>
                </div>
                <span className="text-sm">{formatPrice(l.price * l.qty)}</span>
              </li>
            )
          })}
        </ul>
        <dl className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd>{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Envío</dt>
            <dd>{order.shipping === 0 ? 'Gratis' : formatPrice(order.shipping)}</dd>
          </div>
          <div className="flex justify-between font-semibold">
            <dt>Total</dt>
            <dd>{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </Card>

      <Card className="grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <h3 className="mb-1 font-semibold">Entrega</h3>
          <p>{order.recipient}</p>
          <p className="text-muted">{formatAddress(order.address)}</p>
          {order.address.reference && <p className="text-muted">{order.address.reference}</p>}
          <p className="text-muted">{formatPhone(order.phone)}</p>
        </div>
        <div>
          <h3 className="mb-1 font-semibold">Pago</h3>
          <p>{order.payment.detail}</p>
          <p className="text-muted">
            {order.cancelledAt
              ? isCod
                ? 'Sin cargo'
                : 'Reembolso en 3–5 días hábiles'
              : isCod && label !== 'Entregado'
                ? `Pendiente: ${formatPrice(order.total)} al recibir`
                : 'Pagado'}
          </p>
        </div>
      </Card>

      <div className="space-y-2">
        <SecondaryButton onClick={reorder}>Volver a comprar</SecondaryButton>
        {canCancel(order) &&
          (confirming ? (
            <div className="rounded-card bg-red-50 p-4 text-center text-sm">
              <p>¿Seguro que quieres cancelar este pedido?</p>
              <div className="mt-3 flex gap-2">
                <SecondaryButton onClick={() => setConfirming(false)}>No</SecondaryButton>
                <button
                  onClick={() => {
                    cancelOrder(order.id)
                    setConfirming(false)
                    notify('Pedido cancelado')
                  }}
                  className="w-full rounded-full bg-red-600 py-3 text-sm font-semibold text-white"
                >
                  Sí, cancelar
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setConfirming(true)} className="w-full py-2 text-sm text-red-600 underline">
              Cancelar pedido
            </button>
          ))}
      </div>
    </div>
  )
}

export default OrderDetailScreen
