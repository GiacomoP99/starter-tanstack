import type { LinkProps } from '@tanstack/react-router'
import {
  Briefcase,
  Calculator,
  ChartColumn,
  ClipboardList,
  FileText,
  FlaskConical,
  type LucideIcon,
  Monitor,
  Scale,
  SlidersHorizontal,
  TriangleAlert,
  User,
  Wrench,
} from 'lucide-react'
import { m } from '@/lib/i18n'

export interface NavItem {
  id: string
  label: () => string
  icon: LucideIcon
  /** Omit while the area doesn't exist yet: the item renders disabled. */
  to?: LinkProps['to']
  /** Match the URL exactly (for "/") instead of by prefix. */
  exact?: boolean
}

/** Main sidebar. Add an area here once its route exists. */
export const mainNavigation: NavItem[] = [
  {
    id: 'scrivania',
    label: m.nav_scrivania,
    icon: Monitor,
    to: '/',
    exact: true,
  },
  { id: 'contratti', label: m.nav_contratti, icon: FileText },
  { id: 'portafoglio', label: m.nav_portafoglio, icon: Briefcase },
  { id: 'anagrafica', label: m.nav_anagrafica, icon: User, to: '/anagrafica' },
  { id: 'sinistri', label: m.nav_sinistri, icon: TriangleAlert },
  { id: 'contenzioso', label: m.nav_contenzioso, icon: Scale },
  { id: 'contabilita', label: m.nav_contabilita, icon: Calculator },
  { id: 'report', label: m.nav_report, icon: ChartColumn },
  {
    id: 'configurazione',
    label: m.nav_configurazione,
    icon: SlidersHorizontal,
  },
  { id: 'gestione', label: m.nav_gestione, icon: ClipboardList },
  { id: 'utilita', label: m.nav_utilita, icon: Wrench },
]

/** Reference implementations, kept for the team (not product features). */
export const exampleNavigation: NavItem[] = [
  { id: 'demo', label: m.nav_demo, icon: FlaskConical, to: '/demo' },
  {
    id: 'new-order',
    label: m.nav_new_order,
    icon: FlaskConical,
    to: '/orders/new',
  },
]
