import { Skeleton } from '@/components/ui/skeleton'

/** Generic loading placeholder for list-like sections. */
export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-hidden>
      {Array.from({ length: rows }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder rows
        <Skeleton key={i} className="h-5 w-full bg-current/10" />
      ))}
    </div>
  )
}
