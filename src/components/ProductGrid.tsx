import type { Product } from '../data/products'
import ProductCard from './ProductCard'

type Props = {
  products: Product[]
  onOpen: (id: string) => void
}

function ProductGrid({ products, onOpen }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-x-3 gap-y-8 sm:grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] sm:gap-x-5 sm:gap-y-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onOpen={() => onOpen(product.id)} />
      ))}
    </div>
  )
}

export default ProductGrid
