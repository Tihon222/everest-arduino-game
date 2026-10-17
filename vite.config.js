import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // При build (npm run build) — подпапка GitHub Pages
  // При dev (npm run dev) — корень
  base: command === 'build' ? '/everest-arduino-game/' : '/',
}))