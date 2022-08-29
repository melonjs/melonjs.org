import { defineConfig } from 'astro/config'
import astroI18next from 'astro-i18next'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
// https://astro.build/config

export default defineConfig({
    experimental: {
        integrations: true,
    },
    site: 'https://melonjs.org',
    integrations: [sitemap(), mdx(), astroI18next()],
})
