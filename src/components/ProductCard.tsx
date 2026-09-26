import { useState } from 'react'
import { Heart, Plus, X } from 'lucide-react'
import { discountPercent, type Product } from '../data/products'
import Price from './Price'
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
    <article className="bg-white">
      <div className="relative">
        <button onClick={onOpen} className="block w-full" aria-label={`Ver ${product.name}`}>
          <ProductImage product={product} width={400} className="aspect-[3/4]" />
        </button>
        <div className="pointer-events-none absolute top-2 left-2 flex flex-col items-start gap-1">
          {product.oldPrice && (
            <span className="bg-red-600 px-1.5 py-0.5 text-[9px] font-medium tracking-wider text-white">-{discountPercent(product)}%</span>
          )}
          {product.isNew && (
            <span className="bg-white px-1.5 py-0.5 text-[9px] font-medium tracking-[0.15em] uppercase">Nuevo</span>
          )}
        </div>
        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          className="absolute top-2 right-2 bg-white/80 p-1.5 transition active:scale-90"
        >
          <Heart strokeWidth={1.5} className={`size-4 ${isFavorite ? 'fill-ink text-ink' : 'text-ink'}`} />
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
                  className="min-w-8 rounded-md border border-neutral-300 px-1.5 py-1 text-xs transition active:bg-ink active:text-white"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-2 pt-3">
        <button onClick={onOpen} className="min-w-0 text-left">
          <h3 className="line-clamp-2 text-xs leading-snug">{product.name}</h3>
          <Price product={product} className="mt-1 text-xs" />
        </button>
        <button
          onClick={quickAdd}
          aria-label="Añadir a la bolsa"
          className="shrink-0 border border-ink p-1 text-ink transition active:bg-ink active:text-white"
        >
          <Plus className="size-3.5" strokeWidth={1.5} />
        </button>
      </div>
    </article>
  )
}

export default ProductCard
