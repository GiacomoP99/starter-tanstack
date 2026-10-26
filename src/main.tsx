import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initI18n } from '@/lib/i18n'
import { queryClient } from '@/lib/query-client'
import { router } from '@/router'
import './index.css'

async function enableMocking() {
  // Mocks are on by default in dev; set VITE_ENABLE_MOCKS=false to hit the real BE.
  if (!import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCKS === 'false') {
    return
  }
  // Dynamic import keeps MSW and Faker out of the production bundle.
  const { worker } = await import('@/mocks/browser')
  await worker.start({ onUnhandledFrame: 'bypass' })
}

initI18n()

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element #root not found')

enableMocking().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  )
})
