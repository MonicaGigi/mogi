import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { App as CapacitorApp } from '@capacitor/app'
import { Heart, ShoppingBag, User } from 'lucide-react'
import { useAccount } from './account/useAccount'
import { productById, type Category } from './data/products'
import { NavContext, type Nav, type Screen } from './nav'
import AccountScreen from './screens/AccountScreen'
import AuthScreen from './screens/AuthScreen'
import BagScreen from './screens/BagScreen'
import CatalogScreen from './screens/CatalogScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import FavoritesScreen from './screens/FavoritesScreen'
import OrderDetailScreen from './screens/OrderDetailScreen'
import OrdersScreen from './screens/OrdersScreen'
import PaymentsScreen from './screens/PaymentsScreen'
import ProductScreen from './screens/ProductScreen'
import ProfileScreen from './screens/ProfileScreen'
import { useShop } from './useShop'

const categories: Category[] = ['Ropa', 'Calzado', 'Accesorios', 'Novedades']

// Pantallas que requieren sesión: sin ella se muestra el acceso y se vuelve después.
const privateScreens: Screen['name'][] = ['orders', 'order', 'profile', 'payments']

const actions = [
  { id: 'favorites', label: 'Favoritos', icon: Heart },
  { id: 'account', label: 'Mi cuenta', icon: User },
  { id: 'bag', label: 'Mi bolsa', icon: ShoppingBag },
] as const

const buildDate = new Date(__BUILD_DATE__).toLocaleDateString('es-ES')

function App() {
  const { favorites, bagCount, toast } = useShop()
  const { user } = useAccount()
  const [history, setHistory] = useState<Screen[]>([{ name: 'catalog', category: 'Ropa' }])
  const mainRef = useRef<HTMLElement>(null)
  const screen = history[history.length - 1]

  const toTop = () => mainRef.current?.scrollTo({ top: 0 })
  const go = useCallback((next: Screen) => {
    setHistory((prev) => [...prev, next])
    toTop()
  }, [])
  const replace = useCallback((next: Screen) => {
    setHistory((prev) => [...prev.slice(0, -1), next])
    toTop()
  }, [])
  const back = useCallback(() => setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev)), [])
  const canGoBack = history.length > 1
  const nav = useMemo<Nav>(() => ({ screen, go, replace, back, canGoBack }), [screen, go, replace, back, canGoBack])

  // Botón "atrás" de Android: navega hacia atrás y, en la primera pantalla, sale de la app.
  useEffect(() => {
    const listener = CapacitorApp.addListener('backButton', () => {
      if (canGoBack) back()
      else CapacitorApp.exitApp()
    })
    return () => {
      listener.then((l) => l.remove())
    }
  }, [canGoBack, back])

  const openProduct = (id: string) => go({ name: 'product', id })
  const shopNew = () => go({ name: 'catalog', category: 'Novedades' })

  // La categoría resaltada es la del catálogo visible o la del producto abierto.
  const activeCategory =
    screen.name === 'catalog' ? screen.category : screen.name === 'product' ? productById(screen.id)?.category : undefined

  const counts: Record<(typeof actions)[number]['id'], number> = {
    favorites: favorites.size,
    account: 0,
    bag: bagCount,
  }

  const product = screen.name === 'product' ? productById(screen.id) : undefined

  const needsLogin = !user && privateScreens.includes(screen.name)

  return (
    <NavContext.Provider value={nav}>
      <div className="flex h-full flex-col">
        <header className="pt-safe border-b border-slate-100 bg-white">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3">
            <div />
            <button onClick={() => go({ name: 'catalog', category: 'Ropa' })} className="text-3xl font-bold tracking-tight">
              mo&amp;ju
            </button>
            <nav className="flex justify-end gap-1.5 sm:gap-2">
              {actions.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => go({ name: id })}
                  aria-label={label}
                  className={`relative flex items-center gap-1.5 rounded-full p-2 text-sm font-medium text-white transition active:scale-95 sm:px-3 ${
                    screen.name === id ? 'bg-sage-dark' : 'bg-sage active:bg-sage-dark'
                  }`}
                >
                  <Icon className="size-4" strokeWidth={2} />
                  <span className="hidden sm:inline">{label}</span>
                  {counts[id] > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-white">
                      {counts[id]}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <aside className="flex w-28 shrink-0 flex-col gap-2 border-r border-slate-100 bg-white p-2 sm:w-36 sm:p-3">
            {categories.map((category) => {
              const isActive = category === activeCategory
              return (
                <button
                  key={category}
                  onClick={() => go({ name: 'catalog', category })}
                  className={`rounded-xl px-3 py-2.5 text-left text-sm font-medium transition active:scale-[0.98] ${
                    isActive ? 'bg-ink text-white' : 'text-ink hover:bg-slate-100'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </aside>

          <main ref={mainRef} className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-5">
            {needsLogin ? (
              <AuthScreen key="login" mode="login" then={screen} />
            ) : (
              <>
                {screen.name === 'catalog' && <CatalogScreen key={screen.category} category={screen.category} onOpen={openProduct} />}
                {product && <ProductScreen key={product.id} product={product} onBack={back} onOpen={openProduct} />}
                {screen.name === 'favorites' && <FavoritesScreen onOpen={openProduct} onShop={shopNew} />}
                {screen.name === 'account' && <AccountScreen key={user?.email ?? 'guest'} />}
                {screen.name === 'bag' && <BagScreen onOpen={openProduct} onShop={shopNew} />}
                {screen.name === 'auth' && <AuthScreen key="auth" mode={screen.mode ?? 'login'} email={screen.email} then={screen.then} />}
                {screen.name === 'checkout' && <CheckoutScreen key={user?.email ?? 'guest'} buyNow={screen.buyNow} />}
                {screen.name === 'confirmation' && <ConfirmationScreen orderId={screen.orderId} />}
                {screen.name === 'orders' && <OrdersScreen />}
                {screen.name === 'order' && <OrderDetailScreen key={screen.id} id={screen.id} />}
                {screen.name === 'profile' && <ProfileScreen />}
                {screen.name === 'payments' && <PaymentsScreen />}
              </>
            )}
          </main>
        </div>

        <footer className="pb-safe border-t border-slate-100 bg-white">
          <p className="px-4 py-2 text-center text-xs text-slate-400">
            mo&amp;ju · v{__APP_VERSION__} · {buildDate}
          </p>
        </footer>

        {toast && (
          <div className="pt-safe pointer-events-none fixed inset-x-0 top-16 flex justify-center px-4">
            <div role="status" className="rounded-full bg-ink px-4 py-2 text-sm text-white shadow-soft">
              {toast}
            </div>
          </div>
        )}
      </div>
    </NavContext.Provider>
  )
}

export default App
