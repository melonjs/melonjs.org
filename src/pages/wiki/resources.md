MelonJS handles resources such as images, and map data by storing it in a single hash. You can see an example from our [boilerplate](https://github.com/melonjs/es6-boilerplate/blob/main/src/manifest.js):
````javascript
const DataManifest = [

  /* Graphics.
   * @example
   * {name: "example", type:"image", src: "data/img/example.png"},
   */

  /* Atlases
   * @example
   * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
   */

  /* Maps.
   * @example
   * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
   * {name: "example01", type: "tmx", src: "data/map/example01.json"},
   */

  /* Background music.
   * @example
   * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
   */

  /* Sound effects.
   * @example
   * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
   */
];
export default DataManifest;
````
To make it easy for you on handling your resources, melonJS allows you to load them all at once. This is done by calling the [`me.loader.preload`](http://melonjs.github.io/melonJS/docs/me.loader.html#.preload) method, specifying the list of assets to be preloaded and a callback for when everything is ready :
````javascript
me.loader.preload(resources, this.loaded.bind(this));
````
Once the loading screen finishes, all your resources will be loaded. MelonJS uses AJAX requests to grab the file data, and will then parse the data. MelonJS will parse and load the data differently depending on the type specified.

### Resource Types

The types currently supported are:

* binary
* image
* json
* tmx
* tsx
* xml

**binary** This can be used to load all other sorts of data. If you need to even just load a text file, it's a option to go.

**image** This loads all different image types that you will use for your sprites. Note that image type should be used even when it's a packed texture. Ensure that the file you reference here is of a proper image mime type.

**json** Simple loads and parses a json file. This format should be used for loading the Texture Packer atlas file, or any other supported sprite sheet atlas.

**tmx** & **tsx** This is to load the [Tiled](http://mapeditor.org) map file. You can also save the TMX file as JSON instead, however be sure to still use this file type.

**xml** Similar to the JSON type, this can be used to load an XML data file.


### Load Resources Later or Lazy Loading

If you need to load a single resource after the fact, or load asset individually for lazy loading, you can do so by using the same hash that you would in the resources asset list, For example:

````javascript
me.loader.load({name: 'workstation', type: 'image', src: 'data/img/workstation.jpg'}, callback, errorcallback);
````
Much like the example there, you simply use the same options. Pass a callback to execute when the loading is done, and optionally provide a callback if the resource fails to load.