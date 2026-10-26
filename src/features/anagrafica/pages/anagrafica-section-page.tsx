import { getRouteApi } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { TextLink } from '@/components/common/links'
import { m } from '@/lib/i18n'
import { sectionTitles } from '../utils/sections'

// Typed access to the route's params/search without importing the route file.
const route = getRouteApi('/anagrafica/$section')

/** Placeholder for each Anagrafica section until its real page is built. */
export function AnagraficaSectionPage() {
  const { section } = route.useParams()
  const { q, filter } = route.useSearch()

  return (
    <div className="space-y-4">
      <TextLink
        to="/anagrafica"
        className="inline-flex items-center gap-1 text-sm"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        {m.section_page_back()}
      </TextLink>
      <h1 className="text-2xl font-semibold tracking-tight">
        {sectionTitles[section]()}
      </h1>
      <p className="text-muted-foreground">{m.section_page_description()}</p>
      {q && <p>{m.section_page_query({ q })}</p>}
      {filter && <p>{m.section_page_filter({ filter })}</p>}
    </div>
  )
}
