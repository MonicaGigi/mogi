import { createContext, useContext } from 'react'

export type BagItem = {
  key: string
  productId: string
  color: string
  size: string
  qty: number
}

export type Shop = {
  favorites: Set<string>
  toggleFavorite: (id: string) => void
  bag: BagItem[]
  bagCount: number
  addToBag: (productId: string, color: string, size: string) => void
  setQty: (key: string, qty: number) => void
  removeFromBag: (key: string) => void
  clearBag: () => void
  toast: string | null
  notify: (message: string) => void
}

export const ShopContext = createContext<Shop | null>(null)

export function useShop() {
  const shop = useContext(ShopContext)
  if (!shop) throw new Error('useShop debe usarse dentro de <ShopProvider>')
  return shop
}
