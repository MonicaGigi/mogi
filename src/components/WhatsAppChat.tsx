import { useEffect, useRef, useState, type FormEvent } from 'react'
import { CheckCheck, SendHorizontal } from 'lucide-react'
import { useAccount } from '../account/useAccount'
import { formatPhone } from '../account/types'
import { sellers, store } from '../config'
import { formatPrice, type Product } from '../data/products'
import Dialog from './Dialog'
import ProductImage from './ProductImage'
import WhatsAppIcon from './WhatsAppIcon'

type Message = { from: 'me' | 'seller'; text: string; time: string }

const now = () => new Date().toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' })

const support = { name: 'Atención al cliente', phone: '60001234' }

type Props = {
  product?: Product
  onClose: () => void
}

// Simulación de una conversación de WhatsApp con el vendedor: no se envía ningún mensaje real.
function WhatsAppChat({ product, onClose }: Props) {
  const { user } = useAccount()
  const seller = product ? sellers[product.section] : support
  const greeting = user ? `, ${user.firstName}` : ''

  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState(
    product
      ? `Hola ${seller.name}, me interesa «${product.name}» (${formatPrice(product.price)}). ¿Está disponible?`
      : 'Hola, tengo una consulta sobre mo&ju.',
  )
  const [typing, setTyping] = useState(false)
  const timers = useRef<number[]>([])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, typing])

  const replyTo = (count: number) => {
    if (!product) return `¡Hola${greeting}! 👋 Gracias por escribir a mo&ju. Cuéntame en qué te puedo ayudar y te respondo enseguida.`
    if (count === 0) {
      const sizes = product.sizes.length > 1 ? ` Lo tenemos en tallas ${product.sizes[0]} a ${product.sizes.at(-1)}` : ' Está disponible'
      const colors = product.colors.map((c) => c.name.toLowerCase()).join(' y ')
      return `¡Hola${greeting}! 😊 Soy ${seller.name}, de ${product.section}. Sí, «${product.name}» está disponible.${sizes}, en ${colors}. ¿Quieres que te reserve uno?`
    }
    return `¡Perfecto! Lo dejo anotado. Recuerda que entregamos en 24–48 h en ${store.city} y puedes pagar con Yappy, tarjeta o contra entrega. ¿Algo más en lo que te ayude?`
  }

  const send = (e: FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    const answered = messages.filter((m) => m.from === 'me').length
    setMessages((prev) => [...prev, { from: 'me', text, time: now() }])
    setDraft('')
    timers.current.push(
      window.setTimeout(() => setTyping(true), 900),
      window.setTimeout(() => {
        setTyping(false)
        setMessages((prev) => [...prev, { from: 'seller', text: replyTo(answered), time: now() }])
      }, 2600),
    )
  }

  return (
    <Dialog onClose={onClose} className="flex h-[80vh] flex-col sm:h-[36rem]">
      <header className="flex items-center gap-3 bg-[#008069] px-4 py-3 pr-12 text-white">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20 font-semibold">{seller.name[0]}</div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {seller.name} · mo&amp;ju{product ? ` ${product.section}` : ''}
          </p>
          <p className="text-[11px] text-white/80">{typing ? 'escribiendo…' : `en línea · ${formatPhone(seller.phone)}`}</p>
        </div>
      </header>

      <div className="flex-1 space-y-2 overflow-y-auto bg-[#efeae2] p-3">
        {product && (
          <div className="mx-auto flex max-w-[85%] gap-2 rounded-[10px] bg-white p-2 shadow-sm">
            <ProductImage product={product} width={120} className="aspect-[3/4] w-12 shrink-0 rounded-[4px]" />
            <div className="min-w-0 text-xs">
              <p className="font-medium">{product.name}</p>
              <p className="text-muted">{formatPrice(product.price)}</p>
              <p className="mt-1 text-[10px] text-muted">Consulta sobre este artículo</p>
            </div>
          </div>
        )}
        {!product && (
          <p className="mx-auto max-w-[85%] rounded-[8px] bg-[#fff5c4] px-3 py-2 text-center text-[11px] text-ink/80">
            Consejo: abre un producto y pulsa WhatsApp para hablar directamente con su vendedor.
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-[8px] px-2.5 py-1.5 text-sm shadow-sm ${m.from === 'me' ? 'rounded-tr-none bg-[#d9fdd3]' : 'rounded-tl-none bg-white'}`}
            >
              <p className="whitespace-pre-wrap">{m.text}</p>
              <p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-muted">
                {m.time}
                {m.from === 'me' && <CheckCheck className="size-3.5 text-[#53bdeb]" />}
              </p>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex">
            <div className="rounded-[8px] rounded-tl-none bg-white px-3 py-2 text-sm text-muted shadow-sm">escribiendo…</div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={send} className="flex items-end gap-2 bg-[#f0f2f5] p-2">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={2}
          placeholder="Escribe un mensaje"
          className="min-w-0 flex-1 resize-none rounded-[20px] bg-white px-3 py-2 text-sm outline-none"
        />
        <button aria-label="Enviar" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#008069] text-white">
          <SendHorizontal className="size-4" />
        </button>
      </form>
      <p className="flex items-center justify-center gap-1 bg-[#f0f2f5] pb-2 text-[10px] text-muted">
        <WhatsAppIcon className="size-3" /> Simulación: no se envía ningún mensaje real
      </p>
    </Dialog>
  )
}

export default WhatsAppChat
