import type {
  AnagraficaSection,
  AutomaticDiscardsJobsItem,
  ContraenteStatus,
  EntityKind,
} from '@/api/generated/model'
import { m } from '@/lib/i18n'

/**
 * API enums → UI. The backend sends stable codes; labels live in the
 * message files so they follow the user's language.
 */

export const contraenteStatusLabels: Record<ContraenteStatus, () => string> = {
  ATTIVO: m.status_attivo,
  NUOVA_REVISIONE: m.status_nuova_revisione,
  ANNULLATO: m.status_annullato,
  ATTIVO_TEMPORANEO: m.status_attivo_temporaneo,
  ATTIVO_TEMPORANEO_SCADUTO: m.status_attivo_temporaneo_scaduto,
}

export const entityKindLabels: Record<EntityKind, () => string> = {
  CONTRAENTE: m.entity_contraente,
  SCHEDA_FIDO: m.entity_scheda_fido,
  MANDATO: m.entity_mandato,
}

/** Where an entity of each kind is opened. */
export const entityKindSection: Record<EntityKind, AnagraficaSection> = {
  CONTRAENTE: 'contraenti',
  SCHEDA_FIDO: 'schede-fido',
  MANDATO: 'mandati-intermediari',
}

export const discardJobLabels: Record<AutomaticDiscardsJobsItem, () => string> =
  {
    REVISIONI_ANNULLATE: m.discards_job_revisioni_annullate,
    PROPOSTE_FIDO_ANNULLATE: m.discards_job_proposte_fido_annullate,
  }
