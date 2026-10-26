import { ArrowRight } from 'lucide-react'
import { useId, useRef } from 'react'
import { m } from '@/lib/i18n'

interface QuickOpenFieldProps {
  /** Accessible name and placeholder, e.g. "Apri per Id o codice fiscale…" */
  label: string
  onOpen: (value: string) => void
}

/** One-line "type an id and go" field. Ignores empty input. */
export function QuickOpenField({ label, onOpen }: QuickOpenFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()

  return (
    <form
      className="relative"
      onSubmit={(e) => {
        e.preventDefault()
        const value = inputRef.current?.value.trim()
        if (value) onOpen(value)
      }}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        placeholder={label}
        autoComplete="off"
        className="h-9 w-full rounded-md border border-input bg-transparent pr-10 pl-3 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
      />
      <button
        type="submit"
        aria-label={m.common_go()}
        className="absolute top-1/2 right-1 flex size-7 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <ArrowRight className="size-3.5" />
      </button>
    </form>
  )
}
