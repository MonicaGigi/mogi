import { Check } from 'lucide-react'
import { orderProgress, steps } from '../account/orderStatus'
import type { Order } from '../account/types'

function OrderTimeline({ order }: { order: Order }) {
  const { step, cancelled } = orderProgress(order)
  if (cancelled) return <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">Pedido cancelado</p>

  return (
    <ol className="flex">
      {steps.map((label, i) => {
        const done = i <= step
        return (
          <li key={label} className="relative flex flex-1 flex-col items-center text-center">
            {i > 0 && <span className={`absolute top-3 right-1/2 h-0.5 w-full ${done ? 'bg-sage' : 'bg-slate-200'}`} />}
            <span
              className={`relative z-10 flex size-6 items-center justify-center rounded-full ${
                done ? 'bg-sage text-white' : 'bg-slate-200 text-slate-400'
              }`}
            >
              {done ? <Check className="size-3.5" /> : <span className="size-1.5 rounded-full bg-current" />}
            </span>
            <span className={`mt-1.5 text-[10px] leading-tight ${done ? 'font-medium' : 'text-muted'}`}>{label}</span>
          </li>
        )
      })}
    </ol>
  )
}

export default OrderTimeline
