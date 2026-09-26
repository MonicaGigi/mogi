import { useMemo, useState } from 'react'
import ProductGrid from '../components/ProductGrid'
import { productsFor, type Category } from '../data/products'

const sorts = {
  relevance: 'Destacados',
  priceAsc: 'Precio: menor a mayor',
  priceDesc: 'Precio: mayor a menor',
} as const

type Sort = keyof typeof sorts

type Props = {
  category: Category
  onOpen: (id: string) => void
}

function CatalogScreen({ category, onOpen }: Props) {
  const [sort, setSort] = useState<Sort>('relevance')

  const items = useMemo(() => {
    const list = productsFor(category)
    if (sort === 'priceAsc') return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'priceDesc') return [...list].sort((a, b) => b.price - a.price)
    return list
  }, [category, sort])

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">{category}</h2>
          <p className="text-xs text-muted">{items.length} artículos</p>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs"
        >
          {Object.entries(sorts).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <ProductGrid products={items} onOpen={onOpen} />
    </>
  )
}

export default CatalogScreen
