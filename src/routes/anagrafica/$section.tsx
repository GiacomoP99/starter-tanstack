import { createFileRoute, notFound } from '@tanstack/react-router'
import { z } from 'zod'
import {
  AnagraficaSectionPage,
  isAnagraficaSection,
  sectionTitles,
} from '@/features/anagrafica'

// Typed, validated query string: /anagrafica/contraenti?q=C-10231&filter=bloccate
const searchSchema = z.object({
  q: z.string().optional(),
  filter: z.string().optional(),
})

export const Route = createFileRoute('/anagrafica/$section')({
  params: {
    parse: ({ section }) => {
      if (!isAnagraficaSection(section)) throw notFound()
      return { section }
    },
    stringify: ({ section }) => ({ section }),
  },
  validateSearch: searchSchema,
  staticData: {
    title: ({ section }) =>
      section && isAnagraficaSection(section) ? sectionTitles[section]() : '',
  },
  component: AnagraficaSectionPage,
})
