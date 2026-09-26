import type { Order } from './types'

export const steps = ['Confirmado', 'En preparación', 'Enviado', 'Entregado'] as const

// Minutos desde la compra en que se alcanza cada paso: el prototipo "avanza" solo.
const stepMinutes = [0, 2, 5, 10]

export function orderProgress(order: Order, now = Date.now()) {
  if (order.cancelledAt) return { label: 'Cancelado', step: -1, cancelled: true }
  const minutes = (now - new Date(order.createdAt).getTime()) / 60000
  const step = stepMinutes.filter((m) => minutes >= m).length - 1
  return { label: steps[step], step, cancelled: false }
}

export const canCancel = (order: Order) => {
  const { step, cancelled } = orderProgress(order)
  return !cancelled && step < 2
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('es-PA', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
