'use strict';
let books = [
    {
        id: '001',
        title: 'title1',
        author: 'author1',
    },
    {
        id: '002',
        title: 'title2',
        author: 'author2',
    },
];
// add data to local storage
function addToLocalStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
}
// Remove book from the list
function removeBook(ref) {
    const result = books.filter((value) => value.id !== ref);
    books = result;
    addToLocalStorage(books);
}
// add event listner to newly added book remove button
let removeBtn = document.querySelectorAll('.remove');
function addEvents() {
    removeBtn.forEach((element) => {
        element.addEventListener('click', (e) => {
            const ref = e.target.id;
            removeBook(ref);
            e.target.parentElement.remove();
        });
    });
}
// populate dom with the list
const addBtn = document.querySelector('#add-btn');
function showBooks(list) {
    const booksListDiv = document.querySelector('#books-container');
    list.forEach(function (lists, i, arr) {
        const div = document.createElement('div');
        const pTitle = document.createElement('p');
        pTitle.innerHTML = list[i].title;
        div.appendChild(pTitle);
        const pAuthor = document.createElement('p');
        pAuthor.innerHTML = list[i].author;
        div.appendChild(pAuthor);
        const btn = document.createElement('button');
        btn.className = 'remove';
        btn.innerHTML = 'Remove';
        btn.id = list[i].id;
        div.appendChild(btn);
        const hr = document.createElement('hr');
        div.appendChild(hr);
        booksListDiv.appendChild(div);
    });
    removeBtn = document.querySelectorAll('.remove');
    addEvents();
}
