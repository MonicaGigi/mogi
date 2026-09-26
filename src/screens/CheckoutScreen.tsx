import { useCallback, useMemo, useState } from 'react'
import { isDeclined } from '../account/cards'
import { formatAddress, formatPhone, isPanamaPhone, shippingFor, type Address, type OrderLine } from '../account/types'
import { useAccount } from '../account/useAccount'
import { validateAddress, type AddressErrors } from '../account/address'
import { describePayment, newCard, validatePayment, type PaymentDraft, type PaymentErrors } from '../account/payment'
import AddressFields from '../components/AddressFields'
import PaymentForm from '../components/PaymentForm'
import PaymentOverlay from '../components/PaymentOverlay'
import ProductImage from '../components/ProductImage'
import { Card, Field, PrimaryButton, ScreenTitle } from '../components/ui'
import { formatPrice, productById } from '../data/products'
import { useNav, type BuyNowItem } from '../nav'
import { useShop } from '../useShop'
import AuthScreen from './AuthScreen'

type Props = { buyNow?: BuyNowItem }

function CheckoutScreen({ buyNow }: Props) {
  const { user } = useAccount()

  if (!user) {
    return (
      <AuthScreen
        mode="login"
        then={{ name: 'checkout', buyNow }}
        message="Inicia sesión para finalizar la compra. Si aún no tienes cuenta, puedes crearla en un momento."
      />
    )
  }
  return <Checkout buyNow={buyNow} />
}

