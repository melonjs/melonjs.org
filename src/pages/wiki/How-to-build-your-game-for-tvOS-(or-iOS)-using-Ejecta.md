
In this tutorial we will explain how to build your game under Xcode using [Ejecta](http://impactjs.com/ejecta) so that it can be deployed to the new Apple TV (or on any iOS device as well).  The below content is largely inspired by the Ejecta [overview](http://impactjs.com/ejecta/overview) and adapted to work with melonJS.

This tutorial does not cover the app submission part, but if you need further assistance on that, we suggest you to check the [iOS Developer Library](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html).

Here is below a screenshot of our platformer example running under the apple TV Simulator :
![melonjs-platformer-tvos](https://cloud.githubusercontent.com/assets/4033090/13031966/ea6240a6-d31b-11e5-9486-f233cff49459.png)


## Prerequisites :
* a Mac (or any machine able to run XCode)
* [XCode](https://developer.apple.com/xcode/download/) 7.1 or higher
* [Ejecta 2.0](http://impactjs.com/files/ejecta-2.0.zip) or higher
* [melonJS 3.0.x](https://github.com/melonjs/melonJS/releases/tag/3.0.1) (for melonJS 3.x and higher, you also need Ejecta latest [version](https://github.com/phoboslab/Ejecta/archive/master.zip))

## Getting Started
After you've downloaded and unzipped Ejecta and loaded the Ejecta.xcodeproj file in XCode, it's a good idea to rename the project: in XCode, select the project in the upper left corner of the sidebar and hit enter. You can now rename the project; hit enter again and XCode will ask you to rename a bunch of other stuff as well – choose Rename.

The XCode project has two build targets: "Ejecta" - for the iOS version and "Ejecta-TV" for the tvOS version.

To change the desired screen orientation of your iOS App (portrait or landscape), go to the project settings, select the "Ejecta" target and check the appropriate Device Orientation checkboxes. Note that iPad need to always support both portrait or both landscape modes (or all 4) as per the AppStore guidlines.

Also in the target settings, be sure to change the Bundle Identifier setting to something that represents you or your company and product name.

You should now be able to compile and run the project in the Simulator.

## Add your game
Ejecta fires up the JavaScriptCore VM, attaches all native Obj-C Classes that should be exposed to JavaScript. It then executes the `Source/Ejecta/Ejecta.js` file that sets up a bunch of things and finally loads the `App/index.js` file - which is where you do your stuff.

Adding your game to the build is then pretty straightforward :

All your JavaScript source files as well as your assets (sounds/music) should be placed into the `App/` directory. All files you reference from your code are relative to this directory

Next step is to define the `App/index.js` file. Basically this is pretty similar to the `index.html` provided in our [boilerplate](https://github.com/melonjs/boilerplate), except than here we use the `ejecta.include()` function to load our scripts, and then we manually initialise melonJS and our game (at the time of writing this article, this is currently required due to a small [issue](https://github.com/phoboslab/Ejecta/issues/613) in the DOM implementation provided by Ejecta, and will most certainly be fixed in a next version). 

````javascript
// Load the game

<!-- melonJS Library -->
ejecta.include('build/melonJS.js');

<!-- Plugin(s) -->
ejecta.include('plugins/debug/debugPanel.js');

<!-- Game Scripts -->
ejecta.include('js/game.js');
ejecta.include('js/resources.js');

ejecta.include('js/entities/player.js');
ejecta.include('js/entities/coin.js');
ejecta.include('js/entities/enemies.js');
ejecta.include('js/entities/HUD.js');

ejecta.include('js/screens/play.js');

// start the game

<!-- init the melonJS Library -->
me.boot();

<!-- run the game boostrap -->
game.onload();
````

The `index.js` is the biggest part of the "porting" effort, once done, you are good to go and you should be able to compile and run your game under the Simulator.

Note that you can also load a custom TTF font, similary to a CSS @font-face declaration :
````javascript
// load a custom TTF font
ejecta.loadFont("path/to/my/font.ttf");
````

## Audio format 

Ejecta loads MP3, M4A and Apple's CAFF format; Ogg Vorbis is not supported at this time.

For short sound effects, Apple recommends using uncompressed PCM in a CAFF container while Music should be compressed with AAC. However, MP3 should work just fine as well.

If you want convert your sound files to CAFF, use the following commands in your terminal (OSX) :

* sound effects should be in uncompressed PCM format:

  `afconvert -f caff -d LEI16@44100 -c 1 soundfile.wav`
* music can be compressed with AAC

  `afconvert -f caff -d aac -c 1 music.wav`

Ejecta will play all sound files < 512kb with OpenAL. Above 512kb Apple's AVAudioPlayer is used. You can change this limit in Classes/Ejecta/EJAudio/EJBindingAudio.h.

Also make sure melonJS searches for .caf files first instead of loading .mp3 or .ogg, by adding it in the list of provided file formats when [initialising](http://melonjs.github.io/melonJS/docs/me.audio.html#init) the audio :

````javascript
// initialize the "sound engine"
me.audio.init("caf,mp3,ogg");
````

## Remote and Gamepad support
Both the Apple TV remote and any paired MFi compatible controller, like the [Nimbus](https://steelseries.com/gaming-controllers/nimbus) one, are working out of the box, as Ejecta provides [support for it](http://impactjs.com/ejecta/gamepad) through the [W3C Gamepad APIs](http://www.w3.org/TR/gamepad/).

When using the remote as controller, the controller has the following mapping :
* The touchpad on the remote can be used as a D-pad. The D-pad provides analog input data.
* The touchpad is available as a digital button ([`me.input.GAMEPAD.BUTTONS.FACE_1`](http://melonjs.github.io/melonJS/docs/me.input.GAMEPAD.html#BUTTONS)), by firmly pressing on the touchpad.
* The Play/Pause button on the remote is a digital button ([`me.input.GAMEPAD.BUTTONS.FACE_2`](http://melonjs.github.io/melonJS/docs/me.input.GAMEPAD.html#BUTTONS)).

Since you could have at least two controllers connected simultaneously, a good practice in melonJS is to take this in account when binding gamepad input through [`me.input.bindGamepad()`](http://melonjs.github.io/melonJS/docs/me.input.html#bindGamepad), and use both id `0` and `1` (respectivelly for the remote and a potential additional controller).

````javascript
// Click on touchpad or press face 1
me.input.bindGamepad(0, me.input.GAMEPAD.BUTTONS.FACE_1, me.input.KEY.UP);
me.input.bindGamepad(1, me.input.GAMEPAD.BUTTONS.FACE_1, me.input.KEY.UP);
                                     
// left/right on the touchpad/d-pad
me.input.bindGamepad(0, me.input.GAMEPAD.BUTTONS.LEFT, me.input.KEY.LEFT);
me.input.bindGamepad(0, me.input.GAMEPAD.BUTTONS.RIGHT, me.input.KEY.RIGHT);
me.input.bindGamepad(1, me.input.GAMEPAD.BUTTONS.LEFT, me.input.KEY.LEFT);
me.input.bindGamepad(1, me.input.GAMEPAD.BUTTONS.RIGHT, me.input.KEY.RIGHT);
````

If you need more "advanced" control on the gamepad, "standard" gamepad information is available through [navigator.getGamepads()](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getGamepads) as under any other browser supporting the gamepad API. Finally, please keep in mind that a maximum of two game controllers (plus one remote) can be connected to an Apple TV at any given time. Your game designs should keep these limitations in mind.


## Few final considerations
Additional things to keep in mind as well :
* Ejecta does not support TMX/XML loading, so be sure your levels are exported in JSON format (e.g. the 1st level of the Platformer does use a XML map, so it had to be re-exported in JSON before using it here)
* It's pretty easy to do step-by-step debugging for our own script, since as soon as the simulator is running, you can access it through your browser debugging tools (as if it was a real device connected).
* Performances under the simulator will be slower than the real hardware. So although the Simulator is always a good tool to check on your memory usage or profile your code, always make sure you check the final result on the real hardware if you have any concerns on perfomances