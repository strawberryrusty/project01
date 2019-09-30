//lets/variables/constants

document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreBoard = document.querySelector('span')
  const startBtns = document.querySelectorAll('.start')
  const modeBtns = document.querySelectorAll('.mode')
  const popUp = document.querySelector('.popUp')
  const width = 10 //as board is currently 10x10
  let currentIndex = 0
  let snakes = [2,1,0] //2 is head, 1 is body, 0 is tail
  let direction = 1 //so snake always starts moving left on start by default
  let score = 0
  let fruitIndex = 0
  let inverseSpeed = 0.9
  const audio = new Audio('sounds/mrpotter.wav')
  const theme = new Audio('sounds/hpthemeshort.mp3')
  let intervalTime = 0
  let interval = null

  // Start button for game
  // create grid
  // create snake
  // set score back to 0
  //set all indexes to the starting/base level

  function gameInit() {
    popUp.style.display = 'none'
    theme.play()
    snakes.forEach(snake => squares[snake].classList.remove('snake'))
    squares[fruitIndex].classList.remove('fruit')
    clearInterval(interval)
    fruitReappears()
    direction = 1

    score = 0
    scoreBoard.innerText = score
    intervalTime = 1000
    snakes = [2,1,0]
    currentIndex = 0
    snakes.forEach(snake => squares[snake].classList.add('snake'))
    interval = setInterval(step, intervalTime)
  }

  //each snake step is mapped out by this function
  function step() {
    //deals with snake hitting border and snake hitting itself
    if (
      (snakes[0] + width >= (width * width) && direction === width ) || // if snake hits bottom
      (snakes[0] % width === width - 1 && direction === 1) || //if snake hits right wall
      (snakes[0] % width === 0 && direction === -1) || //if snake hits left wall
      (snakes[0] - width < 0 && direction === -width) || //if snake hits top  wall
      squares[snakes[0] + direction].classList.contains('snake') //if snake head hits itself
    ) {
      popUp.style.display = 'flex' //turn popup element class from none to flex, ie death popup
      return clearInterval(interval) //clear interval ie stop if snake dies
    }


    const tail = snakes.pop() //removes the last item of the array and shows it
    squares[tail].classList.remove('snake') //removes snake class from the tail square
    snakes.unshift(snakes[0] + direction) //gives direction to the head of the array, eg +1 means right, plus +10 means down an row (with direction given by the moveMySnake function)
    //this section of code deals with the collision event,

    if(squares[snakes[0]].classList.contains('fruit')) {
      squares[snakes[0]].classList.remove('fruit')
      squares[tail].classList.add('snake')
      snakes.push(tail)
      fruitReappears() ///<= this specifically calls the function to randomly generate fruits on the grid
      score++
      scoreBoard.textContent = score
      audio.play() //noise after collision


      clearInterval(interval) //clear the interval
      intervalTime = intervalTime * inverseSpeed //set the new interval
      interval = setInterval(step, intervalTime) //run that interval again
      console.log(intervalTime)
    }
    squares[snakes[0]].classList.add('snake')
  }

  //sets keycodes for specific keys
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

  //randomly appearing fruits on the grid that don't appear on the snake
  function fruitReappears() {
    do{
      fruitIndex = Math.floor(Math.random() * squares.length)
    }while(squares[fruitIndex].classList.contains('snake')) //while loop done here ensure that randomly
    squares[fruitIndex].classList.add('fruit')             //generated fruits don't appear on snake

  }

  // this sets the function that means for each respective button you can choose easy,hard and insane mode
  // and toggles the background of each button to make it red if that class is active
  function changeMode(e) {
    modeBtns.forEach(button => button.classList.remove('activeButton'))
    inverseSpeed = +e.target.value
    e.target.classList.toggle('activeButton')
  }

  //event listeners
  document.addEventListener('keyup', moveMySnake)
  document.addEventListener('keydown', e => e.preventDefault())
  modeBtns.forEach(button => button.addEventListener('click', changeMode))
  startBtns.forEach(btn => btn.addEventListener('click', gameInit))
})
