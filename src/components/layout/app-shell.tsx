import type { ReactNode } from 'react'
import { usePersistedState } from '@/hooks/use-persisted-state'
import { AppHeader } from './app-header'
import { AppSidebar } from './app-sidebar'

/** Sidebar + header + scrollable content. Used once, by the root route. */
export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = usePersistedState(
    'sipca.sidebar.collapsed',
    false,
  )

  return (
    <div className="flex h-svh overflow-hidden bg-background text-foreground">
      <AppSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="px-8 py-5">{children}</div>
        </main>
      </div>
    </div>
  )
}
