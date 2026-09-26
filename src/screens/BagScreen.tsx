import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import EmptyState from '../components/EmptyState'
import ProductImage from '../components/ProductImage'
import { FREE_SHIPPING_FROM, shippingFor } from '../account/types'
import { store } from '../config'
import { formatPrice, productById } from '../data/products'
import { useNav } from '../nav'
import { useShop } from '../useShop'

type Props = {
  onOpen: (id: string) => void
  onShop: () => void
}

function BagScreen({ onOpen, onShop }: Props) {
  const { bag, bagCount, setQty, removeFromBag } = useShop()
  const { go } = useNav()

  const lines = bag.flatMap((item) => {
    const product = productById(item.productId)
    return product ? [{ item, product }] : []
  })

  if (lines.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Tu bolsa está vacía"
        text="Añade prendas desde el catálogo y aparecerán aquí."
        action={{ label: 'Ver novedades', onClick: onShop }}
      />
    )
  }

  const subtotal = lines.reduce((sum, { item, product }) => sum + item.qty * product.price, 0)
  const shipping = shippingFor(subtotal)
  const missing = FREE_SHIPPING_FROM - subtotal

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_18rem]">
      <section>
        <h2 className="text-2xl">Mi bolsa</h2>
        <p className="mb-4 text-xs text-muted">{bagCount} artículos</p>

        <ul className="space-y-3">
          {lines.map(({ item, product }) => (
            <li key={item.key} className="flex gap-3 rounded-card bg-white p-2.5 shadow-soft ring-1 ring-neutral-200">
              <button onClick={() => onOpen(product.id)} className="w-20 shrink-0">
                <ProductImage product={product} width={200} className="aspect-[3/4] rounded-xl" />
              </button>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm leading-tight font-medium">{product.name}</h3>
                  <button onClick={() => removeFromBag(item.key)} aria-label="Eliminar" className="p-1 text-muted">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <p className="mt-0.5 text-xs text-muted">
                  {item.color} · Talla {item.size}
                </p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-none ring-1 ring-neutral-300">
                    <button
                      onClick={() => (item.qty === 1 ? removeFromBag(item.key) : setQty(item.key, item.qty - 1))}
                      aria-label="Restar"
                      className="p-1.5"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm">{item.qty}</span>
                    <button onClick={() => setQty(item.key, item.qty + 1)} aria-label="Sumar" className="p-1.5">
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(item.qty * product.price)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="h-fit rounded-card bg-white p-4 shadow-soft ring-1 ring-neutral-200 md:sticky md:top-0">
        {missing > 0 ? (
          <div className="mb-4">
            <p className="text-xs text-muted">
              Te faltan <strong className="text-ink">{formatPrice(missing)}</strong> para el envío gratis
            </p>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-none bg-neutral-100">
              <div className="h-full rounded-none bg-ink" style={{ width: `${(subtotal / FREE_SHIPPING_FROM) * 100}%` }} />
            </div>
          </div>
        ) : (
          <p className="mb-4 text-xs font-medium text-ink">¡Tienes envío gratis!</p>
        )}

        <dl className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Envío</dt>
            <dd>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-neutral-100 pt-2 text-base font-semibold">
            <dt>Total</dt>
            <dd>{formatPrice(subtotal + shipping)}</dd>
          </div>
        </dl>

        <button
          onClick={() => go({ name: 'checkout' })}
          className="mt-6 w-full bg-ink py-3.5 text-[11px] font-medium tracking-[0.15em] uppercase text-white transition active:bg-neutral-700"
        >
          Finalizar compra
        </button>
        <p className="mt-2 text-center text-[11px] text-muted">ITBMS incluido · Yappy, tarjeta o contra entrega</p>
        <p className="mt-1 text-center text-[11px] text-muted">Entregas solo en {store.city}</p>
      </aside>
    </div>
  )
}

export default BagScreen
