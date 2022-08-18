---
layout: ../../layouts/MDLayout.astro
---
# Part 2: Creating a level using Tiled
*Note: Before starting, and if you are new to Tiled, we strongly encourage you to read this introduction here, that provides the basic on how to get started and how the editor is working.*

First let's open Tiled and create a new map : for this tutorial we will we use a 640x480 canvas, and since we have 32x32 tiles, we must specify at least 20 and 15 for the map size. In my example I'll define a 40x15 level, so we can play with scrolling background later.

![Create a new map](/img/tutorial/step1_newmap.png)

Also, as melonJS supports only uncompressed tilemaps, please be sure that your settings are correct. We do recommend the Base64 encoding, since it produces a smaller file, but it's really up to you.

![Create a new tileset](/img/tutorial/step1_newtileset.png)

Then let's add our tileset using Map/New Tileset. Be sure to configure the tileset spacing and margin to zero in tiled.
Adding a tileset

For the beauty of it, we will create two layers - one background layer, and one foreground layer. Feel free to use your imagination and do whatever you want. I named them logically "background" and "foreground", but you can put whatever you want.

Here's what my level looked like when I finished it:

![Tiled Preview](/img/tutorial/step1_tiled_level_design.png)

Finally, let's define a background color for our level, by using the color picker tool (Map/Map Properties), and just specify any color you prefer.
Setting a background color in Tiled

![Setting the background color](/img/tutorial/step1_background_color.png)

To finish, let's save our new map as "area01" under the "src/data/map/" folder, and we are done with the second step!