import { defineConfig } from 'vitest/config'
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'), // або './src', якщо структура така
      '#app': path.resolve(__dirname, 'test/__mocks__/nuxtApp.ts'), // 👈 файл-мок useFetch
    },
  },
});
