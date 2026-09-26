import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNav } from '../nav'

const labelClass = 'block text-[10px] tracking-[0.12em] text-muted uppercase'
const controlClass = 'w-full border-0 border-b bg-transparent px-0 py-2 text-sm outline-none focus:border-ink'
const buttonText = 'text-[11px] font-medium tracking-[0.15em] uppercase'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  hint?: string
}

export function Field({ label, error, hint, className = '', ...input }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className={labelClass}>{label}</span>
      <input {...input} className={`${controlClass} ${error ? 'border-red-500' : 'border-neutral-300'}`} />
      {error ? (
        <span className="mt-1 block text-[11px] text-red-600">{error}</span>
      ) : (
        hint && <span className="mt-1 block text-[11px] text-muted">{hint}</span>
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
      <span className={labelClass}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${controlClass} ${error ? 'border-red-500' : 'border-neutral-300'}`}
      >
        {options.map((o) => (
          <option key={o} value={o} disabled={!o}>
            {o || placeholder}
          </option>
        ))}
      </select>
      {error && <span className="mt-1 block text-[11px] text-red-600">{error}</span>}
    </label>
  )
}

export function PrimaryButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`w-full bg-ink py-3.5 ${buttonText} text-white transition active:bg-neutral-700 disabled:opacity-40 ${className}`}
    />
  )
}

export function SecondaryButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`w-full border border-ink py-3.5 ${buttonText} transition active:bg-neutral-100 ${className}`}
    />
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`border border-neutral-200 bg-white p-5 sm:p-6 ${className}`}>{children}</section>
}

export function ScreenTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  const { back, canGoBack } = useNav()
  return (
    <div className="mb-8">
      {canGoBack && (
        <button onClick={back} className="mb-4 flex items-center gap-1.5 text-[11px] tracking-[0.12em] text-muted uppercase">
          <ArrowLeft className="size-3.5" strokeWidth={1.5} /> Volver
        </button>
      )}
      <h2 className="text-2xl">{title}</h2>
      {subtitle && <p className="mt-1 text-xs text-muted">{subtitle}</p>}
    </div>
  )
}
