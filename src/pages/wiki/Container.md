---
layout: ../../layouts/MDLayout.astro
---

## The Container

Everything in the engine boils down to the renderer API. So the `me.Entity` examples in the main tutorial in the end implement a call to `renderer.drawImage()`. In order to manage all the entities, sprites, and so forth, melonJS implements a container. Specifically called the **WorldContainer**. This WorldContainer an instance of `me.Container` is a wrapper around an array, that will properly call your objects' implementation of the update and draw functions.

It's important to note that depending on what type of Renderable you use, it will be drawn or not depending on varying conditions.

Both the draw & update functions check a couple conditions before processing the object's draw/update function.

1. Will pass the update if the game state is set to paused, and the object is not set to update when paused.
2. The object must be either in viewport, floating or set to alwaysUpdate.
