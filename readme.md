# **Project 1: Snape Game ![General Assembly](https://camo.githubusercontent.com/6ce15b81c1f06d716d753a61f5db22375fa684da/68747470733a2f2f67612d646173682e73332e616d617a6f6e6177732e636f6d2f70726f64756374696f6e2f6173736574732f6c6f676f2d39663838616536633963333837313639306533333238306663663535376633332e706e67)


## Overview
Snape is an exciting Harry Potter themed version of the popular arcade game Snake. Challenge your reactions and chase Harry Potter with Professor Snake, multiply speed up and try not let Snake hit himself or a wall.

This was my first project from General Assembly's 42nd Software Engineering Immersive Course. It was an individual project built in a week.

Launch on [GitHub Pages](https://github.com/strawberryrusty/project01). Check out the GitHub [Repo](https://strawberryrusty.github.io/project01).

![Gameplay demo](///)

## Brief

* **Render a grid-based game in the browser**
* **Render a "Snape" Snake that moves dynamically with keystrokes**
* **Design randomly generating "Harry Potter" elements that Snape can chase**
* **Include separate HTML / CSS / JavaScript files**
* Use **Javascript** for **DOM manipulation**
* **Deploy your game online**, using Github Pages, where the rest of the world can access it
* Use **semantic markup** for HTML and CSS (adhere to best practices)



## Technologies Used
* HTML5 with HTML5 audio
* CSS
* JavaScript
* Git
* GitHub
* Photopea
* fontsaddict.com

## Approach Taken

### Grid Layout & Generation of objects on screen

After several initial iterations, I found that a suitable size for my game would be a 10 x 10 grid, which still gives allows gives a sense of difficulty, without depriving the the "fun factor" of the game in terms of both scoring points and growing your Snake. The best to represent this 10 x 10 grid which was created by an array of 100 divs, wrapped in class of "grid" and then styled with CSS to set the width and height.

The Snape 'snake' would start as an array that always starts at index numbers: 0,1,2 and the Harrys appear randomly using Math Random and a while loop that means that each Harry created on the grid is not created on a div that is already occupied by the Snake.

### Functionality
#### Collision
How would the app know if the Snape and and Harry have collided?
I had to define what a collision was: when two or more items occupy the same space.
Each item had an index within the array, called position, if the position of the spacecraft and debris were the same, there was a collision:

``` JavaScript
if(squares[snakes[0]].classList.contains('fruit')) {
  squares[snakes[0]].classList.remove('fruit')
  squares[tail].classList.add('snake')
  snakes.push(tail)
  fruitReappears()
```

#### Keypresses
From the start, I set myself a little challenge to enable the user to navigate the menus, start/pause and play the game using only the keyboard.

The user would have to manoeuvre the shuttle to avoid collision. I started off by adding clickable buttons to move left and right, it worked but wasn't exactly user friendly.
Once I figured out how to add keyboard interactivity by adding an event listener to the window, I mapped out all the keyboard buttons I'd need and wrote logic to perform a function depending on which menu the user was on:

``` JavaScript
window.addEventListener('keydown', function(e) {
  if (e.which === 38) { // up arrow
    if(gameIsRunning){
      moveUp();
    }
  }
});
```

#### Audio
In my previous projects, I had a lot of fun working with Audio, so I added a background track and sound effects for all button clicks/presses. As a bonus, I thought it would be good UX to enable toggling music and sounds, so I added these to the game pause menu and global clickable links at the top-right of the screen.
``` JavaScript
//enable all sounds
areSoundsOn = true;
console.log('sound effects have been switched on');
toggleSoundsButton.textContent = 'Sounds: ON';
if(areSoundsOn){
  sfx.setAttribute('src', 'sounds/click.mp3');
  sfx.play();
}
```

#### Featured Piece of Code no. 1

This function is called upon after the user has crashed the spacecraft, to create an object with their name and score; this is then pushed into an array that is sorted by highest scores, top 10 objects are selected and populated as `li` DOM objects in the Hall of Fame.
``` JavaScript
function addPlayerToHoF(playerName, score){
  class Player{
    constructor(name, highScore){
      if (playerName === null){
        playerName = 'Anonymous Star Lord';
      }
      this.name = playerName;
      this.highScore = score;
      console.log(`${name} has scored ${highScore}`);
    }
  }

  while (leaderboard.firstChild) {
    leaderboard.removeChild(leaderboard.firstChild);
  }

  leaders.push(new Player(playerName, score));
  leaders.sort(compare);
  leaders = leaders.slice(0,10);
  leaders.forEach(function(element){
    const newElement = document.createElement('li');
    newElement.textContent = `${element.highScore} >>> ${element.name}`;
    leaderboard.appendChild(newElement);
  });
}
```

#### Featured Piece of Code no. 2

This piece of CSS gives the grid its distinctive perspective look; adding that to the background this immerses the player into the feeling of warp-travel. From `/style.css`.
``` CSS
.grid {
  transform: perspective(5px) rotateX(1deg);
}
```

## Screenshots

**Gameplay at MVP**

![MVP Gameplay](/images/readme-screenshots/mvp.png)

**After some styling**

![After styling 1](/images/readme-screenshots/style1.png)
![After styling 2](/images/readme-screenshots/style2.png)

### Final Product
![Landing page](/images/readme-screenshots/home.png)

![Briefing page](/images/readme-screenshots/briefing.png)

![Game mode select page](/images/readme-screenshots/gamemode.png)

![Ship select page](/images/readme-screenshots/shipselect.png)

![Gameplay screenshot](/images/readme-screenshots/gameplay.png)

![Pause menu screenshot](/images/readme-screenshots/pausemenu.png)

![Scoreboard screenshot](/images/readme-screenshots/score.png)

## Bugs
Below is a list of some of the known bugs within the game:

* Shooting - it's not completed yet, however I left the visual effect in, as I found it cool!
  The bug with this, is that if you fire again before the first shot has managed to 'leave' the grid, the projectile remains frozen on the grid, until you shoot over it with another projectile.

* Debris Generation - sometimes, when debris is generated at the top, its position jumps.
  I believe this may be the interval timing of the previous wave clearing the new wave.

* Game restart - if during the game, the pause menu is called and then the game is resumed - all debris is cleared and regenerated as if new.

* Bonus - the collection of bonus items was intended to increment the score by a set number once; during testing I noticed that once the bonus had been collected and if the spacecraft remains on the bonus item's position, the points kept accumulating until the next bonus appeared elsewhere. This was due to the line of code responsible for score incrementation being inside the setInterval block.
I decided to use this as a feature for the game and kept it in.

## Wins and Blockers

One of the problems I had initially, was the removal of debris after it had left the grid; the console would return many errors stating it couldn't remove the class of undefined - I managed to get around this by limiting the movement of debris only within the 10x20 grid.

The biggest win, by far, was the amount of confidence I gained working with JavaScript during this project. I got the opportunity to apply my new learnings in a real-world project and achieved more than I had set out at the start.

## Future Content

Along with adding the shooting functionality, there are a number of potential future features I'd like to implement, such as:
* Boss game-mode, where the player must destroy an alien being that fires multiple projectiles at the player.
* An additional player(2nd spacecraft) that can help with Boss mode or just play Arcade mode to see who can score more points.
* More debris, different patterns of waves of debris.
* Ability to choose from a variety of spacecraft with different images, survivability and weaponry.
* Ability to increase the grid size.
* Authentication so users can keep track of their highest scores, compare it to other players globally and develop their spacecraft with upgrades and achievements.
* And much more!
