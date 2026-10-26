import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { type ReactNode, Suspense } from 'react'
import { ErrorBoundary } from './error-boundary'
import { ErrorState } from './error-state'

interface QueryBoundaryProps {
  children: ReactNode
  /** Shown while the container's suspense query loads. */
  fallback: ReactNode
  /** Custom error UI; defaults to a message + retry button. */
  errorFallback?: (retry: () => void) => ReactNode
}

/**
 * Wrap every data container in one of these. A failing or loading section
 * then affects only itself, never the whole page. "Retry" refetches.
 */
export function QueryBoundary({
  children,
  fallback,
  errorFallback,
}: QueryBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallback={({ reset: retry }) =>
            errorFallback ? (
              errorFallback(retry)
            ) : (
              <ErrorState onRetry={retry} />
            )
          }
        >
          <Suspense fallback={fallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
