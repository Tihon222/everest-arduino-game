// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // При build (npm run build) — подпапка GitHub Pages
  // При dev (npm run dev) — корень
  base: command === 'build' ? '/everest-arduino-game/' : '/',
  build: {
    rollupOptions: {
      output: {
        // Хэширование имён файлов — браузер всегда загружает свежие
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    // Отключаем кэш в dev-режиме
    headers: {
      'Cache-Control': 'no-store',
    },
  },
}))