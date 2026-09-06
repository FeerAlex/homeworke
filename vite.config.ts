import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mockApi } from './mocks/api.ts'

export default defineConfig({
  plugins: [react(), mockApi()],
  server: {
    port: 8000,
    open: false,
  },
  preview: {
    port: 8000,
  },
})
