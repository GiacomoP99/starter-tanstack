import { useCurrentUser } from '@/lib/session'
import { cn } from '@/lib/utils'

export function UserCard({ collapsed }: { collapsed: boolean }) {
  const user = useCurrentUser()

  return (
    <div
      className={cn(
        'flex items-center gap-3 border-t border-sidebar-border p-4',
        collapsed && 'justify-center px-2',
      )}
    >
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-foreground"
      >
        {user.initials}
      </span>
      <div className={cn('min-w-0', collapsed && 'sr-only')}>
        <p className="truncate text-sm font-medium text-foreground">
          {user.fullName}
        </p>
        <p className="truncate text-xs text-sidebar-foreground">{user.role}</p>
      </div>
    </div>
  )
}
