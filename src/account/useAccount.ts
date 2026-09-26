import { createContext, useContext } from 'react'
import type { Address, Order, OrderLine, PaymentMethod, User } from './types'

export type RegisterData = Omit<User, 'passwordHash' | 'createdAt'> & { password: string }

export type LoginResult = User | 'not-registered' | 'wrong-password'

export type NewOrder = {
  lines: OrderLine[]
  payment: { method: PaymentMethod; detail: string }
  address: Address
  recipient: string
  phone: string
}

export type Account = {
  user: User | null
  register: (data: RegisterData) => Promise<'ok' | 'exists'>
  login: (email: string, password: string) => Promise<LoginResult>
  logout: () => void
  updateUser: (changes: Partial<Omit<User, 'email' | 'passwordHash' | 'createdAt'>>) => void
  orders: Order[]
  placeOrder: (order: NewOrder) => Order
  cancelOrder: (id: string) => void
}

export const AccountContext = createContext<Account | null>(null)

export function useAccount() {
  const account = useContext(AccountContext)
  if (!account) throw new Error('useAccount debe usarse dentro de <AccountProvider>')
  return account
}
