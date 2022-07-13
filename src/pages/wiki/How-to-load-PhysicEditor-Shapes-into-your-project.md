First create your physics data using the [Physic Editor Tool](https://www.codeandweb.com/physicseditor) :
 
![featurecarousel_physiceditor](https://cloud.githubusercontent.com/assets/4033090/11137962/ba1421fc-89f7-11e5-95d5-5e4d2b1a0295.png)

As the Physic Editor does not currently feature a specific melonJS exporter, we are going to use the one that provide a standard JSON output, the `Lime+Corona` Exporter. This should give you a file looking like this one for example :
````javascript
{ 
		
    "hotdog": [

		{
			"density": 2, "friction": 0, "bounce": 0, 
			"filter": { "categoryBits": 1, "maskBits": 65535 },
			"shape": [   6, 30  ,  11, 23  ,  100, 0  ,  104, 10  ,  92, 53  ,  57, 63  ,  32, 63  ,  8, 49  ]
		}  ,
		{
			"density": 2, "friction": 0, "bounce": 0, 
			"filter": { "categoryBits": 1, "maskBits": 65535 },
			"shape": [   123, 24  ,  113, 39  ,  92, 53  ,  104, 10  ,  121, 15  ]
		}  
    ]

}
````
(Note that as of melonJS 2.1.x, only the `shape` properties are being used by the engine, the other `density` and `filter` values are therefore currently ignored)

Now it's time to add the resulting JSON file to your resources list, I will call this one `shapesdef` in this examples, as it includes multiple shape definitions.
````javascript
{name: "shapesdef", type:"json", src: "data/json/shapesdef.json"}
````

and finally it's time to use it to define the collision shape of your entity, which is easily done by calling the [`me.body.fromJSON()`](http://melonjs.github.io/melonJS/docs/Body.html#fromJSON) method from your constructor :

````javascript
myEntity extends me.Entity {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        
        // ensure we do not create a default shape
        // (as we manually add it later)
        settings.shapes = [];

        // call the super constructor
        super(x, y, settings);

        // add the "hotdog" shape(s) to the entity body
        this.body.fromJSON(me.loader.getJSON("shapesdef"), "hotdog");

        // add the hotdog sprite
        this.renderable = new me.Sprite(0, 0, {image: me.loader.getImage("hotdog")});
    }
};
````
and that's it !

PS: As a side note, and as the PE tool will automatically decomposes concave shapes into convex polygons, this will most probably define several shapes representing your original shape. This is of course supported by melonJS when resolving collision, but keep this in mind if you need to perform any manual operations on these shapes.
