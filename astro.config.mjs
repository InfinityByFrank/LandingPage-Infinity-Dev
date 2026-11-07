// @ts-check
import { defineConfig, sessionDrivers } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://infinitydev.agency',
  trailingSlash: 'always',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },

  // El sitio no usa sesiones: un driver en memoria evita que el adaptador pida un KV namespace
  session: {
    driver: sessionDrivers.memory()
  },

  adapter: cloudflare()
});