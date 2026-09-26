import { Heart } from 'lucide-react'
import EmptyState from '../components/EmptyState'
import ProductGrid from '../components/ProductGrid'
import { products } from '../data/products'
import { useShop } from '../useShop'

type Props = {
  onOpen: (id: string) => void
  onShop: () => void
}

function FavoritesScreen({ onOpen, onShop }: Props) {
  const { favorites } = useShop()
  const items = products.filter((p) => favorites.has(p.id))

  if (items.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Aún no tienes favoritos"
        text="Pulsa el corazón en cualquier prenda para guardarla aquí."
        action={{ label: 'Descubrir prendas', onClick: onShop }}
      />
    )
  }

  return (
    <>
      <h2 className="text-lg font-semibold">Favoritos</h2>
      <p className="mb-4 text-xs text-muted">{items.length} guardados</p>
      <ProductGrid products={items} onOpen={onOpen} />
    </>
  )
}

export default FavoritesScreen
