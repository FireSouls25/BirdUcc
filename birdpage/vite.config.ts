import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['0ed9-2800-484-a38b-a200-3118-9219-3ef3-733d.ngrok-free.app'],
  },
})
