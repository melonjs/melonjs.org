# melonJS.org

This is the website for [melonJS](https://melonjs.org/). Built with [Astro](https://astro.build), using plain CSS and vanilla JavaScript.

## How to run the site

To run the website in development mode:

    npm run dev

To publish a new version of the site (automatically formats code with Prettier):

    npm run build
    git add .
    git commit -m "Deploy my new feature!"
    git push

## Directory Layout

| Directory        | Purpose                                                        |
| :--------------- | :------------------------------------------------------------- |
| /public/         | Static assets (images, etc.)                                   |
| /src/pages/      | Pages (file-based routing, supports `.md` and `.mdx`)          |
| /src/components/ | Reusable Astro components (header, carousel, icons)            |
| /src/layouts/    | Page layouts                                                   |
| /src/styles/     | Global stylesheets (plain CSS with native nesting & variables) |

***

## About melonJS

[melonJS](https://github.com/melonjs/melonJS) is licensed under the [MIT License](https://opensource.org/licenses/mit-license.php)

Copyright (C) AltByte Pte Ltd
