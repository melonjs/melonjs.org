---
layout: ../../layouts/MDLayout.astro
---

melonJS currently operates quite similar to that of most game frameworks. It manages the game loop for you, giving you update & draw/paint calls to work with.

melonJS provides various named states to work with, in conjunction with [me.Stage](http://melonjs.github.io/melonJS/docs/me.Stage.html) to better manage different views and controls for the game.

The default states are:

| name     | index |
| -------- | ----- |
| LOADING  | 0     |
| MENU     | 1     |
| READY    | 2     |
| PLAY     | 3     |
| GAMEOVER | 4     |
| GAME_END | 5     |
| SCORE    | 6     |
| CREDITS  | 7     |
| SETTINGS | 8     |

You can define if your own states as well.

melonJS provides [resource management](Resources) to make it easy to load various images, sounds, etc.

There is a near complete [Tiled Map](https://www.mapeditor.org) integration with melonJS, the details on how to use are in the [tutorial](https://github.com/melonjs/melonJS/wiki#tutorial).

## Framework Workflow

When you initialize melonjs via `me.video.init`, it sets up the camera, the world object (an instance of [`me.World`](http://melonjs.github.io/melonJS/docs/me.World.html)), and the game loop.

Since melonJS is an HTML5 game engine, it depends on the `requestAnimationFrame` function that modern browsers provide. [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame?redirectlocale=en-US&redirectslug=DOM%2Fwindow.requestAnimationFrame) covers the details on the function pretty well, but the short of it is that the requestAnimationFrame tries to run at 60 frames per second. It accepts a function to execute each time a frame runs. So with melon, we tell it to update the game objects as we have defined and to execute all the draw calls.

The requestAnimationFrame is utilized to call two main operations: update & draw.

The update function invokes the update on the `me.game.world` object, which is a `me.Container`. The update function of the container loops through each of its child objects. If the child object is another container, then that container will invoke all its children's update functions, etc.

The container update function goes through a couple checks before updating the child object:

1. Will skip the update if the game state is set to paused, and the object is not set to update when paused.
2. The object must be either in viewport, floating or set to alwaysUpdate.

Delta time since the last frame (or last update) is passed to the update call. The update method is expected to return a boolean or a falsey value. The update return value tells the engine if the particular object should be re-drawn. It is a good practice to only return true from your update methods when you absolutely need to, such as having your entity fall (`this.body.vel.x !== 0`) due to gravity. The tutorial mentions this with the HUD: https://github.com/melonjs/tutorial-platformer/blob/fc6e1d63dffb049e12a4f7cea80a7bbf00876140/tutorial_step2/js/entities/HUD.js#L55.

Once all updates are complete, the draw cycle begins if any of the update functions have returned `true`. If all update functions return some falsey value, all draws are skipped for this frame. This is an optimization for screens that have no activity.

The container draw function checks all of its child objects in the same way. Ensures the game is not paused, and that the object is either in view or set to always update. It also checks if the object is considered a renderable (`isRenderable` set to true). There may be some objects you want to have update in the game loop, but not draw anything.

Each child object's draw function calls the appropriate methods on the current renderer. By default melonJS will use a canvas renderer, but this can be overwritten through the (me.video.init)[http://melonjs.github.io/melonJS/docs/me.video.html] call.

### Details

To learn more about the object types explained here, check out:

-   [Container](Container)
-   [Renderables](Renderables)
