import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import EmptyState from '../components/EmptyState'
import ProductImage from '../components/ProductImage'
import { formatPrice, productById } from '../data/products'
import { useShop } from '../useShop'

const FREE_SHIPPING_FROM = 50
const SHIPPING_COST = 3.95

type Props = {
  onOpen: (id: string) => void
  onShop: () => void
}

function BagScreen({ onOpen, onShop }: Props) {
  const { bag, bagCount, setQty, removeFromBag, clearBag, notify } = useShop()

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
  const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST
  const missing = FREE_SHIPPING_FROM - subtotal

  const checkout = () => {
    clearBag()
    notify('¡Pedido realizado! (simulado)')
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_18rem]">
      <section>
        <h2 className="text-lg font-semibold">Mi bolsa</h2>
        <p className="mb-4 text-xs text-muted">{bagCount} artículos</p>

        <ul className="space-y-3">
          {lines.map(({ item, product }) => (
            <li key={item.key} className="flex gap-3 rounded-card bg-white p-2.5 shadow-soft ring-1 ring-slate-100">
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
                  <div className="flex items-center rounded-full ring-1 ring-slate-200">
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

      <aside className="h-fit rounded-card bg-white p-4 shadow-soft ring-1 ring-slate-100 md:sticky md:top-0">
        {missing > 0 ? (
          <div className="mb-4">
            <p className="text-xs text-muted">
              Te faltan <strong className="text-ink">{formatPrice(missing)}</strong> para el envío gratis
            </p>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-sage" style={{ width: `${(subtotal / FREE_SHIPPING_FROM) * 100}%` }} />
            </div>
          </div>
        ) : (
          <p className="mb-4 text-xs font-medium text-sage-dark">¡Tienes envío gratis!</p>
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
          <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-semibold">
            <dt>Total</dt>
            <dd>{formatPrice(subtotal + shipping)}</dd>
          </div>
        </dl>

        <button
          onClick={checkout}
          className="mt-4 w-full rounded-full bg-sage py-3 text-sm font-semibold text-white transition active:scale-[0.98] active:bg-sage-dark"
        >
          Finalizar compra
        </button>
        <p className="mt-2 text-center text-[11px] text-muted">IVA incluido · Pago seguro</p>
      </aside>
    </div>
  )
}

export default BagScreen
