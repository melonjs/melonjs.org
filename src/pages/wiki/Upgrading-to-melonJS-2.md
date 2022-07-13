# Introduction

melonJS 2 is a modern version of the melonJS game engine and has been rebuilt almost entirely using ES6 class, inheritance and semantic. Moving straight away from the legacy version (using ES5 and Jay Inheritance) will definitely break your game and the below guide aims to provide step by step instructions on how to experience a smooth transition to melonJS 2.

>Note: For the sake of clarity, here below is the corresponding version(s) for both the legacy version of melonJS and melonJS 2 : 
>- melonJS "legacy" : version 9.x and below 
>- melonJS 2 : version 10.0 and higher

# Step By Step guide :

1. Upgrade to the latest version of the legacy version of melonJS by following the upgrade guide : https://github.com/melonjs/melonJS/wiki/Upgrade-Guide#80x-to-91x-stable

2. track down the console.log for warning message about deprecated APIs, for example, here below there is a warning about the `levelLoad` method (the console warning is supposed to be self-explanatory but you can also refer to the the upgrade Guide on how to remove the deprecation warnings)
````javascript
[Log] melonJS v9.1.2 | http://melonjs.org (melonjs.js, line 31686)
[Log] CANVAS renderer | Web Audio | pixel ratio 2 | desktop | landscape | en-SG (melonjs.js, line 31812)
[Log] resolution: requested 1024x786, got 1024x539 (melonjs.js, line 31820)
[Log] melonJS: me.levelDirector.loadLevel() is deprecated since version 9.0.0, please use me.level.load() (melonjs.js, line 1339)
````

3. update to the ESM bundle `melonjs.module.js` of the legacy version of melonJS (9.x), this bundle still use Jay Inheritance mechanism but is bundled as a standard ES6 module. To ease the change from the previous ES5 UMD Bundle, we recommend to import everything (you can later refine import based on your class usage/needs).
````javascript
import * as me from "https://cdn.jsdelivr.net/npm/melonjs@9/dist/melonjs-module.js";
````
> Note: there is no default export for melonJS, the proper way to export it here is using `me` as export name (this is just for the migration guide, later feel free to use whatever is suitable for you).

be aware as well that your index.html has to be changed, where before you had something like below :
````html
<div id="screen"></div>
<!-- melonJS Library -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/melonjs@9/dist/melonjs.js"></script>
<!-- Game Scripts -->
<script type="text/javascript" src="js/game.js"></script>
<!-- Bootstrap -->
<script type="text/javascript">
    me.device.onReady(function onReady() {
        game.onload();
    });
</script>

````
you should now only import melonJS directly from your script together with your own class definition (notice as well the script type that need to be changed to "module").
````html
<div id="screen"></div>
<script type="module">
    import { device } from 'https://cdn.jsdelivr.net/npm/melonjs@9/dist/melonjs-module.js';
    import game from './js/game.js';

    device.onReady(function onReady() {
        game.onload();
    });
</script>
````
4. replace Jay inheritance by standard [ES6 Class definition/inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
````javascript
var Smilie = me.Sprite.extend({
    init : function (x, y, image) {
        this._super(me.Sprite, "init", [x, y, image]);
        ....
    },
    update( dt ) {
        ....
        this._super(me.Sprite, "update", [dt]);    
    }
});

game.Smilie = Smilie;

````
now should become :
````javascript
class Smilie extends me.Sprite {
    constructor(x, y, image) {
        super(x, y, image);
        ....
    }
    update(dt) {
        ....
        super.update(dt);
    }
};

export default Smilie;
````

5. Once you updated all your class, it's time to actually update to the latest "melonJS 2" version (remove the `@9` version from the previous url). 
````javascript
import * as me from "https://cdn.jsdelivr.net/npm/melonjs/dist/melonjs-module.js";
````

6. Update your physic implementation ! melonJS 2 will now update your physic body and check for collision automatically, which means that where previously you had this logic in your update method :
````javascript
class Smilie extends me.Sprite {
    constructor(x, y, image) {
        super(x, y, image);
        ....
    }
    update(dt) {
        // check for key press and adjust body force accordingly
        ....
        
        // apply physics to the body (this moves the entity)
        this.body.update(dt);
        
        // check for collision against other object
        me.collision.check(this);
        
        return super.update(dt);
    }
};
````
you should now remove the call to both `this.body.update(dt);` and `me.collision.check(this);` :
````javascript
class Smilie extends me.Sprite {
    constructor(x, y, image) {
        super(x, y, image);
        ....
    }
    update(dt) {
        // check for key press and adjust body force accordingly
        ....
        return super.update(dt);
    }
};
````
> Note: with collision being check for all active dynamic bodies, [collision masks](http://melonjs.github.io/melonJS/docs/me.Body.html#.setCollisionMask) should really be used to optimise collision in your games, and prevent unnecessary check between objects (e.g. you do not want your NPC or Enemy to check for collision with each others)

7. as the minPubSub event based implementation has been replaced by a nodeJS event emitter based implementation, if your game was subscribing to any system event, you will need to replace all call to `me.event.subscribe()` and `me.event.unsubscribe()` by a call to [`me.event.on()`](https://melonjs.github.io/melonJS/docs/me.event.html#.on) (or [`me.event.once()`](https://melonjs.github.io/melonJS/docs/me.event.html#.once)) and [`me.event.off()`](https://melonjs.github.io/melonJS/docs/me.event.html#.off).

8. and now you should be done, double check it's all working by opening the console again, you should now have this being displayed, with no warning or error messages :
````javascript
[Log] melonJS 2 (v10.0.0) | http://melonjs.org (melonjs.module.js, line 30359)
[Log] WebGL2 renderer (Apple GPU) | Web Audio | pixel ratio 2 | desktop | landscape | en-SG (melonjs.module.js, line 30478)
[Log] resolution: requested 800x600, got 1119x600 (melonjs.module.js, line 30486)
````

# Final note
Additionally you might want to check on the new boilerplate that is now based on webpack and offers built-in feature such as tree-shaking and transpiling to allow deployment (compatibility) with es5 only browsers : https://github.com/melonjs/es6-boilerplate

if you have questions, or comments on this small guide, the easiest these days is to contact us on [Discord](https://discord.gg/aur7JMk). 