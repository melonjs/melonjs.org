---
layout: ../../layouts/TutorialLayout.astro
---
# Part 3: Modifying the game
Changing different types of game files requires different software. Which software you should use depends on whether you are editing code files, image files, tilemaps, etc.

## Modifying the code
Now that we've got the platformer project up and running on our computer, we can now try changing it! First we need to [open](https://code.visualstudio.com/docs/editor/workspaces) the platformer project (at `/examples/platformer/`) inside VSCode to start making edits.

You should be able to see the files for the platformer example on the left side of your editor if you did this correctly:

<img alt="VSCode Screenshot" class="large" src="/img/tutorial/VSCode-platformer-files.webp"/>

These are the files used by the web server running on your computer. VS Code (the program in the screenshot) is a great tool to edit these files to change your code. However if you'd like to modify the images you're going to need specialized image editing software.

## Modifying the images
VSCode is a code editor. This means it reads and writes text files (usually containing code but not always). This also means that it is not useful for editing images, which provide the visual layer of your game. If you want to change how your game looks you'll need to edit your image files with an image editor like [Krita (it's free and open source, so consider donating if you like it)](https://krita.org/en/). Other alternatives include Aseprite (specialized pixel art software), Photoshop, GIMP, and more.

Let's use Krita to change how the main character looks. Launch Krita, then in at the top click **File => Open**, then click open the following image:
```
/example/platformer/data/img/texture.png
```

Next, create a new layer (see how to use layers [here](https://www.youtube.com/watch?v=g2ZoQobsSWE)), and now you can draw on top of the original image file without actually messing it up (making easy to erase or undo changes). You can see here I changed how the main character looked. The main character has a bunch of different frames for it's animation, but I only drew the changes once. Because I was drawing on a separate layer I was able to copy the changes (and not the original image) to each of the other frames without having to redraw it (though better animated sprites might go a long way to help it feel more alive)

![Modified texture image inside Krita](/img/tutorial/texture-in-krita.png)

*I gave him some pants, a crown, and some spiky green hair :)*

![Custom skin running in my browser](/img/tutorial/new-skin-demo.png)

*I can see the new skin for my character in my web browser, and as I walk around and I can see the new outfit doing the walking animation*