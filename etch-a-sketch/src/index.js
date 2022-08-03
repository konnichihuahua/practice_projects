import './style.css';
import * as htmlToImage from 'html-to-image';
import * as download from 'downloadjs';
const container = document.querySelector('.container');
const resetBtn = document.querySelector('.reset');
const downloadBtn = document.querySelector('.downloadBtn');
resetBtn.addEventListener('click', reset);
const mainContent = document.querySelector('.main-content');
document.body.appendChild(container);
for (let i = 0; i < 256; i++) {
  container.appendChild(document.createElement('div')).classList.add('square');
}

let squares = document.querySelectorAll('.square');
squares.forEach((square) =>
  square.addEventListener('mouseover', () => {
    let colorValue1 = Math.floor(Math.random() * (255 + 1));
    let colorValue2 = Math.floor(Math.random() * (255 + 1));
    let colorValue3 = Math.floor(Math.random() * (255 + 1));
    square.style.backgroundColor = `rgb(${colorValue1}, ${colorValue2}, ${colorValue3})`;
  })
);

function reset() {
  let squareCount = document.querySelectorAll('.square');
  squareCount.forEach((square) => square.remove());
  let sides = prompt('how many sides?');
  for (let i = 0; i < sides * sides; i++) {
    container
      .appendChild(document.createElement('div'))
      .classList.add('square');
    let squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.style.width = `${720 / sides}px`;
      square.style.height = `${720 / sides}px`;
    });
  }
  let squares = document.querySelectorAll('.square');
  squares.forEach((square) =>
    square.addEventListener('mouseover', () => {
      let colorValue1 = Math.floor(Math.random() * (255 + 1));
      let colorValue2 = Math.floor(Math.random() * (255 + 1));
      let colorValue3 = Math.floor(Math.random() * (255 + 1));
      square.style.backgroundColor = `rgb(${colorValue1}, ${colorValue2}, ${colorValue3})`;
    })
  );
}

function downloadImg() {
  htmlToImage.toPng(container).then(function (dataUrl) {
    download(dataUrl, 'etch-a-sketch-by-konnichihuahua.png');
  });
}

downloadBtn.addEventListener('click', downloadImg);
mainContent.appendChild(container);
