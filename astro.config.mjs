// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  trailingSlash: 'ignore',
  output: 'server',
  vite: {
    server: {
      hmr: true
    }
  },
  security: {
    checkOrigin: true
  },
  integrations: [vue(), tailwind(), react() ]
});