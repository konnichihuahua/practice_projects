import './style.css';

const container = document.querySelector('.container');
document.body.appendChild(container);
for (let i = 0; i < 256; i++) {
  container.appendChild(document.createElement('div')).classList.add('square');
  console.log([i]);
}
const mainContent = document.querySelector('.main-content');
mainContent.appendChild(container);

const squares = document.querySelectorAll('.square');
squares.forEach((square) =>
  square.addEventListener('mouseover', () => {
    square.style.backgroundColor = 'black';
  })
);
