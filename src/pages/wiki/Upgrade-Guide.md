---
layout: ../../layouts/MDLayout.astro
---

This page list the public APIs change between melonJS release, and will provide you guideline to easily upgrade.

> melonJS uses [Semantic Versioning](https://semver.org), which means that only MAJOR version (e.g. moving from 9.x.x to 10.x.x) will introduce breaking API changes; nevertheless we always provide backward compatibility as much as possible by providing method [wrapping](https://github.com/melonjs/melonJS/blob/master/src/lang/deprecated.js) on public deprecated API(s). For any other MINOR or PATCH version, melonJS API provides seamless upgrade.

## melonJS 2 (ES6) Version

> Note: As the initial 10.0 version marks the release of melonJS2, that is now fully ES6 compliant, all deprecated API and method from previous "legacy" versions (9.x and lower) have been removed. see as well [here](/wiki/Upgrading-to-melonJS-2) for a dedicated upgrading guide from Legacy version of melonJS to melonJS 2

# 12.0.x to 13.0.x (Stable)

-   device: as part of `device` refactoring to a proper ES6 syntax, the previous `device.isFullScreen` property has been changed into a `device.isFullScreen()` function
-   device: deprecated function `device.turnOnPointerLock` and `device.turnOffPointerLock` since version 10.3 have been removed; please use `input.requestPointerLock()` or `input.exitPointerLock()`

# 11.0.x to 12.0.x (Stable)

-   Core: `utils.string` helper trim functions have been removed in favour to their native es10 equivalent (`String.trimLeft` and `String.trimRight`)

# 10.12.x to 11.0.x (Stable)

-   Renderable: the [Light2d](http://melonjs.github.io/melonJS/docs/melonjs/Light2d.html) constructor now takes an additional parameter (`x, y, radiusX, [radiusY], [color], [intensity])` allowing to create elliptical shaped lights

# 10.5.x to 10.12.x (Stable)

no breaking API changes

# 10.4.x to 10.5.x (Stable)

-   Renderable: `DraggableEntity` and `DroptargetEntity` have been renamed to [`Draggable`](http://melonjs.github.io/melonJS/docs/melonjs/Draggable.html) and [`DropTarget`](http://melonjs.github.io/melonJS/docs/melonjs/DropTarget.html)

# 10.3.x to 10.4.x (Stable)

-   Renderer: the `video.renderer.Texture` class is now directly available as `TextureAtlas`

# 10.0.x to 10.3.x (Stable)

-   Input: `device.turnOnPointerLock()` and `device.turnOffPointerLock()` have been replaced respectively by `input.requestPointerLock()` and `input.exitPointerLock()`, and updated to the latest 2.0 specs

# 9.1.x to 10.0.x (Stable)

-   Core : `me.timer.lastUpdate` has been moved to [`me.game.lastUpdate`](http://melonjs.github.io/melonJS/docs/me.game.html#.lastUpdate)
-   Physic : physic body update and collision check is now automatically done through the world simulation update loop (see the specific wiki entry on upgrading to melonJS 2)
-   Event : minPubSub event based implementation has been replaced by a nodeJS event emitter based implementation, with `me.event.publish()`, `me.event.subscribe()` and `me.event.unsubscribe()` being replaced respectively by [`me.event.emit()`](https://melonjs.github.io/melonJS/docs/me.event.html#.emit), [`me.event.on()`](https://melonjs.github.io/melonJS/docs/me.event.html#.on) (or [`me.event.once()`](https://melonjs.github.io/melonJS/docs/me.event.html#.once)) and [`me.event.off()`](https://melonjs.github.io/melonJS/docs/me.event.html#.off).

## Legacy Version

# 8.0.x to 9.1.x (Stable)

-   Tilemap: `me.levelDirector` has been renamed to [`me.level`](http://melonjs.github.io/melonJS/docs/me.level.html), together with the functions `loadLevel()`, `reloadLevel()`, `nextLevel()` and `previousLevel`, respectively renamed to `load()`, `reload()`, `next()` and `previous()`
-   Shape: `translateV()` is now deprecated and available through a single `translate()` method accepting both numerals or vector as parameter(s)
-   Shape: `containsPoint()` and `containsPointV()` are now deprecated and available through a single `contains()` method accepting numerals, vector, or other similar shape object as parameter(s)
-   Container: following the rewrite of bound management in the 9.0 version, `childBounds` is now deprecated. If you need to access the Container bounds object, use the `getBounds()` methods as for any other renderable object.
-   Renderer : WebGL2 is now the default mode when using the WebGL renderer (use `preferWebGL1 = true` when calling [me.video.init](http://melonjs.github.io/melonJS/docs/me.video.html#.init) if you need to force WebGL1)
-   Entity: `me.CollectableEntity` and `me.LevelEntity` are now deprecated and replaced respectively by more generic [`me.Collectable`](https://melonjs.github.io/melonJS/docs/me.Collectable.html) and [`me.Trigger`](https://melonjs.github.io/melonJS/docs/me.Trigger.html) objects that do not extend me.Entity anymore
-   `me.video.getWrapper()` has been renamed to [`me.video.getParent()`](http://melonjs.github.io/melonJS/docs/me.video.html#.getParent)

# 7.1.x to 8.0.x (Stable)

-   Physic : [`me.game.world`](http://melonjs.github.io/melonJS/docs/me.game.html#.world) is now a specific container (as opposed to a generic `me.Container` object) that will manage all related physic updates, and that contains properties and instances used by the physic simulation such as the global gravity setting or the quadtree used for broadphase.
-   Physic : gravity for physic bodies is now defined globally under [`me.game.world.gravity`](http://melonjs.github.io/melonJS/docs/me.World.html#.gravity), and can be scaled individually using [`me.Body.gravityScale`](http://melonjs.github.io/melonJS/docs/me.Body.html#.gravityScale). As a consequences `me.sys.gravity` is now deprecated and when set will automatically change the value of `me.game.world.gravity.y`. Similarly the `gravity` property of [`me.Body`](http://melonjs.github.io/melonJS/docs/me.Body.html) is replaced by [`me.Body.gravityScale`](http://melonjs.github.io/melonJS/docs/me.Body.html#.gravityScale) that allows specifying individually to which degree a specific body is affected by the world gravity.

before (now deprecated) :

```js
// change default gravity value globally
me.sys.gravity = 0.98

// change gravity value for a specific physic body
this.body.gravity = 0
```

now :

```js
// change default gravity value globally
me.game.world.gravity.set(0, 0.98)

// change gravity value for a specific physic body
this.body.gravityScale = 0
```

-   Physic : [`me.Body.addShapesFromJSON `](http://melonjs.github.io/melonJS/docs/me.Body.html#.addShapesFromJSON) has been renamed to [`me.Body.fromJSON `](http://melonjs.github.io/melonJS/docs/me.Body.html#.fromJSON)

-   Input : melonJS will now automatically release any registered event on a renderable as soon as the object is destroy. This does not break any API nor throw any exception as calling this one twice or combined with `releasePointerEvent` will fail silently if an event is already released, but as events will automatically released and in order for object recycling and event registration to work properly, `registerPointerEvent` should not be called from the object constructor but from the `onResetEvent` method or similar.

-   Timer : all fps and related timing properties previously under `me.sys` have been moved to either me.timer or `me.game.world` :
    > -   `me.sys.fps` -> [`me.timer.maxfps`](http://melonjs.github.io/melonJS/docs/me.timer.html#.maxfps), to specify the maximum display refresh rate
    > -   `me.sys.updatesPerSecond` -> [`me.game.world.fps`](http://melonjs.github.io/melonJS/docs/me.World.html#.fps), that specify at which rate the game world is updated (can be lower or higher than the display refresh rate)
    > -   `me.sys.interpolation` -> [`me.timer.interpolation`](http://melonjs.github.io/melonJS/docs/me.timer.html#.interpolation), to enable/disable frame interpolation
-   video : the `options.wrapper` element from the [video init parameters](http://melonjs.github.io/melonJS/docs/me.video.html#.init), that is used to indicate the DOM element where to hold the canvas in the HTML file, has been renamed to `options.parent`.

# 7.0.0 to 7.1.0 (Stable)

-   video : `me.video.updateDisplaySize()` and `me.Renderer.scaleCanvas()` are deprecated and replaced by [`me.video.scale()`](http://melonjs.github.io/melonJS/docs/me.video.html#.scale) as the two former methods were actually redundant and doing basically the same thing.
-   Renderable : `distanceToPoint()`, and `angleToPoint()` are now deprecated and have been merged respectively with the [`distanceTo()`](http://melonjs.github.io/melonJS/docs/me.Renderable.html#.distanceTo) and [`angleTo`](http://melonjs.github.io/melonJS/docs/me.Renderable.html#.angleTo) method.

# 6.4.0 to 7.0.0

-   CocoonJS : following the service shutdown (https://blog.cocoon.io/shutting-down-cocoon/) the support for CocoonJS has been removed from melonJS
-   Renderer : although not a API change, the renderer selection is now set to AUTO by default (Attempt WebGL first, with fallback to Canvas). The WebGL renderer is now stable since several releases, and offer multiple advantages over the Canvas one, including both higher performances and additional features (e.g. shader, color tinting, ...)
-   WebGL Shaders : the shader implementation has been rewritten to allow for a much more generic approach, and ease the use of custom shader with the [Compositor](http://melonjs.github.io/melonJS/docs/me.WebGLRenderer.Compositor.html). Custom shaders can now be created by extending or using the base [me.GLShader](http://melonjs.github.io/melonJS/docs/me.GLShader.html) object as follow :

```js
// create a basic shader
var myShader = new me.GLShader(
    // WebGL rendering context
    gl,
    // vertex shader
    [
        'void main() {',
        '    gl_Position = doMathToMakeClipspaceCoordinates;',
        '}',
    ].join('\n'),
    // fragment shader
    ['void main() {', '    gl_FragColor = doMathToMakeAColor;', '}'].join('\n')
)
// use the shader
myShader.bind()
```

-   video : although more for internal usage, `me.video.getPos()` has been deprecated and replaced by `me.video.renderer.getBounds()` that will now properly return the parent container position and size. Additionally a `me.video.renderer.updateBounds()` method has been added that allows end-user to rebuild the internal coordinates cache in case the page or parent layout is programmatically modified without triggering a [resize](https://developer.mozilla.org/en-US/docs/Web/Events/resize) or [orientationchange](https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange) event.

-   error : `me.Error` is deprecated and replaced by the standard [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object.

# 6.3.0 to 6.4.0

-   `me.WebGLRenderer.Texture` and `me.CanvasRenderer.Texture` have been merged into a single `me.Renderer.Texture` object. this does not really break the current API as the `me.Renderer.Texture` reference was already available before as a global reference for Texture object, but `me.WebGLRenderer.Texture` and `me.CanvasRenderer.Texture` are now only aliases and will be removed in the future.

# 6.2.0 to 6.3.0

### Renderer

-   `drawShape()` is deprecated and has been replaced by a `fill()` and `stroke()` methods (for backward compatibility, calling `drawShape()` will call the `stroke()` method to replicate previous behaviour).

# 6.1.0 to 6.2.0

### State

-   `me.ScreenObject` is now deprecated and replaced by [`me.Stage`](http://melonjs.github.io/melonJS/docs/me.Stage.html) (`me.ScreenObject` still available as an alias for backward compatibility)

### Renderable

-   `me.Font` and `me.BitmapFont` are now deprecated and replaced by `me.Text` and `me.BitmapText` (former objects are still available to guarantee backward compatibility). The new [`me.Text`](http://melonjs.github.io/melonJS/docs/me.Text.html) and [`me.BitmapText`](http://melonjs.github.io/melonJS/docs/me.BitmapText.html) objects are now much more generic, can be added directly to a container, and their corresponding bounding boxes are now properly computed. Additionally it allows melonJS to add support for the Text Object Feature introduced recently in Tiled.

# 6.0.0 to 6.1.0

no breaking API changes

# 5.x.x to 6.0.0

-   API update to sandbox all previous language extension under the me namespace :

    -   `Array.prototype.random` -> `me.utils.array.random()`
    -   `Array.prototype.remove`
    -   `Array.prototype.weightedRandom` -> `me.utils.array.weightedRandom()`
    -   `Error.extend` -> `me.Object.extend`
    -   `Function.prototype.defer` -> `me.utils.array.defer()`
    -   `Number.prototype.clamp` -> `me.Math.clamp()`
    -   `Number.prototype.degToRad` -> `me.Math.degToRad()`
    -   `Number.prototype.radToDeg` -> `me.Math.radToDeg()`
    -   `Number.prototype.random` -> `me.Math.random()`
    -   `Number.prototype.randomFloat` -> `me.Math.randomFloat()`
    -   `Number.prototype.weightedRandom` -> `me.Math.weightedRandom()`
    -   `Number.prototype.round` -> `me.Math.round()`
    -   `Number.prototype.sign` -> safe `Math.sign` ES6 polyfill
    -   `Number.prototype.toHex`
    -   `String.prototype.contains` -> `String.prototype.includes`
    -   `String.prototype.isBoolean` -> `me.utils.string.isBoolean()`
    -   `String.prototype.isNumeric` -> `me.utils.string.isNumeric()`
    -   `String.prototype.toHex` -> `me.utils.string.toHex()`
    -   `String.prototype.trim` -> safe ES6 polyfill
    -   `String.prototype.trimLeft` -> `me.utils.string.trimLeft()`
    -   `String.prototype.trimRight` -> `me.utils.string.trimRight()`
    -   `window.onReady`, deprecated and replaced by `me.device.onReady`
    -   `window.throttle` -> `me.utils.function.throttle()

### Physic Body

-   `me.body.gravity` is now a `me.Vector2d` object, allowing to define gravity on both axis
-   Solid bodies now defines a new `me.Body.force` property allowing to automatically apply a force or acceleration
-   `me.Body.accel` and `me.Body.setVelocity` are now deprecated and to be replaced by `me.Body.force`

### me.device

-   `me.device.getPixelRatio()` has been removed, and replaced by a `me.device.devicePixelRatio` property that can directly be used.

### me.game.viewport

-   the camera system now supports damping for smoother movement. On top of the new `damping` property, the `me.Viewport.follow(target, axis, damping)` function accepts an optional third parameter to specify a damping value between 0 and 1.
-   the base me.Viewport class has been renamed to me.Camera2d to prepare for future changes. `me.game.viewport` stays however as the main reference to the game viewport.

# 5.0.x to 5.1.0 (Stable)

### Bootstrap

-   `window.onReady` has been deprecated, in favor of [`me.device.onReady`](http://melonjs.github.io/melonJS/docs/me.device.html#onReady). This is to ensure that melonJS is contained as much as possible under the `me` namespace.

### Renderable

-   [`isKinematic`](http://melonjs.github.io/melonJS/docs/me.Renderable.html#isKinematic) is now true by default except for `me.Entity`, `me.Container` and `me.GUI` objects. Which means that if you use `me.Renderable` as a base for a custom object responding to collision or pointer event, you will need to set it back to false within the constructor.

# 4.x.x to 5.0.x (Stable)

### Device

-   the orientation related functions have been updated to match the new draft [Orientation API](https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation); as a consequence, current device orientation can be now obtained through the `me.device.getScreenOrientation()` function. The former `me.device orientation` property has been removed as it was relying on a deprecated [Orientation API](https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation).

### Input

-   remove a set of deprecated items : argument type for `me.input.bindGamepad()`, `mousewheel` event, and `MS` prefixed Pointer Event
-   melonJS will now provide a [me.Pointer](http://melonjs.github.io/melonJS/docs/me.Pointer.html) object to callback (when registering on pointer event), instead of providing the corresponding Event Object. Implementation is still backward compatible as most of the useful standard properties are provided directly through me.Pointer

# 3.x.x to 4.0.x (Stable)

### BitmapFont

-   the `me.BitmapFont` has been greatly improved, and now supports non fixed font size. The caveat is however that a new font data is now required when calling the constructor, but the rest of the API did not change. See [here](/wiki/How-to-generate-and-use-Bitmap-Font-in-melonJS) for a quick guide on how to generate and use the new format.

### Renderer

-   Canvas & WebGL renderer functions `prepareSurface()`, `clearSurface()` and `blit()` have been respectively renamed to `clear()`, `clearColor()` and `flush`.
-   `clearColor()` function now only takes 2 arguments (a color, and optional boolean to allow or not transparency). This allows simplifying the api (and be closer from the WebGL one) and also align both renderer (for the `clearColor` function).
-   a `getColor()` function has been added to match the existing `setColor()` one, returning the current fill and stroke style.
-   the WebGL renderer now has a `verbose` flag, that allows to display additional details as to what the renderer is doing. The flag is now off by default (as opposed to the previous behavior, where the renderer was always outputting additional messages)

### Renderable

-   `me.Renderable` objects now have a new `currentTransform` property that defines the renderable transformation matrix. this can be used for more "advanced" transformation use cases (on top of the existing functions), or to retrieve the current object transformation matrix.
-   the `me.Sprite` `angle` property has been removed in favor of the new transformation matrix based implementation. If you now need to apply an angle to your renderable, use `mySprite.currentTransform.rotate()`.
-   Transformation can now be automatically applied for `me.Renderable`, through the `autoTransform` flag. Once enabled, the engine will automatically apply any transformation set (through `currentTransform`) when calling the renderable `draw()` function. this is currently off by default for end-user defined objects.
-   `me.AnimationSheet` has been merged into `me.Sprite`, providing a single object for both static and animated objects. `me.AnimationSheet` still exists for backward compatibility purpose, but is nothing more than an alias, so you can just safely rename all your `me.AnimationSheet` objects to `me.Sprite`

# 3.0.x to 3.1.x (Stable)

### Bootstrap

-   in order the simplify and minize the amount of code required to launch a melonJS game, the [mobile optimisation tricks](https://github.com/melonjs/boilerplate/blob/master/index.html#L39-L51) we previously had in the [boilerplate](https://github.com/melonjs/boilerplate) have been moved directly into the melonJS codebase, shrinking down the "bootstrap" code to its bare minimum :

```js
<!-- Bootstrap -->
<script type="text/javascript">
    window.onReady(function onReady() {
        game.onload();
    });
</script>
```

### Debug

-   the [debug panels](https://github.com/melonjs/melonJS/tree/master/plugins/debug) will now automatically register themselves upon loading, which means that the following code is _**not**_ required anymore in your [game.js](https://github.com/melonjs/boilerplate/blob/master/js/game.js) file :

```js
// add "#debug" to the URL to enable the debug Panel
if (me.game.HASH.debug === true) {
    window.onReady(function () {
        me.plugin.register.defer(this, me.debug.Panel, 'debug', me.input.KEY.V)
    })
}
```

### Input

-   The [`bindGamepad`](http://melonjs.github.io/melonJS/docs/me.input.html#bindGamepad) function has been improved to allow binding of axes. Note that the function is still backward compatible with the 3.0.x API and will still accept the old parameter definition (it is recommended to follow the new parameter signature, as the deprecated one will be removed in future versions)

before (now deprecated) :

```js
me.input.bindGamepad(0, me.input.GAMEPAD.BUTTONS.FACE_1, me.input.KEY.X)
```

now :

```js
me.input.bindGamepad(
    0,
    {
        type: 'buttons',
        code: me.input.GAMEPAD.BUTTONS.FACE_1,
    },
    me.input.KEY.X
)
```

### Preloader

-   the [`me.loader.preloader`](http://melonjs.github.io/melonJS/docs/me.loader.html#preload) function now takes two additional (and optional) parameters that allow to directly specify the unload callback and if you want to switch to the built-in loading screen/state (default being yes). Note that both the following examples are still working, this just provide a shorter way to perform the same operation

before :

```js
// set all resources to be loaded
me.loader.onload = this.loaded.bind(this)

// set all resources to be loaded
me.loader.preload(game.assets)

// load everything & display a loading screen
me.state.change(me.state.LOADING)
```

now :

```js
// load all assets and switch to the default loading screen
me.loader.preload(game.assets, this.loaded.bind(this))
```

### State

-   the behavior of the `me.state.change` function has changed as nothing will now happen if you try to change again to the current state. If you need/want to call again the current state screen object `onResetEvent` function, you can do so using `me.state.current().onResetEvent();` (and eventually call as well `me.game.reset()` if required).

---

# 2.1.x to 3.0.x (stable)

### ES6

-   `String.contains` and `Number.sign` have been respectively replaced by their ES6 equivalent : `String.includes` and `Math.sign`

### namespace

-   `Object.extend` has been renamed to `me.Object.extend`, to fix compatiblity issues with other framework also modifying the base javascript Object (e.g. Facebook SDK, Underscore/loadash)
-   plugins are now registered to `me.plugins` to prevent collisions within the `me.plugin` namespace

### Renderables

-   renderables are now using a 3d Vector for position, using the z axis for layer ordering, which means that the `z` value is now available as a component of the renderable `pos` property. This applies to all objects derivating from the `me.Renderable` class, including `me.Entity`.
-   Default value for the anchor point has been changed to the center [0.5, 0.5]

### Entity

-   renderable are now positioned respectively to its anchor and the Entity's body anchor. Default value have also been changed to the center `[0.5, 0.5]`

### Input

-   `me.input.mouse` has been renamed to `me.input.pointer`; this is more consistent with the melonJS input/pointer API, as this object can not only represent a mouse, but also a pen or a finger.
-   the `me.event.MOVEMOVE`event name has been renamed to`me.event.POINTERMOVE`, as well to be more consistent with the pointer API.

### Containers

-   object containers now have an `auto-depth` feature that will automatically increment a child z value when added.

### TMX / Level

-   `me.game.currentLevel` has been removed; if you need any information on the current level please use `me.game.world` (or any container in which you loaded your level) to get a reference to the "live" loaded level (instantiated objects, layers, etc...), or `me.LevelDirector.getCurrentLevel()` to get a reference to the current level definition (level size, amount of objects, etc...)
-   `me.ImageLayer` is now drawn relative to the viewport boundary, and can be anchored appropriately
-   the `me.TMXTileMap.moveToCenter` and `me.TMXTileMap.reset` methods have been removed

---

# 2.0.x to 2.1.x (stable)

### General

-   Most keyword and name lookups have been made _case-sensitive_. This affects file names, pooling, and container child searches. If you need case-INsensitive container child searches, `me.Container.getChildByProp` and friends now accepts RegExp values.

```js
me.game.world.getChildByProp('name', /case-insensitive/i)
```

### Renderable

-   Renamed spritewidth/-height to `framewidth`/`frameheight` in `me.Sprite`, `me.AnimationSheet` and `me.ImageLayer`; this will clarify the api and limit confusion with the property name usage.

-   In an effort to normalize class constructor in melonJS, constructor signatures have been update to follow the following pattern : `(x, y, settings)`, with settings being an object containing additional parameters (please see related documentation for further details).

As an example, the following will now create a new `me.Sprite` object :

```js
// create a static Sprite Object
var mySprite = new me.Sprite(100, 100, {
    image: 'mySpriteImage',
})
```

and the following a new `me.AnimationSheet` object :

```js
// standalone image
var animationSheet = new me.AnimationSheet(0, 0, {
    image: 'animationsheet',
    framewidth: 64,
    frameheight: 64,
})
```

-   The `me.Font` API has been changed to accept a Renderer reference (as opposed to a Context2D reference previously) to better match the `me.BitmapFont` API, but also to be compatible with the WebGL renderer:
    -   me.Font#measureText
    -   me.Font#draw
    -   me.Font#drawStroke

### Video

-   `me.CanvasRenderer` and `me.WebGLRenderer` are now classes that can be instantiated with the `new` keyword. This allows creating renderer objects that can be passed to any draw method; the draw will be performed to the destination renderer instead of the screen renderer.

-   the `me.video.init()` has been refactored to be more flexible in terms of arguments. It now requires 3 parameters: `width`, `height` and a list of properties for the various options, all of them being optional :

```js
// init the video with a 640x480 canvas
me.video.init(640, 480, {
    wrapper: 'screen',
    renderer: me.video.CANVAS,
    scale: 'auto',
    maintainAspectRatio: true,
    transparent: true,
})
```

-   the video `me.sys.scalingInterpolation` setting, that is used to enable or disable anti-aliasing, has been renamed to `antiAlias` and is now available as part of the here above list of video option settings.

-   `me.TextureAtlas` has been renamed to `me.video.renderer.Texture`. The Texture class no longer supports sprite-sheet-in-texture-atlas; games should now use textures with each frame identified by its own atlas region.

-   `me.video.shader.gltexture2d()` has been renamed to `me.video.shader.createTexture()`

-   `me.video.shader.createShader()` has been updated to accept vertex and fragment shader GLSL source arguments.

### Matrix

-   `me.Matrix3d` has been removed; please use `me.Matrix2d` instead.

---

# 1.1.x to 2.0.x

### Collision Handling

-   world shape-based collision system : the former tile-based collision system has been replaced by the same SAT implementation used for entities. World collision shapes can be defined in Tiled using all standard objects like polygon (only convex with clockwise winding), ellipse, and polyline. Have a look at the [Platformer example](https://github.com/melonjs/melonJS/tree/99afd065b730712b6df0ec14a06fd5c1765d8cbc/examples/platformer) for details. You need to replace your "collision" tile layer with a "collision" object layer; the name is important.

-   entities now automatically respond to collision, based on the return value of the `me.Entity.onCollision` callback (returns `false` by default, meaning "Do not respond to this collision") Due to this change, the body instance no longer needs an `onCollision` callback; move it to your Entity class.

-   the [`me.collision.check`](http://melonjs.github.io/docs/me.collision.html#check) function signature has changed: It now only takes two arguments: `obj`, and optionally `respObj`. Multiple collision checks are always performed; the `onCollision` callback is always called on both objects for every collision pair; and a response object will always be populated and provided to the `onCollision` callbacks.

-   the old `me.game.world.collide*()` functions are no longer available, superseded by `me.collision.check()`

-   platform tiles are no longer supported. They are implemented in the Platformer example by using the new collision response customization. [Here's the relevant code](https://github.com/melonjs/melonJS/blob/59ab585931d9a10de60a35d957f0577e17648b8f/examples/platformer/js/entities/entities.js#L123-L138)

-   ladder tiles are also no longer supported. If you need to implement ladders in your game, this forum post might help get you started: https://groups.google.com/d/msg/melonjs/YQ0zE8T3vsc/5YOT9BuRqe0J

-   `me.game.collisionMap` is no more.

-   old (undocumented, deprecated, for-backward-compatibility-only) properties on the collision response object have been removed: `x`, `y`, `type`, `obj`. Please use the documented properties instead: http://melonjs.github.io/docs/me.collision.html#ResponseObject

### Body

-   as `me.Body` now supports multiple shapes, few function signature have been modified to reflect this change. Most noticeably, the `getShape()` function now takes an index as argument that allows to return the shape specified at the given Index.
-   a `removeShape()` and `removeShapeAt()` function have also been added allowing to manipulate the list of active shapes for a body.

### Shapes

-   `me.PolyShape` has been renamed to `me.Polygon`. Its constructor also no longer has a fourth `closed` parameter; polygons are always closed shapes.

### CanvasRenderer

-   all `fill*` and `stroke* `methods have removed the `color` and `lineWidth` parameters. Use the new `setColor()` and `setLineWidth()` methods.

### Renderable

-   the `me.Sprite.resize()` function has been renamed to `me.Sprite.scale()` in order to avoid confusion with the `me.Rect` `resize` function. By default, when scaling a renderable, the associated `me.Rect` object will keep the size of the original sprite.

-   removed `strokeLine()`, was a duplicate of `drawLine()`.

### Entities

-   `me.Entity` properties related to collision state have been removed: `onslope`, `onladder`, `disableTopLadderCollision`, `canBreakTile`, `onTileBreak`, and the private `collisionMap` have all been fully retired. These properties and features can now be reimplemented through clever use of the `onCollision` callback, as described above.

-   the `flipX`/`flipY`have been removed from `me.Entity` and `me.Body`, as these are pure renderable function (shape objects do not support these functions), and are now available only through the entity renderable child component. So in a custom me.Entity object, you would flip via: `this.renderable.flipX(true);`

### Container

-   A "floating child" within a "non-floating container" will disappear when the screen is scrolled. In 1.1.x and older, there was a bug that allowed non-floating containers to always be within the viewport. This bug is now fixed, but it also means the previous HUD pattern needs to be changed so that the HUD (container) is floating, instead of its children.

### Random Numbers

The `Number.prototype.random()` function has been fixed to follow the standard JavaScript `Math.random()` in regard to its exclusive range. It will no longer return the `max` value provided, but instead `max-1`. You can offset this by adding 1 to the max number if you want it to be inclusive:

```js
// melonJS 1.1.x and older
Number.prototype.random(0, 2) // return a random number; one of 0, 1, 2

// melonJS 2.0.0
Number.prototype.random(0, 3) // return a random number; one of 0, 1, 2
```

This fixes a bug that makes it very easy to overflow array bounds by accident. E.g. The following now works as expected:

```js
// Select a random frame
this.curFrame = this.frames[Number.prototype.random(0, this.frames.length)]
```

In older versions, you would have to _subtract 1_ from the array length to make this kind of access safe.

---

# 1.0.x to 1.1.x

### Inheritance Changes

The inheritance logic has changed substantially, and is now based on [Jay's fast inheritance micro library](https://github.com/parasyte/jay-inheritance). You will need to re-work your game to use the new changes, otherwise you will get many many errors. Presently in 1.0.x and previous, you would extend a base class and call the base methods like so:

```js
var myRenderable = me.Renderable.extend({
    init: function () {
        this.parent(new me.Vector2d(0, 0), 50, 50)
    },
})
```

To make performance improvements and enforce better rules you now need to invoke a `_super` method. Passing the base class itself, a string representing the method name, and an array of the arguments:

```js
var myRenderable = me.Renderable.extend({
    init: function () {
        this._super(me.Renderable, 'init', [new me.Vector2d(0, 0), 50, 50])
    },
})
```

Note that parent properties can still be referenced as per 1.0.x.

```js
var myClass = Object.extend({
    init: function () {
        this.myProp = 10
    },
})

var myClassTwo = myClass.extend({
    init: function () {
        this._super(myClass, 'init')
        console.log(this.myProp) // outputs 10
    },
})
```

When extending another class, you must define an `init` method, even if you simply keep it empty:

```js
var myRenderable = me.Renderable.extend({
    init: function () {},
})
```

Not passing an init will throw an exception.

Note that in the hash you pass to it, only methods can be defined, not properties. If you need to define a property, do so in the init method (constructor):

```js
var myRenderable = me.Renderable.extend({
    // wont work
    radius: 10,
    init: function () {
        this._super(me.Renderable, 'init', [new me.Vector2d(0, 0), 50, 50])
    },
})

var myRenderable = me.Renderable.extend({
    init: function () {
        this._super(me.Renderable, 'init', [new me.Vector2d(0, 0), 50, 50])
        // correct
        this.radius = 10
    },
})
```

If you do pass a property in the hash, it will raise an exception.

### AnimationSheet now accepts x, y and a settings hash to its constructor.

```js
// this is the new constructor
var animationSheet = new me.AnimationSheet(200, 55, {
    image: me.loader.getImage('player'),
    spritewidth: 55,
    spriteheight: 55,
})

// the old constructor
var animationSheet = new me.AnimationSheet(
    200,
    55,
    me.loader.getImage('player'),
    55,
    55
)
```

### Renderable

The base renderable class now accepts x & y integer values over a `me.Vector2d` instance. Example:

```js
var myRenderable = new me.Renderable(0, 20, 50, 50)
```

Renderable objects now all implements the two following functions, replacing the former `onResetEvent` and `onDestroyEvent` callbacks :

-   `onActivateEvent`, that is triggered when the object is "born" into the world, and where you can do things like setting its initial position, animation, health, register pointer event handlers, and other state information.
-   `onDeactivateEvent`, triggered when the world is destroyed, and where you should do things like deregistering pointer events, and unsubscribing from minpubsub.

### me.audio.play callback works the same as pre-1.0.0

In 1.0.x, the callback for me.audio.play changed from "called when sound clip ends" to "called to inform you of the audio clip's internal ID after it is created". This is of limited use, and just exposes some of the internals.

1.1.0 fixes this broken behavior and goes back to being called when the sound clip ends. If you want to get the sound ID for any reason, there's a new `oncreate` callback that you can pass to `me.audio.play()` as the fifth parameter which works like `callback` did in 1.0.x.

### Entity Object Design change

-   the previous entity object design has been re-structured using a composition approach (as opposed to the previous inheritance based design), which will provide a more modular approach, but will also enable faster execution time by lowering the amount of properties per object.
-   Entity now has a new `me.Body` child object that will hold all physic/collision related properties and functions, and where are also defined all collision shapes (introduced in 1.0.x) :

```
me.Entity
     |__ me.Body
             |____ me.Shapes[]
     |__ me.Renderable
```

you can also read more about the key benefits of this new design by reading the following article : http://www.radicalfishgames.com/?p=1725

-   to better highlight this change during the old 'me.ObjectEntity' object has been renamed to 'me.Entity'

### Collision check and collision filtering

-   The collision algorithm has been "upgraded" with a full SAT based one, which now allows for polygon based collision detection, and for more accurate collision response. The previous collision check function has therefore been deprecated and replaced by a new [`me.collision.check()`](http://melonjs.github.io/docs/me.collision.html#check) function.

-   Refined collision filtering is now possible through the usage of `me.body.setCollisionMask()` function (that defines what should collide with what) and the `me.body.collisionType` property that replace the previous `me.Entity.type` one and defines the entity body type (see `me.collision.types` for a full list of possible type). By default, all entities are set to collide with any other entities.

-   the new [`me.body.setCollisionMask`](http://melonjs.github.io/docs/me.Body.html#setCollisionMask) function can also now be used to disable collision detection for a specific object, by clearing the specified filter : `this.body.setCollisionMask(me.collision.types.NO_OBJECT);`

### Shape object changes

-   `me.Ellipse` now takes the given coordinates in the constructor as the ellipse center point (as opposed to the top-left coordinates), width and height specifying the "horizontal" and "vertical" diameter of the ellipse.
-   All shape objects (`me.Rect`, `me.PolyShape`, `me.Ellipse`) now accept x & y integers over a `me.Vector2d` instance. Example:

```js
var myRect = new me.Rect(100, 100, 50, 50)
var myEllipse = new me.Ellipse(50, 50, 10, 15)
```

### Object name changes

on top of the new `me.Entity` object here above described, the following class names have been change :

-   `me.SpriteObject` has been renamed to `me.Sprite`
-   `me.ObjectContainer` has been renamed to `me.Container`

### Video changes

The `me.video.init` method that you call at the beginning of your game now has an additional parameter, placed in the 2nd spot. It only accepts one value for now, but this is in prep for 1.2.0 changes to support WebGL. So update your method call as such:

```js
me.video.init('screen', 800, 600, true, 'auto')
```

Changes to:

```js
me.video.init('screen', me.video.CANVAS, 800, 600, true, 'auto')
```

Also note that the `me.CanvasRenderer` object is passed to the draw calls of all the objects added to the world container and other subsequent containers. This means if you are doing anything like:

```js
draw : function (context) {
    context.fillStyle = '#f00';
    context.fillRect(10, 10, 100, 100);
}
```

That will no longer work as expected. As a simple work around, you can grab the context directly:

```js
draw : function (renderer) {
    var context = renderer.getContext();
    context.fillStyle = '#f00';
    context.fillRect(10, 10, 100, 100);
}
```

But then you are still stuck on the canvas renderer when we implement the WebGL renderer for 1.2.0. So try to use the methods on me.CanvasRenderer when possible:

```js
draw : function (renderer) {
    renderer.fillRect(10, 10, 100, 100, '#f00');
}
```

We will continue to add new drawing functions to the canvas render to support things like line drawing. Anything really fancy, you're probably better off drawing to a canvas to create a texture. Or you can stick with the canvas renderer entirely.

**getSystemCanvas getSystemContext getScreenCanvas getScreenContext methods**

If you used any of the above, the equivalents are now on the renderer:

```js
me.video.renderer.getCanvas() // getSystemCanvas
me.video.renderer.getContext() // getSystemContext
me.video.renderer.getScreenCanvas()
me.video.renderer.getScreenContext()
```

### New `Error` classes for error handling

Pre-1.1.0 versions would throw exceptions using a string. While this does the job, it isn't easy to do proper error handling. Now we expose new classes that can be used to handle errors with fine-grained control.

All exceptions extend the base class `me.Error`. Here is the class hierarchy for the exception classes:

-   `me.Error`
-   `me.audio.Error`
-   `me.Body.Error`
-   `me.loader.Error`
-   `me.Renderable.Error`
    -   `me.Container.Error`
    -   `me.Entity.Error`
-   `me.TextureAtlas.Error`
-   `me.Vector2d.Error`
-   `me.video.Error`

And here is an example using the error classes for fine-grained error handling:

```js
try {
    // Do something which throws an exception ...
} catch (e) {
    if (e instanceof me.Entity.Error) {
        // Handle Entity errors ...
    } else if (e instanceof me.Container.Error) {
        // Handle Container errors ...
    } else {
        // Raise other errors to the next handler in the call stack.
        throw e
    }
}
```

For additional reading on these changes, also check out the wonderful post by [Andre Antonio Schmitz](https://github.com/aaschmitz) http://blog.ciangames.com/2014/09/upgrading-to-melonjs-11.html

---

# 0.9.1x to 1.0.x

-   `me.audio.play()` Callback no longer works as expected. See [#515](https://github.com/melonjs/melonJS/issues/515) for details. Here is a workaround that will allow `callback` to work as it did pre-1.0.0:

```js
function play(soundName, loop, callback, volume) {
    var soundId = -1
    function saveSoundId(id) {
        soundId = id
    }

    function endSound(id) {
        if (id === soundId) {
            callback()
        }
        sound.off('end', endSound)
    }

    var sound = me.audio.play(soundName, loop, saveSoundId, volume)
    sound.on('end', endSound)
    return sound
}
```

Just call this `play` function in place of `me.audio.play`, and it will work as expected!

-   Object `update()` function now has a `dt` parameter that provides the elapsed time since the last update in milliseconds. If you do redefine the function in your own object, be sure to pass the parameter when calling the parent function. Example:

```js
update : function(delta) {
    this.updateMovement();
    if(this.vel.x != 0 || this.vel.y != 0) {
        this.parent(delta);
        return true;
    }
    return false;
}
```

-   Obsolete functions under the `me.game` namespace (like add, remove, sort objects) have been removed as they are now accessible in a more standard way through the `me.ObjectContainer` API (and ultimately `me.game.world`)
-   `me.ObjectContainer.getEntityBy*` style function have been renamed to a corresponding `getChildBy*` function
-   the `me.game.getEntityContainer()` function has been renamed to `me.game.getParentContainer()`
-   the `me.utils.RGBToHex()` and `me.utils.HexToRGB()` functions have been removed and replaced by equivalent function in the new `me.Color` class.
-   `me.SpriteObject.flicker()` function now takes the total duration input in milliseconds (as opposed to frame count in the previous version). This is now fully aligned with other functions in melonJS also taking a duration parameter as input.
-   `me.save.delete()` has been renamed to `me.save.remove()` as `delete` is a reserved keyword and was causing issues with some IDEs.
-   the viewport bounds are now defined as a rectangle (as opposed to previously as just width and height), and the related `setBounds` function has been modified to allowing defining the new rectangular bounds.
-   viewport bounds are now set to `Infinity`, instead to the viewport size. This will however only affect non TMX based games, as when loading a Tiled level, melonJS will automatically adjust the viewport bounds to the map/level size.
-   Entity's `collisionBox` properties have been replaced by a more "standardized" approach. Collisions boxes are now defined through Shape objects, and accessible through the `addShape`, `setShape`, `getShape` functions. Collision shape object position is now also relative to their parent object.
-   melonJS now properly support non rectangular shapes (Ellipse and Polygon), although AABB collision detection is still performed using the corresponding bounding rect (using the also new `getBounds` functions).
-   Now obsolete/deprectated `updateColRect` and `adjustSize` functions have been removed, as related properties can now directly be set on shape object, as shown below :
    before (\<0.9.11) :

```js
// update the hit box
this.updateColRect(20, 32, -1, 0)
```

now (1.0.0):

```js
// update the collision shape rect
var shape = this.getShape()
shape.pos.x = 20
shape.resize(32, shape.height)
```

-   the possibility to add a `ScreenObject` to the world container has been removed. This was a hack-ish implementation, inducing multiple small bugs difficult to fix (as more or less opposed to the engine philosophy). If you were using this feature, please use instead the more standard `Renderable` update/draw pattern (check out the redesigned default Loading Screen if you need an example).

-   melonJS will now respect the object size as defined in Tiled when parsing/creating related object in the game world, as opposed to previously where the object corresponding shape for collision was automatically adjusted based on the sprite size; and as a consequence, the `width` and `height` properties (in the `settings` dictionnay) are now mandatory when manually creating an entity. This allows to make objects less dependent to their renderable components, and will ease potential integration with physic engine, but also to more easily define the collision shape directly from Tiled (without having to programmatically modify it if necessary)

-   minPubSub resume and restart events will now pass the elapsed time during pause or stop time as a parameter to the callback function

-   the `me.Rect.set()` and `me.Font.set()` functions have been renamed respectively to `me.Rect.setShape()` and `me.Font.setFont()`, to avoid any conflicts with parent functions (when using inheritance)

-   the `me.entityPool` API has been renamed to `me.pool`, as not only entities can be used with object pooling, and related functions have also been updated to be shorter and less confusing :

    -   `me.pool.add` -> `me.pool.register` (as this was never about adding object, but about registering them)
    -   `me.pool.newInstanceOf` -> `me.pool.pull` (as an instance is pulled of the pool, instead of being creating)
    -   `me.pool.freeInstance` -> `me.pool.push` (as the object instance is pushed back in the pool for recycling)

-   the deprecated and duplicated `collide()` and `collideType` functions have been removed from `ObjectEntity` and `me.game`. These functions are now (officially) only available using the world object : `me.game.world.collide` & `me.game.world.collideType`

-   the `me.Vector2d.scale()` function has been updated to now accept scalar values. To multiply a vector by another vector please use the new 'me.Vector2d.scaleV()` function.

-   following the standardization of the pointer event at the [W3C](http://www.w3.org/), melonJS now only accepts, when supported, the [standard](http://www.w3.org/TR/pointerevents/#list-of-pointer-events) Pointer Event list. This allows to present an unique API from a high-level perspective, while supporting other event model (iOS, legacy mouse event) through the already present fallback mechanism.

-   The `visible` property has been removed from `me.Renderable`. Now if you do not want a renderable object to be visible, the recommended way is either to actually remove the object from the stage, or make it fully transparent (using `setOpacity`).

---

# 0.9.9 to 0.9.1x

-   No API Change

---

# 0.9.8 to 0.9.9

-   the `me.video.createCanvasSurface()` function has been removed and superseed by a `me.video.getContext2d(canvas)` function, that will also now enable/disable antialiasing option when required. To update your code just replace the current (for example) `var ctx = me.video.createCanvasSurface(100, 20);` by `var ctx = me.video.getContext2d(me.video.createCanvas(100, 20));`

-   sorting capabilities have been improved and melonJS now features built-in algorithm for sorting on `z`, `x` or `y` values. To configure the sorting algorithm, just set the `sortOn` property to the desired value. For example, to sort on `y` value, add the following before loading any levels : `me.game.sortOn = "y";`

-   melonJS now auto-sort objects when added into the game world, which means that by default, you do not need anymore to call the sort function ! auto-sorting can however be temporary disabled if required (e.g. when adding a batch of several objects)

-   the [`animationspeed`](http://melonjs.github.io/docs/me.AnimationSheet.html#animationspeed) property and `animationspeed` parameter of the [`addAnimation`](http://melonjs.github.io/docs/me.AnimationSheet.html#addAnimation) function, now both define the delay between frames in terms of milliseconds (as opposed to framecount, in previous version)

-   the tween code has been updated to the last official [r11 version](https://github.com/sole/Tween.js). Besides new added functions, Easing constants `EaseNone`, `EaseIn`, `EaseOut` and `EaseInOut` have been renamed to `None`, `In`, `Out` and `InOut`.

-   a new [`me.device`](http://melonjs.github.io/docs/me.device.html) object has been added that contains device capabilities flag and device specific events management (device motion/orientation). As a consequence, accelerometer events are now managed through `me.device` (as opposed to `me.input`), and all read-only capabilities flag from `me.sys` have been moved to `me.device`. A particular point of attention is on the previous `me.sys.isMobile` flag that is now `me.device.isMobile` as this one is commonly used (especially in the previous boilerplate html file). Also, the `me.sys.gyro` capability detection flag has been renamed to `me.device.hasAccelerometer`.

-   the obsolete `me.sys.cacheImage` setting has been removed as it was not bringing any real benefits.

-   `me.Viewport.screenToWorld` and `me.Viewport.worldToScreen` have been respectively renamed to `me.Viewport.localToWorld` and `me.Viewport.worldToLocal`.

-   melonJS now automatically and properly manage high-DPI devices, which means that the following lines from the previous boilerplate html file must be removed :

```js
// Retina viewport settings
if (window.devicePixelRatio > 1) {
    document
        .getElementById('viewport')
        .setAttribute(
            'content',
            'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'
        )
}
```

-   `me.Rect.getRect()` has been renamed to `me.Rect.getBounds()`

-   The ImageLayer implementation is now relying on the minpubsub messaging system to keep it synchronized with any viewport changes. As a consequence, it is highly recommended to use the dedicated `me.Viewport.move(x, y)` function when manually changing the viewport position rather than manually updating the position vector.

-   `me.HUD` and `me.HUD_Object` have been removed in favor of the new `me.ObjectContainer` class. A full implementation is available in the [Platformer Example](https://github.com/melonjs/melonJS/blob/master/examples/platformer/js/entities/HUD.js).

---

# 0.9.7 to 0.9.8

-   the `tps` data type used when preloading "Atlas" file has been redefined into a generic `json` data type (Atlas file format supported in melonJS are anyway JSON based formatted).

-   `me.input.touches` has been renamed to `me.input.changedTouches`, to "match" with the available touch information of the corresponding event (iOS event model)

-   the `me.Rect.containsPoint()` function has been renamed to `me.Rect.containsPointV()`, in order to indicate that the expected parameter is a `me.Vector2d` object. The former ``me.Rect.containsPoint()` now expect two integer as parameter.

-   the `me.input.registerMouseEvent` and `me.input.releaseMouseEvent` have been removed to `me.input.registerPointerEvent` and `me.input.releasePointerEvent` in order to be more generic in terms of naming

---

# 0.9.6 to 0.9.7

-   default alignment for [`me.BitmapFont`](http://melonjs.github.io/docs/me.BitmapFont.html) has been changed to 'left', in order to be inline with [`me.Font`](http://melonjs.github.io/docs/me.Font.html) and the corresponding default CSS text align property.

-   new `me.Font.textBaseline` and default set to 'top', to match default behavior of `me.BitmapFont`. Y-coordinate now points to the top of the text by default, instead of the alphabetic baseline (as in CSS default).

-   the `me.BitmapFont.measureText` function now takes `context` as first parameter, as for the `me.Font.measureText` function

-   New class [`me.Renderable`](http://melonjs.github.io/docs/me.Renderable.html) for implementing objects that may draw to the screen.

-   [`me.ObjectEntity`](http://melonjs.github.io/docs/me.ObjectEntity.html) does not inherit anymore from [`me.AnimationSheet`](http://www.melonjs.org/docs/me.AnimationSheet.html); [`me.SpriteObject`](http://melonjs.github.io/docs/me.SpriteObject.html) or [`me.AnimationSheet`](http://melonjs.github.io/docs/me.AnimationSheet.html) can now be set through the new `renderable` property.

-   [`me.Renderable`](http://melonjs.github.iog/docs/me.Renderable.html) objects position are now set based on the corresponding [`me.ObjectEntity`](http://melonjs.github.io/docs/me.ObjectEntity.html) container anchor point. With default position being (around) the center of the [`me.ObjectEntity`](http://melonjs.github.io/docs/me.ObjectEntity.html). To change the default anchor point value you can for example use the following to align the [`me.Renderable`](http://melonjs.github.io/docs/me.Renderable.html) object to the center-bottom line of the entity : `me.ObjectEntity.anchorPoint.set(0.5, 1.0);`

-   `me.InvisibleEntity` has been removed, as following previous changes, this can now be achieved using a [`me.ObjectEntity`](http://melonjs.github.io/docs/me.ObjectEntity.html) without a renderable component.

-   [`me.TMXTileMap`](http://melonjs.github.io/docs/me.TMXTileMap.html), [`me.TMXLayer`](http://melonjs.github.io/docs/me.TMXLayer.html) and friends now inherit from [`me.Renderable`](http://melonjs.github.io/docs/me.Renderable.html). The `width` and `height` properties now measure the layer size in pixels (replaces the old `realwidth` and `realheight` properties). And the `cols` and `rows` properties now measure layer size in tiles (replaces the old `width` and `height` properties).

-   `me.ImageLayer.offset` is now `me.ImageLayer.pos`

-   [`me.Viewport.shake()`](http://melonjs.github.io/docs/me.Viewport.html#shake) accepts `duration` parameter in _milliseconds_ instead of frames.

-   Objects added to the game engine with [`me.game.add()`](http://melonjs.github.io/docs/me.game.html#add) must be inside the viewport to update/draw. If you need to force an object to update, regardless if it is outside the viewport, you can set the new [`alwaysUpdate`](http://melonjs.github.io/docs/me.Renderable.html#alwaysUpdate) property on the object to true.

-   `me.ObjectEntity` [`collidable`](http://melonjs.github.io/docs/me.ObjectEntity.html#collidable) property is now also used, when resolving collision, to determine if the object should collide with the environment (was previously only used for entities against entities collision detection).

---

# 0.9.5 to 0.9.6

-   no API change

---

# 0.9.4 to 0.9.5

-   [`me.GUI_Object`](http://melonjs.github.io/docs/me.GUI_Object.html) :<br>
    the `onClicked()` function has been renamed to `onClick()`

-   [`me.sys.scale`](http://melonjs.github.io/docs/me.sys.html#.scale) :<br>
    is now a [`me.Vector2d`](http://melonjs.github.io/docs/me.Vector2d.html) object, allowing the engine to use different scaling factor on both X and Y axis`.

-   floating object :<br>
    Floating objects drawing position is now automatically managed by the engine. Which means that were previously you had to manually take care of positioning your object using screen coordinates (by subtracting the viewport position), the position vector will now be directly interpreted as screen or world coordinates, based on the object floating property.

-   `me.video.getScreenCanvas()` and `me.video.getScreenFrameBuffer`:<br>
    following the recent added scaling features, functions to get a reference to the system canvas and corresponding context have been renamed to [`me.video.getSystemCanvas()`](http://melonjs.github.io/docs/me.video.html#getSystemCanvas) and [`me.video.getSystemContext()`](http://melonjs.github.io/docs/me.video.html#getSystemContext).

-   `me.ObjectEntity.checkCollision()` has been replaced by [`me.ObjectEntity.collide(Boolean)`](http://melonjs.github.io/docs/me.ObjectEntity.html#collide)<br>
    the function also takes an optional parameter to specify if melonJS should check for multiple collision.

-   the [`me.ObjectEntity.visible`](http://melonjs.github.io/docs/me.SpriteObject.html#visible) property is now used to control if the object has to be drawn (end-user visibility flag). If you need to check if the object is currently visible in the viewport, please use the [`inViewport`](http://melonjs.github.io/docs/me.SpriteObject.html#inViewport) property.

-   Parallax Layers :<br>
    The previous (hackish) parallax layer implementation has been rewritten using the new Image Layer feature available in Tiled 0.9.0.

---

# 0.9.3 to 0.9.4

-   Map rendering : melonJS added a dynamic layer rendering feature (configurable [globally](http://melonjs.github.io/docs/me.sys.html#.preRender) or per layer through Tiled by adding the `preRender` property in your layer property list). Layers are now using the dynamic renderer by default (while previous version of melonJS was using off-screen rendering)

---

# 0.9.2 to 0.9.3

-   no API change

---

# 0.9.1 to 0.9.2

-   **[`ObjectEntity.updateMovement()` function](http://melonjs.github.io/docs/me.ObjectEntity.html#updateMovement) :**<br>
    In the previous version of melonJS, the `updateMovement()` function was returning a Boolean, indicating if the player velocity changed (final velocity different from 0) :

```js
// check & update player movement
var updated = this.updateMovement()
// update animation if updated
if (updated) {
    // update objet animation
    this.parent(this)
    return true
}
return false
```

In the 0.9.2 version of melonJS, the `updateMovement()` function now returns a collision “vector”, giving you indication on how you collided with the environment (the level itself, not other entities). Assuming that you don’t need that information, if you just want to upgrade you existing game, the simple solution is to do the following :

```js
// check & update player movement
this.updateMovement()
// update animation if updated
if (this.vel.x != 0 || this.vel.y != 0) {
    // update objet animation
    this.parent(this)
    return true
}
return false
```

As you can see, we replaced the `updated` variable by a check on `(this.vel.x!=0 || this.vel.y!=0)`, and since this what was returned by the `updateMovement()` in the previous version, it gives us exactly the same behavior.

-   **[`me.state.transition()` fadeIn/fadeout functions](http://melonjs.github.io/docs/me.state.html#transition) :**<br>

in melonJS 0.9.2, the fade effect are now taking as input a duration in ms, where it was in framecount for the previous version :

before :<br>

```js
// set a fade transition effect
me.state.transition('fade', '#000000', 30) // 30 frame
```

now :<br>

```js
// set a fade transition effect
me.state.transition('fade', '#000000', 500) // 500ms
```

---

# 0.9.0 to 0.9.1

-   no API change
