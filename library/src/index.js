import './style.css';

let myLibrary = [];
const modalContainer = document.querySelector('.modal-container');
const addBook = document.getElementById('add-book');
const modal = document.getElementById('modal');
const modalAdd = document.getElementById('modal-add');
const modalTitle = document.getElementById('modal-title');
const modalAuthor = document.getElementById('modal-author');
const modalPages = document.getElementById('modal-pages');
const modalCheckbox = document.getElementById('modal-checkbox');
const bookTemplate = document.getElementById('template');
const bookArea = document.querySelector('.book-area');
addBook.addEventListener('click', () => {
  modalContainer.classList.toggle('show');
});
modal.addEventListener('click', modalClick);

modalContainer.addEventListener('click', () => {
  modalContainer.classList.toggle('show');
});
function modalClick(e) {
  e.stopPropagation();
  e.stopImmediatePropagation();
}

modalAdd.addEventListener('click', addBookModal);

function addBookModal() {
  if (modalTitle.value && modalAuthor.value && modalPages.value) {
    let bookItem = {
      title: modalTitle.value,
      author: modalAuthor.value,
      pages: modalPages.value,
      read: modalCheckbox.checked,
    };
    myLibrary.push(bookItem);
    generateBooks();
    modalContainer.classList.toggle('show');
    modalTitle.value = '';
    modalAuthor.value = '';
    modalPages.value = '';
    modalCheckbox.checked = false;
  }

  function generateBooks() {
    myLibrary.forEach(() => {
      let bookItem = bookTemplate.content.cloneNode(true);
      let bookTitle = bookItem.querySelector('.title');
      let bookAuthor = bookItem.querySelector('.author');
      let bookPages = bookItem.querySelector('.pages');
      let bookRead = bookItem.querySelector('.read');
      let bookRemove = bookItem.querySelector('.remove');
      bookRemove.addEventListener('click', remove);
      bookRead.addEventListener('click', unread);
      bookTitle.textContent = modalTitle.value;
      bookAuthor.textContent = modalAuthor.value;
      bookPages.textContent = modalPages.value;
      bookArea.appendChild(bookItem);
    });
    myLibrary = [];
  }
}
function unread() {
  if (this.textContent === 'Read') {
    this.textContent = 'Not Read';
    this.style.backgroundColor = 'rosybrown';
  } else {
    this.textContent = 'Read';
    this.style.backgroundColor = '#238636';
  }
}

function remove(e) {
  this.parentNode.parentNode.removeChild(this.parentNode);
}
