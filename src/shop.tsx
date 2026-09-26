import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { load, save } from './storage'
import { ShopContext, type BagItem, type Shop } from './useShop'

export function ShopProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState(() => new Set(load<string[]>('moju.favorites', [])))
  const [bag, setBag] = useState(() => load<BagItem[]>('moju.bag', []))
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number>(undefined)

  useEffect(() => save('moju.favorites', [...favorites]), [favorites])
  useEffect(() => save('moju.bag', bag), [bag])

  const notify = useCallback((message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2200)
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const addToBag = useCallback(
    (productId: string, color: string, size: string) => {
      const key = `${productId}|${color}|${size}`
      setBag((prev) =>
        prev.some((item) => item.key === key)
          ? prev.map((item) => (item.key === key ? { ...item, qty: item.qty + 1 } : item))
          : [...prev, { key, productId, color, size, qty: 1 }],
      )
      notify('Añadido a tu bolsa')
    },
    [notify],
  )

  const setQty = useCallback((key: string, qty: number) => {
    setBag((prev) => prev.map((item) => (item.key === key ? { ...item, qty: Math.max(1, qty) } : item)))
  }, [])

  const removeFromBag = useCallback((key: string) => {
    setBag((prev) => prev.filter((item) => item.key !== key))
  }, [])

  const clearBag = useCallback(() => setBag([]), [])

  const value = useMemo<Shop>(
    () => ({
      favorites,
      toggleFavorite,
      bag,
      bagCount: bag.reduce((sum, item) => sum + item.qty, 0),
      addToBag,
      setQty,
      removeFromBag,
      clearBag,
      toast,
      notify,
    }),
    [favorites, toggleFavorite, bag, addToBag, setQty, removeFromBag, clearBag, toast, notify],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
