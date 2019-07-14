document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const width = 10
  let currentIndex = 0
  let snakes = [2,1,0] //2 is head, 1 is body, 0 is tail
  let direction = 1


  snakes.forEach(snake => squares[snake].classList.add('snake'))

  setInterval(() => {
    const tail = snakes.pop() //removes the last item of the array and shows it
    squares[tail].classList.remove('snake')
    snakes.unshift(snakes[0] + direction)
    if(squares[snakes[0]].classList.contains('fruit')) {
      squares[snakes[0]].classList.remove('fruit')
      squares[tail].classList.add('snake')
      snakes.push(tail)
      fruitReappears()
    }
    squares[snakes[0]].classList.add('snake')
  }, 1000)


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
    const randomIndex = Math.floor(Math.random() * squares.length)
    const randomSquare = squares[randomIndex]
    randomSquare.classList.add('fruit')

  }

  document.addEventListener('keyup', moveMySnake)
  document.addEventListener('keydown', e => e.preventDefault())
})
