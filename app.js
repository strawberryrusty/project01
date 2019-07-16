document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  // const notSnakesquares = document.querySelector('.grid div:not([class]) <= squares without snake class
  const scoreBoard = document.querySelector('.score')
  const start = document.querySelector('.start')
  const modeBtns = document.querySelectorAll('.mode')
  const width = 10
  let currentIndex = 0
  let snakes = [2,1,0] //2 is head, 1 is body, 0 is tail
  let direction = 1
  let score = 0
  let fruitIndex = 0
  let inverseSpeed = 0.85
  let audio = new Audio('snakehiss.mp3')



  // snakes.forEach(snake => squares[snake].classList.add('snake'))
  //
  let intervalTime = 0
  let interval = null

  // function gameInit
  // create grid
  // create snake
  // set score back to 0

  function gameInit() {
    snakes.forEach(snake => squares[snake].classList.remove('snake'))
    squares[fruitIndex].classList.remove('fruit')
    clearInterval(interval)
    fruitReappears()

    score = 0
    scoreBoard.innerText = score
    intervalTime = 1000
    snakes = [2,1,0]
    currentIndex = 0
    snakes.forEach(snake => squares[snake].classList.add('snake'))
    interval = setInterval(step, intervalTime)
  }

  function step() {
    //deals with snake hitting border and snake hitting itself
    if (
      (snakes[0] + width >= (width * width) && direction === width ) || //
      (snakes[0] % width === width - 1 && direction === 1) ||
      (snakes[0] % width === 0 && direction === -1) ||
      (snakes[0] - width < 0 && direction === -width) ||
      squares[snakes[0] + direction].classList.contains('snake')
    ) {
      return clearInterval(interval)
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
      audio.play()


      clearInterval(interval) //clear the interval
      intervalTime = intervalTime * inverseSpeed //new interval that is 10% faster
      interval = setInterval(step, intervalTime) //run that interval again
    }
    squares[snakes[0]].classList.add('snake')
  }


  function moveMySnake(e) {
    squares[currentIndex].classList.remove('snake')

    switch(e.keyCode) {
      case 37:
        direction = -1
        break
      case 38:
        direction = -width
        break
      case 39:
        direction = 1
        break
      case 40:
        direction = width
        break
    }
  }
  // squares[currentIndex].classList.add('snake')
  //fruitReappears()

  function fruitReappears() {
    do{
      fruitIndex = Math.floor(Math.random() * squares.length)
    }while(squares[fruitIndex].classList.contains('snake')) //while loop done here ensure that randomly generated Fruits
    squares[fruitIndex].classList.add('fruit')             //are not generated on the snake array

  }

  function changeMode(e) {
    inverseSpeed = +e.target.value
  }

  document.addEventListener('keyup', moveMySnake)
  document.addEventListener('keydown', e => e.preventDefault())

  modeBtns.forEach(button => button.addEventListener('click', changeMode))

  start.addEventListener('click', gameInit)
})
