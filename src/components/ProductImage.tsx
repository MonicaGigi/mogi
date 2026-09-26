import { useState } from 'react'
import { Shirt } from 'lucide-react'
import { photoUrl, type Product } from '../data/products'

type Props = {
  product: Product
  width: number
  className?: string
}

// Muestra el color de fondo del producto mientras carga la foto o si falla (sin conexión).
function ProductImage({ product, width, className = '' }: Props) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: product.tone }}>
      {failed ? (
        <Shirt className="absolute inset-0 m-auto size-1/3 text-white/70" strokeWidth={1.5} />
      ) : (
        <img
          src={photoUrl(product.photo, width)}
          alt={product.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      )}
    </div>
  )
}

export default ProductImage
