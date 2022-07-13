To enable interaction between a renderable object and the physic game world, a physic [body](http://melonjs.github.io/melonJS/docs/me.Body.html) can easily be added to any [renderable](http://melonjs.github.io/melonJS/docs/me.Renderable.html#body) :

in the below example we add a basic body with a rectangular shape at the dimension of the renderable itself, and assign some maximum velocity value and friction :

````javascript
// add a physic body
myRenderable.body = new me.Body(myRenderable);
// add a default collision shape
myRenderable.body.addShape(new me.Rect(0, 0, myRenderable.width, myRenderable.height));
// configure max speed and friction
myRenderable.body.setMaxVelocity(3, 15);
myRenderable.body.setFriction(0.4, 0);
// add a horizontal positive force (e.g. move it right)
this.body.force.x = 3;
````

>Note:When using melonJS 10 and higher, melonJS will automatically update the body physic and check for collision with other object in the scene graph