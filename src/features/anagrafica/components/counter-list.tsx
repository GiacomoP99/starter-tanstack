import { TextLink } from '@/components/common/links'
import type { CounterLink } from '../types'

export function CounterList({ items }: { items: CounterLink[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between gap-3 text-xs"
        >
          <TextLink
            to="/anagrafica/$section"
            params={{ section: item.section }}
            search={item.filter ? { filter: item.filter } : {}}
          >
            {item.label}
          </TextLink>
          {item.count != null && (
            <span className="tabular-nums text-muted-foreground">
              {item.count}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
