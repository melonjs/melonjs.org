---
layout: ../../layouts/TutorialLayout.astro
---
# Part 3-2: Modifying the level using Tiled

*Note: Before starting if you are new to Tiled we strongly encourage you to read the [introduction here](https://doc.mapeditor.org/en/stable/manual/introduction/), that provides the basics on how the editor works.*

To start open the Tiled Application. Now let's edit the first level. It is located here:
`/data/maps/map1.tmx`
Once you have it open, your application should look very similar to this:

<img alt="Tiled editor screenshot" class="large" src="/img/tutorial/tiled-editor-full.png">

*I'm using the Mac version, it might be slightly different on your system but it should look very similar*

In the middle section you have the level editor. The right side has the layers view on the top and the tileset on the bottom you can pick from to use to draw in the level editor. Always make sure you're drawing your tiles in the right layer, otherwise they might overlap each other.

Once you are done editing, at the top click on `File > Save`. Then click on `File > Export As`, then change the file type to JSON to save it as `map1.json` so that it can be imported easily in our code. You will need to do this each time you save your level to see the updates.

To learn more about the Tiled level editor [see here.](https://doc.mapeditor.org/en/stable/)

<a href="/tutorial/part-3-3-modifying-the-code" class="next">Up Next: Modifying the Code</a>