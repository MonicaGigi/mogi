import { formatPrice, type Product } from '../data/products'

function Price({ product, className = '' }: { product: Product; className?: string }) {
  if (!product.oldPrice) return <p className={`text-muted ${className}`}>{formatPrice(product.price)}</p>
  return (
    <p className={`flex flex-wrap items-baseline gap-x-1.5 ${className}`}>
      <span className="text-red-600">{formatPrice(product.price)}</span>
      <span className="text-[0.8em] text-muted line-through">{formatPrice(product.oldPrice)}</span>
    </p>
  )
}

export default Price
