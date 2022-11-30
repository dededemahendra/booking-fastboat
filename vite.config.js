import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": "http://msib.dcamelfastferry.com/api.php",
      "/edge-func/": {
        target: "https://pikiofmcevitafcfjrpq.functions.supabase.co/",
        changeOrigin: true,
        rewrite: path=> {
          return path.split("/").splice(2).join("/")
        }
      }
    }
  }
})
