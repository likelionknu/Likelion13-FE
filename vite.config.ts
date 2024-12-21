import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000, // default: 5173
    strictPort: true, // 만약 포트가 사용중이면 다음포트 사용
  },
})
