---
layout: ../../layouts/MDLayout.astro
---

![featurecarousel_texturepacker](https://cloud.githubusercontent.com/assets/4033090/10114747/0c568f58-6429-11e5-975a-f32eedfc1505.png)

Using a texture Atlas will generally allow you to :

-   save memory, by packing all your sprites into a single texture
-   increase your framerate, by optimising the GPU usage
-   make your game start faster, by loading a single texture

In this tutorial we are going to see how to :

-   use [TexturePacker](https://www.codeandweb.com/texturepacker) to create a texture atlas
-   import the generated texture into a melonJS project
-   add a static renderable sprite
-   add a renderable animation

# Create a Texture atlas

To create a new texture atlas, star by opening TexturePacker, and choose the _**JSON Array data**_ format (earlier version of TexturePacker had a melonJS data format, but this is not required anymore). You should see a screen similar to the one below after you've installed TexturePacker:

![create new project](https://cloud.githubusercontent.com/assets/4033090/11137431/921f57de-89f2-11e5-84d2-2ed1d0bbfc25.png)

Then drag & drop the directory containing your sprite images to the Sprites area of TexturePacker. TexturePacker will automatically load and lay out all image files. For this example we use the assets from the texture packer example [here](https://github.com/melonjs/examples/tree/master/texturepacker/data/img/assets) (see under the cityscene folder).

![imported files](https://cloud.githubusercontent.com/assets/4033090/10100023/7a659c04-63c1-11e5-8f83-8693de9d7ee5.png)

After that use the file selection button to enter a Data file, name it `cityscene.json` and place it in the `data/img` folder (to follow the melonJS [boilerplate structure](https://github.com/melonjs/es6-boilerplate#folder-structure)), and do the same for the texture file by choosing `cityscene.png` in Texture file's file selector.

Recommended settings :

-   use "Power of Two" size for the texture (unless all devices you target are supporting WebGL2), to optimize the use of GPU memory
-   we recommend not to use texture rotation when possible (although this usually increases the final texture size), as it forces melonJS to apply a default rotation angle when drawing sprites and, based on how many sprites are to be displayed, can impact performance.

Finally press the `Publish sprite sheet` button to create the sprite sheet, and we are done in TexturePacker !

# Import the generated texture into a melonJS project

As this tutorial is focusing on using TexturePacker, we will assume that you are already familiar with melonJS and that you have at least a first project up & running. If you need help on starting with melonJS, we recommend you to first check either our [platformer](http://melonjs.github.io/tutorial-platformer/) or [space invaders](http://melonjs.github.io/tutorial-space-invaders/) tutorials.

## Loading the texture atlas and sprite sheet in melonJS :

The first step is of course to add our two files to the list of assets to be loaded (as a rule of thumb, be sure to always name atlas and source image the same, and be sure to respect name as defined in your project, so that they match with the JSON meta data) :

```js
var resources = [
    { name: 'cityscene', type: 'json', src: 'data/img/cityscene.json' },
    { name: 'cityscene', type: 'image', src: 'data/img/cityscene.png' },
]
```

Note: when using multipack texture, please make sure to follow the filename pattern as defined in TexturePacker, for example if using `n-1` then the above example would need to be changed as follow (assuming the texture and atlas is split into 2 textures) :

```js
var resources = [
    { name: 'cityscene-0', type: 'json', src: 'data/img/cityscene-0.json' },
    { name: 'cityscene-1', type: 'json', src: 'data/img/cityscene-1.json' },
    { name: 'cityscene-0', type: 'image', src: 'data/img/cityscene-0.png' },
    { name: 'cityscene-1', type: 'image', src: 'data/img/cityscene-1.png' },
]
```

Then let's create a global reference of our [Texture Atlas](http://melonjs.github.io/melonJS/docs/TextureAtlas.html) under the `game` namespace, so that we can reuse it later :

```js
// load the texture atlas file
game.texture = new me.TextureAtlas(
    me.loader.getJSON('texture'),
    me.loader.getImage('texture')
)
```

> Note: when using multipack texture, the [constructor](http://melonjs.github.io/melonJS/docs/TextureAtlas.html) would then _take an array of Atlas and an array of source image file_ (do note that the second argument is optional, and if not present source image name will be extracted from the atlas itself) :
>
> ```js
> // load the texture atlas file
> game.texture = new me.TextureAtlas([
>     me.loader.getJSON('texture-0'),
>     me.loader.getJSON('texture-1'),
> ])
> ```

Make sure of you course to do this after all resources have been preloaded (in our example we inserted this code into the `loaded` callback).

# Add the static background

Adding a static background is pretty easy, and for that we will use the sprite from our texture called background :

```js
// create the background object
var background = game.texture.createSpriteFromName('background')

// set position to the middle of the viewport
// (as the sprite anchorPoint is (0.5, 0.5)
background.pos.set(me.game.viewport.width / 2, me.game.viewport.height / 2, 1)

// add to the scene
me.game.world.addChild(background)
```

Note that as the default settings in TexturePacker is to use `center` as the anchorPoint, we also set the default position for the background to the center of the screen, but you can of course change it to top-left or whatever you need, and change the default position accordingly (that would be `[0, 0]` if top-left coordinates are used for the anchor point).

Alternatively you can also create a [`me.Sprite`](http://melonjs.github.io/docs/me.Sprite.html) directly using a texture atlas, as shown below :

```js
// add the Background with default position to the middle of the viewport
var background = new me.Sprite(
    me.game.viewport.width / 2,
    me.game.viewport.height / 2,
    {
        image: game.texture,
        region: 'background.png',
    }
)

// add to the scene
me.game.world.addChild(background, 1)
```

# Add the cap guy animation

Finally we are going to add a renderable [animation](http://melonjs.github.io/docs/me.AnimationSheet.html) for our CapGuy [Entity](http://melonjs.github.io/docs/me.Entity.html).

In our example we use a very simple Entity, that is displayed in the middle of the screen and move along the x axis until it leaves the screen. To add the renderable component to our Entity, we just simply add the following to the Entity constructor :

```js
// create an animation using the cap guy sprites, and add as renderable
this.renderable = game.texture.createAnimationFromName([
    'capguy/walk/0001',
    'capguy/walk/0002',
    'capguy/walk/0003',
    'capguy/walk/0004',
    'capguy/walk/0005',
    'capguy/walk/0006',
    'capguy/walk/0007',
    'capguy/walk/0008',
])
```

We just use the default animation here, which contains all defined frames. Of course it's also possible to define other animations using the [`addAnimation`](http://melonjs.github.io/docs/me.AnimationSheet.html#addAnimation) function.

If you start the demo now you'll see CapGuy walking... but he's not yet moving. Let's add the following code block to `entity.js`

```js
/**
 * manage the enemy movement
 */
update(dt) {

    // just manually change the guy position
    this.pos.x += 0.3*dt;

    // repeat once leaving the viewport
    if (this.pos.x >= me.game.viewport.width) {
        this.pos.x = 0;
    }

    // call the parent function
    super.update(dt);

    return true;
}
```

This will moves CapGuy a bit to the right. (`dt` is the time difference between the last frame and the current frame, and we use this here as a base for the update keeps the animation speed constant). The `if` block resets CapGuy to the left border after he left to the right.

And voila !

# Source code

Full source code of this example is available in our repository at :
https://github.com/melonjs/examples/tree/master/texturepacker/
