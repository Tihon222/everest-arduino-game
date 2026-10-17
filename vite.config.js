import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // На GitHub Pages используем base, локально — нет
  base: process.env.NODE_ENV === 'production' ? '/everest-arduino-game/' : '/',
})