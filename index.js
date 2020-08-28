const grid = document.querySelector('.grid');
const startBtn = document.getElementById('start');
const score = document.getElementById('score');
let squares = [];
let currSnake = [2, 1, 0];
let direction = 1;

function createGrid() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
    squares.push(square);
  }
}
createGrid();

currSnake.forEach((i) => squares[i].classList.add('snake'));

function move() {
  const tail = currSnake.pop();
  squares[tail].classList.remove('snake');
  currSnake.unshift(currSnake[0] + direction);
  squares[currSnake[0]].classList.add('snake');
}

move();

const timerId = setInterval(move, 1000);
// clearInterval(timerId);
