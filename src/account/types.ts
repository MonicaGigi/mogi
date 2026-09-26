import { store } from '../config'

export type Address = {
  city: string
  zone: string
  street: string
  reference: string
}

export type SavedCard = {
  brand: string
  last4: string
  expiry: string
  holder: string
}

export type PaymentMethod = 'yappy' | 'card' | 'cod'

export type User = {
  firstName: string
  lastName: string
  email: string
  phone: string
  passwordHash: string
  address: Address
  yappyPhone?: string
  card?: SavedCard
  preferredPayment?: PaymentMethod
  createdAt: string
}

export type OrderLine = {
  productId: string
  name: string
  price: number
  color: string
  size: string
  qty: number
}

export type Order = {
  id: string
  createdAt: string
  lines: OrderLine[]
  subtotal: number
  shipping: number
  total: number
  payment: { method: PaymentMethod; detail: string }
  address: Address
  recipient: string
  phone: string
  cancelledAt?: string
}

export const paymentLabels: Record<PaymentMethod, string> = {
  yappy: 'Yappy',
  card: 'Tarjeta de crédito o débito',
  cod: 'Pago contra entrega',
}

export const emptyAddress: Address = { city: store.city, zone: '', street: '', reference: '' }

export const FREE_SHIPPING_FROM = 50
export const SHIPPING_COST = 3.95

export const shippingFor = (subtotal: number) => (subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST)

export const formatAddress = (a: Address) => [a.street, a.zone, a.city].filter(Boolean).join(', ')

// Teléfonos de Panamá: 8 dígitos (móvil empieza por 6) o 7 dígitos (fijo).
export const isPanamaPhone = (phone: string) => /^(6\d{7}|[2-9]\d{6})$/.test(phone.replace(/\D/g, ''))

export const formatPhone = (phone: string) => {
  const d = phone.replace(/\D/g, '')
  return d.length === 8 ? `+507 ${d.slice(0, 4)}-${d.slice(4)}` : `+507 ${d.slice(0, 3)}-${d.slice(3)}`
}
