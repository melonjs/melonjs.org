---
layout: ../../layouts/TutorialLayout.astro
---

# Part 3-3: Modifying the code

Now that we've got the platformer project up and running on our computer, we can now try changing it! First we need to [open](https://code.visualstudio.com/docs/editor/workspaces) the platformer project (at `/examples/platformer/`) inside VSCode to start making edits.

You should be able to see the files for the platformer example on the left side of your editor if you did this correctly:

<img alt="VSCode Screenshot" class="large" src="/img/tutorial/VSCode-platformer-files.webp"/>

These are the files used by the web server running on your computer. VS Code is a great tool to edit your code files (the program in the screenshot). You can also notice all of the code is organized in the `js` folder. We can open and close folders/directories by clicking the triangles next to them on the left side.

For more resources on how to code in JavaScript [see here.](https://webslc.com/musings/learn-js/)

Let's try giving the player speed hacks. Open this file in VSCode:
`js/entities/player.js`
Then, go to line 16

```
this.body.setMaxVelocity(3, 15);
```

Try messing around with the code and see what happens.

<details>
  <summary>Click me if you give up</summary>
  Tadaa! By changing those values you now can make the character slow like a turtle or super fast like a cheater. The first value is the X speed, and the second value is the Y speed.
    <!-- TODO: PUT A GIF OF THE VALUES BEING EDITED THEN A PLAYER WITH SPEED HACKS -->
</details>

<a href="/tutorial/part-4-going-beyond" class="next">Up Next: Going beyond this tutorial</a>
