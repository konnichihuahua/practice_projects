import './style.css';
import html from './index.html';

const task_input = document.querySelector('.task-input');
const add_task = document.querySelector('.add-task');

add_task.addEventListener('click', (e) => {
  e.preventDefault();

  if (!task_input.value) {
    return alert('Please enter task');
  }
  let task = task_input.value.toLowerCase();

  const tasks = document.querySelector('.tasks');
  const new_task = document.createElement('div');
  new_task.classList.add('task');
  tasks.appendChild(new_task);

  const new_task_content = document.createElement('input');
  new_task_content.classList.add('task-content');
  new_task_content.value = task;
  new_task_content.setAttribute('readonly', 'readonly');
  new_task.appendChild(new_task_content);

  const new_task_actions = document.createElement('div');
  new_task_actions.classList.add('actions');
  new_task.appendChild(new_task_actions);

  const edit = document.createElement('button');
  edit.classList.add('edit');
  edit.innerText = 'Edit';
  new_task_actions.appendChild(edit);
  edit.addEventListener('click', (e) => {
    if (edit.innerText === 'Save') {
      edit.innerText = 'Edit';
      e.target.parentNode.parentNode.childNodes[0].setAttribute(
        'readonly',
        'readonly'
      );
    } else {
      console.log(e.target.parentNode.parentNode.childNodes[0]);
      e.target.parentNode.parentNode.childNodes[0].removeAttribute('readonly');
      edit.innerText = 'Save';
    }
  });

  const del = document.createElement('button');
  del.classList.add('delete');
  del.innerText = 'Delete';

  new_task_actions.appendChild(del);
  del.addEventListener('click', (e) => {
    tasks.removeChild(e.target.closest('.task'));
  });

  task_input.value = '';
});
