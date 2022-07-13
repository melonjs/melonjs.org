---
layout: ../../layouts/MDLayout.astro
---

# Introduction

This guide will take you through the basic steps required to deploy your existing melonJS game(s) onto the Facebook Instant Games platform, and thus allowing to play it directly through Facebook and Messenger.

![20215865_401372756927198_9018771683342811136_n](https://user-images.githubusercontent.com/4033090/37810298-370f9d7a-2e8e-11e8-9e9b-1af3ab3f3783.png)

> Note: to ensure the highest compatibility when integrating melonJS with the Facebook API and deploying games on the “Instant-Game” platform, minimum requirements for melonJS is version 5.1.0

The whole process relies on 3 simple steps that will only take a few minutes to complete:

1. Create a new App through your [Facebook Developer account](https://developers.facebook.com/) and configure it as an “Instant-game” product
2. Integrate the Facebook [Instant Games API](https://developers.facebook.com/docs/games/instant-games/sdk) with your game
3. Upload your game on Facebook infrastructure

Once step 3 is done, you are ready to play your game through Messenger!

# 1. Setting up a new Instant-Game

At this stage, it is assumed that you already have a Facebook developer account, if not, you can simply go to the following URL and sign up for a new account: [Facebook Developer account](https://developers.facebook.com/)

Once logged in your developer account, let’s first **Create a new app ID**, name it, and click on the [Create App ID] button:

![picture1](https://user-images.githubusercontent.com/4033090/37807866-97bcd3e2-2e82-11e8-9b88-8b51f3d3c71f.png)

Once done, click on settings in the dashboard on the left, and on the right panel choose the “game” category:

![picture1](https://user-images.githubusercontent.com/4033090/37807888-bd75a014-2e82-11e8-9fb6-f0a92fbb558e.png)

Then choose a Sub-Category fitting with the style of your game (Puzzle here), and finally do not forget to click on [Save Changes]

![picture1](https://user-images.githubusercontent.com/4033090/37807900-cd017206-2e82-11e8-94fa-9840e5fa4d50.png)

Then back on the dashboard (on the left), click on +add Product, and choose “Instant-Game” from the available choices on the right:

![picture1](https://user-images.githubusercontent.com/4033090/37807913-e19e2bd2-2e82-11e8-8ff1-b71a46370e56.png)

Finally, the last step is to fill the form that will appear when clicking on “Set Up”:

![picture1](https://user-images.githubusercontent.com/4033090/37807928-f6ed4284-2e82-11e8-8a9f-7e4397586bb4.png)

> IMPORTANT NOTE: Make sure you choose “Yes” for “use Instant Games”, and also make sure to choose the appropriate Orientation for your game.

Once done, scroll down to the bottom of the page and click on save changes, if all done properly you should then see the following message appearing.

We are not done yet though, as before uploading our game, we then need to integrate the Facebook API into our melonJS game.

# 2. Instant-Game Facebook API Integration

The following instructions is based on the [getting-started](https://developers.facebook.com/docs/games/instant-games/getting-started) page of the Instant Games online documentation (where you can find further information and also links to the [SDK](https://developers.facebook.com/docs/games/instant-games/sdk) documentation)

> Note : when loading an Instant Game, it will search for a main root file `index.html`, so you need to make sure to use the same naming, but as well for the
> configuration file `fbapp-config.json`; an example of the latter can be found in the tic-tac-toe example available in the Quickstart section [here](https://developers.facebook.com/docs/games/instant-games/getting-started/quickstart), and should therefore be placed in the root level of your game beside the index.html file.

## Importing

Now that our app is setup, we can start modifying our existing melonJS game. First step being to import the Instant Games SDK.

Simply modify your root index.html, and add the following script in the melonJS index.html file, for example before the melonJS script, as shown below.

```js
  <!-- Canvas placeholder -->
  <div id="screen"></div>

  <!-- ES5-Shim -->
  <script type="text/javascript" src="lib/es5-shim.min.js"></script>

  <!-- FB instant Gaming -->
  <script src="https://connect.facebook.net/en_US/fbinstant.6.1.js"></script>

  <!-- melonJS Library -->
  <script type="text/javascript" src="lib/melonjs.js"></script>

  <!-- Game Scripts -->
```

## Initializing

First thing to do is Initializing the SDK library, through the `FBInstant.initializeAsync()` function. This should be called before any other SDK functions. In the example below we call the function and then retrieve the player information

```js
FBInstant.initializeAsync().then(function () {
    playerInfo.name = FBInstant.player.getName()
    playerInfo.photo = FBInstant.player.getPhoto()
    playerInfo.id = FBInstant.player.getID()
    playerInfo.locale = FBInstant.getLocale()
})
```

Back In our melonJS example, this should be inserted, still in `index.html` file, but this time in the bootstrap [`me.device.onReady`](http://melonjs.github.io/melonJS/docs/me.device.html#onReady) function, and in our case we call `game.onload()` once the promised is solved, as shown below :

```js
  <!-- Bootstrap -->
  <script type="text/javascript">
      me.device.onReady(function onReady() {
          FBInstant.initializeAsync()
            .then(function() {
              game.onload();
          });
      });
  </script>
```

Next and final step is to make sure we inform the SDK of the loading progress, and once all assets are loaded, tells the SDK to end loading view and start the game.

Informing the SDK about the loading process is done through the `FBInstant.setLoadingProgress(progress)` function.

As melonJS already has a [built-in mechanism for such a progess event](http://melonjs.github.io/melonJS/docs/me.event.html#LOADER_PROGRESS), it is as simple as connecting both together by simply adding the following code before calling the melonJS `preload()` function :

```js
// notify the facebook API of the loading progress
me.event.subscribe(me.event.LOADER_PROGRESS, function (progress) {
    FBInstant.setLoadingProgress(Math.round(progress * 100))
})
```

Finally to tells the SDK to end the loading view and start a game, all we need is to insert a call for the `startGameAsync()` function, from within the onload callback, and right before changing (for example) to your title screen :

```js
// tells the SDK to end loading view and start the game
FBInstant.startGameAsync().then(function () {
    // trigger a window resize event to adapt to the given CANVAS
    // since messenger does not give us the correct fullsize CANVAS size
    // unless the startGameAsync promise is
    me.event.publish(me.event.WINDOW_ONRESIZE)
    // The player is now guaranteed to have already tapped "play".
    me.state.change(me.state.PLAY)
})
```

> Note : two things to be noted (1) it's sometime useful to force a resize event by adding a call to `me.event.publish(me.event.WINDOW_ONRESIZE)` within the promise, as messenger sometimes "fails" as returning the correct full canvas size. (2) a better place where to call the `startGameAsync()` function is probably after the state were changed, as sometimes, the melonJS loading screen (normally hidden by the Facebook loading screen) might still briefly be visible.

And we are done, now the only remaining task is to upload your game and play it in messenger!

# 3. Game upload and Testing

Instant Games content is hosted on Facebook infrastructure, so you don't need to host the game content on your own or use third-party services. Once the game is ready for testing, package all game files into a single .zip file. Please note that the index.html file should be in the root of this archive and not in any sub-folders.

To upload the .zip file, click the Canvas Hosting tab in the App Dashboard. From there select "Instant Game" from the dropdown menu and click +Upload Version which will allow you to upload the .zip file to Facebook's hosting service.

After that, the build will process the file, which should only take a few seconds. When the state changes to "Standby", click the "★" button to push the build to production.

![picture1](https://user-images.githubusercontent.com/4033090/37808621-4894c1c2-2e86-11e8-8a70-68b57de2baa9.png)

Once uploaded and in production, the game should appear in the Games Tab of Messenger under the “In Development section”.

More information about testing, publishing, and sharing your Instant Games are available [here] (https://developers.facebook.com/docs/games/instant-games/test-publish-share).
