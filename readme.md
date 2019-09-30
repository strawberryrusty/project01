# Project 1: Snape Game ![General Assembly](https://camo.githubusercontent.com/6ce15b81c1f06d716d753a61f5db22375fa684da/68747470733a2f2f67612d646173682e73332e616d617a6f6e6177732e636f6d2f70726f64756374696f6e2f6173736574732f6c6f676f2d39663838616536633963333837313639306533333238306663663535376633332e706e67)


## Overview
Snape is an exciting Harry Potter themed version of the popular arcade game Snake. Challenge your reactions and chase Harry Potter with Professor Snake, multiply speed up and try not let Snake hit himself or a wall.

This was my first project from General Assembly's 42nd Software Engineering Immersive Course. It was an individual project built in a week.

Launch on [GitHub Pages](https://strawberryrusty.github.io/project01). Check out the GitHub [Repo](https://github.com/strawberryrusty/project01).


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
Each item had an index within the array, called position, if the position of the snake and fruit were the same, there was a collision:

``` JavaScript
if(squares[snakes[0]].classList.contains('fruit')) {
  squares[snakes[0]].classList.remove('fruit')
  squares[tail].classList.add('snake')
  snakes.push(tail)
  fruitReappears()
```

#### Snake movement
How did I make the snake move automatically and dynamically?
I had to remove

#### Keypresses
How did I make the Snake move automatically and dynamically? I created a function that would remove the class-list of snake from the Snake array, anytime a keystroke occurred. For example if the user made snake moved to the right, the most div that occupied the tail of the snake would have the "class" of snake removed, meaning it snake styling is removed, giving the animation effect. This was repeated for left, down, and up movements as well, and is shown below:

``` JavaScript
function moveMySnake(e) {
  squares[currentIndex].classList.remove('snake')

  switch(e.keyCode) {
    case 74:
      direction = -1
      break
    case 73:
      direction = -width
      break
    case 76:
      direction = 1
      break
    case 75:
      direction = width
      break
  }
}
```

#### Featured Piece of Code

This piece of code is apart of the code block that handles every step the snake takes. I needed to create a mechanism that dealt with the snake death i.e whenever the snake hit the border or hit itself and also have a "death popup" that tells the user that they have died and if they would like to restart the game. The death popup has a class-list with the CSS styling that sets the display as none, however whenever the snake dies, this popup's display CSS style is now set to flex, so appearing over the game board. The snake death logic is elaborated further below:
``` JavaScript
function step() {

  if (
    (snakes[0] + width >= (width * width) && direction === width ) ||
    (snakes[0] % width === width - 1 && direction === 1) ||
    (snakes[0] % width === 0 && direction === -1) ||
    (snakes[0] - width < 0 && direction === -width) ||
    squares[snakes[0] + direction].classList.contains('snake')
  ) {
    popUp.style.display = 'flex'
    return clearInterval(interval)
  }
```


## Screenshots

**Gameplay at Final Stage**

![MVP Gameplay](/images/readme-photos/snape.png)


## Bugs
Below is a list of some of the known bugs within the game:

* If a user is moving the snake along the left border of the grid and gets to the top border, and moves the snake right in the last minute in order to avoid death, there is a slight delay and causes the top left cell of the grid to have the board background image and not the snake.

* When the fruit (in this case Harry Potter) is eaten by the snake, it sometimes reappears on a cell that is already occupied by the snake. Although this was a problem I already had in my mind when making the game that I tried to solve with JS, it needs more of a robust solution.



## Future Content

There are a number of potential future features I'd like to implement, such as:
* Adding to the harder modes such as "Wizard Mode" by having fruit reappear, but only for a specified period of time, meaning the snake/user would have to chase down the fruit with more urgency.
* 2 Player mode, where 2 players with 2 different Snakes can play and compete at the same time.
