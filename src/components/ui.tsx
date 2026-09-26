import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNav } from '../nav'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  hint?: string
}

export function Field({ label, error, hint, className = '', ...input }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      <input
        {...input}
        className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink ${
          error ? 'border-red-400' : 'border-slate-200'
        }`}
      />
      {error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : (
        hint && <span className="mt-1 block text-xs text-muted">{hint}</span>
      )}
    </label>
  )
}

type SelectProps = {
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
  error?: string
  placeholder?: string
}

export function Select({ label, value, options, onChange, error, placeholder }: SelectProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink ${
          error ? 'border-red-400' : 'border-slate-200'
        }`}
      >
        {options.map((o) => (
          <option key={o} value={o} disabled={!o}>
            {o || placeholder}
          </option>
        ))}
      </select>
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}

export function PrimaryButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`w-full rounded-full bg-sage py-3 text-sm font-semibold text-white transition active:scale-[0.98] active:bg-sage-dark disabled:opacity-50 ${className}`}
    />
  )
}

export function SecondaryButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`w-full rounded-full py-3 text-sm font-semibold ring-1 ring-slate-300 transition active:scale-[0.98] active:bg-slate-50 ${className}`}
    />
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-card bg-white p-4 shadow-soft ring-1 ring-slate-100 ${className}`}>{children}</section>
}

export function ScreenTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  const { back, canGoBack } = useNav()
  return (
    <div className="mb-4">
      {canGoBack && (
        <button onClick={back} className="mb-2 flex items-center gap-1 text-sm text-muted">
          <ArrowLeft className="size-4" /> Volver
        </button>
      )}
      <h2 className="text-lg font-semibold">{title}</h2>
      {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
    </div>
  )
}
