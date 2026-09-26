export type Section = 'Colección' | 'Calzado' | 'Accesorios'

export const SPECIAL = 'Special Prices'

// Secciones con menú desglosado. "Special Prices" dentro de un menú muestra las rebajas de esa sección.
export const menus = {
  Colección: {
    subs: [
      'Camisas',
      'Camisetas',
      'Top-bodies',
      'Vestidos',
      'Jerséis-Chaquetas',
      'Faldas',
      'Shorts-Bermudas',
      'Blazers',
      'Gabardinas-Abrigos',
      'Cazadoras',
      SPECIAL,
    ],
    background: '1509631179647-0177331693ae',
  },
  Accesorios: {
    subs: ['Bolsos', 'Bisutería', 'Gafas', 'Accesorios'],
    background: '1469334031218-e382a71b716b',
  },
} as const

export type MenuSection = keyof typeof menus

// Qué se lista en el catálogo: novedades, todas las rebajas, o una sección (y subcategoría).
export type Listing = { kind: 'new' } | { kind: 'sale' } | { kind: 'section'; section: Section; sub?: string }

export type Color = { name: string; hex: string }

export type Product = {
  id: string
  name: string
  price: number
  oldPrice?: number
  section: Section
  sub?: string
  isNew?: boolean
  photo: string
  tone?: string
  colors: Color[]
  sizes: string[]
  description: string
}

const clothing = ['XS', 'S', 'M', 'L', 'XL']
const shoes = ['36', '37', '38', '39', '40', '41', '42']
const one = ['Única']

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
  rosa: { name: 'Rosa', hex: '#e8b4b8' },
  gris: { name: 'Gris', hex: '#9a9a9a' },
  oliva: { name: 'Oliva', hex: '#6b6b3f' },
  amarillo: { name: 'Amarillo', hex: '#e8b923' },
  dorado: { name: 'Dorado', hex: '#c9a45c' },
  plata: { name: 'Plata', hex: '#c0c0c0' },
}

