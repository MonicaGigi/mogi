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
      <div className="mb-4 rounded-full bg-sage/15 p-4">
        <Icon className="size-8 text-sage-dark" strokeWidth={1.5} />
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 max-w-xs text-sm text-muted">{text}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-white transition active:scale-95 active:bg-sage-dark"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export default EmptyState
