---
layout: ../../layouts/MDLayout.astro
---

## Table of Contents

1. [How to optimize your game for performance](#optimization)
2. [How to package your game for Windows, Mac, or Linux](#packaging)
3. [How to access object properties or methods from another object](#property_access)
4. [How to enable and use the object pooling feature](#object_pooling)
5. [Handling mouse or touch events on multiple overlapping objects](#overlapping_touches)
6. [Using form inputs in your game](#form_inputs)
7. [Resolving collisions properly](#collisions)

---

### <a name="optimization"></a> **1. How to optimize your game for performance :**

-   For tile maps, make sure to use a [rendering method](http://melonjs.github.io/melonJS/docs/me.sys.html#preRender) adapted to your game, enabling it per layer (layers with sparse tiles should not have the pre rendering enabled). Layers with very few tiles draw faster dynamically, because only a few small draw operations occur, instead of one giant draw operation using mostly invisible pixels (context.drawImage() is not optimized for invisible pixels).
-   Enabling [double buffering](http://melonjs.github.io/melonJS/docs/me.video.html#init) could help as well to decrease the amount of draw operations (works entirely with an off-DOM canvas and it is copied to the visible canvas at the end of the rendering cycle).
-   Using [Object Pooling](http://melonjs.github.io/melonJS/docs/me.pool.html) will help reducing memory usage by reusing object and lowering the use of garbage collector.
-   Try 3rd party Application Wrappers solution like [Cordova](https://cordova.apache.org) that provide Canvas accelerated environments on mobile devices.
-   If you use TexturePacker [disable](http://www.codeandweb.com/texturepacker/documentation#layout) texture rotation, as it forces melonJS to apply a default rotation angle when drawing sprites and, based on how many sprites are to be displayed, can impact performance.
-   Use PNG images with alpha channel instead of the "transparent color" settings in Tiled tilesets. Even though the performance burden will occur only on load, you will notice it frequently if the map is loaded more than once while playing.
-   The game resolution is one of most important factor that influences the performance, try lowering the resolution in the call to [me.video.init](http://melonjs.github.io/melonJS/docs/me.video.html#init). Also it might be best to disable auto-scaling video.
-   Optimize your assets, using a Texture Atlas (like [Texture Packer](https://github.com/melonjs/melonJS/wiki/How-to-use-Texture-Atlas-with-TexturePacker) or [Shoebox](https://github.com/melonjs/melonJS/wiki/shoebox)) and unless you are certain to use only WebGL2, use fixed sized assets that are square and powers-of-2, like 512x512px, 1024x1024px, 4096x4096px or not square but powers-of-2, like 512x256px, 1024x512px, 4096x2048px (this optimize the use of GPU memory).
-   Optimize your Tiled maps, the same should be square and powers-of-2, like 512x512px, 1024x1024px, 4096x4096px or not square but powers-of-2, like 512x256px, 1024x512px, 4096x2048px (this also optimize the use of GPU memory).
-   For optimizing many entities (like characters) melonJS provides you with some useful features like culled updates (configurable with [me.Renderable.alwaysUpdate](http://melonjs.github.io/melonJS/docs/me.Renderable.html#alwaysUpdate) - off by default, so off-screen entities do not use any additional CPU time for AI) and avoiding garbage collection stalls using entity pooling.
-   Avoid using the me.Text class more than necessary during in-game ; and rather use [`BitmapText`](http://melonjs.github.io/melonJS/docs/me.BitmapText.html), especially when using WebGL.
-   There are a ton of good programming practices you can follow that will avoid unnecessary calculations. For example, it is faster to check an object property directly: `if (this.last_animation === "walk")` than it is to call a function that provides the same information: `if (this.isCurrentAnimation("walk"))`
-   Avoid `Number.prototype.degToRad()` and friends - use radians directly to express rotation angles. For example, a full turn is always `Math.PI * 2`, a half turn is `Math.PI`, a quarter turn is `Math.PI * 0.5`, etc.
-   Try a lower fps rate. Does your game really require 60fps?
-   Use the Chrome JavaScript profiler or similar to locate problem areas.

---

### <a name="packaging"></a> **2. How to package your game for Windows, Mac, or Linux :**

-   There are several solutions out-there, but one that is known to work very well with melonJS is [Node-Webkit](https://github.com/rogerwang/node-webkit), a stand-alone chromium wrapper that will let you package and distribute your games natively for Windows, Mac, and Linux.
-   [electron](https://github.com/atom/electron) is newer, more frequently updated, and backed by Github for Atom.
-   [brackets-shell](https://github.com/adobe/brackets-shell) is pretty much the same thing, made by Adobe for Brackets. This one is based on CEF, which is updated infrequently.
-   Another known solution is [cross-walk](https://crosswalk-project.org/) that uses Chromium to provides the same HTML5 features and capabilities you would expect to find in most modern web browsers.

---

### <a name="property_access"></a> **3. How to access object properties or methods from another object :**

-   First step is to get a reference to the _target_ object using [me.game.world.getChildByName()](http://melonjs.github.io/melonJS/docs/me.Container.html#getChildByName).
-   **`me.game.world.getChildByName()` should only be called once**, and the result saved to your game's global namespace.
-   For example, to get a reference to an object named "player", you should call `me.game.world.getChildByName()` in your [onLevelLoaded](http://melonjs.github.io/melonJS/docs/me.game.html#onLevelLoaded) callback. If your global namespace is called `game` like in the [melonJS boilerplate](https://github.com/melonjs/boilerplate), save the result there:

```js
game.player = me.game.world.getChildByName('player')[0]
```

-   The return value is an array. So when you have one player object, it will be the only element in the array.
-   Now you can access properties and methods on the "player" object through `game.player`:

```js
// Get current player position
var player_pos = game.player.pos

// call one of the player function
game.player.foo()
```

---

### <a name="object_pooling"></a> **4. How to enable and use the object pooling feature :**

Object Pooling allows you to greatly reduce the overhead of creating entities programmatically, and it is very useful with entities that are created and destroyed often (like bullet or laser entities). By using this feature, new instances of your entity won't be created each time you need a new one (which increases memory usage and potentially slowing your game), but rather activated or pulled from the pool. When an entity is then destroyed, it is placed back into the pool to await the next request.

So, how to use this great stuff? Let's have a look first at how to manually add an new entity (here `EntityLaser`) to the game manager:

```js
// Create a new laser object
var myLaser = new EntityLaser('laser', this.pos.x, this.pos.y)
// Add the laser to the game manager with z value 3
me.game.world.addChild(myLaser, 3)
```

Now to use entity pooling, the first thing is to associate a unique identifier to the object's class within the entity pool. This action has to be done one time only, preferably in your main `loaded` function:

```js
me.pool.register('laser', EntityLaser, true)
```

Here we define `"laser"` as the unique identifier for the `EntityLaser` class in the entity pool. Also note that `true` is used as the last parameter to actually enable the object pooling for this particular entity type.

After this is done, we are ready to create new entities as before, with a slight difference on the object instantiation itself:

```js
// Create a new laser object
var myLaser = me.pool.pull('laser', this.pos.x, this.pos.y)
// Add the laser to the game manager with z value 3
me.game.world.addChild(myLaser, 3)
```

As you can notice, we no longer directly instantiate the object but request a new instance of the entity identified by the `"laser"` id, which was declared to use our `EntityLaser` class.

One specific point of attention when using this is the object properties initialization, as you should carefully ensure that all of them are properly set/reset to their default value in the entity init method.

That's it!

---

### <a name="overlapping_touches"></a> **5. Handling mouse or touch events on multiple overlapping objects :**

For most uses, the mouse/touch listeners will work great as long as the rects are in different parts of the screen. If any of them overlap you can run into trouble quickly. One obvious example is when registering mouse/touch events for the same `me.Rect` on multiple objects; wanting to use `me.game.viewport` is rather common.

The trouble starts when you want to release the event, because a callback isn't provided to `me.input.releasePointerEvent()` specifying which callback should be released. Instead, it releases all callbacks on the provided `me.Rect`. (Side note: This may change in a future version of melonJS.)

As an immediate workaround, consider changing your code to register the event in a single "top level" object, and then delegate the event using the super awesome minpubsub!

First, the top-level event handler should be updated to only re-publish the event:

```js
me.input.registerPointerEvent(
    'pointerdown',
    me.game.viewport,
    function (event) {
        me.event.publish('pointerdown', [event])
    }
)
```

Then setup some event listeners:

```js
me.event.on('pointerdown', this.pointerDown, this)
```

When you are ready to destroy the object which has an open subscription, you must unsubscribe:

```js
me.event.off(this.pointerDown)
```

And you can safely destroy the event delegator when you no longer need to handle any mouse/touch events:

```js
me.input.releasePointerEvent('pointerdown', me.game.viewport)
```

---

### <a name="form_inputs"></a> **6. Using form inputs in your game :**

You have the option of positioning and styling the HTML elements using CSS. Using the HTML elements will take care of all kinds of corner cases for you: basic navigation features using keyboard and mouse input. Even things you necessarily don't have to think about, like focus, tab selection, copy+paste, scrolling, etc. And on Mobile, using native HTML form elements relieve you of reimplementing the virtual keyboard, since the native keyboard only appears when an HTML text element is focused!

The HTML form elements also provide pretty simple APIs to get and manipulate their values. Especially if you are already using a library like jQuery.

Here's a class that implements a text input, using jQuery to simplify the code:

```js
class TextInput extends Renderable {
    constructor(x, y, type, length) {

        super(x, y, length, 16);

        this.$input = $('<input type="' + type + '" required>').css({
            "left" : x,
            "top" : y
        });

        switch (type) {
        case "text":
            this.$input
                .attr("maxlength", length)
                .attr("pattern", "[a-zA-Z0-9_\-]+");
            break;
        case "number":
            this.$input.attr("max", length);
            break;
        }

        $(me.video.getParent()).append(this.$input);
    }

    onDestroyEvent : function () {
        this.$input.remove();
    }
};
```

The real magic comes from using CSS to position the elements as expected within the viewport:

```css
#screen {
    position: relative;
}

#screen input {
    position: absolute;
    z-index: 2;
}
```

You can also style the HTML inputs with background and font-color, font styles, border styles, etc. to better match your game.

And of course you can always manipulate the HTML element contents using the jQuery element reference, eg. with `this.$input.val()` and so on.

---

### <a name="collisions"></a> **7. Resolving collisions properly :**

Collision detection is hard! The naïve approach to detecting collisions in a pixel-perfect manner is identical to the naïve approach of detecting collisions in a tile grid. The only difference between these cases is granularity; the area of a "solid" rectangle, and the tradeoff is how fast it can run with different granularities. As it turns out, the naïve approach is also the easiest to understand and implement.

Naïve collision detection checks for overlaps between two rectangles. That might be a sprite rectangle overlapping a tile, or a pixel overlapping another pixel; it's just a matter of granularity! This is called an [AABB test](http://en.wikipedia.org/wiki/Minimum_bounding_box#Axis-aligned_minimum_bounding_box), and it involves comparing the top, left, right, and bottom coordinates of both rectangles in end-end order: top\<=\>bottom, bottom\<=\>top, left\<=\>right, right\<=\>left. That's four comparisons total. It's pretty fast when the granularity is large!

With melonJS, we want the best of both worlds; the accuracy of pixel-perfect collision detection with very high performance. To achieve this, the engine uses a combination of algorithms; [QuadTree](http://en.wikipedia.org/wiki/Quadtree), AABB tests, [SAT](http://en.wikipedia.org/wiki/Hyperplane_separation_theorem#Use_in_collision_detection) ... in roughly that order. QuadTree allows fast lookups of _nearby_ objects which are candidates for collisions, the AABB test further filters objects that are definitely not colliding, and SAT performs very fast pixel-perfect collisions against arbitrary polygons and circles.

But wait! Collision _detection_ is only one part of the issue. The other part is how objects _respond_ to collisions. Some objects are solid, so no object may pass through them. Other objects are only there to trigger events when another object touches it (but may freely move through the object). The finish line on a race course is one example of the latter; you don't want cars to run into the finish line like a brick wall. But you do want the race to end when the player's car crosses the finish line, and that is triggered by collision detection.

Collision responses aren't even that black-and-white! The Platformer Example implements platform objects that players can pass through, jump through, land on, and drop down from. Maybe you want some objects to be "squishy" instead of solid concrete... Whatever the case, these responses are all taken care of by collision handlers. In melonJS, the collision handler is [`me.Entity.onCollision`](http://melonjs.github.io/melonJS/docs/me.Entity.html#onCollision). It's a callback that accepts two arguments: `response` and `other`, and the return value is a Boolean that informs melonJS whether the response should be _applied_ (`true`) or _ignored_ (`false`). `response` is a [`me.collision.ResponseObject`](http://melonjs.github.io/melonJS/docs/me.collision.html#ResponseObject), and `other` is just a reference to the other entity that is overlapping.

While melonJS does a decent job at handling collision responses by default in a sane manner, there are some things that will throw you off-guard if you are not prepared. Here's the list of collision gotchas:

-   An Entity that moves too fast will pass through solid shapes, and may be accelerated even faster if a collision occurs on the wrong side. This is the oldest open ticket: [#16](https://github.com/melonjs/melonJS/issues/16) A solution is described in a (now-closed) ticket, regarding the use of the Entity's range-of-motion instead of simply its AABB during the initial filtering phase: [#103](https://github.com/melonjs/melonJS/issues/103)

-   When a moving Entity hits the corner of a solid world shape, it has a chance of "bumping" to the side instead of coming to a dead stop. The "bumping" is perpendicular to the direction of momentum as described in [this forum post](https://groups.google.com/d/msg/melonjs/mteMY5EydAw/8BEjf2fKLSUJ). It's caused by SAT choosing the "shortest depth" of the overlap for use as the collision response vector. When dealing with velocities that are high enough to penetrate into a rectangle more than the corner it clips, the "shortest depth" will be perpendicular to the momentum. It can be fixed by choosing a better heuristic than "shortest depth" in the collision handler, e.g. direction of momentum always wins over "shortest depth".

-   The "shortest depth" heuristic also causes Entities to slowly slide down slopes when gravity is enabled. This is described in detail in [another forum post](https://groups.google.com/d/msg/melonjs/fSvQ728YYW8/BfABpcwJZsAJ), along with a suggested solution that forces the collision response upward instead of left or right.

-   Collision shapes with aligned edges (like rectangles that cover adjacent tiles) can cause moving Entities to get stuck on the inner corners as the Entity slides across what should be a flat surface. This is a well-known problem where "internal edges" confuse the collision _detection_ system because collision responses are not applied simultaneously to all overlapping shapes, but individually, one-at-a-time. The general fix is using larger collision shapes, but a second solution is provided in [this forum post](https://groups.google.com/forum/#!msg/melonjs/_bvI0Ksc04U/DsrKHWpl_MMJ) which describes a method of velocity limiting against the colliding axis to prevent collisions with internal edges.
