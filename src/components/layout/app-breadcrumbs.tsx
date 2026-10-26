import { useMatches } from '@tanstack/react-router'
import { m } from '@/lib/i18n'

/** Product name + the `staticData.title` of every matched route. */
export function AppBreadcrumbs() {
  const crumbs = useMatches({
    select: (matches) =>
      matches.flatMap((match) => {
        const title = match.staticData.title
        return title
          ? [
              {
                id: match.id,
                label: title(match.params as Record<string, string>),
              },
            ]
          : []
      }),
  })

  return (
    <nav aria-label={m.breadcrumb_label()}>
      <ol className="flex items-center gap-3 text-sm font-semibold">
        <li>{m.app_product()}</li>
        {crumbs.map((crumb, index) => (
          <li key={crumb.id} className="flex items-center gap-3">
            <span aria-hidden className="text-muted-foreground/60">
              /
            </span>
            <span
              aria-current={index === crumbs.length - 1 ? 'page' : undefined}
            >
              {crumb.label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  )
}
