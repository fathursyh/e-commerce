// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

export default defineConfig({
  trailingSlash: 'ignore',
  output: 'server',

  security: {
    checkOrigin: true
  },

  integrations: [vue(), tailwind(), react() ],
  adapter: netlify({
    imageCDN: true,
    edgeMiddleware: true
  }),
});