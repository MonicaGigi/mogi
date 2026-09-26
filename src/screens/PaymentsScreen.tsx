import { Banknote, CreditCard, Smartphone, Trash2, type LucideIcon } from 'lucide-react'
import { formatPhone, paymentLabels, type PaymentMethod } from '../account/types'
import { useAccount } from '../account/useAccount'
import { Card, ScreenTitle } from '../components/ui'
import { useShop } from '../useShop'

const icons: Record<PaymentMethod, LucideIcon> = { yappy: Smartphone, card: CreditCard, cod: Banknote }

function PaymentsScreen() {
  const { user, updateUser } = useAccount()
  const { notify } = useShop()
  if (!user) return null

  const details: Record<PaymentMethod, string> = {
    yappy: user.yappyPhone ? `Celular ${formatPhone(user.yappyPhone)}` : 'Se guardará en tu próxima compra con Yappy',
    card: user.card ? `${user.card.brand} •••• ${user.card.last4} · caduca ${user.card.expiry}` : 'Se guardará en tu próxima compra con tarjeta',
    cod: 'Efectivo o tarjeta (POS) al recibir el pedido',
  }

  return (
    <div className="mx-auto max-w-lg">
      <ScreenTitle title="Métodos de pago" subtitle="Elige tu método preferido; lo verás seleccionado al pagar." />
      <Card className="space-y-2">
        {(Object.keys(paymentLabels) as PaymentMethod[]).map((method) => {
          const Icon = icons[method]
          const preferred = (user.preferredPayment ?? 'yappy') === method
          const saved = method === 'yappy' ? user.yappyPhone : method === 'card' ? user.card : undefined
          return (
            <div key={method} className={`flex items-center gap-3 rounded-xl border p-3 ${preferred ? 'border-ink' : 'border-neutral-300'}`}>
              <button
                onClick={() => {
                  updateUser({ preferredPayment: method })
                  notify(`${paymentLabels[method]} es tu método preferido`)
                }}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                <span className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${preferred ? 'border-ink' : 'border-slate-300'}`}>
                  {preferred && <span className="size-2 rounded-full bg-ink" />}
                </span>
                <Icon className="size-5 shrink-0 text-muted" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{paymentLabels[method]}</span>
                  <span className="block truncate text-xs text-muted">{details[method]}</span>
                </span>
              </button>
              {saved && (
                <button
                  onClick={() => {
                    updateUser(method === 'yappy' ? { yappyPhone: undefined } : { card: undefined })
                    notify('Método eliminado')
                  }}
                  aria-label="Eliminar"
                  className="p-1 text-muted"
                >
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
          )
        })}
      </Card>
      <p className="mt-3 text-center text-[11px] text-muted">Prototipo: no se realiza ninguna conexión con bancos ni con Yappy.</p>
    </div>
  )
}

export default PaymentsScreen
