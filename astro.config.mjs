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
    markdown: {
        // Emit CSS custom properties instead of hard-coded token colours, so
        // code blocks are highlighted with the melonJS palette and sit on the
        // page's own surface. The variables live in src/styles/variables.css.
        shikiConfig: { theme: 'css-variables' },
    },
    integrations: [mdx(), sitemap()],
})
