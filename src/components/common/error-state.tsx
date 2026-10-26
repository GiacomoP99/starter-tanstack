import { RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { m } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function ErrorState({
  onRetry,
  className,
}: {
  onRetry?: () => void
  className?: string
}) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-start gap-2 text-sm text-muted-foreground',
        className,
      )}
    >
      <p>{m.error_title()}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RotateCw />
          {m.error_retry()}
        </Button>
      )}
    </div>
  )
}
