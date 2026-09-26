import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  title: string
  text: string
  action?: { label: string; onClick: () => void }
}

function EmptyState({ icon: Icon, title, text, action }: Props) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <div className="mb-4 rounded-none bg-neutral-100 p-4">
        <Icon className="size-8 text-ink" strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl">{title}</h2>
      <p className="mt-1 max-w-xs text-sm text-muted">{text}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-8 bg-ink px-6 py-3 text-[11px] font-medium tracking-[0.15em] uppercase text-white transition active:bg-neutral-700"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export default EmptyState
