import { fileURLToPath, URL } from 'node:url'
/* import { VitePWA } from 'vite-plugin-pwa' */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "etc",
  plugins: [
    /*
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'SyncRecorder',
        short_name: 'SyncRecorder',
        theme_color: '#D4D4D4',
        icons: [
          {
            src: '/syncrecorder-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/syncrecorder.svg',
            sizes: '150x150',
            type: 'image/svg',
            purpose: 'any'
          }
        ],
        display_override: ['window-controls-overlay']
      },
    }),*/
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