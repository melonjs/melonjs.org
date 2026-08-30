import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
    site: 'https://melonjs.org',
    trailingSlash: 'always',
    prefetch: true,
    // Astro 7 defaults compressHTML to 'jsx', which strips whitespace between
    // inline elements and drops meaningful spaces (e.g. "with the <a>Tiled</a>
    // map editor"). Keep the HTML-aware compression Astro 6 used.
    compressHTML: true,
    integrations: [mdx(), sitemap()],
})
