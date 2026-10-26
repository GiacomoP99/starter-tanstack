import { AppBreadcrumbs } from './app-breadcrumbs'
import { GlobalSearch } from './global-search'
import { LocaleSwitcher } from './locale-switcher'

export function AppHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b px-8">
      <AppBreadcrumbs />
      <div className="ml-auto flex min-w-0 items-center gap-4">
        <GlobalSearch />
        <LocaleSwitcher />
      </div>
    </header>
  )
}
