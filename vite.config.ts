import { fileURLToPath, URL } from 'node:url'
/* import { VitePWA } from 'vite-plugin-pwa' */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "etc",
  plugins: [
    vue({
      template: {
        compilerOptions: {
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})