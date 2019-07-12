document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const width = 10
  let currentIndex = 0
  let snakes = [2,1,0]
  let direction = 1


  snakes.forEach(snake => squares[snake].classList.add('snake'))

  setInterval(() => {
    const tail = snakes.pop()
    squares[tail].classList.remove('snake')
    snakes.unshift(snakes[0] + direction)
    console.log(snakes)
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
    // if(squares[currentIndex].classList.contains('fruit')) {
    //   squares[currentIndex].classList.remove('fruit')
    //   fruitReappears()
    // }
    // squares[currentIndex].classList.add('snake')
    //fruitReappears()

  }
  function fruitReappears() {
    const randomIndex = Math.floor(Math.random() * squares.length)
    const randomSquare = squares[randomIndex]
    randomSquare.classList.add('fruit')

  }
  // var arr = []
  // var =
  // function growSnake () {for(let i = 0; i < squares.length; i++) {
  //   if(squares[currentIndex].classList.contains('fruit') && (squares[currentIndex].classList.contains('snake') ) {
  //     squares.push
  // //
  //
  //
  //   }
  //
  // }




  document.addEventListener('keyup', moveMySnake)
  document.addEventListener('keydown', e => e.preventDefault())
})
