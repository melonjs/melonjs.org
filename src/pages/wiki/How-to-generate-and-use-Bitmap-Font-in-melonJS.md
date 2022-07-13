---
layout: ../../layouts/MDLayout.astro
---

melonJS 4.0.0 and higher)

## convert your truetype font

The first step is to convert your `.TTF` fine into a `.PNG` (the actual texture) and a `.FNT` (the font definition file) that can be later used in melonJS. As you can see below (in the tools section), there are several converters available, but for its ease of use (and also because it's free) we have been using [Littera](http://kvazars.com/littera/) sucessfully on our side and therefore currently recommend that one.

![image](https://cloud.githubusercontent.com/assets/4033090/19712364/a8d3dfce-9b6f-11e6-9ee1-55fa04d42070.png)

We won't go here into exhaustive details on how to use any of these tools, but make sure you respect the following points when configuring it :

-   name your font using the original TTF font name
-   use the TXT (.fnt) format for the output, as this is the only format that can be directly used by our loader.
-   make sure to use the right character set when exporting your font (like "basic" for example if you need a basic set with both characters and numbers).
-   make sure to use a "power of 2" image size
-   melonJS only supports 1 page (so one .PNG per .FNT file), so if your characters do not fit into the current PNG, do rather increase the size instead of forcing the tool to generate a second one.

## preload your bitmap font

pretty straightforward here, assuming that the font name is PressStart2P, you just need to add the following line to your existing assset lists :

```js
{ name: "PressStart2P", type:"image", src: "data/fnt/PressStart2P.png" },
{ name: "PressStart2P", type:"binary", src: "data/fnt/PressStart2P.fnt"},
```

be careful here, as the `.FNT` file type need to be set to `binary`.

## using your bitmap font

quite easy as well, as all we need is to instantiante a `me.BitmapFont object`, and specify the two files we previously loaaded :

```js
this.font = new me.BitmapFont(
    me.loader.getBinary('PressStart2P'),
    me.loader.getImage('PressStart2P')
)
```

and then we can just use as follow :

```js
this.font.draw(context, 'myText', this.pos.x, this.pos.y)
```

for more details on how to change alignements, size and others, you can refer to the documentation [here](https://melonjs.github.io/melonJS/docs/me.BitmapFont.html)

## Available Tools and ressources

### Tools

**Online**

-   http://kvazars.com/littera/ (web based, free)

**OSX**

-   https://71squared.com/glyphdesigner (ongoing paid license)
-   https://www.bmglyph.com/ (Pay once)

**Windows**

-   http://www.angelcode.com/products/bmfont/

**Crossplatform**

-   https://libgdx.badlogicgames.com/nightlies/runnables/runnable-hiero.jar (need to have java installed, but it's free)
-   https://github.com/andryblack/fontbuilder
-   https://github.com/vladimirgamalyan/fontbm

### Font Resources

-   https://www.fontsquirrel.com/ (100% free commercial use, and webfont generation tool)
