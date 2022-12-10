import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": "http://msib.dcamelfastferry.com/api.php",
      "/payment-func": {
        target: "https://vwgvjupdwlzhodrsdhdn.functions.supabase.co/",
        changeOrigin: true,
      }
    }
  }
})
