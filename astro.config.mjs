import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://connectologyia.pages.dev',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [react(), sitemap({
    filter: (page) => !new URL(page).pathname.startsWith('/404'),
    serialize: (item) => ({ ...item, url: new URL(item.url).href }),
  })],
  vite: {
    plugins: [tailwindcss()],
  },
});
