---
layout: ../../layouts/MDLayout.astro
---

A collision shape is either a `me.Rect`, `me.Ellipse`, `me.Line` or `me.Polygon` object attached to the object physic [body](http://melonjs.github.io/melonJS/docs/me.Body.html), and (when using Tiled), a collision Shape is automatically added to your renderable based on the object size and shape defined in Tiled.

Collision shape can also be manually managed through the following functions :

-   `addShape()` to add a new shape to your objects
-   `removeShape()`/`removeShapeAt()` to remove the specified shape from the body shape list
-   `getShape()` to get the current collision shape at the given index

Note that when adding a `me.Rect` object using `addShape` to an entity body, it will be automatically converted to a corresponding `me.Polygon` object.

Shape object are also relative to their parent object (here an entity), which means that by default their position vector is `(0, 0)`

Additionally Shape objects also define a `getBounds` function that is used to get the corresponding bounding box (rectangle) of that Shape, that is useful most of all when managing non rectangular shape (melonJS uses this internally to define to calculate the collision using AABB and generate the quadtree, or identify which objects has been clicked).

# Usage example

Let's take the example where for any reason we need to know the size of the object collision shape :

```js
var size = myRenderable.body.getBounds().width
```

This gives you the width of the body's bounding box (the smallest rectangular set which contains all of its shapes).
