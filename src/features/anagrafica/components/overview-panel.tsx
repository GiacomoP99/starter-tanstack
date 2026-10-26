import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Highlighted top panel of the dashboard: page title + columns. */
export function OverviewPanel({
  title,
  children,
}: {
  title: ReactNode
  children: ReactNode
}) {
  return (
    <section
      aria-labelledby="overview-title"
      className="rounded-lg bg-hero px-4 pt-4 pb-5 text-hero-foreground"
    >
      <h1 id="overview-title" className="text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <div className="mt-3 grid gap-6 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-white/15">
        {children}
      </div>
    </section>
  )
}

export function OverviewColumn({
  title,
  children,
  className,
}: {
  title: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn('min-w-0 lg:px-4 lg:first:pl-0 lg:last:pr-0', className)}
    >
      <h2 className="border-b border-white/15 pt-2 pb-3 text-sm font-semibold">
        {title}
      </h2>
      <div className="pt-3">{children}</div>
    </section>
  )
}
