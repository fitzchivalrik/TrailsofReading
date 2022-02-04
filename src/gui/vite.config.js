import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import svelteConfig from './svelte.config.js'
import { VitePWA } from 'vite-plugin-pwa'
import { pwaConfiguration } from './pwa-configuration.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(svelteConfig),
    VitePWA(pwaConfiguration)
  ],
  // build: {
  //   rollupOptions: {
  //     maxParallelFileReads: 1
  //   }
  // }
})
