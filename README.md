# melonJS.org

This is the website for [melonJS](https://melonjs.org/). Built with [Astro](https://astro.build), using plain CSS and vanilla JavaScript.

## How to run the site

To run the website in development mode:

    npm run dev

To publish a new version of the site:

    npm run build
    git add .
    git commit -m "Deploy my new feature!"
    git push

`npm run build` formats `src/` with Prettier, then writes the static site to
`docs/`, which is what GitHub Pages serves from the `gh-pages` branch. The build
output is committed, so a deploy is whatever `docs/` contains at that commit.

## Directory Layout

| Directory        | Purpose                                                        |
| :--------------- | :------------------------------------------------------------- |
| /public/         | Files served as-is, at a stable URL (og:image, favicon)        |
| /src/assets/     | Images run through `astro:assets`: optimised and hashed        |
| /src/pages/      | Pages (file-based routing, supports `.md` and `.mdx`)          |
| /src/components/ | Reusable Astro components (header, carousel, icons)            |
| /src/layouts/    | Page layouts                                                   |
| /src/styles/     | Global stylesheets (plain CSS with native nesting & variables) |
| /src/svgs/       | SVGs inlined by `Icon.astro`                                   |
| /src/carousels/  | Data for the Developer Spotlight carousel                      |
| /docs/           | Build output, committed and published by GitHub Pages          |

***

## About melonJS

[melonJS](https://github.com/melonjs/melonJS) is licensed under the [MIT License](https://opensource.org/licenses/mit-license.php)

Copyright (C) AltByte Pte Ltd
