import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base path for GitHub Pages deployment
  // Change to '/repository-name/' if deploying under a GitHub repo
  // For custom domain or Vercel, this should be '/'
  base: '/',
  build: {
    // Generate sourcemaps for production debugging (optional)
    sourcemap: false,
    // Chunk size warning limit
    chunkSizeWarningLimit: 600,
  },
})

