import { createFormHook } from '@tanstack/react-form'
import { NumberField, SubmitButton, TextField } from './fields'
import { fieldContext, formContext } from './form-context'

/**
 * App-wide form hook. Add reusable field components here once and every
 * form gets them typed: <form.AppField name="x">{(f) => <f.TextField … />}</form.AppField>
 */
export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, NumberField },
  formComponents: { SubmitButton },
})
