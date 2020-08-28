/* eslint-disable complexity */
const grid = document.querySelector('.grid');
const startBtn = document.getElementById('start');
const score = document.getElementById('score');
let squares = [];
let currSnake = [2, 1, 0];
let direction = 1;
const width = 10;

function createGrid() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
    squares.push(square);
  }
}
createGrid();

currSnake.forEach((i) => squares[i].classList.add('snake'));

function move() {
  //if snake has hit bottom, right wall, left wall, top

  if (
    (currSnake[0] + width >= width * width && direction === width) ||
    (currSnake[0] % width === width - 1 && direction === 1) ||
    (currSnake[0] % width === 0 && direction === -1) ||
    (currSnake[0] - width < 0 && direciton === -width) ||
    squares[currSnake[0] + direction].classList.contains('snake')
  ) {
    return clearInterval(timerId);
  }

  const tail = currSnake.pop();
  squares[tail].classList.remove('snake');
  currSnake.unshift(currSnake[0] + direction);
  squares[currSnake[0]].classList.add('snake');
}

move();

let timerId = setInterval(move, 1000);
// clearInterval(timerId);

// 39 = right
// 38 = up
// 37 = left
// 40 = down

function control(e) {
  if (e.keyCode === 39) {
    console.log('right');
    direction = 1;
  } else if (e.keyCode === 38) {
    console.log('up');
    direction = -width;
  } else if (e.keyCode === 37) {
    console.log('left');
    direction = -1;
  } else if (e.keyCode === 40) {
    console.log('down');
    direction = +width;
  }
}

document.addEventListener('keyup', control);
