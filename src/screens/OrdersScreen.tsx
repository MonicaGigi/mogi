import { ChevronRight, Package } from 'lucide-react'
import { formatDate, orderProgress } from '../account/orderStatus'
import { useAccount } from '../account/useAccount'
import EmptyState from '../components/EmptyState'
import ProductImage from '../components/ProductImage'
import { ScreenTitle } from '../components/ui'
import { formatPrice, productById } from '../data/products'
import { useNav } from '../nav'
import { useNow } from '../useNow'

function OrdersScreen() {
  const { orders } = useAccount()
  const { go } = useNav()
  const now = useNow()

  if (orders.length === 0) {
    return (
      <>
        <ScreenTitle title="Mis pedidos" />
        <EmptyState
          icon={Package}
          title="Aún no tienes pedidos"
          text="Cuando compres algo, podrás seguir aquí su estado."
          action={{ label: 'Ver novedades', onClick: () => go({ name: 'catalog', listing: { kind: 'new' } }) }}
        />
      </>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ScreenTitle title="Mis pedidos" subtitle={`${orders.length} pedidos`} />
      <ul className="space-y-3">
        {orders.map((order) => {
          const { label, cancelled } = orderProgress(order, now)
          const units = order.lines.reduce((s, l) => s + l.qty, 0)
          return (
            <li key={order.id}>
              <button
                onClick={() => go({ name: 'order', id: order.id })}
                className="flex w-full items-center gap-3 rounded-card bg-white p-3 text-left shadow-soft ring-1 ring-neutral-200 active:bg-neutral-50"
              >
                <div className="flex -space-x-4">
                  {order.lines.slice(0, 3).map((l) => {
                    const product = productById(l.productId)
                    return product ? (
                      <ProductImage key={l.productId + l.size + l.color} product={product} width={120} className="aspect-[3/4] w-10 rounded-md ring-2 ring-white" />
                    ) : null
                  })}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{order.id}</p>
                  <p className="text-xs text-muted">
                    {formatDate(order.createdAt)} · {units} {units === 1 ? 'artículo' : 'artículos'}
                  </p>
                  <span
                    className={`mt-1 inline-block rounded-none px-2 py-0.5 text-[11px] font-medium ${
                      cancelled ? 'bg-red-50 text-red-700' : label === 'Entregado' ? 'bg-neutral-100' : 'bg-neutral-100 text-ink'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                <span className="text-sm font-semibold">{formatPrice(order.total)}</span>
                <ChevronRight className="size-4 text-neutral-300" />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default OrdersScreen
