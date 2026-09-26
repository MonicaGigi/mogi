import { useState, type FormEvent } from 'react'
import { emptyAddress, isPanamaPhone, type Address } from '../account/types'
import { useAccount } from '../account/useAccount'
import { validateAddress, type AddressErrors } from '../account/address'
import AddressFields from '../components/AddressFields'
import { Card, Field, PrimaryButton } from '../components/ui'
import { useNav, type Screen } from '../nav'
import { useShop } from '../useShop'

type Props = {
  mode: 'login' | 'register'
  email?: string
  then?: Screen
  message?: string
}

const isEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email.trim())

function AuthScreen({ mode: initialMode, email: initialEmail = '', then, message }: Props) {
  const { login, register } = useAccount()
  const { replace } = useNav()
  const { notify } = useShop()
  const [mode, setMode] = useState(initialMode)
  const [notice, setNotice] = useState<string | null>(message ?? null)
  const [busy, setBusy] = useState(false)

  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)

  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', confirm: '', terms: false })
  const [address, setAddress] = useState<Address>(emptyAddress)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({})

  const finish = (firstName: string) => {
    notify(`¡Hola, ${firstName}!`)
    replace(then ?? { name: 'account' })
  }

  const switchMode = (next: 'login' | 'register', message: string | null = null) => {
    setMode(next)
    setNotice(message)
    setErrors({})
    setLoginError(null)
  }

  const submitLogin = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    const result = await login(email, password)
    setBusy(false)
    if (result === 'not-registered') {
      switchMode('register', 'No encontramos una cuenta con ese email. Regístrate para continuar.')
    } else if (result === 'wrong-password') {
      setLoginError('La contraseña no es correcta')
    } else {
      finish(result.firstName)
    }
  }

  const submitRegister = async (e: FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!form.firstName.trim()) next.firstName = 'Indica tu nombre'
    if (!form.lastName.trim()) next.lastName = 'Indica tus apellidos'
    if (!isEmail(email)) next.email = 'Email no válido'
    if (!isPanamaPhone(form.phone)) next.phone = 'Teléfono de Panamá no válido (p. ej. 6123-4567)'
    if (password.length < 6) next.password = 'Mínimo 6 caracteres'
    if (form.confirm !== password) next.confirm = 'Las contraseñas no coinciden'
    if (!form.terms) next.terms = 'Debes aceptar las condiciones'
    const addrErrors = validateAddress(address)
    setErrors(next)
    setAddressErrors(addrErrors)
    if (Object.keys(next).length || Object.keys(addrErrors).length) return

    setBusy(true)
    const result = await register({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email,
      phone: form.phone.replace(/\D/g, ''),
      password,
      address,
    })
    setBusy(false)
    if (result === 'exists') switchMode('login', 'Ya existe una cuenta con ese email. Inicia sesión.')
    else finish(form.firstName.trim())
  }

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-4 grid grid-cols-2 rounded-full bg-slate-100 p-1 text-sm font-medium">
        {(['login', 'register'] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`rounded-full py-2 transition ${mode === m ? 'bg-white shadow-soft' : 'text-muted'}`}
          >
            {m === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        ))}
      </div>

      {notice && <p className="mb-4 rounded-xl bg-sage/15 px-4 py-3 text-sm text-ink">{notice}</p>}

      {mode === 'login' ? (
        <Card>
          <form onSubmit={submitLogin} className="space-y-3">
            <Field label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Field
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={loginError ?? undefined}
              required
            />
            <PrimaryButton disabled={busy}>Iniciar sesión</PrimaryButton>
          </form>
          <p className="mt-3 text-center text-xs text-muted">
            ¿Aún no tienes cuenta?{' '}
            <button onClick={() => switchMode('register')} className="font-medium text-ink underline">
              Regístrate
            </button>
          </p>
        </Card>
      ) : (
        <form onSubmit={submitRegister} noValidate className="space-y-4">
          <Card>
            <h3 className="mb-3 text-sm font-semibold">Tus datos</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nombre" autoComplete="given-name" value={form.firstName} onChange={set('firstName')} error={errors.firstName} />
              <Field label="Apellidos" autoComplete="family-name" value={form.lastName} onChange={set('lastName')} error={errors.lastName} />
              <Field label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
              <Field
                label="Teléfono (+507)"
                type="tel"
                inputMode="numeric"
                placeholder="6123-4567"
                value={form.phone}
                onChange={set('phone')}
                error={errors.phone}
              />
              <Field
                label="Contraseña"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                hint="Mínimo 6 caracteres"
              />
              <Field label="Repite la contraseña" type="password" autoComplete="new-password" value={form.confirm} onChange={set('confirm')} error={errors.confirm} />
            </div>
          </Card>

          <Card>
            <h3 className="mb-3 text-sm font-semibold">Dirección de envío</h3>
            <AddressFields value={address} onChange={setAddress} errors={addressErrors} />
          </Card>

          <label className="flex items-start gap-2 px-1 text-xs text-muted">
            <input type="checkbox" checked={form.terms} onChange={set('terms')} className="mt-0.5 accent-[#8f8a68]" />
            <span>
              Acepto las condiciones de uso y la política de privacidad de mo&amp;ju.
              {errors.terms && <span className="block text-red-600">{errors.terms}</span>}
            </span>
          </label>

          <PrimaryButton disabled={busy}>Crear cuenta</PrimaryButton>
          <p className="text-center text-[11px] text-muted">Prototipo: los datos se guardan solo en este dispositivo.</p>
        </form>
      )}
    </div>
  )
}

export default AuthScreen
