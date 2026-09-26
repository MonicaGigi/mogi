import { useState } from 'react'
import { ArrowLeft, Heart, RotateCcw, Truck } from 'lucide-react'
import ProductGrid from '../components/ProductGrid'
import ProductImage from '../components/ProductImage'
import { formatPrice, products, type Product } from '../data/products'
import { useShop } from '../useShop'

type Props = {
  product: Product
  onBack: () => void
  onOpen: (id: string) => void
}

function ProductScreen({ product, onBack, onOpen }: Props) {
  const { favorites, toggleFavorite, addToBag, notify } = useShop()
  const [color, setColor] = useState(product.colors[0].name)
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null)
  const isFavorite = favorites.has(product.id)

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const add = () => {
    if (!size) return notify('Selecciona una talla')
    addToBag(product.id, color, size)
  }

  return (
    <div>
      <button onClick={onBack} className="mb-3 flex items-center gap-1 text-sm text-muted">
        <ArrowLeft className="size-4" /> Volver
      </button>

      <div className="grid gap-5 md:grid-cols-2">
        <ProductImage product={product} width={800} className="aspect-[3/4] rounded-card" />

        <div className="flex flex-col">
          {product.isNew && <span className="text-xs font-semibold tracking-wide text-sage-dark uppercase">Nuevo</span>}
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <button
              onClick={() => toggleFavorite(product.id)}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              className="rounded-full p-2 ring-1 ring-slate-200 transition active:scale-90"
            >
              <Heart className={`size-5 ${isFavorite ? 'fill-sage text-sage' : ''}`} />
            </button>
          </div>
          <p className="mt-1 text-lg">{formatPrice(product.price)}</p>

          <h3 className="mt-5 text-sm font-medium">
            Color: <span className="font-normal text-muted">{color}</span>
          </h3>
          <div className="mt-2 flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                className={`size-8 rounded-full ring-offset-2 transition ${
                  color === c.name ? 'ring-2 ring-ink' : 'ring-1 ring-slate-200'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <h3 className="text-sm font-medium">Talla</h3>
            <button onClick={() => notify('Guía de tallas: próximamente')} className="text-xs text-muted underline">
              Guía de tallas
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`min-w-11 rounded-lg border px-3 py-2 text-sm transition ${
                  size === s ? 'border-ink bg-ink text-white' : 'border-slate-200 bg-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={add}
            className="mt-6 rounded-full bg-sage py-3 text-sm font-semibold text-white transition active:scale-[0.98] active:bg-sage-dark"
          >
            Añadir a la bolsa
          </button>

          <p className="mt-5 text-sm leading-relaxed text-muted">{product.description}</p>

          <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-muted">
            <li className="flex items-center gap-2">
              <Truck className="size-4" /> Envío gratis en pedidos desde 50 €
            </li>
            <li className="flex items-center gap-2">
              <RotateCcw className="size-4" /> Devoluciones gratuitas en 30 días
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-8">
          <h3 className="mb-3 text-base font-semibold">También te puede gustar</h3>
          <ProductGrid products={related} onOpen={onOpen} />
        </section>
      )}
    </div>
  )
}

export default ProductScreen
