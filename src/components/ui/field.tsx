import type * as React from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn('flex w-full flex-col gap-6', className)}
      {...props}
    />
  )
}

function Field({
  className,
  invalid,
  ...props
}: React.ComponentProps<'div'> & { invalid?: boolean }) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: layout wrapper, matches shadcn Field
    <div
      role="group"
      data-slot="field"
      data-invalid={invalid || undefined}
      className={cn(
        'group/field flex w-full flex-col gap-2 data-[invalid=true]:text-destructive',
        className,
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'group-data-[invalid=true]/field:text-destructive',
        className,
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function FieldError({
  className,
  errors,
  ...props
}: React.ComponentProps<'div'> & {
  errors?: ReadonlyArray<{ message?: string } | string | undefined>
}) {
  const messages = [
    ...new Set(
      (errors ?? [])
        .map((e) => (typeof e === 'string' ? e : e?.message))
        .filter((m): m is string => Boolean(m)),
    ),
  ]
  if (messages.length === 0) return null

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {messages.length === 1 ? (
        messages[0]
      ) : (
        <ul className="ml-4 list-disc">
          {messages.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { Field, FieldDescription, FieldError, FieldGroup, FieldLabel }
