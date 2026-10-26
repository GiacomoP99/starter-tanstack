import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Titled divider above a group of cards ("Soggetti e affidamento"). */
export function SectionHeader({
  title,
  id,
  className,
  children,
}: {
  title: ReactNode
  id?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cn('flex items-end justify-between border-b pb-3', className)}
    >
      <h2 id={id} className="text-base font-semibold">
        {title}
      </h2>
      {children}
    </div>
  )
}
