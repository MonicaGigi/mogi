import { useState } from 'react'

const tabs = [
  { id: 'home', label: 'Inicio', icon: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' },
  { id: 'search', label: 'Buscar', icon: 'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm10 2-4.35-4.35' },
  { id: 'profile', label: 'Perfil', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0' },
] as const

type TabId = (typeof tabs)[number]['id']

function App() {
  const [active, setActive] = useState<TabId>('home')

  return (
    <div className="flex h-full flex-col">
      <header className="pt-safe sticky top-0 z-10 bg-surface/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-5 py-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            mo<span className="text-brand-500">&amp;</span>ju
          </h1>
          <div className="size-9 rounded-full bg-brand-100" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pb-6">
        <section className="rounded-card bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white shadow-soft">
          <p className="text-sm text-white/80">Bienvenido</p>
          <p className="mt-1 text-xl font-semibold">Tu app está lista para empezar</p>
          <button className="mt-5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-brand-700 active:scale-95 transition">
            Comenzar
          </button>
        </section>

        <h2 className="mt-8 mb-3 text-sm font-medium text-muted">Accesos rápidos</h2>
        <div className="grid grid-cols-2 gap-3">
          {['Novedades', 'Favoritos', 'Actividad', 'Ajustes'].map((item) => (
            <button
              key={item}
              className="rounded-card bg-white p-4 text-left shadow-soft ring-1 ring-slate-100 active:scale-[0.98] transition"
            >
              <div className="mb-3 size-9 rounded-xl bg-brand-50" />
              <span className="text-sm font-medium">{item}</span>
            </button>
          ))}
        </div>
      </main>

      <nav className="pb-safe border-t border-slate-100 bg-white/90 backdrop-blur-md">
        <ul className="flex justify-around py-2">
          {tabs.map((tab) => {
            const isActive = tab.id === active
            return (
              <li key={tab.id}>
                <button
                  onClick={() => setActive(tab.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-1 text-xs transition ${
                    isActive ? 'text-brand-600' : 'text-muted'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d={tab.icon} />
                  </svg>
                  {tab.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default App
