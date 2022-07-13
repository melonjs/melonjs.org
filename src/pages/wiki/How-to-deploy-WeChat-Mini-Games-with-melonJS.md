# Quick How-To

The following How-To provides basic information on how to use an existing melonJS game on an already setup WeChat dev environment. For more complete tutorial on WeChat, please do refer below to the Link section.


![](https://user-images.githubusercontent.com/4033090/42258316-b0032d1e-7f8d-11e8-8bce-20e693777827.png)</center>



# Requirements
* melonJS [6.0.0](https://github.com/melonjs/melonJS/releases) or higher
* [WeChat app-adapter (see below)](https://github.com/finscn/weapp-adapter/blob/master/README_EN.md)

##  **Introduction**

the WeChat Mini Game environment is based on JavaScriptCore on iOS, and V8 on Android. All of them are running environments without both BOM and DOM. There is no global document and no window object. So, if you want to use the DOM API to create elements like Canvas and Image, it will throw an error.

To bridge the gap between the Web and WeChat Mini Games, the WeChat team has released a [weapp-adapter](https://github.com/finscn/weapp-adapter/blob/master/README_EN.md), with the goal to make web libraries compatible with Minigames.

To include the weapp-adapter, just download it from the link here above, and just import it first in your project.
```javascript
import './js/libs/weapp-adapter/index.js'
````

## **Project Structure**

Folder Structure is a bit different from the regular melonJS boilerplate, with the following differences :

````
├───game.js : main entry point, equivalent to the index.html page
├───game.json : minigame configuration
├───data : asset folder (as in the boilerplate)
└───js
    ├───index.js : the game "main" file
    │   ├───entities 
    │   │   ├───player.js : object definitions
    │   │   ├───enemies.js : object definitions
    │   ├───screens 
    │   ├───play.js : main play screee
    │   ├───title : title screee
    └───libs
        ├───weapp-adapter.js
        └───melonJS.js

````

## **ES6 and melonJS classes**

WeChat expect a ES6 syntax by default, which melonJS is compatible with, and it can be imported directly using `import`.

the root game.js file (see above) :
````javascript
import './js/libs/weapp-adapter'
import './js/libs/melonjs'

import './js/index'

import './js/entities/entities'
import './js/entities/HUD'
import './js/screens/play'

import { game } from './js/index.js'

/* Bootstrap */
me.device.onReady(function onReady() {
  game.onload();
});
````

the game.json file is a simple configuration file for now that only contains the device orientation :
````javascript
{
    "deviceOrientation": "portrait"
}
````

the main index.js file, is the equivalent to the `game.js` file in the boilerplate, only different here is the ES6 syntax to export `game` by default.

````javascript
export let game = {

    /**
     * local game data
     */
    data : {
        // score information
        score : 0,
        hiscore : 0,
    },

    /**
     * some Initialization
     */
    onload: function() {


        // Initialize the video.
        if (!me.video.init(1024, 768, {wrapper : "screen", scale : "auto", scaleMethod : "stretch", subPixel : false })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // initialize the "sound engine"
        me.audio.init("mp3,ogg");
    }
    ...
    ...
}
````

last but not least here is an example of entity definition (notice that we are importing game from index, so that we can declare myEntity under that namespace) :
````javascript
import { game } from '../index.js'

// myEntity definition under the `game` namespace
game.myEntity = me.Sprite.extend(
{
    init:function (x, y) {
        // call the constructor
        this._super(me.Sprite, "init", [x, y , { image: me.loader.getImage("my Image"), framewidth: 178, frameheight: 140}]);
        ...
    }
    ...
}
````


# Limitations

As the WeChat Mini Game platform and especially the `weapp-adapter` is still in alpha stage, some issues are to be unfortunately expected when running melonJS or any other framework :

* **Audio** : melonJS built-in Audio [does not currently work](https://github.com/melonjs/melonJS/issues/934), however you can use the Audio component provided by the weapp-adapter :
````javascript
let au = new Audio('http://url/to/audio.mp3');
au.play();
au.pause();
````
* **scaling mode** : the basic "fit" scaling mode does not work as expected, as the canvas is stretched to the full display size, causing errors in the touch event detection (as melonJS rightly assume the canvas is not stretched). Use the "fill" scaling mode or other matching with your needs.
* **preloader** : JSON, audio and other binary files require a full URL (relative path does not work, as WeChat throws a invalid URL error). Also be careful that the behaviour might be different between the simulator and a real mobile when it comes to relative path (e.g. `./data/to/file` will only work in the simulator, where `/data/to/file` will work on both)

# Links
 * [Complete manual on Wechat Mini Program development (English)](https://medium.com/@yelin.qiu/a-complete-manual-on-wechat-mini-program-development-8fd28a85ee0d)
* [Official Minigame documentation (Chinese)](https://developers.weixin.qq.com/minigame/dev/tutorial/base/adapter.html?t=201832)
* [Official melonJS forum](http://www.html5gamedevs.com/forum/32-melonjs/)
* [Official melonJS documentation](http://melonjs.github.io/melonJS/docs/)

# Credits
Thank you to [qichuren](https://github.com/qichunren), a web developer from Shanghai, for his help on identifying and fixing various initial issues between melonJS and WeChat.