# melonJS.org

This is the website for [melon.js](https://melonjs.org/). To see how to edit it, please see [Astro](https://astro.build). Pages and components are built using HTML templates (ending in `.astro`), allowing us to split our website up into different parts. The Astro framework also supports the use of `.scss` and many other handy libraries if necessary.

## How to run the site

To run the website in development mode:

    npm run dev

To publish a new version of the site:

    npm run build
    git add .
    git commit -m "Deploy my new feature!"
    git push

To make the source code look pretty (and enforce consistent styling):

    npm run pretty
    git add .
    git commit -m "make the source code prettier"
    git push

## Directory Layout

| Directory        | Purpose                                                                             |
| :--------------- | :---------------------------------------------------------------------------------- |
| /public/         | Static Assets                                                                       |
| /src/pages/      | Pages (routing based on file path, we can also put MD files in here!)               |
| /src/components/ | Components (little HTML pieces we can re-use across the site, like the site header) |
| /src/layout/     | Re-usable layouts we can use on any page we want.                                   |
| /src/styles/     | Where all of the styles are stored (except inline ones)                             |

***

![melonJS](http://melonjs.org/media/alex4-github.png)

Copyright (C) 2011 - 2022, AltByte Pte Ltd

[melonJS](http://melonjs.org/) is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)
