import { Link } from '@tanstack/react-router'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import {
  exampleNavigation,
  mainNavigation,
  type NavItem,
} from '@/config/navigation'
import { m } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { UserCard } from './user-card'

interface AppSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const toggleLabel = collapsed ? m.sidebar_expand() : m.sidebar_collapse()
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose

  return (
    <aside
      data-collapsed={collapsed || undefined}
      className={cn(
        'flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width]',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {m.app_brand()}
          </span>
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-label={toggleLabel}
          title={toggleLabel}
          className="rounded-md p-1 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <ToggleIcon className="size-4" />
        </button>
      </div>

      <nav
        aria-label={m.nav_main_label()}
        className="flex-1 space-y-6 overflow-y-auto p-2 pt-4"
      >
        <NavList items={mainNavigation} collapsed={collapsed} />
        <div>
          {!collapsed && (
            <p className="px-3 pb-1 text-[11px] font-semibold tracking-wide text-sidebar-foreground/60 uppercase">
              {m.nav_examples()}
            </p>
          )}
          <NavList items={exampleNavigation} collapsed={collapsed} />
        </div>
      </nav>

      <UserCard collapsed={collapsed} />
    </aside>
  )
}

function NavList({
  items,
  collapsed,
}: {
  items: NavItem[]
  collapsed: boolean
}) {
  return (
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li key={item.id}>
          <NavEntry item={item} collapsed={collapsed} />
        </li>
      ))}
    </ul>
  )
}

const entryClass =
  'flex h-8 items-center gap-3 rounded-md px-3 text-sm transition-colors'

function NavEntry({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const Icon = item.icon
  const label = item.label()
  const content = (
    <>
      <Icon className="size-4 shrink-0" aria-hidden />
      <span className={cn(collapsed && 'sr-only')}>{label}</span>
    </>
  )

  if (!item.to) {
    return (
      <span
        aria-disabled="true"
        title={m.nav_coming_soon()}
        className={cn(
          entryClass,
          'cursor-not-allowed text-sidebar-foreground/60',
        )}
      >
        {content}
      </span>
    )
  }

  return (
    <Link
      to={item.to}
      activeOptions={{ exact: item.exact ?? false }}
      title={collapsed ? label : undefined}
      className={cn(
        entryClass,
        'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'data-[status=active]:bg-sidebar-primary data-[status=active]:font-medium data-[status=active]:text-sidebar-primary-foreground',
      )}
    >
      {content}
    </Link>
  )
}
