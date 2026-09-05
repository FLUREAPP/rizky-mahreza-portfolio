import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'rizkymahreza.online',
      'www.rizkymahreza.online',
      'portfolio-rizky-mahreza.phc6qe5r34hry.ap-southeast-1.cs.amazonlightsail.com',
    ],
  },
})
