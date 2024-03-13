import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/videotube/'
  // base: 'https://4ng13-60rd1770.github.io/videotube/'
})
