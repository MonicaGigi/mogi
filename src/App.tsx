import { useRef, useState } from 'react'
import { Heart, ShoppingBag, User } from 'lucide-react'
import { productById, type Category } from './data/products'
import AccountScreen from './screens/AccountScreen'
import BagScreen from './screens/BagScreen'
import CatalogScreen from './screens/CatalogScreen'
import FavoritesScreen from './screens/FavoritesScreen'
import ProductScreen from './screens/ProductScreen'
import { useShop } from './useShop'

const categories: Category[] = ['Ropa', 'Calzado', 'Accesorios', 'Novedades']

type Screen =
  | { name: 'catalog'; category: Category }
  | { name: 'product'; id: string }
  | { name: 'favorites' }
  | { name: 'account' }
  | { name: 'bag' }

const actions = [
  { id: 'favorites', label: 'Favoritos', icon: Heart },
  { id: 'account', label: 'Mi cuenta', icon: User },
  { id: 'bag', label: 'Mi bolsa', icon: ShoppingBag },
] as const

const buildDate = new Date(__BUILD_DATE__).toLocaleDateString('es-ES')

function App() {
  const { favorites, bagCount, toast } = useShop()
  const [history, setHistory] = useState<Screen[]>([{ name: 'catalog', category: 'Ropa' }])
  const mainRef = useRef<HTMLElement>(null)
  const screen = history[history.length - 1]

  const go = (next: Screen) => {
    setHistory((prev) => [...prev, next])
    mainRef.current?.scrollTo({ top: 0 })
  }
  const back = () => setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))
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

  return (
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
          {screen.name === 'catalog' && <CatalogScreen key={screen.category} category={screen.category} onOpen={openProduct} />}
          {product && <ProductScreen key={product.id} product={product} onBack={back} onOpen={openProduct} />}
          {screen.name === 'favorites' && <FavoritesScreen onOpen={openProduct} onShop={shopNew} />}
          {screen.name === 'account' && <AccountScreen />}
          {screen.name === 'bag' && <BagScreen onOpen={openProduct} onShop={shopNew} />}
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
  )
}

export default App
