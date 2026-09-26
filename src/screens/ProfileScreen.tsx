import { useState } from 'react'
import { isPanamaPhone, type Address } from '../account/types'
import { useAccount } from '../account/useAccount'
import { validateAddress, type AddressErrors } from '../account/address'
import AddressFields from '../components/AddressFields'
import { Card, Field, PrimaryButton, ScreenTitle } from '../components/ui'
import { useNav } from '../nav'
import { useShop } from '../useShop'

function ProfileScreen() {
  const { user, updateUser } = useAccount()
  const { back } = useNav()
  const { notify } = useShop()
  const [form, setForm] = useState({ firstName: user?.firstName ?? '', lastName: user?.lastName ?? '', phone: user?.phone ?? '' })
  const [address, setAddress] = useState<Address>(user!.address)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({})

  const save = () => {
    const next: Record<string, string> = {}
    if (!form.firstName.trim()) next.firstName = 'Indica tu nombre'
    if (!form.lastName.trim()) next.lastName = 'Indica tus apellidos'
    if (!isPanamaPhone(form.phone)) next.phone = 'Teléfono de Panamá no válido'
    const addrErrors = validateAddress(address)
    setErrors(next)
    setAddressErrors(addrErrors)
    if (Object.keys(next).length || Object.keys(addrErrors).length) return
    updateUser({ firstName: form.firstName.trim(), lastName: form.lastName.trim(), phone: form.phone.replace(/\D/g, ''), address })
    notify('Datos guardados')
    back()
  }

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((p) => ({ ...p, [key]: e.target.value }))

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <ScreenTitle title="Datos personales" />
      <Card>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nombre" value={form.firstName} onChange={set('firstName')} error={errors.firstName} />
          <Field label="Apellidos" value={form.lastName} onChange={set('lastName')} error={errors.lastName} />
          <Field label="Email" value={user?.email ?? ''} readOnly hint="El email identifica tu cuenta" className="opacity-70" />
          <Field label="Teléfono (+507)" type="tel" inputMode="numeric" value={form.phone} onChange={set('phone')} error={errors.phone} />
        </div>
      </Card>
      <Card>
        <h3 className="mb-5 text-[11px] font-medium tracking-[0.15em] uppercase">Dirección de envío</h3>
        <AddressFields value={address} onChange={setAddress} errors={addressErrors} />
      </Card>
      <PrimaryButton onClick={save}>Guardar cambios</PrimaryButton>
    </div>
  )
}

export default ProfileScreen
