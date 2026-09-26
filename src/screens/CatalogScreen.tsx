import { useMemo, useState } from 'react'
import { ChevronRight, SearchX } from 'lucide-react'
import EmptyState from '../components/EmptyState'
import ProductGrid from '../components/ProductGrid'
import { listingProducts, listingTitle, menus, type Listing, type MenuSection } from '../data/products'
import { useNav } from '../nav'

const sorts = {
  relevance: 'Destacados',
  priceAsc: 'Precio: menor a mayor',
  priceDesc: 'Precio: mayor a menor',
  discount: 'Mayor descuento',
} as const

type Sort = keyof typeof sorts

type Props = {
  listing: Listing
  onOpen: (id: string) => void
}

function CatalogScreen({ listing, onOpen }: Props) {
  const { go } = useNav()
  const [sort, setSort] = useState<Sort>('relevance')

  const items = useMemo(() => {
    const list = listingProducts(listing)
    if (sort === 'priceAsc') return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'priceDesc') return [...list].sort((a, b) => b.price - a.price)
    if (sort === 'discount') return [...list].sort((a, b) => (b.oldPrice ? 1 - b.price / b.oldPrice : 0) - (a.oldPrice ? 1 - a.price / a.oldPrice : 0))
    return list
  }, [listing, sort])

  // Subcategoría de un menú: se muestra la ruta para volver al menú.
  const parentMenu = listing.kind === 'section' && listing.sub && listing.section in menus ? (listing.section as MenuSection) : undefined

  return (
    <>
      {parentMenu && (
        <button onClick={() => go({ name: 'menu', section: parentMenu })} className="mb-1 flex items-center gap-0.5 text-xs text-muted">
          {parentMenu} <ChevronRight className="size-3" />
        </button>
      )}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl">{listingTitle(listing)}</h2>
          <p className="text-xs text-muted">{items.length} artículos</p>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="border-0 border-b border-neutral-300 bg-transparent py-1 pr-1 text-[11px] tracking-[0.08em] uppercase outline-none"
        >
          {Object.entries(sorts).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {items.length ? (
        <ProductGrid products={items} onOpen={onOpen} />
      ) : (
        <EmptyState icon={SearchX} title="Próximamente" text="Estamos preparando artículos para esta sección." />
      )}
    </>
  )
}

export default CatalogScreen
