There's a lot of good tools out there for building web apps into mobile apps, by loading static html, css and javascript. MelonJS is no different. There's a couple tools we recommend to doing this.

## [Cocoon JS](https://cocoon.io/)

If you need to support iOS 8 and older, you may want to have a look at this. Ludei has a cocoonjs app out on both android & ios, which can load a zip file of static web assets. Put your index.html in a zip, add it to your phone and give it a try with their app. Be sure to select canvas+, as that's the most optimized for games.

The downside to cocoonjs is it has a bit more limitations on what you can do functionality wise. Canvas+ disables most DOM manipulation, and typical browser functions. It has its own implementation of canvas draw calls, and webgl.

Building a cocoon app for distribution is all done in the cloud with their platform. Makes it easier for handling icons and binaries. Ludei also adds their own splash screen in builds to your game. You can remove this, but have to have a paid plan.

## [Adobe PhoneGap](https://cordova.apache.org/)

Adobe PhoneGap framework is an open source distribution of Cordova — providing the advantage of the Cordova framework with PhoneGap robust tools like the PhoneGap Desktop app, the PhoneGap Developer app, and PhoneGap Build. You can follow [these steps](https://phonegap.com/getstarted/) to install PhoneGap and get an app running on your mobile device in minutes. 

## [Cordova](https://cordova.apache.org/)

This is a great choice if you can support iOS 9 or higher, and Android 4.4 or higher which has chrome backing the android webview. On the iOS side you'll want to enable the wkwebview. This runs much faster than UIWebView. You can do this by adding the plugin: https://github.com/apache/cordova-plugins/tree/wkwebview-engine-localhost. If you get a black screen when your game loads, check the console using Safari debugging to see if there are any xhr errors.
