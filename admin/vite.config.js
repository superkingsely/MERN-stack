import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
// vid 7:28:20
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server:{port:5174}
})
