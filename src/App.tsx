import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { App as CapacitorApp } from '@capacitor/app'
import { Heart, Leaf, ShoppingBag, User } from 'lucide-react'
import { useAccount } from './account/useAccount'
import Logo from './components/Logo'
import SustainabilityDialog from './components/SustainabilityDialog'
import WhatsAppChat from './components/WhatsAppChat'
import WhatsAppIcon from './components/WhatsAppIcon'
import { productById, SPECIAL } from './data/products'
import { NavContext, type Nav, type Screen } from './nav'
import AccountScreen from './screens/AccountScreen'
import AuthScreen from './screens/AuthScreen'
import BagScreen from './screens/BagScreen'
import CatalogScreen from './screens/CatalogScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import FavoritesScreen from './screens/FavoritesScreen'
import MenuScreen from './screens/MenuScreen'
import OrderDetailScreen from './screens/OrderDetailScreen'
import OrdersScreen from './screens/OrdersScreen'
import PaymentsScreen from './screens/PaymentsScreen'
import ProductScreen from './screens/ProductScreen'
import ProfileScreen from './screens/ProfileScreen'
import { useShop } from './useShop'

const home: Screen = { name: 'catalog', listing: { kind: 'new' } }

// Menú lateral. Colección y Accesorios abren su menú desglosado.
const sideItems: { label: string; target: Screen }[] = [
  { label: 'Novedades', target: home },
  { label: 'Colección', target: { name: 'menu', section: 'Colección' } },
  { label: 'Calzado', target: { name: 'catalog', listing: { kind: 'section', section: 'Calzado' } } },
  { label: 'Accesorios', target: { name: 'menu', section: 'Accesorios' } },
  { label: SPECIAL, target: { name: 'catalog', listing: { kind: 'sale' } } },
]

// Botón lateral resaltado según la pantalla visible.
function activeSideItem(screen: Screen) {
  if (screen.name === 'menu') return screen.section
  if (screen.name === 'product') return productById(screen.id)?.section
  if (screen.name !== 'catalog') return undefined
  const { listing } = screen
  return listing.kind === 'new' ? 'Novedades' : listing.kind === 'sale' ? SPECIAL : listing.section
}

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
  const [history, setHistory] = useState<Screen[]>([home])
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
  const shopNew = () => go(home)
  const [dialog, setDialog] = useState<'whatsapp' | 'sustainability' | null>(null)
  const activeItem = activeSideItem(screen)

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
        <header className="pt-safe border-b border-neutral-100 bg-white">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:px-8 sm:py-5">
            <div />
            <button onClick={() => go(home)} aria-label="mo&ju, inicio">
              <Logo className="text-3xl sm:text-4xl" />
            </button>
            <nav className="flex justify-end gap-1.5 sm:gap-2">
              {actions.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => go({ name: id })}
                  aria-label={label}
                  className={`relative flex items-center gap-2 p-2 text-[10px] font-medium tracking-[0.15em] text-white uppercase transition sm:px-3.5 sm:py-2.5 ${
                    screen.name === id ? 'bg-sage-dark' : 'bg-sage active:bg-sage-dark'
                  }`}
                >
                  <Icon className="size-3.5" strokeWidth={1.5} />
                  <span className="hidden sm:inline">{label}</span>
                  {counts[id] > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center bg-ink text-[9px] font-medium text-white">
                      {counts[id]}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <aside className="flex w-28 shrink-0 flex-col gap-1 overflow-y-auto border-r border-neutral-100 bg-white px-3 py-5 sm:w-44 sm:px-6 sm:py-8">
            {sideItems.map(({ label, target }) => {
              const isActive = label === activeItem
              const isSale = label === SPECIAL
              return (
                <button
                  key={label}
                  onClick={() => go(target)}
                  className={`py-2 text-left text-[11px] tracking-[0.14em] uppercase transition ${
                    isSale ? 'text-red-600' : isActive ? 'text-ink' : 'text-neutral-500'
                  } ${isActive ? 'font-semibold underline decoration-1 underline-offset-[6px]' : 'hover:text-ink'}`}
                >
                  {label}
                </button>
              )
            })}

            <div className="mt-8 flex flex-col items-start gap-6 border-t border-neutral-100 pt-8">
              <button
                onClick={() => setDialog('whatsapp')}
                aria-label={product ? `Consultar por WhatsApp: ${product.name}` : 'Contactar por WhatsApp'}
                className="flex size-11 items-center justify-center rounded-full bg-[#25D366] text-white transition active:scale-90"
              >
                <WhatsAppIcon className="size-6" />
              </button>
              <button
                onClick={() => setDialog('sustainability')}
                className="flex flex-col items-start gap-1.5 text-[9px] tracking-[0.1em] text-neutral-500 uppercase hover:text-ink sm:text-[10px] sm:tracking-[0.14em]"
              >
                <Leaf className="size-4 shrink-0" strokeWidth={1.5} />
                Sostenibilidad
              </button>
            </div>
          </aside>

          <main ref={mainRef} className="min-w-0 flex-1 overflow-y-auto px-4 py-6 sm:px-10 sm:py-8">
            {needsLogin ? (
              <AuthScreen key="login" mode="login" then={screen} />
            ) : (
              <>
                {screen.name === 'catalog' && <CatalogScreen key={JSON.stringify(screen.listing)} listing={screen.listing} onOpen={openProduct} />}
                {screen.name === 'menu' && <MenuScreen key={screen.section} section={screen.section} />}
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

        <footer className="pb-safe border-t border-neutral-100 bg-white">
          <p className="px-4 py-2.5 text-center text-[10px] tracking-[0.12em] text-neutral-400 uppercase">
            mo&amp;ju · v{__APP_VERSION__} · {buildDate}
          </p>
        </footer>

        {toast && (
          <div className="pt-safe pointer-events-none fixed inset-x-0 top-16 flex justify-center px-4">
            <div role="status" className="bg-ink px-5 py-2.5 text-[11px] tracking-[0.12em] text-white uppercase">
              {toast}
            </div>
          </div>
        )}
        {dialog === 'whatsapp' && <WhatsAppChat product={product} onClose={() => setDialog(null)} />}
        {dialog === 'sustainability' && <SustainabilityDialog onClose={() => setDialog(null)} />}
      </div>
    </NavContext.Provider>
  )
}

export default App
