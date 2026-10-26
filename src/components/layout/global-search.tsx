import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useRef } from 'react'
import { useHotkey } from '@/hooks/use-hotkey'
import { m } from '@/lib/i18n'

/**
 * Header search. Ctrl/Cmd+K focuses it. For now it searches contraenti;
 * swap the navigation target once a global search endpoint exists.
 */
export function GlobalSearch() {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  useHotkey('k', () => inputRef.current?.focus(), { mod: true })

  return (
    <search className="w-80 min-w-0 shrink">
      <form
        className="relative"
        onSubmit={(e) => {
          e.preventDefault()
          const q = inputRef.current?.value.trim()
          if (!q) return
          void navigate({
            to: '/anagrafica/$section',
            params: { section: 'contraenti' },
            search: { q },
          })
        }}
      >
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={inputRef}
          type="search"
          aria-label={m.search_label()}
          placeholder={m.search_placeholder()}
          className="h-9 w-full rounded-md border border-input bg-transparent pr-16 pl-9 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
        />
        <kbd className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded border border-input bg-muted px-1.5 py-0.5 font-sans text-[10px] text-muted-foreground">
          Ctrl+K
        </kbd>
      </form>
    </search>
  )
}