function Checkout({ buyNow }: Props) {
  const { user, placeOrder, updateUser } = useAccount()
  const { bag, clearBag } = useShop()
  const { replace } = useNav()
  const me = user!

  const lines = useMemo<OrderLine[]>(() => {
    const source = buyNow ? [{ ...buyNow, qty: 1 }] : bag
    return source.flatMap((item) => {
      const product = productById(item.productId)
      return product
        ? [{ productId: product.id, name: product.name, price: product.price, color: item.color, size: item.size, qty: item.qty }]
        : []
    })
  }, [buyNow, bag])

  const [recipient, setRecipient] = useState(`${me.firstName} ${me.lastName}`)
  const [phone, setPhone] = useState(me.phone)
  const [address, setAddress] = useState<Address>(me.address)
  const [editingAddress, setEditingAddress] = useState(false)
  const [saveAddress, setSaveAddress] = useState(true)
  const [payment, setPayment] = useState<PaymentDraft>({
    method: me.preferredPayment ?? 'yappy',
    yappyPhone: me.yappyPhone ?? me.phone,
    useSavedCard: Boolean(me.card),
    cardNumber: '',
    cardHolder: '',
    cardExpiry: '',
    cardCvv: '',
    saveMethod: true,
    codType: 'cash',
    cashAmount: '',
  })
  const [errors, setErrors] = useState<{ recipient?: string; phone?: string; address: AddressErrors; payment: PaymentErrors }>({
    address: {},
    payment: {},
  })
  const [paying, setPaying] = useState(false)

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0)
  const shipping = shippingFor(subtotal)
  const total = subtotal + shipping

  const submit = () => {
    const next = {
      recipient: recipient.trim().length < 3 ? 'Indica quién recibe el pedido' : undefined,
      phone: isPanamaPhone(phone) ? undefined : 'Teléfono de contacto no válido',
      address: validateAddress(address),
      payment: validatePayment(payment, total, me.card),
    }
    setErrors(next)
    if (Object.keys(next.address).length) setEditingAddress(true)
    if (next.recipient || next.phone || Object.keys(next.address).length || Object.keys(next.payment).length) return
    setPaying(true)
  }

  const complete = useCallback(() => {
    const order = placeOrder({
      lines,
      payment: { method: payment.method, detail: describePayment(payment, me.card) },
      address,
      recipient: recipient.trim(),
      phone: phone.replace(/\D/g, ''),
    })

    const prefs: Parameters<typeof updateUser>[0] = { preferredPayment: payment.method }
    if (editingAddress && saveAddress) prefs.address = address
    if (payment.saveMethod && payment.method === 'yappy') prefs.yappyPhone = payment.yappyPhone.replace(/\D/g, '')
    if (payment.saveMethod && payment.method === 'card' && !(payment.useSavedCard && me.card)) prefs.card = newCard(payment)
    updateUser(prefs)

    if (!buyNow) clearBag()
    replace({ name: 'confirmation', orderId: order.id })
  }, [placeOrder, lines, payment, me.card, address, recipient, phone, updateUser, editingAddress, saveAddress, buyNow, clearBag, replace])

  if (lines.length === 0) {
    return (
      <>
        <ScreenTitle title="Finalizar compra" />
        <p className="text-sm text-muted">No hay artículos que comprar.</p>
      </>
    )
  }

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_18rem]">
      <div className="space-y-4">
        <ScreenTitle title="Finalizar compra" subtitle={buyNow ? 'Compra rápida' : `${lines.length} artículos de tu bolsa`} />

        <Card>
          <h3 className="mb-3 text-sm font-semibold">1. Entrega</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Recibe" value={recipient} onChange={(e) => setRecipient(e.target.value)} error={errors.recipient} />
            <Field label="Teléfono de contacto (+507)" type="tel" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />
          </div>
          {editingAddress ? (
            <div className="mt-3 space-y-3">
              <AddressFields value={address} onChange={setAddress} errors={errors.address} />
              <label className="flex items-center gap-2 text-xs text-muted">
                <input type="checkbox" checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} className="accent-[#8f8a68]" />
                Guardar como mi dirección habitual
              </label>
            </div>
          ) : (
            <div className="mt-3 flex items-start justify-between gap-3 rounded-xl bg-slate-50 p-3 text-sm">
              <div>
                <p>{formatAddress(address)}</p>
                {address.reference && <p className="text-xs text-muted">{address.reference}</p>}
                <p className="mt-1 text-xs text-muted">Entrega estimada: 24–48 h</p>
              </div>
              <button onClick={() => setEditingAddress(true)} className="shrink-0 text-xs font-medium underline">
                Cambiar
              </button>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="mb-3 text-sm font-semibold">2. Pago</h3>
          <PaymentForm value={payment} onChange={setPayment} errors={errors.payment} savedCard={me.card} />
          <p className="mt-3 text-[11px] text-muted">Prototipo: ningún pago es real, todos se simulan en el dispositivo.</p>
        </Card>
      </div>

      <aside className="h-fit space-y-3 md:sticky md:top-0">
        <Card>
          <h3 className="mb-3 text-sm font-semibold">Resumen</h3>
          <ul className="mb-3 space-y-2">
            {lines.map((l) => {
              const product = productById(l.productId)!
              return (
                <li key={`${l.productId}|${l.color}|${l.size}`} className="flex gap-2 text-xs">
                  <ProductImage product={product} width={120} className="aspect-[3/4] w-10 shrink-0 rounded-md" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{l.name}</p>
                    <p className="text-muted">
                      {l.color} · {l.size} · x{l.qty}
                    </p>
                  </div>
                  <span>{formatPrice(l.price * l.qty)}</span>
                </li>
              )
            })}
          </ul>
          <dl className="space-y-1.5 border-t border-slate-100 pt-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Envío</dt>
              <dd>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <PrimaryButton onClick={submit} className="mt-4">
            {payment.method === 'cod' ? 'Confirmar pedido' : `Pagar ${formatPrice(total)}`}
          </PrimaryButton>
          <p className="mt-2 text-center text-[11px] text-muted">ITBMS incluido</p>
        </Card>
      </aside>

      {paying && (
        <PaymentOverlay
          method={payment.method}
          amount={total}
          yappyPhone={formatPhone(payment.yappyPhone)}
          declined={payment.method === 'card' && !(payment.useSavedCard && me.card) && isDeclined(payment.cardNumber)}
          onApproved={complete}
          onClose={() => setPaying(false)}
        />
      )}
    </div>
  )
}

export default CheckoutScreen
