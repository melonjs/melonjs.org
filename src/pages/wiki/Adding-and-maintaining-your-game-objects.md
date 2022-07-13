As you create and work with various [renderable](Renderables) objects, you need to tell melonJS that they need to be executed as part of the game loop.

melonJS provides an [`Container`](http://melonjs.github.io/melonJS/docs/me.Container.html) class, as well as an instance of it at `me.game.world`, in which you can add your game objects to it via:

```javascript
me.game.world.addChild(mySprite);
```

The Container will handle the sorting for you, but you can also tell melonJS the draw order. By default, melonJS uses the z property on your objects to sort. The lower the number gets updated & painted first, the highest number gets updated & painted last. You can tell MelonJS the draw order one of two ways.

First, declare it in your object definitions:

```javascript
var mySprite = new me.Sprite(0, 0, {image: "boingball"});
```

The second way is by using `me.game.add` and passing the z-index as the second parameter:

```javascript
me.game.world.addChild(mySprite, 2);
```

This effectively accomplishes the same thing, the latter simply sets the z-index property on the object. You can of course alter the z property on your objects at any time in game.


## Object Persistence

When melonJS changes state and loads another `me.Stage`, the world object container will be reset. Any object that is not set to be persisted, will be removed from the container. If you need to have an object that exists across multiple screens, simply set `isPersistent` to be true on the object, before you switch states.

## The object pool

The object pool is a way of managing your objects without having to create new ones unless you absolutely need them. The [tutorial](http://melonjs.org/tutorial) uses examples on combining tiled with the object pool. The docs also cover basic usage [here](http://melonjs.github.io/docs/me.pool.html).

The key is to tell the pool what objects you want. Just be sure to only call it once, such as in your screen setup:

```javascript
onResetEvent: function() {
   // tell the entity pool what classes it needs to work with
   me.pool.register('main', myMainEntity, true);
   me.pool.register('renderable', myRenderableEntity, true);
},
```

That tells the object pool to create pools for each of those types. When you need to either create a new object, or grab an unallocated object from the pool, simply invoke:

```javascript
var mainObject = me.pool.pull('main', 100, 100);
```

The first parameter is the name you used in the add method, and the following params are what you wish to pass to the `init` of your object. From there, you simply work with the object as you normal. Add it via:

```javascript
me.game.world.addChild(mainObject);
```

Then when you're done with it:

```javascript
me.game.world.removeChild(mainObject);
```

Removing the child will remove it from the Container, but it will keep it as an available object in the entity pool. Invoking pull, will simply reset it. 

Last but not least for your object to be "poolable" it must implement a `onResetEvent()` function that will allow to reset the object properly when pulled back from the object pool :

```javascript
class main extends somethingElse {
    onResetEvent() {
        // reset object specific properties
        this.lifeBar = 100;
    }
}
```