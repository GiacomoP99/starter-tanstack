import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import type { AnagraficaSection } from '@/api/generated/model'

/** Navigate to a section, optionally searching for an id / tax code. */
export function useOpenSection() {
  const navigate = useNavigate()
  return useCallback(
    (section: AnagraficaSection, q?: string) =>
      navigate({
        to: '/anagrafica/$section',
        params: { section },
        search: { q },
      }),
    [navigate],
  )
}
