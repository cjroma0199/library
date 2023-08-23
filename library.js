const closeModal = document.querySelector('.close');
const modal = document.querySelector('#myModal');
const addBookButton = document.querySelector('#add-book');
const cancelModal = document.querySelector('#cancel');
const addBookAuthor = document.querySelector('#bookAuthor');
const addBookTitle = document.querySelector('#bookTitle');
const addBookPages = document.querySelector('#bookPages');
const addBookStatus = document.querySelector('#bookStatus');
const addBook = document.querySelector('#add');
const bookShelf = document.querySelector('.book-container');

let myBooks = [
  {
    id: 0,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    pages: 180,
    read: true,
  },
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    pages: 281,
    read: true,
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    pages: 328,
    read: false,
  },
  {
    id: 3,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    pages: 279,
    read: true,
  },
  {
    id: 4,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    pages: 224,
    read: false,
  },
];
function Book(title, author, pages, read) {
  this.id = myBooks.length ? myBooks.length : 0;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myBooks.push(book);
  clearLibrary();
  displayBook(myBooks);
}
function createBook({ id, title, author, pages, read }) {
  const book = document.createElement('div');
  const bookTitle = document.createElement('h2');
  const group = document.createElement('div');
  const bookAuthor = document.createElement('p');
  const bookStatus = document.createElement('span');
  const pagesGroup = document.createElement('div');
  const pagesText = document.createElement('p');
  const pagesNumber = document.createElement('p');
  const deleteButton = document.createElement('span');

  bookStatus.addEventListener('click', changeStatus);
  deleteButton.addEventListener('click', deleteBook);

  book.classList.add('book');
  book.classList.add('card');
  bookTitle.classList.add('book-title');
  group.classList.add('group');
  bookAuthor.classList.add('book-author');
  bookStatus.classList.add('book-status');
  bookStatus.classList.add(read ? 'green' : 'red');
  pagesGroup.classList.add('pages');
  deleteButton.classList.add('material-symbols-outlined');
  deleteButton.classList.add('delete');

  bookTitle.textContent = title;
  bookAuthor.textContent = author;
  pagesNumber.textContent = pages;
  pagesText.textContent = 'Pages';
  bookStatus.textContent = read ? 'Read' : 'Not read';
  deleteButton.textContent = 'delete';

  group.appendChild(bookAuthor);
  group.appendChild(bookStatus);
  pagesGroup.appendChild(pagesText);
  pagesGroup.appendChild(pagesNumber);
  book.appendChild(deleteButton);
  book.appendChild(bookTitle);
  book.appendChild(group);
  book.appendChild(pagesGroup);
  book.dataset.dataId = id;

  return book;
}
function displayBook(books) {
  books.forEach((book) => {
    bookShelf.appendChild(createBook(book));
  });
}

function clearForm() {
  addBookAuthor.value = '';
  addBookTitle.value = '';
  addBookPages.value = '';
  addBookStatus.checked = false;
}

function closeForm() {
  modal.style.display = 'none';
}

function deleteBook(e) {
  delete myBooks[e.target.parentNode.dataset.dataId];
  bookShelf.removeChild(e.target.parentNode);
}

function clearLibrary() {
  [...bookShelf.children].forEach((child) => {
    if (child.className.includes('book')) bookShelf.removeChild(child);
  });
}

function changeStatus(e) {
  if (e.target.className.includes('red')) {
    e.target.classList.remove('red');
    e.target.classList.add('green');
    e.target.textContent = 'Read';
    myBooks[e.target.parentNode.parentNode.dataset.dataId].read = true;
  } else {
    e.target.classList.remove('green');
    e.target.classList.add('red');
    e.target.textContent = 'Not read';
    myBooks[e.target.parentNode.parentNode.dataset.dataId].read = false;
  }
}

addBookButton.addEventListener('click', function () {
  modal.style.display = 'block';
});

cancelModal.addEventListener('click', (e) => {
  clearForm();
  closeForm();
});
cancelModal.addEventListener('click', (e) => {
  e.preventDefault();
  clearForm();
  closeForm();
});

bookPages.placeholder = 'Book pages';

addBook.addEventListener('click', function (e) {
  e.preventDefault();
  let book = new Book(
    addBookTitle.value,
    addBookAuthor.value,
    addBookPages.value,
    addBookStatus.checked
  );
  addBookToLibrary(book);
  clearForm();
  closeForm();
});

displayBook(myBooks);
