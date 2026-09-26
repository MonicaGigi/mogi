import { MapPin } from 'lucide-react'
import type { AddressErrors } from '../account/address'
import type { Address } from '../account/types'
import { store } from '../config'
import { Field, Select } from './ui'

type Props = {
  value: Address
  onChange: (value: Address) => void
  errors?: AddressErrors
}

function AddressFields({ value, onChange, errors = {} }: Props) {
  const set = (key: keyof Address) => (v: string) => onChange({ ...value, city: store.city, [key]: v })

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <p className="flex items-center gap-1.5 rounded-xl bg-neutral-100 px-3 py-2 text-xs sm:col-span-2">
        <MapPin className="size-3.5 shrink-0" /> Solo realizamos entregas en {store.city}
      </p>
      <Select
        label="Corregimiento"
        value={value.zone}
        options={['', ...store.zones]}
        onChange={set('zone')}
        error={errors.zone}
        placeholder="Elige tu corregimiento"
      />
      <Field label="Ciudad" value={store.city} readOnly className="opacity-70" />
      <Field
        label="Dirección"
        value={value.street}
        onChange={(e) => set('street')(e.target.value)}
        error={errors.street}
        placeholder="Calle 74, Edificio Mar del Sur, apto 5B"
        className="sm:col-span-2"
      />
      <Field
        label="Punto de referencia (opcional)"
        value={value.reference}
        onChange={(e) => set('reference')(e.target.value)}
        placeholder="Frente al parque"
        className="sm:col-span-2"
      />
    </div>
  )
}

export default AddressFields
