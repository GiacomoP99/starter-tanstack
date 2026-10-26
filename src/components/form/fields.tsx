import { useStore } from '@tanstack/react-form'
import type { ComponentProps, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { m } from '@/lib/i18n'
import { useFieldContext, useFormContext } from './form-context'

interface BaseFieldProps {
  label: ReactNode
  description?: ReactNode
}

/** Errors are shown once the user has left the field or tried to submit. */
function useFieldErrors() {
  const field = useFieldContext<unknown>()
  const errors = useStore(field.store, (s) => s.meta.errors)
  const isTouched = useStore(field.store, (s) => s.meta.isTouched)
  const submitted = useStore(field.form.store, (s) => s.submissionAttempts > 0)
  return (isTouched || submitted) && errors.length > 0 ? errors : []
}

export function TextField({
  label,
  description,
  ...inputProps
}: BaseFieldProps &
  Omit<ComponentProps<typeof Input>, 'value' | 'onChange' | 'onBlur'>) {
  const field = useFieldContext<string>()
  const errors = useFieldErrors()
  const invalid = errors.length > 0

  return (
    <Field invalid={invalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={invalid}
        {...inputProps}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError errors={errors} />
    </Field>
  )
}

export function NumberField({
  label,
  description,
  ...inputProps
}: BaseFieldProps &
  Omit<
    ComponentProps<typeof Input>,
    'value' | 'onChange' | 'onBlur' | 'type'
  >) {
  const field = useFieldContext<number | undefined>()
  const errors = useFieldErrors()
  const invalid = errors.length > 0

  return (
    <Field invalid={invalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        type="number"
        inputMode="decimal"
        value={field.state.value ?? ''}
        onChange={(e) =>
          field.handleChange(
            Number.isNaN(e.target.valueAsNumber)
              ? undefined
              : e.target.valueAsNumber,
          )
        }
        onBlur={field.handleBlur}
        aria-invalid={invalid}
        {...inputProps}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError errors={errors} />
    </Field>
  )
}

export function SubmitButton({
  children,
  ...props
}: ComponentProps<typeof Button>) {
  const form = useFormContext()
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting)

  return (
    <Button type="submit" disabled={isSubmitting} {...props}>
      {isSubmitting ? m.common_saving() : children}
    </Button>
  )
}
