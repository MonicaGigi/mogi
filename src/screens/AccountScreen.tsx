import { Bell, ChevronRight, CreditCard, MapPin, Package, Settings } from 'lucide-react'
import { useShop } from '../useShop'

const options = [
  { label: 'Mis pedidos', icon: Package },
  { label: 'Direcciones', icon: MapPin },
  { label: 'Métodos de pago', icon: CreditCard },
  { label: 'Notificaciones', icon: Bell },
  { label: 'Ajustes', icon: Settings },
]

function AccountScreen() {
  const { notify } = useShop()

  return (
    <div className="mx-auto max-w-md">
      <section className="rounded-card bg-white p-5 shadow-soft ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold">Hola 👋</h2>
        <p className="mt-1 text-sm text-muted">Inicia sesión para ver tus pedidos y guardar tus favoritos en todos tus dispositivos.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            notify('Inicio de sesión: próximamente')
          }}
          className="mt-4 space-y-2"
        >
          <input type="email" placeholder="Email" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
          <input type="password" placeholder="Contraseña" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
          <button className="w-full rounded-full bg-sage py-3 text-sm font-semibold text-white transition active:scale-[0.98] active:bg-sage-dark">
            Iniciar sesión
          </button>
        </form>
        <p className="mt-3 text-center text-xs text-muted">
          ¿Aún no tienes cuenta? <span className="font-medium text-ink underline">Crea tu cuenta</span>
        </p>
      </section>

      <ul className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-card bg-white shadow-soft ring-1 ring-slate-100">
        {options.map(({ label, icon: Icon }) => (
          <li key={label}>
            <button onClick={() => notify(`${label}: próximamente`)} className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm active:bg-slate-50">
              <Icon className="size-4 text-muted" />
              <span className="flex-1">{label}</span>
              <ChevronRight className="size-4 text-slate-300" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AccountScreen
