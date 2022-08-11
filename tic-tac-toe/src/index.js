import './style.css';
const tiles = Array.from(document.querySelectorAll('.tile'));
const display = document.querySelector('.currentPlayer');
const resetBtn = document.querySelector('button');
const winnerContainer = document.querySelector('.winner');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

const X_WON = 'X_WON';
const O_WON = 'O_WON';
const TIE = 'TIE';

// Algorithm:
// add event listener to each tile
// when clicked, initiate useraction(tile, index)
// add text content to tile using current player
// update the board
// validate and check if there are winners
// changeplayer
tiles.forEach((tile, index) => {
  tile.addEventListener('click', () => userAction(tile, index));
});

resetBtn.addEventListener('click', resetGame);

// 012;
// 345;
// 678;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function userAction(tile, index) {
  if (!tile.innerText) {
    console.log(tile.innerText);
    console.log(currentPlayer);
    tile.innerText = currentPlayer;
    updateBoard(index);
    validateResults();
    changePlayer();
    display.innerText = currentPlayer;
  }
}

function updateBoard(index) {
  board[index] = currentPlayer;
  console.log(board);
}

function changePlayer() {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
}

function validateResults() {
  for (let i = 0; i < 8; i++) {
    let currentCombination = winningCombination[i];
    const a = board[currentCombination[0]];
    const b = board[currentCombination[1]];
    const c = board[currentCombination[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      announce(`${currentPlayer}_WON`);
      resetGame();
      break;
    }
    if (!board.includes('')) {
      announce(TIE);
      resetGame();
    }
  }
}

function announce(winner) {
  winnerContainer.classList.add('show');
  switch (winner) {
    case X_WON:
      winnerContainer.innerText = `Player X Won!`;
      break;
    case O_WON:
      winnerContainer.innerText = `Player O Won!`;
      break;
    case TIE:
      winnerContainer.innerText = `It's a TIE!`;

      break;
  }
}
function resetGame() {
  console.log('reset!');
  board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  tiles.forEach((tile) => {
    tile.innerText = '';
  });
  console.log(board);
}
