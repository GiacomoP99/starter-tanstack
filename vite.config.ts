import path from 'node:path'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.API_PROXY_TARGET
  const stripPrefix = env.API_PROXY_STRIP_PREFIX === 'true'

  return {
    plugins: [
      // Must come before react()
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      react(),
      tailwindcss(),
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/paraglide',
        // Saved choice → browser language → Italian.
        strategy: ['localStorage', 'preferredLanguage', 'baseLocale'],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: proxyTarget
      ? {
          proxy: {
            '/api': {
              target: proxyTarget,
              changeOrigin: true,
              rewrite: stripPrefix
                ? (p: string) => p.replace(/^\/api/, '')
                : undefined,
            },
          },
        }
      : undefined,
  }
})
