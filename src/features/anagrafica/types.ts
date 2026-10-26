import type { AnagraficaSection } from '@/api/generated/model'

/** One "label … count" row inside an entity panel. */
export interface CounterLink {
  id: string
  label: string
  count?: number
  section: AnagraficaSection
  /** Pre-applied list filter on the target section. */
  filter?: string
}
