document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  let currentIndex = 0
  const width = 10







  function moveMySnake(e) {
    squares[currentIndex].classList.remove('snakehead')

    switch(e.keyCode) {
      case 37:
        if(currentIndex % width !== 0) currentIndex -= 1
        break
      case 38:
        if(currentIndex - width >= 0) currentIndex -= width
        break
      case 39:
        if(currentIndex % width < width - 1) currentIndex += 1
        break
      case 40:
        if(currentIndex + width < width * width) currentIndex += width
        break
    }
    if(squares[currentIndex].classList.contains('fruit')) {
      squares[currentIndex].classList.remove('fruit')
      fruitReappears()
    }
    squares[currentIndex].classList.add('snakehead')
    //fruitReappears()

  }
  function fruitReappears() {
    const randomIndex = Math.floor(Math.random() * squares.length)
    const randomSquare = squares[randomIndex]
    randomSquare.classList.add('fruit')

  }
  function growSnake () {

  }




  document.addEventListener('keyup', moveMySnake)
  document.addEventListener('keydown', e => e.preventDefault())
})
