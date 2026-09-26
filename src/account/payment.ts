import { formatPrice } from '../data/products'
import { cardBrand, digits, luhn, validExpiry } from './cards'
import { formatPhone, type PaymentMethod, type SavedCard } from './types'

export type PaymentDraft = {
  method: PaymentMethod
  yappyPhone: string
  useSavedCard: boolean
  cardNumber: string
  cardHolder: string
  cardExpiry: string
  cardCvv: string
  saveMethod: boolean
  codType: 'cash' | 'pos'
  cashAmount: string
}

export type PaymentErrors = Partial<Record<keyof PaymentDraft, string>>

export function validatePayment(d: PaymentDraft, total: number, savedCard?: SavedCard): PaymentErrors {
  const e: PaymentErrors = {}
  if (d.method === 'yappy' && !/^6\d{7}$/.test(digits(d.yappyPhone))) {
    e.yappyPhone = 'Indica el celular asociado a Yappy (8 dígitos, empieza por 6)'
  }
  if (d.method === 'card' && !(d.useSavedCard && savedCard)) {
    if (!luhn(d.cardNumber)) e.cardNumber = 'Número de tarjeta no válido'
    if (d.cardHolder.trim().length < 3) e.cardHolder = 'Indica el nombre que aparece en la tarjeta'
    if (!validExpiry(d.cardExpiry)) e.cardExpiry = 'Fecha no válida (MM/AA)'
    if (!/^\d{3,4}$/.test(d.cardCvv)) e.cardCvv = 'CVV no válido'
  }
  if (d.method === 'cod' && d.codType === 'cash' && d.cashAmount && Number(d.cashAmount) < total) {
    e.cashAmount = `Debe ser igual o mayor que ${formatPrice(total)}`
  }
  return e
}

export function describePayment(d: PaymentDraft, savedCard?: SavedCard) {
  if (d.method === 'yappy') return `Yappy · ${formatPhone(d.yappyPhone)}`
  if (d.method === 'card') {
    const card = d.useSavedCard && savedCard ? savedCard : newCard(d)
    return `${card.brand} •••• ${card.last4}`
  }
  if (d.codType === 'pos') return 'Contra entrega · tarjeta (POS) al recibir'
  return d.cashAmount
    ? `Contra entrega · efectivo (paga con ${formatPrice(Number(d.cashAmount))})`
    : 'Contra entrega · efectivo'
}

export const newCard = (d: PaymentDraft): SavedCard => ({
  brand: cardBrand(d.cardNumber),
  last4: digits(d.cardNumber).slice(-4),
  expiry: d.cardExpiry,
  holder: d.cardHolder.trim(),
})
