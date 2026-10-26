/**
 * Public API of the Anagrafica feature. Routes and other features import
 * from here only – never from internal folders.
 */
export { prefetchAnagraficaDashboard } from './api/queries'
export { AnagraficaDashboardPage } from './pages/anagrafica-dashboard-page'
export { AnagraficaSectionPage } from './pages/anagrafica-section-page'
export { isAnagraficaSection, sectionTitles } from './utils/sections'
