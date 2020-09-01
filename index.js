/* eslint-disable complexity */
const grid = document.querySelector('.grid');
const startBtn = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
let squares = [];
let currSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;

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
    (currSnake[0] - width < 0 && direction === -width) ||
    squares[currSnake[0] + direction].classList.contains('snake')
  ) {
    return clearInterval(timerId);
  }

  const tail = currSnake.pop();
  squares[tail].classList.remove('snake');
  currSnake.unshift(currSnake[0] + direction);

  //deal with snake head getting apple
  if (squares[currSnake[0]].classList.contains('apple')) {
    // remove the apple
    squares[currSnake[0]].classList.remove('apple');
    // grow snake by one
    squares[tail].classList.add('snake');
    // grow our snake array
    currSnake.push(tail);
    // generate a new apple
    generateApples();
    // add one to the store
    score++;
    // display score
    scoreDisplay.textContent = score;
    // speed up on the snake
    clearInterval(timerId);
    intervalTime *= speed;
    timerId = setInterval(move, intervalTime);
  }

  squares[currSnake[0]].classList.add('snake');
}

move();

let timerId = setInterval(move, intervalTime);
// clearInterval(timerId);

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
}

generateApples();

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
