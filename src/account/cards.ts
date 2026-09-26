export const digits = (value: string) => value.replace(/\D/g, '')

export function cardBrand(number: string) {
  const n = digits(number)
  if (/^4/.test(n)) return 'Visa'
  if (/^(5[1-5]|2[2-7])/.test(n)) return 'Mastercard'
  if (/^3[47]/.test(n)) return 'Amex'
  return 'Tarjeta'
}

export function luhn(number: string) {
  const n = digits(number)
  if (n.length < 13 || n.length > 19) return false
  let sum = 0
  for (let i = 0; i < n.length; i++) {
    let d = Number(n[n.length - 1 - i])
    if (i % 2 === 1) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
  }
  return sum % 10 === 0
}

export function validExpiry(expiry: string, now = new Date()) {
  const m = /^(\d{2})\/(\d{2})$/.exec(expiry)
  if (!m) return false
  const month = Number(m[1])
  const year = 2000 + Number(m[2])
  if (month < 1 || month > 12) return false
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1)
}

export const formatCardNumber = (value: string) =>
  digits(value)
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, '$1 ')

export function formatExpiry(value: string) {
  const d = digits(value).slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

// Simulación: las tarjetas que terminan en 0002 se rechazan, para poder probar el error.
export const isDeclined = (number: string) => digits(number).endsWith('0002')
