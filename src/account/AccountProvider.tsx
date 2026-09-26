import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { load, save } from '../storage'
import { shippingFor, type Order, type User } from './types'
import { AccountContext, type Account, type NewOrder, type RegisterData } from './useAccount'

const USERS_KEY = 'moju.users'
const SESSION_KEY = 'moju.session'
const ordersKey = (email: string) => `moju.orders.${email}`

const normalize = (email: string) => email.trim().toLowerCase()

// Solo para no guardar la contraseña en claro en el prototipo; no es seguridad real.
async function hash(password: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

const newOrderId = () => `MJ-${Date.now().toString(36).toUpperCase().slice(-6)}`

export function AccountProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState(() => load<Record<string, User>>(USERS_KEY, {}))
  const [session, setSession] = useState(() => load<string | null>(SESSION_KEY, null))
  const [orders, setOrders] = useState<Order[]>(() => (session ? load<Order[]>(ordersKey(session), []) : []))

  const user = session ? (users[session] ?? null) : null

  useEffect(() => save(USERS_KEY, users), [users])
  useEffect(() => save(SESSION_KEY, session), [session])
  useEffect(() => {
    if (session) save(ordersKey(session), orders)
  }, [session, orders])

  const startSession = useCallback((email: string) => {
    setSession(email)
    setOrders(load<Order[]>(ordersKey(email), []))
  }, [])

  const register = useCallback(
    async ({ password, ...data }: RegisterData) => {
      const email = normalize(data.email)
      if (users[email]) return 'exists' as const
      const newUser: User = { ...data, email, passwordHash: await hash(password), createdAt: new Date().toISOString() }
      setUsers((prev) => ({ ...prev, [email]: newUser }))
      startSession(email)
      return 'ok' as const
    },
    [users, startSession],
  )

  const login = useCallback(
    async (rawEmail: string, password: string) => {
      const email = normalize(rawEmail)
      const found = users[email]
      if (!found) return 'not-registered' as const
      if (found.passwordHash !== (await hash(password))) return 'wrong-password' as const
      startSession(email)
      return found
    },
    [users, startSession],
  )

  const logout = useCallback(() => {
    setSession(null)
    setOrders([])
  }, [])

  const updateUser = useCallback<Account['updateUser']>(
    (changes) => {
      if (!session) return
      setUsers((prev) => ({ ...prev, [session]: { ...prev[session], ...changes } }))
    },
    [session],
  )

  const placeOrder = useCallback((data: NewOrder) => {
    const subtotal = data.lines.reduce((sum, line) => sum + line.price * line.qty, 0)
    const shipping = shippingFor(subtotal)
    const order: Order = {
      ...data,
      id: newOrderId(),
      createdAt: new Date().toISOString(),
      subtotal,
      shipping,
      total: subtotal + shipping,
    }
    setOrders((prev) => [order, ...prev])
    return order
  }, [])

  const cancelOrder = useCallback((id: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, cancelledAt: new Date().toISOString() } : o)))
  }, [])

  const value = useMemo<Account>(
    () => ({ user, register, login, logout, updateUser, orders, placeOrder, cancelOrder }),
    [user, register, login, logout, updateUser, orders, placeOrder, cancelOrder],
  )

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}
