---
layout: ../../layouts/TutorialLayout.astro
---
# Part 2: Setting Up the Template
First open your terminal and navigate to the folder where you'd like to setup the project.

Next, clone the examples repository:
```bash
git clone https://github.com/melonjs/examples/tree/master/platformer
```

For this tutorial we're going to be working on the platformer example. Inside the directory we just created with git, you can see there is the `platformer` directory. 

We've finished setting up, so from now on whenever you'd like to start coding your game you can navigate into the `platformer` folder in your terminal and run this command :

```
python3 -m http.server
```

This command is an example on [how to run a local testing web server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) in the current directory the terminal is in. A website will be running inside your computer (at http://localhost:8000) so you can edit your game and try out your changes in your browser right away as you modify it !

<a href="/tutorial/part-3-modifying-the-game" class="next">Up Next: Modifying the game</a>