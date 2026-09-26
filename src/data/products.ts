export type Category = 'Ropa' | 'Calzado' | 'Accesorios' | 'Novedades'

export type Color = { name: string; hex: string }

export type Product = {
  id: string
  name: string
  price: number
  category: Exclude<Category, 'Novedades'>
  isNew?: boolean
  photo: string
  tone: string
  colors: Color[]
  sizes: string[]
  description: string
}

const clothingSizes = ['XS', 'S', 'M', 'L', 'XL']
const shoeSizes = ['36', '37', '38', '39', '40', '41', '42']
const oneSize = ['Única']

const c = {
  crudo: { name: 'Crudo', hex: '#ece6d6' },
  negro: { name: 'Negro', hex: '#1f1f1f' },
  camel: { name: 'Camel', hex: '#b98a5a' },
  salvia: { name: 'Salvia', hex: '#b2ac88' },
  azul: { name: 'Azul', hex: '#4f6d8f' },
  blanco: { name: 'Blanco', hex: '#f5f5f2' },
  rojo: { name: 'Rojo', hex: '#c0392b' },
  marron: { name: 'Marrón', hex: '#6b4a33' },
  beige: { name: 'Beige', hex: '#d8c8ae' },
}

// Datos de prueba hasta tener backend. Fotos de Unsplash.
export const products: Product[] = [
  { id: 'r1', name: 'Camisa vaquera', price: 39.95, category: 'Ropa', isNew: true, photo: '1596755094514-f87e34085b2c', tone: '#d6dbe0', colors: [c.azul, c.blanco], sizes: clothingSizes, description: 'Camisa de denim ligero con cuello clásico y botones de nácar. Corte recto.' },
  { id: 'r2', name: 'Vestido blanco de volantes', price: 59.95, category: 'Ropa', isNew: true, photo: '1515372039744-b8f02a3ae446', tone: '#e8e4d8', colors: [c.blanco, c.salvia], sizes: clothingSizes, description: 'Vestido corto con escote bardot y volantes. Algodón 100 %.' },
  { id: 'r3', name: 'Pantalón chino', price: 45.0, category: 'Ropa', photo: '1473966968600-fa801b869a1a', tone: '#e3d9cc', colors: [c.beige, c.negro, c.azul], sizes: clothingSizes, description: 'Chino de algodón elástico con tiro medio y bajo con vuelta.' },
  { id: 'r4', name: 'Poncho de punto', price: 49.95, category: 'Ropa', photo: '1434389677669-e08b4cac3105', tone: '#ece6d6', colors: [c.crudo, c.camel], sizes: oneSize, description: 'Poncho de punto calado con flecos en el bajo. Talla única.' },
  { id: 'r5', name: 'Cazadora bomber', price: 69.95, category: 'Ropa', photo: '1591047139829-d91aecb6caea', tone: '#dcc3ad', colors: [c.camel, c.salvia], sizes: clothingSizes, description: 'Bomber de tacto satinado con puños y bajo de canalé.' },
  { id: 'r6', name: 'Chaqueta de cuero', price: 129.0, category: 'Ropa', isNew: true, photo: '1551028719-00167b16eac5', tone: '#d9d9d9', colors: [c.negro, c.marron], sizes: clothingSizes, description: 'Chaqueta biker de piel con cremalleras metálicas.' },
  { id: 'r7', name: 'Camiseta básica', price: 15.95, category: 'Ropa', photo: '1521572163474-6864f9cf17ab', tone: '#eceae4', colors: [c.blanco, c.negro, c.salvia], sizes: clothingSizes, description: 'Camiseta de algodón orgánico, manga corta y cuello redondo.' },
  { id: 'r8', name: 'Abrigo de cuadros', price: 99.95, category: 'Ropa', photo: '1485968579580-b6d095142e6e', tone: '#cfd4c5', colors: [c.azul, c.camel], sizes: clothingSizes, description: 'Abrigo largo de paño con estampado de cuadros y solapa amplia.' },

  { id: 'c1', name: 'Zapatillas running', price: 89.95, category: 'Calzado', photo: '1542291026-7eec264c27ff', tone: '#e7c3bd', colors: [c.rojo, c.negro], sizes: shoeSizes, description: 'Zapatilla ligera con suela amortiguada y upper transpirable.' },
  { id: 'c2', name: 'Zapatillas camel', price: 79.95, category: 'Calzado', isNew: true, photo: '1549298916-b41d501d3772', tone: '#e6d2b0', colors: [c.camel, c.blanco], sizes: shoeSizes, description: 'Sneaker de piel vuelta con detalles en contraste.' },
  { id: 'c3', name: 'Botín de piel', price: 99.0, category: 'Calzado', photo: '1608256246200-53e635b5b65f', tone: '#cbbfb3', colors: [c.marron, c.negro], sizes: shoeSizes, description: 'Botín de cordones en piel engrasada con suela de goma.' },
  { id: 'c4', name: 'Bota de montaña', price: 109.0, category: 'Calzado', photo: '1520639888713-7851133b1ed0', tone: '#d8c8ae', colors: [c.camel], sizes: shoeSizes, description: 'Bota resistente con cordones y suela dentada.' },
  { id: 'c5', name: 'Salón estampado', price: 65.0, category: 'Calzado', photo: '1543163521-1bf539c55dd2', tone: '#cfe3ea', colors: [c.azul, c.rojo], sizes: shoeSizes, description: 'Zapato de salón de tacón fino con estampado floral.' },
  { id: 'c6', name: 'Sandalia de hebillas', price: 55.95, category: 'Calzado', isNew: true, photo: '1603487742131-4160ec999306', tone: '#e3ddd3', colors: [c.beige, c.negro], sizes: shoeSizes, description: 'Sandalia plana con dos tiras de hebilla y plantilla anatómica.' },

  { id: 'a1', name: 'Bolso de mano rojo', price: 59.95, category: 'Accesorios', isNew: true, photo: '1584917865442-de89df76afd3', tone: '#e8c6bf', colors: [c.rojo, c.negro], sizes: oneSize, description: 'Bolso estructurado con asa superior y bandolera desmontable.' },
  { id: 'a2', name: 'Bolso camel', price: 55.0, category: 'Accesorios', photo: '1590874103328-eac38a683ce7', tone: '#e6cfb5', colors: [c.camel], sizes: oneSize, description: 'Bolso de piel sintética con cierre metálico.' },
  { id: 'a3', name: 'Mochila urbana', price: 45.95, category: 'Accesorios', photo: '1553062407-98eeb64c6a62', tone: '#d6dbe0', colors: [c.azul, c.negro], sizes: oneSize, description: 'Mochila con compartimento acolchado para portátil de 15".' },
  { id: 'a4', name: 'Gafas de sol', price: 29.95, category: 'Accesorios', photo: '1572635196237-14b3f281503f', tone: '#e4e4e4', colors: [c.negro, c.marron], sizes: oneSize, description: 'Montura de acetato con lentes polarizadas UV400.' },
  { id: 'a5', name: 'Reloj minimalista', price: 79.0, category: 'Accesorios', photo: '1523275335684-37898b6baf30', tone: '#ececec', colors: [c.blanco, c.negro], sizes: oneSize, description: 'Reloj de esfera limpia con correa de silicona.' },
  { id: 'a6', name: 'Cinturón de piel', price: 25.0, category: 'Accesorios', photo: '1624222247344-550fb60583dc', tone: '#d8c3ad', colors: [c.marron, c.negro], sizes: ['85', '90', '95', '100'], description: 'Cinturón de piel con hebilla clásica.' },
]

export const productById = (id: string) => products.find((p) => p.id === id)

export function productsFor(category: Category) {
  return category === 'Novedades' ? products.filter((p) => p.isNew) : products.filter((p) => p.category === category)
}

export const photoUrl = (photo: string, width: number) =>
  `https://images.unsplash.com/photo-${photo}?w=${width}&h=${Math.round(width * 4 / 3)}&fit=crop&auto=format&q=70`

// Panamá: dólares estadounidenses, formato $1,234.50.
export const formatPrice = (price: number) =>
  `$${price.toLocaleString('es-PA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
