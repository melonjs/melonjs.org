---
layout: ../../layouts/MDLayout.astro
---

# melonJS development roadmap

A quick look at some of the features we want to have completed by certain milestones. Including some API-breaking changes we expect.

## 2.1.0

### Improvements

-   WebGL Optimizations: Ticket [#591](https://github.com/melonjs/melonJS/issues/591)

### API breaks

## 0.9.7

### Features

-   Entity Groups: Ticket [#59](https://github.com/melonjs/melonJS/issues/59)

### Improvements

### API breaks

-   ObjectEntity will not inherit from AnimationSheet, it will have an array of AnimationSheets: <s>Ticket [#15](https://github.com/melonjs/melonJS/issues/15)</s>

## 0.9.6

### Features

-   Audio volume and mute control settings and other improvements : Ticket [#153](https://github.com/melonjs/melonJS/issues/153)

## 0.9.5

### Features

-   Plugin API: Ticket [#85](https://github.com/melonjs/melonJS/issues/85)
-   Debug panel: Ticket [#108](https://github.com/melonjs/melonJS/issues/108)
-   ImageLayer objects for parallax scrolling backgrounds: Tickets [#12](https://github.com/melonjs/melonJS/issues/12) and [#100](https://github.com/melonjs/melonJS/issues/100)

### Improvements

-   Support for screen auto-resize: Ticket [#4](https://github.com/melonjs/melonJS/issues/4)

### API breaks

-   `me.GUI_Object.onClicked` -> `onClick`: <s>Ticket [#120](https://github.com/melonjs/melonJS/issues/120)</s>
-   Normalize arguments passed to `me.TiledLayer.[getTile|getTileId|setTile|clearTile]`: <s>Ticket [#107](https://github.com/melonjs/melonJS/issues/107)</s>
-   Treat `floating` object position in screen coordinates, and `non-floating` object positions in world coordinates: Ticket [#119](https://github.com/melonjs/melonJS/issues/119)
