import { StarIcon } from './Icons'

export interface ToastItem {
  id: string
  message: string
  tone?: 'default' | 'gold'
}

export function ToastStack({ items }: { items: ToastItem[] }) {
  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="false">
      {items.map((item) => (
        <div key={item.id} className={`toast ${item.tone === 'gold' ? 'toast--gold' : ''}`}>
          <StarIcon size={14} />
          <span>{item.message}</span>
        </div>
      ))}
    </div>
  )
}
