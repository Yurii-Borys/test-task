// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  vite: {
    plugins: [tsconfigPaths()],
  }
});







