---
layout: ../../layouts/TutorialLayout.astro
---
## Part 3-1: Modifying the art
VSCode is a code editor. This means it reads and writes text files (usually containing code but not always). This also means that it is not useful for editing images, which provide the art layer of your game. If you want to change how your game looks you'll need to edit your image files with an image editor like [Krita](https://krita.org/en/).

<a href="https://krita.org/en/"><img class="krita" alt="Krita logo" src="/img/tutorial/krita-logo.png"></a>

Other alternatives include Aseprite, Photoshop, GIMP, and more. Here's a basic chart of their features:

<img alt="venn diagram of art software" class="medium" src="/img/tutorial/art-chart.svg">

Let's use Krita to change how the main character looks. Launch Krita, then in at the top click **File => Open**, then click open the following image:
```
/example/platformer/data/img/texture.png
```

Next, create a new layer (see how to use layers [here](https://www.youtube.com/watch?v=g2ZoQobsSWE)), and now you can draw on top of the original image file without actually messing it up (making easy to erase or undo changes). You can see here I changed how the main character looked. The main character has a bunch of different frames for it's animation, but I only drew the changes once. Because I was drawing on a separate layer I was able to copy the changes (and not the original image) to each of the other frames without having to redraw it (though better animated sprites might go a long way to help it feel more alive)

![Modified texture image inside Krita](/img/tutorial/texture-in-krita.png)

*I gave him some pants, a crown, and some spiky green hair :)*

![Custom skin running in my browser](/img/tutorial/new-skin-demo.png)

*I can see the new skin for my character in my web browser, and as I walk around and I can see the new outfit doing the walking animation*

## Footnote: General art concepts
This tutorial does not cover the basics of art itself. [Click here for more information about how to make art.](/tutorial/learn-about-art)

<a href="/tutorial/part-3-2-modifying-the-level" class="next">Up Next: Modifying the level using Tiled</a>