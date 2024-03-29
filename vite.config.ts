import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    vue(),
    Components({ dts: true }),
    AutoImport({
      include: [
        /\.[tj]s$/, // .ts, .js,
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: ['./src/composables/**', './src/stores/**'],
      dts: true,
      eslintrc: {
        enabled: true, // <-- this
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
