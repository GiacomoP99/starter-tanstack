import { AnagraficaSection } from '@/api/generated/model'
import { m } from '@/lib/i18n'

export type { AnagraficaSection }

/** Localised title of every Anagrafica section (cards, breadcrumbs, pages). */
export const sectionTitles: Record<AnagraficaSection, () => string> = {
  contraenti: m.section_contraenti,
  'schede-fido': m.section_schede_fido,
  'mandati-intermediari': m.section_mandati_intermediari,
  'operatori-direzione': m.section_operatori_direzione,
  'compagnie-assicurative': m.section_compagnie_assicurative,
  'sub-intermediari': m.section_sub_intermediari,
  notai: m.section_notai,
  'prestatori-servizi': m.section_prestatori_servizi,
  'report-dati-intermediari': m.section_report_dati_intermediari,
}

const sectionValues = new Set<string>(Object.values(AnagraficaSection))

export const isAnagraficaSection = (
  value: string,
): value is AnagraficaSection => sectionValues.has(value)
