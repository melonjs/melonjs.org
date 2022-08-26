import { defineConfig } from 'astro/config'
import astroI18next from 'astro-i18next'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
    experimental: {
        integrations: true,
    },
    site: 'https://melonjs.org',
    integrations: [sitemap(), astroI18next()],
})
