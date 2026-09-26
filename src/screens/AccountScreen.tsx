import { ChevronRight, CreditCard, LogOut, MapPin, Package, UserRound } from 'lucide-react'
import { orderProgress } from '../account/orderStatus'
import { formatAddress, formatPhone, paymentLabels } from '../account/types'
import { useAccount } from '../account/useAccount'
import { Card } from '../components/ui'
import { useNav } from '../nav'
import { useShop } from '../useShop'
import AuthScreen from './AuthScreen'

function AccountScreen() {
  const { user, orders, logout } = useAccount()
  const { go } = useNav()
  const { notify } = useShop()

  if (!user) return <AuthScreen mode="login" />

  const active = orders.filter((o) => {
    const { cancelled, label } = orderProgress(o)
    return !cancelled && label !== 'Entregado'
  }).length

  const options = [
    {
      label: 'Mis pedidos',
      detail: orders.length ? `${orders.length} pedidos${active ? ` · ${active} en curso` : ''}` : 'Aún no tienes pedidos',
      icon: Package,
      onClick: () => go({ name: 'orders' }),
    },
    { label: 'Datos personales', detail: `${user.email} · ${formatPhone(user.phone)}`, icon: UserRound, onClick: () => go({ name: 'profile' }) },
    { label: 'Dirección de envío', detail: formatAddress(user.address), icon: MapPin, onClick: () => go({ name: 'profile' }) },
    {
      label: 'Métodos de pago',
      detail: user.preferredPayment ? `Preferido: ${paymentLabels[user.preferredPayment]}` : 'Yappy, tarjeta o contra entrega',
      icon: CreditCard,
      onClick: () => go({ name: 'payments' }),
    },
  ]

  return (
    <div className="mx-auto max-w-md">
      <Card className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-none bg-ink text-lg font-semibold text-white">
          {user.firstName[0]}
          {user.lastName[0]}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-2xl">
            Hola, {user.firstName}
          </h2>
          <p className="truncate text-xs text-muted">Cliente desde {new Date(user.createdAt).toLocaleDateString('es-PA', { month: 'long', year: 'numeric' })}</p>
        </div>
      </Card>

      <ul className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-card bg-white shadow-soft ring-1 ring-neutral-200">
        {options.map(({ label, detail, icon: Icon, onClick }) => (
          <li key={label}>
            <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-neutral-50">
              <Icon className="size-4 shrink-0 text-muted" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm">{label}</span>
                <span className="block truncate text-xs text-muted">{detail}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-neutral-300" />
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          logout()
          notify('Has cerrado sesión')
        }}
        className="mt-4 flex w-full items-center justify-center gap-2 py-3 text-sm text-muted"
      >
        <LogOut className="size-4" /> Cerrar sesión
      </button>
    </div>
  )
}

export default AccountScreen
