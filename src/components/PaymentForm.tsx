import { Banknote, CreditCard, Smartphone, type LucideIcon } from 'lucide-react'
import { cardBrand, digits, formatCardNumber, formatExpiry } from '../account/cards'
import type { PaymentDraft, PaymentErrors } from '../account/payment'
import { paymentLabels, type PaymentMethod, type SavedCard } from '../account/types'
import { Field } from './ui'

const methods: { id: PaymentMethod; icon: LucideIcon; note: string }[] = [
  { id: 'yappy', icon: Smartphone, note: 'Aprueba el pago desde tu app de Yappy' },
  { id: 'card', icon: CreditCard, note: 'Visa, Mastercard o American Express' },
  { id: 'cod', icon: Banknote, note: 'Paga en efectivo o con tarjeta al recibir' },
]

type Props = {
  value: PaymentDraft
  onChange: (value: PaymentDraft) => void
  errors: PaymentErrors
  savedCard?: SavedCard
}

function PaymentForm({ value: d, onChange, errors, savedCard }: Props) {
  const set = <K extends keyof PaymentDraft>(key: K, v: PaymentDraft[K]) => onChange({ ...d, [key]: v })

  return (
    <div className="space-y-2">
      {methods.map(({ id, icon: Icon, note }) => {
        const selected = d.method === id
        return (
          <div key={id} className={`rounded-xl border transition ${selected ? 'border-ink' : 'border-neutral-300'}`}>
            <button type="button" onClick={() => set('method', id)} className="flex w-full items-center gap-3 p-3 text-left">
              <span className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-ink' : 'border-slate-300'}`}>
                {selected && <span className="size-2 rounded-full bg-ink" />}
              </span>
              <Icon className="size-5 shrink-0 text-muted" />
              <span className="min-w-0">
                <span className="block text-sm font-medium">{paymentLabels[id]}</span>
                <span className="block text-xs text-muted">{note}</span>
              </span>
            </button>

            {selected && (
              <div className="space-y-3 border-t border-neutral-100 p-3">
                {id === 'yappy' && (
                  <Field
                    label="Celular Yappy (+507)"
                    type="tel"
                    inputMode="numeric"
                    placeholder="6123-4567"
                    value={d.yappyPhone}
                    onChange={(e) => set('yappyPhone', e.target.value)}
                    error={errors.yappyPhone}
                    hint="Recibirás una solicitud de cobro en tu app de Yappy"
                  />
                )}

                {id === 'card' && (
                  <>
                    {savedCard && (
                      <div className="flex flex-col gap-2 text-sm">
                        <label className="flex items-center gap-2">
                          <input type="radio" checked={d.useSavedCard} onChange={() => set('useSavedCard', true)} className="accent-[#1f1f1f]" />
                          {savedCard.brand} •••• {savedCard.last4} <span className="text-xs text-muted">caduca {savedCard.expiry}</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" checked={!d.useSavedCard} onChange={() => set('useSavedCard', false)} className="accent-[#1f1f1f]" />
                          Usar otra tarjeta
                        </label>
                      </div>
                    )}
                    {!(d.useSavedCard && savedCard) && (
                      <div className="grid grid-cols-2 gap-3">
                        <Field
                          label="Número de tarjeta"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="4242 4242 4242 4242"
                          value={d.cardNumber}
                          onChange={(e) => set('cardNumber', formatCardNumber(e.target.value))}
                          error={errors.cardNumber}
                          hint={d.cardNumber ? cardBrand(d.cardNumber) : 'Prueba: 4242 4242 4242 4242'}
                          className="col-span-2"
                        />
                        <Field
                          label="Titular"
                          autoComplete="cc-name"
                          value={d.cardHolder}
                          onChange={(e) => set('cardHolder', e.target.value.toUpperCase())}
                          error={errors.cardHolder}
                          className="col-span-2"
                        />
                        <Field
                          label="Caducidad"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder="MM/AA"
                          value={d.cardExpiry}
                          onChange={(e) => set('cardExpiry', formatExpiry(e.target.value))}
                          error={errors.cardExpiry}
                        />
                        <Field
                          label="CVV"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          type="password"
                          maxLength={4}
                          value={d.cardCvv}
                          onChange={(e) => set('cardCvv', digits(e.target.value))}
                          error={errors.cardCvv}
                        />
                      </div>
                    )}
                  </>
                )}

                {id === 'cod' && (
                  <>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {(
                        [
                          ['cash', 'Efectivo'],
                          ['pos', 'Tarjeta (POS)'],
                        ] as const
                      ).map(([type, label]) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => set('codType', type)}
                          className={`rounded-lg border py-2 ${d.codType === type ? 'border-ink bg-ink text-white' : 'border-neutral-300'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    {d.codType === 'cash' ? (
                      <Field
                        label="¿Con cuánto pagarás? (opcional)"
                        inputMode="decimal"
                        placeholder="Para llevarte el cambio"
                        value={d.cashAmount}
                        onChange={(e) => set('cashAmount', e.target.value.replace(/[^\d.]/g, ''))}
                        error={errors.cashAmount}
                      />
                    ) : (
                      <p className="text-xs text-muted">El repartidor llevará un datáfono para cobrarte con tarjeta.</p>
                    )}
                  </>
                )}

                {id !== 'cod' && !(id === 'card' && d.useSavedCard && savedCard) && (
                  <label className="flex items-center gap-2 text-xs text-muted">
                    <input type="checkbox" checked={d.saveMethod} onChange={(e) => set('saveMethod', e.target.checked)} className="accent-[#111111]" />
                    Guardar para próximas compras
                  </label>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PaymentForm
