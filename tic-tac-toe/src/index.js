import './style.css';
const tiles = Array.from(document.querySelectorAll('.tile'));
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
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

function userAction(tile, index) {
  tile.innerText = currentPlayer;
  updateBoard(index);
  changePlayer();
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
