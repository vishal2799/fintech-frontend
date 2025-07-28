import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),    tailwindcss(),
],
server: {
    host: true, // 👈 allows all hosts, including subdomains like wl1.localhost
  // host: '0.0.0.0',  // or true
    port: 5173,
  }
})
