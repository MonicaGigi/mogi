import { store } from '../config'
import type { Address } from './types'

export type AddressErrors = Partial<Record<keyof Address, string>>

export function validateAddress(a: Address): AddressErrors {
  const errors: AddressErrors = {}
  if (!(store.zones as readonly string[]).includes(a.zone)) errors.zone = 'Elige tu corregimiento'
  if (a.street.trim().length < 5) errors.street = 'Indica calle, edificio o casa'
  return errors
}
