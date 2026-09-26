import { createContext, useContext } from 'react'
import type { Listing, MenuSection } from './data/products'

export type BuyNowItem = { productId: string; color: string; size: string }

export type Screen =
  | { name: 'catalog'; listing: Listing }
  | { name: 'menu'; section: MenuSection }
  | { name: 'product'; id: string }
  | { name: 'favorites' }
  | { name: 'bag' }
  | { name: 'account' }
  | { name: 'auth'; mode?: 'login' | 'register'; email?: string; then?: Screen }
  | { name: 'checkout'; buyNow?: BuyNowItem }
  | { name: 'confirmation'; orderId: string }
  | { name: 'orders' }
  | { name: 'order'; id: string }
  | { name: 'profile' }
  | { name: 'payments' }

export type Nav = {
  screen: Screen
  go: (screen: Screen) => void
  // Sustituye la pantalla actual (p. ej. tras iniciar sesión o confirmar un pedido).
  replace: (screen: Screen) => void
  back: () => void
  canGoBack: boolean
}

export const NavContext = createContext<Nav | null>(null)

export function useNav() {
  const nav = useContext(NavContext)
  if (!nav) throw new Error('useNav debe usarse dentro de NavContext')
  return nav
}
