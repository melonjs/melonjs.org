---
layout: ../../layouts/MDLayout.astro
---

[ShoeBox](http://renderhjs.net/shoebox/) is a free windows & mac application for combining images into a texture atlas. Now, for it to work with MelonJS, you need to use our settings file. Otherwise melonJS doesn't know how to recognize it.

Grab this JSON(ish) code here:

```js
::ShoeBox:shoebox.plugin.spriteSheet::PluginCreateSpriteSheet:{"texPowerOfTwo":true,"fileGenerate2xSize":false,"texPadding":2,"scale":1,"texMaxSize":2048,"texExtrudeSize":1,"useCssOverHack":false,"fileFormatLoop":"\\t{\\n\\t\\t\"filename\": \"@id\",\\n\\t\\t\"frame\": {\"x\":@x,\"y\":@y,\"w\":@w,\"h\":@h},\\n\\t\\t\"rotated\": false,\\n\\t\\t\"trimmed\": true,\\n\\t\\t\"spriteSourceSize\": {\"x\":@fx,\"y\":@fy,\"w\":@fw,\"h\":@fh},\\n\\t\\t\"sourceSize\": {\"w\":@fw,\"h\":@fh}\\n\\t},\\n","renderDebugLayer":false,"animationFrameIdStart":0,"texSquare":false,"fileName":"shoebox.json","texCropAlpha":false,"animationMaxFrames":100,"animationNameIds":"@name_###.png","fileFormatOuter":"{\"frames\": [\\n@loop\\t{\"EOL\":\"true\"}\\n],\\n\"meta\": {\\n\\t\"app\": \"ShoeBox\",\\n\\t\"exporter\": \"melonJS\",\\n\\t\"size\": {\"w\":@W,\"h\":@H}\\n}\\n}"}
```

And save it on your computer. Give it any name, but be sure it has the extension `sbx`. Once you have shoebox installed, double click the sbx file. The extension should register with shoebox, and it will load the settings.

To use it in game, simply use the `me.TextureAtlas` class: [http://melonjs.github.io/docs/me.TextureAtlas.html](http://melonjs.github.io/docs/me.TextureAtlas.html)

For a simple example of using Shoebox, you can also have a look at our github repository here :
https://github.com/melonjs/melonJS/tree/master/examples/shoebox
