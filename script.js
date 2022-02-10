let books;

// add data to local storage
function addToLocalStorage(data) {
  localStorage.setItem('data', JSON.stringify(data));
}
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  removeBook(ref) {
    const result = books.filter((value) => value.id !== ref);
    books = result;
    addToLocalStorage(books);
  }
}

const book1 = new Book('title1', 'author1', '001');
const book2 = new Book('title2', 'author2', '002');
const book3 = new Book('title3', 'author3', '003');
const bookAdmin = new Book('adminTitle', 'adminAuthor', '004');

books = [book1, book2, book3];

// add event listner to newly added book remove button
let removeBtn = document.querySelectorAll('.remove');
function addEvents() {
  removeBtn.forEach((element) => {
    element.addEventListener('click', (e) => {
      const ref = e.target.id;
      bookAdmin.removeBook(ref);
      e.target.parentElement.remove();
    });
  });
}

// populate dom with the list
const addBtn = document.querySelector('#add-btn');
function showBooks(list) {
  const booksListDiv = document.querySelector('#List');
  // let colorChange = 0;
  for (let i = 0; i < list.length; i += 1) {
    const div = document.createElement('div');
    const pTitle = document.createElement('p');
    pTitle.innerHTML = `"${list[i].title}" by ${list[i].author}`;
    div.appendChild(pTitle);
    const btn = document.createElement('button');
    btn.className = 'remove';
    btn.innerHTML = 'Remove';
    btn.id = list[i].id;
    div.appendChild(btn);
    // const hr = document.createElement('hr');
    // div.appendChild(hr);
    div.className = 'book_lists';
    booksListDiv.appendChild(div);
  }
  removeBtn = document.querySelectorAll('.remove');
  addEvents();
}
// add book to the list
function addBook() {
  const bookTitle = document.querySelector('#title').value;
  const bookAuthor = document.querySelector('#author').value;
  if (bookTitle && bookAuthor) {
    const book = new Book(bookTitle, bookAuthor, (Date.now().toString()));
    books.push(book);
    showBooks([book]);
    addToLocalStorage(books);
    document.querySelector('form').reset();
  }
}
addBtn.addEventListener('click', addBook);
window.onload = () => {
  if (localStorage.getItem('data') === null) {
    showBooks(books);
  } else {
    const localBooks = JSON.parse(localStorage.getItem('data'));
    showBooks(localBooks);
    books = localBooks;
  }
};