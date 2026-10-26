import { useEffect, useRef } from 'react'

/**
 * Run `handler` on a keyboard shortcut, e.g. `useHotkey('k', focus, { mod: true })`
 * for Ctrl+K (Cmd+K on macOS).
 */
export function useHotkey(
  key: string,
  handler: (event: KeyboardEvent) => void,
  { mod = false }: { mod?: boolean } = {},
) {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== key.toLowerCase()) return
      if (mod && !(event.ctrlKey || event.metaKey)) return
      event.preventDefault()
      handlerRef.current(event)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [key, mod])
}
