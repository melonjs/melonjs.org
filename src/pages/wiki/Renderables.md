---
layout: ../../layouts/MDLayout.astro
---

-   [Renderable](Renderables#renderable)
-   [Sprite](Renderables#sprite)

### Renderable

**Overview** - Object for simple drawing on screen. Used as a base class, no built-in image support, but you can write just about any logic on top of it.

This is the base object literal that melonJS uses for any display objects. It extends Rect, which is essentially a simple geometric rectangle, that stores various pieces of data to make it easy for working with a rectangle on screen. Basic positioning, drawing sizes, etc. The renderable does not do a whole lot, other then give you a basic object to work with for rendering to the screen.

The details for the Renderable class can be found here: <a href="http://melonjs.github.io/melonJS/docs/me.Renderable.html">http://melonjs.github.io/melonJS/docs/me.Renderable.html</a>.

A really simple implementation of a renderable can be done as follows:

```js
import * as me from 'melonjs/dist/melonjs.module.js'

class MyRenderable extends me.Renderable {
    constructor() {
        // x, y, width, height
        super(100, 100, 50, 50)

        // set the depth of the renderable
        this.z = 100
    }

    update(dt) {
        // don't redraw this item
        return false
    }

    draw(renderer) {
        renderer.setColor('#000')
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
}
me.game.world.addChild(new myRenderable())
```

To explain the details, the constructor is calling the parent one passing the default position, and dimension. The draw method simply uses the given reference to the active [renderer](https://melonjs.github.io/melonJS/docs/me.Renderer.html) to draw a simple rectangle. The update returns false, as nothing needs to be processed for that object, since in this case it is not colliding with anything, nor moving.

### Sprite

**Overview** Useful to draw sprite image, from single static sprite, to complex spritesheet and packed sprite texture.

The `me.Sprite` class takes the Renderable steps further. It is an ideal object of choice when you want to work with a static image. It gives you features such as flipping the image, scaling, easier rotation, a flicker effect, and just makes it easier to draw a simple image over implementing it yourself with the `me.Renderable`.

It's worth checking out the docs to see what methods are available for Sprite class: <a href="http://melonjs.github.io/melonJS/docs/me.Sprite.html">http://melonjs.github.io/melonJS/docs/me.Sprite.html</a>

And it can require very little code to get going:

```js
var mySprite = new me.Sprite(0, 0, { image: 'ball' })

me.game.world.addChild(mySprite)
```

To setup an animation, instead of accepting a width & height of the total image, it accepts the width & height for dimensions of a single frame. Then it parses the source image size, and keeps track of the coordinates for each frame.

Once the animation sheet is setup, you can create animations by telling it which index to use. The docs explain this fairly well, under the `addAnimation` method: <a href="http://melonjs.github.io/melonJS/docs/me.Sprite.html#addAnimation">http://melonjs.github.io/melonJS/docs/me.Sprite.html#addAnimation</a>

An animation object can be setup like so:

```js
var runner = new me.Sprite(0, 0, {
    image: 'ball',
    spritewidth: 64,
    spriteheight: 64,
})

runner.addAnimation('running', [0, 1, 2, 3, 4, 3, 2, 1], 1)
runner.setCurrentAnimation('running')

me.game.world.addChild(runner, 1)
```
