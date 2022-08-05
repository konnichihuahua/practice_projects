import './style.css';

const btns = document.querySelectorAll('button');
const display = document.getElementById('display');
btns.forEach((btn) =>
  btn.addEventListener('click', () => {
    if (btn.id === 'equals' || btn.id === 'clear') {
      return;
    }
    console.log(btn.textContent);
    display.textContent += btn.textContent;
  })
);

const evaluate = document.getElementById('equals');
evaluate.addEventListener('click', () => {
  console.log(display.textContent);
  let result = eval(display.textContent);
  display.textContent = result;
});

const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
  display.textContent = '';
});