// Datos de prueba hasta tener backend. Fotos de Unsplash.
export const products: Product[] = [
  // Colección
  { id: 'r1', name: 'Camisa vaquera', price: 39.95, section: 'Colección', sub: 'Camisas', isNew: true, photo: '1596755094514-f87e34085b2c', colors: [c.azul, c.blanco], sizes: clothing, description: 'Camisa de denim ligero con cuello clásico y botones de nácar. Corte recto.' },
  { id: 'r9', name: 'Camisa oxford', price: 34.95, oldPrice: 44.95, section: 'Colección', sub: 'Camisas', photo: '1602810318383-e386cc2a3ccf', colors: [c.azul, c.blanco, c.rojo], sizes: clothing, description: 'Camisa de algodón oxford, cuello con botones y corte regular.' },
  { id: 'r10', name: 'Blusa bordada', price: 42.0, section: 'Colección', sub: 'Camisas', isNew: true, photo: '1564257631407-4deb1f99d992', colors: [c.blanco], sizes: clothing, description: 'Blusa blanca con bordado floral y manga abullonada.' },

  { id: 'r7', name: 'Camiseta básica', price: 15.95, section: 'Colección', sub: 'Camisetas', photo: '1521572163474-6864f9cf17ab', colors: [c.blanco, c.negro, c.salvia], sizes: clothing, description: 'Camiseta de algodón orgánico, manga corta y cuello redondo.' },
  { id: 'r11', name: 'Camiseta estampada', price: 19.95, oldPrice: 25.95, section: 'Colección', sub: 'Camisetas', photo: '1554568218-0f1715e72254', colors: [c.blanco], sizes: clothing, description: 'Camiseta de corte relajado con estampado gráfico en el pecho.' },
  { id: 'r12', name: 'Camiseta rock', price: 22.95, section: 'Colección', sub: 'Camisetas', isNew: true, photo: '1503342217505-b0a15ec3261c', colors: [c.negro], sizes: clothing, description: 'Camiseta negra con estampado frontal y tejido lavado.' },
  { id: 'r13', name: 'Camiseta negra logo', price: 17.95, section: 'Colección', sub: 'Camisetas', photo: '1583743814966-8936f5b7be1a', colors: [c.negro, c.blanco], sizes: clothing, description: 'Camiseta de algodón peinado con logo bordado.' },

  { id: 'r14', name: 'Top de gasa', price: 29.95, section: 'Colección', sub: 'Top-bodies', isNew: true, photo: '1524504388940-b1c1722653e1', colors: [c.negro], sizes: clothing, description: 'Top semitransparente de gasa con manga larga.' },
  { id: 'r15', name: 'Top de volantes', price: 27.95, oldPrice: 39.95, section: 'Colección', sub: 'Top-bodies', photo: '1581044777550-4cfa60707c03', colors: [c.rosa, c.blanco], sizes: clothing, description: 'Top romántico con volantes y mangas amplias.' },

  { id: 'r2', name: 'Vestido blanco de volantes', price: 59.95, section: 'Colección', sub: 'Vestidos', isNew: true, photo: '1515372039744-b8f02a3ae446', colors: [c.blanco, c.salvia], sizes: clothing, description: 'Vestido corto con escote bardot y volantes. Algodón 100 %.' },
  { id: 'r16', name: 'Vestido rojo de vuelo', price: 64.95, section: 'Colección', sub: 'Vestidos', photo: '1572804013309-59a88b7e92f1', colors: [c.rojo], sizes: clothing, description: 'Vestido midi con falda de vuelo y cinturón a juego.' },
  { id: 'r17', name: 'Vestido camisero denim', price: 49.95, oldPrice: 69.95, section: 'Colección', sub: 'Vestidos', photo: '1591369822096-ffd140ec948f', colors: [c.azul], sizes: clothing, description: 'Vestido camisero de denim con botones y manga corta.' },
  { id: 'r18', name: 'Vestido largo de fiesta', price: 89.0, section: 'Colección', sub: 'Vestidos', isNew: true, photo: '1595777457583-95e059d581b8', colors: [c.rojo, c.negro], sizes: clothing, description: 'Vestido largo con caída fluida, ideal para eventos.' },
  { id: 'r19', name: 'Vestido de flores', price: 54.95, section: 'Colección', sub: 'Vestidos', photo: '1496747611176-843222e1e57c', colors: [c.blanco], sizes: clothing, description: 'Vestido ligero con estampado floral y escote en pico.' },

  { id: 'r4', name: 'Poncho de punto', price: 49.95, section: 'Colección', sub: 'Jerséis-Chaquetas', photo: '1434389677669-e08b4cac3105', colors: [c.crudo, c.camel], sizes: one, description: 'Poncho de punto calado con flecos en el bajo. Talla única.' },
  { id: 'r20', name: 'Sudadera roja', price: 35.95, oldPrice: 45.95, section: 'Colección', sub: 'Jerséis-Chaquetas', photo: '1485230895905-ec40ba36b9bc', colors: [c.rojo, c.gris], sizes: clothing, description: 'Sudadera oversize de felpa con estampado.' },
  { id: 'r21', name: 'Sudadera blanca', price: 32.95, section: 'Colección', sub: 'Jerséis-Chaquetas', isNew: true, photo: '1620799140408-edc6dcb6d633', colors: [c.blanco, c.gris], sizes: clothing, description: 'Sudadera básica de algodón con cuello redondo.' },
  { id: 'r22', name: 'Jersey de rombos', price: 45.0, section: 'Colección', sub: 'Jerséis-Chaquetas', photo: '1475180098004-ca77a66827be', colors: [c.camel, c.crudo], sizes: clothing, description: 'Jersey de punto grueso con diseño de rombos.' },

  { id: 'r23', name: 'Falda plisada', price: 39.95, section: 'Colección', sub: 'Faldas', isNew: true, photo: '1577900232427-18219b9166a0', colors: [c.rosa, c.beige], sizes: clothing, description: 'Falda midi plisada de tejido satinado.' },
  { id: 'r24', name: 'Falda midi beige', price: 36.95, oldPrice: 49.95, section: 'Colección', sub: 'Faldas', photo: '1592301933927-35b597393c0a', colors: [c.beige], sizes: clothing, description: 'Falda midi con bajo asimétrico y cintura elástica.' },
  { id: 'r25', name: 'Falda de vuelo negra', price: 32.95, section: 'Colección', sub: 'Faldas', photo: '1583496661160-fb5886a0aaaa', colors: [c.negro], sizes: clothing, description: 'Falda corta con vuelo, tiro alto y cremallera invisible.' },

  { id: 'r26', name: 'Short vaquero', price: 29.95, section: 'Colección', sub: 'Shorts-Bermudas', isNew: true, photo: '1591195853828-11db59a44f6b', colors: [c.azul], sizes: clothing, description: 'Short de denim con rotos y bajo deshilachado.' },
  { id: 'r27', name: 'Bermuda denim', price: 34.95, oldPrice: 42.95, section: 'Colección', sub: 'Shorts-Bermudas', photo: '1565084888279-aca607ecce0c', colors: [c.azul, c.negro], sizes: clothing, description: 'Bermuda vaquera de corte recto y largo a la rodilla.' },

  { id: 'r28', name: 'Blazer de cuadros', price: 79.95, section: 'Colección', sub: 'Blazers', isNew: true, photo: '1594938298603-c8148c4dae35', colors: [c.azul], sizes: clothing, description: 'Blazer entallado con estampado de cuadros príncipe de Gales.' },
  { id: 'r29', name: 'Blazer oversize negro', price: 69.95, oldPrice: 89.95, section: 'Colección', sub: 'Blazers', photo: '1529139574466-a303027c1d8b', colors: [c.negro], sizes: clothing, description: 'Blazer de corte amplio con hombreras suaves.' },

  { id: 'r8', name: 'Abrigo de cuadros', price: 99.95, section: 'Colección', sub: 'Gabardinas-Abrigos', photo: '1485968579580-b6d095142e6e', colors: [c.azul, c.camel], sizes: clothing, description: 'Abrigo largo de paño con estampado de cuadros y solapa amplia.' },
  { id: 'r30', name: 'Gabardina camel', price: 109.0, section: 'Colección', sub: 'Gabardinas-Abrigos', isNew: true, photo: '1539533018447-63fcce2678e3', colors: [c.camel], sizes: clothing, description: 'Gabardina clásica cruzada con cinturón.' },
  { id: 'r31', name: 'Abrigo burdeos', price: 94.95, oldPrice: 129.0, section: 'Colección', sub: 'Gabardinas-Abrigos', photo: '1483985988355-763728e1935b', colors: [c.rojo, c.negro], sizes: clothing, description: 'Abrigo de lana con cuello alto y botonadura oculta.' },

  { id: 'r5', name: 'Cazadora bomber', price: 69.95, section: 'Colección', sub: 'Cazadoras', photo: '1591047139829-d91aecb6caea', colors: [c.camel, c.salvia], sizes: clothing, description: 'Bomber de tacto satinado con puños y bajo de canalé.' },
  { id: 'r6', name: 'Chaqueta de cuero', price: 129.0, section: 'Colección', sub: 'Cazadoras', isNew: true, photo: '1551028719-00167b16eac5', colors: [c.negro, c.marron], sizes: clothing, description: 'Chaqueta biker de piel con cremalleras metálicas.' },
  { id: 'r32', name: 'Chaqueta utilitaria', price: 74.95, section: 'Colección', sub: 'Cazadoras', photo: '1544022613-e87ca75a784a', colors: [c.oliva], sizes: clothing, description: 'Chaqueta de algodón con bolsillos de parche y capucha.' },
  { id: 'r33', name: 'Plumífero amarillo', price: 79.95, oldPrice: 99.95, section: 'Colección', sub: 'Cazadoras', photo: '1548624313-0396c75e4b1a', colors: [c.amarillo, c.negro], sizes: clothing, description: 'Chaqueta acolchada ligera con cuello alto.' },

  // Calzado
  { id: 'c1', name: 'Zapatillas running', price: 89.95, section: 'Calzado', photo: '1542291026-7eec264c27ff', colors: [c.rojo, c.negro], sizes: shoes, description: 'Zapatilla ligera con suela amortiguada y upper transpirable.' },
  { id: 'c2', name: 'Zapatillas camel', price: 79.95, section: 'Calzado', isNew: true, photo: '1549298916-b41d501d3772', colors: [c.camel, c.blanco], sizes: shoes, description: 'Sneaker de piel vuelta con detalles en contraste.' },
  { id: 'c3', name: 'Botín de piel', price: 79.0, oldPrice: 99.0, section: 'Calzado', photo: '1608256246200-53e635b5b65f', colors: [c.marron, c.negro], sizes: shoes, description: 'Botín de cordones en piel engrasada con suela de goma.' },
  { id: 'c4', name: 'Bota de montaña', price: 109.0, section: 'Calzado', photo: '1520639888713-7851133b1ed0', colors: [c.camel], sizes: shoes, description: 'Bota resistente con cordones y suela dentada.' },
  { id: 'c5', name: 'Salón estampado', price: 49.0, oldPrice: 65.0, section: 'Calzado', photo: '1543163521-1bf539c55dd2', colors: [c.azul, c.rojo], sizes: shoes, description: 'Zapato de salón de tacón fino con estampado floral.' },
  { id: 'c6', name: 'Sandalia de hebillas', price: 55.95, section: 'Calzado', isNew: true, photo: '1603487742131-4160ec999306', colors: [c.beige, c.negro], sizes: shoes, description: 'Sandalia plana con dos tiras de hebilla y plantilla anatómica.' },

  // Accesorios
  { id: 'a1', name: 'Bolso de mano rojo', price: 59.95, section: 'Accesorios', sub: 'Bolsos', isNew: true, photo: '1584917865442-de89df76afd3', colors: [c.rojo, c.negro], sizes: one, description: 'Bolso estructurado con asa superior y bandolera desmontable.' },
  { id: 'a2', name: 'Bolso camel', price: 44.0, oldPrice: 55.0, section: 'Accesorios', sub: 'Bolsos', photo: '1590874103328-eac38a683ce7', colors: [c.camel], sizes: one, description: 'Bolso de piel sintética con cierre metálico.' },
  { id: 'a3', name: 'Mochila urbana', price: 45.95, section: 'Accesorios', sub: 'Bolsos', photo: '1553062407-98eeb64c6a62', colors: [c.azul, c.negro], sizes: one, description: 'Mochila con compartimento acolchado para portátil de 15".' },
  { id: 'a7', name: 'Collar de perlas', price: 34.95, section: 'Accesorios', sub: 'Bisutería', isNew: true, photo: '1515562141207-7a88fb7ce338', colors: [c.blanco], sizes: one, description: 'Collar de perlas cultivadas con cierre de plata.' },
  { id: 'a8', name: 'Pendientes joya', price: 24.95, section: 'Accesorios', sub: 'Bisutería', photo: '1535632066927-ab7c9ab60908', colors: [c.azul, c.plata], sizes: one, description: 'Pendientes con cristales tallados y montura plateada.' },
  { id: 'a9', name: 'Colgante luna', price: 19.95, oldPrice: 27.95, section: 'Accesorios', sub: 'Bisutería', photo: '1599643478518-a784e5dc4c8f', colors: [c.dorado], sizes: one, description: 'Colgante de media luna con cadena fina bañada en oro.' },
  { id: 'a10', name: 'Pulsera de filigrana', price: 22.95, section: 'Accesorios', sub: 'Bisutería', photo: '1611591437281-460bfbe1220a', colors: [c.dorado, c.plata], sizes: one, description: 'Pulsera rígida con trabajo de filigrana.' },
  { id: 'a11', name: 'Pendientes corazón', price: 16.95, section: 'Accesorios', sub: 'Bisutería', isNew: true, photo: '1630019852942-f89202989a59', colors: [c.azul], sizes: one, description: 'Pendientes de gancho con corazón de cristal azul.' },
  { id: 'a4', name: 'Gafas de sol', price: 29.95, section: 'Accesorios', sub: 'Gafas', photo: '1572635196237-14b3f281503f', colors: [c.negro, c.marron], sizes: one, description: 'Montura de acetato con lentes polarizadas UV400.' },
  { id: 'a12', name: 'Gafas redondas', price: 32.95, section: 'Accesorios', sub: 'Gafas', isNew: true, photo: '1511499767150-a48a237f0083', colors: [c.dorado], sizes: one, description: 'Gafas de sol redondas con montura metálica fina.' },
  { id: 'a13', name: 'Gafas carey', price: 24.95, oldPrice: 34.95, section: 'Accesorios', sub: 'Gafas', photo: '1577803645773-f96470509666', colors: [c.marron], sizes: one, description: 'Montura de carey con lentes degradadas.' },
  { id: 'a5', name: 'Reloj minimalista', price: 79.0, section: 'Accesorios', sub: 'Accesorios', photo: '1523275335684-37898b6baf30', colors: [c.blanco, c.negro], sizes: one, description: 'Reloj de esfera limpia con correa de silicona.' },
  { id: 'a6', name: 'Cinturón de piel', price: 25.0, section: 'Accesorios', sub: 'Accesorios', photo: '1624222247344-550fb60583dc', colors: [c.marron, c.negro], sizes: ['85', '90', '95', '100'], description: 'Cinturón de piel con hebilla clásica.' },
  { id: 'a14', name: 'Gorra lavada', price: 18.95, section: 'Accesorios', sub: 'Accesorios', photo: '1521369909029-2afed882baee', colors: [c.gris, c.negro], sizes: one, description: 'Gorra de algodón con efecto lavado y cierre ajustable.' },
  { id: 'a15', name: 'Gorra blanca', price: 15.95, oldPrice: 21.95, section: 'Accesorios', sub: 'Accesorios', photo: '1588850561407-ed78c282e89b', colors: [c.blanco], sizes: one, description: 'Gorra de rejilla con visera curva.' },
]

export const productById = (id: string) => products.find((p) => p.id === id)

export function listingProducts(listing: Listing) {
  if (listing.kind === 'new') return products.filter((p) => p.isNew)
  if (listing.kind === 'sale') return products.filter((p) => p.oldPrice)
  const inSection = products.filter((p) => p.section === listing.section)
  if (!listing.sub) return inSection
  if (listing.sub === SPECIAL) return inSection.filter((p) => p.oldPrice)
  return inSection.filter((p) => p.sub === listing.sub)
}

export function listingTitle(listing: Listing) {
  if (listing.kind === 'new') return 'Novedades'
  if (listing.kind === 'sale') return SPECIAL
  return listing.sub ?? listing.section
}

export const discountPercent = (p: Product) => (p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0)

export const photoUrl = (photo: string, width: number, height = Math.round((width * 4) / 3)) =>
  `https://images.unsplash.com/photo-${photo}?w=${width}&h=${height}&fit=crop&auto=format&q=70`

// Panamá: dólares estadounidenses, formato $1,234.50.
export const formatPrice = (price: number) =>
  `$${price.toLocaleString('es-PA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
