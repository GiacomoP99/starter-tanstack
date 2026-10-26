import { Link } from '@tanstack/react-router'
import type { AttentionItem } from '@/api/generated/model'
import { m } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { formatAttentionDue } from '../utils/attention'

export function AttentionList({
  items,
  className,
}: {
  items: AttentionItem[]
  className?: string
}) {
  if (items.length === 0) {
    return (
      <p className="text-sm opacity-80">{m.anagrafica_attention_empty()}</p>
    )
  }

  return (
    <ul className={cn('divide-y divide-current/15', className)}>
      {items.map((item) => {
        const due = formatAttentionDue(item)
        return (
          <li key={item.id} className="flex items-center gap-3 py-2.5 text-sm">
            <p
              className={cn(
                'min-w-0 flex-1 truncate',
                item.priority === 'HIGH' && 'font-semibold',
              )}
            >
              {item.title} · {item.subject}
            </p>
            {due && (
              <span className="shrink-0 text-xs font-semibold opacity-80">
                {due}
              </span>
            )}
            <Link
              to="/anagrafica/$section"
              params={{ section: item.target.section }}
              search={{ q: item.target.id }}
              aria-label={`${m.common_open()}: ${item.subject}`}
              className="shrink-0 text-xs font-semibold underline-offset-4 hover:underline"
            >
              {m.common_open()}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
