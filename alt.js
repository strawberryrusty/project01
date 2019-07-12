document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  let currentIndex = 0
  const width = 5

  function moveMyMole(e) {
    squares[currentIndex].classList.remove('mole')

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

    if(squares[currentIndex].classList.contains('worm')) {
      squares[currentIndex].classList.remove('worm')
    }
    squares[currentIndex].classList.add('mole')
  }
  

  document.addEventListener('keyup', moveMyMole)
  document.addEventListener('keydown', e => e.preventDefault())
})
