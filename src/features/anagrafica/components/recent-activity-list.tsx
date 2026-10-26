import { Link } from '@tanstack/react-router'
import type { RecentActivityItem } from '@/api/generated/model'
import { formatRelativeTime } from '@/lib/format'
import { m } from '@/lib/i18n'
import { entityKindLabels, entityKindSection } from '../utils/labels'

export function RecentActivityList({ items }: { items: RecentActivityItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm opacity-80">{m.anagrafica_resume_empty()}</p>
  }

  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={`${item.kind}-${item.id}`}>
          <Link
            to="/anagrafica/$section"
            params={{ section: entityKindSection[item.kind] }}
            search={{ q: item.id }}
            className="flex items-baseline gap-2 rounded px-1 py-1.5 -mx-1 text-sm hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <span className="shrink-0 text-[11px] font-semibold tracking-wider uppercase opacity-80">
              {entityKindLabels[item.kind]()}
            </span>
            <span className="min-w-0 flex-1 truncate">
              {item.label}
              {item.version != null && (
                <> · {m.entity_version({ version: item.version })}</>
              )}
            </span>
            <time
              dateTime={item.updatedAt}
              className="shrink-0 text-xs opacity-80"
            >
              {formatRelativeTime(item.updatedAt)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  )
}
