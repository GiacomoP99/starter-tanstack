import { useCallback, useState } from 'react'

/**
 * `useState` that survives reloads via localStorage. For small UI
 * preferences only (sidebar collapsed, last tab) – never for business data.
 */
export function usePersistedState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw === null ? initial : (JSON.parse(raw) as T)
    } catch {
      return initial
    }
  })

  const update = useCallback(
    (next: T) => {
      setValue(next)
      try {
        localStorage.setItem(key, JSON.stringify(next))
      } catch {
        // storage unavailable (private mode): keep in-memory value
      }
    },
    [key],
  )

  return [value, update] as const
}
