import type { Product } from '../data/products'
import ProductCard from './ProductCard'

type Props = {
  products: Product[]
  onOpen: (id: string) => void
}

function ProductGrid({ products, onOpen }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-3 sm:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onOpen={() => onOpen(product.id)} />
      ))}
    </div>
  )
}

export default ProductGrid
