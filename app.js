document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  // const notSnakesquares = document.querySelector('.grid div:not([class]) <= squares without snake class
  const width = 10
  let currentIndex = 0
  let snakes = [2,1,0] //2 is head, 1 is body, 0 is tail
  let direction = 1


  snakes.forEach(snake => squares[snake].classList.add('snake'))

  let invervalTime = 1000
  let interval = setInterval(step, invervalTime)

  function step() {
    //deals with snake hitting border and snake hitting itself
    if (squares[snakes[0] + direction].classList.contains('snake') || //if snake hits itself
    ((snakes[0]+ width >= (width * width) && direction === width ) || //
    (snakes[0] % width === width -1 && direction === 1) ||
    (snakes[0] % width === 0 && direction === -1) ||
    (snakes[0] - width < 0 && direction === -width))) {
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

      clearInterval(interval) //clear the interval
      invervalTime = invervalTime * 0.95 //new interval that is 10% faster
      interval = setInterval(step, invervalTime) //run that interval again
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
    let randomSquare = null
    do{
      const randomIndex = Math.floor(Math.random() * squares.length)
      randomSquare = squares[randomIndex]
    }while(randomSquare.classList.contains('snake'))
    randomSquare.classList.add('fruit')

  } //while loop to check for class of

  // function snakeHitsBorder() {
  //   if ((snakes[0]+ width >= width * width && direction === width ) ||
  //      (snakes[0] % width === width -1 && direction === 1) ||
  //      (snakes[0]% width === 0 && direction === -1) ||
  //      (snakes[0] - width < 0 && direction === -width)) {
  //     clearInterval(interval)
  //   }
  // }

  document.addEventListener('keyup', moveMySnake)
  document.addEventListener('keydown', e => e.preventDefault())
})
