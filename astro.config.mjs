// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import commonjs from 'vite-plugin-commonjs';

import vercel from '@astrojs/vercel';

export default defineConfig({
  trailingSlash: 'ignore',
  output: 'server',

  security: {
    checkOrigin: true
  },

  vite: {
    plugins: [commonjs()],
  },

  integrations: [vue(), tailwind(), react() ],
  adapter: vercel({isr: true}),
});