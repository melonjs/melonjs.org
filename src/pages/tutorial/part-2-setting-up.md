---
layout: ../../layouts/TutorialLayout.astro
title: 'Part 2: Setting Up the Project | melonJS Platformer Tutorial'
description: Scaffold a melonJS project with npm create melonjs, run it with Vite, and learn your way around the files it generates.
---

# Part 2: Setting Up the Project

melonJS gives you a starter project with one command. Open a terminal, go
wherever you keep your projects, and run:

```
npm create melonjs@latest my-game
cd my-game
npm install
npm run dev
```

The last command starts a development server and prints an address, usually
`http://localhost:5173`. Open it and you should see **Hello World!** on a grey
background. Leave that terminal running: every time you save a file, the page
reloads with your change.

<!-- SCREENSHOT: the scaffolded project running in the browser, showing "Hello World!" -->

That is a working melonJS game. The rest of the tutorial fills it in.

## What the starter made

Open the `my-game` folder in VS Code. Most of it is configuration you can
ignore for now. These are the files you will touch:

```
my-game/
  src/
    index.ts                     the entry point: starts the game
    manifest.ts                  the list of assets to load
    data/
      img/                       images go here
      map/                       levels go here
      fnt/                       the font the starter uses
    scripts/
      stage/
        play.ts                  the screen your game runs on
        title.ts                 the title screen
      renderables/
        player.ts                your character
```

The `data/img` and `data/map` folders are empty. Filling them is what Part 3 is
about.

## The entry point

Open `src/index.ts`. You do not need to change anything yet, but two lines are
worth understanding, because they explain how a melonJS game starts.

```
const app = new Application(1218, 562, { parent: "screen", scale: "auto" });

await app.init();
```

The first line creates the game and its world. The second builds the renderer
and puts the canvas on the page. `app.init()` is asynchronous so melonJS can ask
the browser for a WebGPU device, and it is **mandatory**: without it you get a
world with nothing to draw on, and the errors that follow will not mention the
missing call.

Further down, the starter preloads your assets and then switches to the play
screen:

```
loader.preload(DataManifest, () => {
    state.set(state.MENU, new TitleScreen());
    state.set(state.PLAY, new PlayScreen());
    pool.register("mainPlayer", PlayerEntity);
    state.change(state.PLAY, false);
});
```

Nothing loads by magic. An asset has to be listed in `manifest.ts` before you
can use it, which is the first thing the next two parts do.

## Getting the art and the level

This tutorial uses the art and map from the melonJS platformer example, so you
can spend your time on the game rather than on drawing tiles. Download the
melonJS repository and copy them into your project:

```
git clone --depth 1 https://github.com/melonjs/melonJS
cp -r melonJS/packages/examples/public/assets/platformer/img/* my-game/src/data/img/
cp -r melonJS/packages/examples/public/assets/platformer/map/* my-game/src/data/map/
```

On Windows, copy the two folders in Explorer instead. You should now have
`tileset.png`, `background.png`, `texture.png` and a few others in
`src/data/img`, and `map1.tmx` with `tileset.tsx` in `src/data/map`.

<a href="/tutorial/part-3-modifying-the-game" class="next">Up Next: Building the game</a>
