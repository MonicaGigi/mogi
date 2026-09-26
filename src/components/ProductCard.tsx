import { useState } from 'react'
import { Heart, Plus, X } from 'lucide-react'
import { formatPrice, type Product } from '../data/products'
import { useShop } from '../useShop'
import ProductImage from './ProductImage'

type Props = {
  product: Product
  onOpen: () => void
}

function ProductCard({ product, onOpen }: Props) {
  const { favorites, toggleFavorite, addToBag } = useShop()
  const [pickingSize, setPickingSize] = useState(false)
  const isFavorite = favorites.has(product.id)

  // Añadido rápido: talla única va directa; si hay tallas, se elige sobre la foto.
  const quickAdd = () => {
    if (product.sizes.length === 1) addToBag(product.id, product.colors[0].name, product.sizes[0])
    else setPickingSize(true)
  }

  return (
    <article className="overflow-hidden rounded-card bg-white shadow-soft ring-1 ring-slate-100">
      <div className="relative">
        <button onClick={onOpen} className="block w-full" aria-label={`Ver ${product.name}`}>
          <ProductImage product={product} width={400} className="aspect-[3/4]" />
        </button>
        {product.isNew && (
          <span className="pointer-events-none absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
            Nuevo
          </span>
        )}
        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 transition active:scale-90"
        >
          <Heart className={`size-4 ${isFavorite ? 'fill-sage text-sage' : 'text-ink'}`} />
        </button>

        {pickingSize && (
          <div className="absolute inset-x-0 bottom-0 bg-white/95 p-2 backdrop-blur-sm">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-medium">Elige talla</span>
              <button onClick={() => setPickingSize(false)} aria-label="Cerrar" className="p-0.5">
                <X className="size-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    addToBag(product.id, product.colors[0].name, size)
                    setPickingSize(false)
                  }}
                  className="min-w-8 rounded-md border border-slate-200 px-1.5 py-1 text-xs transition active:bg-sage active:text-white"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-end justify-between gap-2 p-3">
        <button onClick={onOpen} className="min-w-0 text-left">
          <h3 className="line-clamp-2 text-sm leading-tight font-medium">{product.name}</h3>
          <p className="mt-0.5 text-sm text-muted">{formatPrice(product.price)}</p>
        </button>
        <button
          onClick={quickAdd}
          aria-label="Añadir a la bolsa"
          className="shrink-0 rounded-full bg-sage p-1.5 text-white transition active:scale-90 active:bg-sage-dark"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </article>
  )
}

export default ProductCard
