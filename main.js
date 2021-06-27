const libraryDiv = document.querySelector('#library');
const addBookFormInputs = document.querySelectorAll('#addBookFormInput > input');
const submitBookFormBtn = document.querySelector('#addBookBtn');

const myLibrary = []; // stores your books and their info

function addBookToLibrary(title, author, numOfPages, hasRead)
{
	const book = new Book(title, author, numOfPages, hasRead);

	myLibrary.push(book);
}
