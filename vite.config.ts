import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
    proxy: {
      "/api": {
        target: "https://localhost:7002/",
        changeOrigin: true,
        secure: true, // Set to true if using HTTPS
      },
    },
  },
  base: '/simple-project/',
})
