import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// On GitHub Pages the site is served from https://<org>.github.io/astrobit/,
// so the CI build needs the sub-path base. Local dev / preview stay at "/".
const base = process.env.GITHUB_ACTIONS ? '/astrobit/' : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  server: process.env.PORT
    ? { port: Number(process.env.PORT), strictPort: true }
    : undefined,
  plugins: [
    react(),
    tailwindcss(),
    // GitHub Pages has no SPA fallback — serve index.html for unknown paths so
    // deep links (e.g. /astrobit/users) still boot the app and let the router
    // take over.
    {
      name: 'spa-404-fallback',
      closeBundle() {
        const index = resolve('dist/index.html')
        if (existsSync(index)) copyFileSync(index, resolve('dist/404.html'))
      },
    },
  ],
})
