import makeid from './makeid.js';
import Book from './book.js';

const libraryDiv = document.querySelector('#library');
const textAndNumInputs = document.querySelectorAll('#addBookFormInput #addBookText input');
const [titleInput, authorInput, pageNumInput] = textAndNumInputs;
const readRadioButtons = document.querySelectorAll('#addBookRadio input');
const submitBookFormBtn = document.querySelector('#addBookBtn');
const bookTemplate = document.querySelector('#bookTemplate');
const editBookTemplate = document.querySelector('#editTemplate');

let myLibrary = JSON.parse(localStorage.getItem('persistentLibrary')) || []; // stores your books and their info

// sets book ready for editing
function setBookForEditing(bookToEdit)
{
	const editableBook = editBookTemplate.content.cloneNode(true).children[0];
	const key = bookToEdit.getAttribute('data-key');

	let [,, title, author, pageNum, hasRead] = bookToEdit.children;

	// get title
	title = title.textContent;

	[author, pageNum, hasRead] = [author, pageNum, hasRead].map((variable) =>
	{ // split string from ': ' and trim to get the other values
		[, variable] = variable.textContent.split(': ');
		return variable.trim();
	});

	editableBook.setAttribute('data-key', key);
	editableBook.querySelector('.title input').value += title;
	editableBook.querySelector('.author input').value += author;
	editableBook.querySelector('.pageNum input').value += pageNum;

	const radioBtns = editableBook.querySelectorAll('.hasRead input');
	switch(hasRead)
	{ // turn hasRead into a boolean
		case 'true':
			hasRead = true;
			radioBtns[0].checked = true;
			break;

		case 'false':
			hasRead = false;
			radioBtns[1].checked = true;
			break;

		default:
			hasRead = undefined;
			break;
	}

	// prevent multiple book's radio buttons from sharing names
	const randName = makeid();
	for(const radioBtn of radioBtns)
	{
		radioBtn.name = randName;
	}

	editableBook.querySelector('.delete').addEventListener('click', (e) =>
	{
		deleteBook(e.target.parentElement);
	});

	editableBook.querySelector('.cancelEdit').addEventListener('click', () =>
	{
		replaceElInLibrary(bookToEdit, editableBook);
	});

	editableBook.querySelector('.confirmEdit').addEventListener('click', () =>
	{
		confirmEdit(editableBook);
	});

	replaceElInLibrary(editableBook, bookToEdit);
}

// changes book values
function confirmEdit(editedBook)
{
	for(const input of editedBook.querySelectorAll('input'))
	{
		if(!input.validity.valid) return;
	}

	const title = editedBook.querySelector('.title input').value;
	const author = editedBook.querySelector('.author input').value;
	const pageNum = +editedBook.querySelector('.pageNum input').value;
	const key = editedBook.getAttribute('data-key');

	const hasReadRadioBtns = editedBook.querySelectorAll('.radio input');
	const hasRead = getRadioButtonValue(hasReadRadioBtns);

	const newBook = new Book(title, author, pageNum, hasRead, key);
	const newBookEl = createBookElement(newBook);

	editBookInfo(newBook);
	replaceElInLibrary(newBookEl, editedBook);
}

// replaces book
function replaceElInLibrary(originalBook, bookInEditState)
{
	libraryDiv.replaceChild(originalBook, bookInEditState);
}

// edits book info in array
function editBookInfo(bookInfo)
{
	const book = myLibrary.find(book => book.key === bookInfo.key);
	
	for(const prop in bookInfo)
	{
		book[prop] = bookInfo[prop];
	}

	updateLocalStorage();
}

// removes book from dom and list
function deleteBook(bookToDelete)
{
	const key = bookToDelete.getAttribute('data-key');

	bookToDelete.remove();

 	const index = myLibrary.findIndex(book => book.key === key);
	myLibrary.splice(index, 1);

	if(myLibrary.length === 0) displayEmptyLibMessage();

	updateLocalStorage();
}

// get values from 2 radio btns
function getRadioButtonValue(radioBtns)
{
	if(radioBtns[0].checked) return true;
	if(radioBtns[1].checked) return false;
}

// push a book to myLibrary/array
function addBookToLibrary(bookInfo)
{
	myLibrary.push(bookInfo);
	updateLocalStorage();
}

// updates local storage at every change
function updateLocalStorage()
{
	localStorage.setItem('persistentLibrary', JSON.stringify(myLibrary));
}

// called at startup to load books from memory
function loadLibrary()
{
	if(myLibrary.length === 0)
	{
		displayEmptyLibMessage();
	}
	else
	{
		for(const book of myLibrary)
		{
			updateLibrary(book);
		}
	}
}

// display a message to user if library is empty
function displayEmptyLibMessage()
{
	const emptyLibSpan = document.createElement('span');
	emptyLibSpan.id = 'emptyLibrary';
	emptyLibSpan.textContent = 'Nothing in your library...';

	libraryDiv.append(emptyLibSpan);
}

// adds a book to library div
function updateLibrary(bookInfo)
{
	const book = createBookElement(bookInfo);

	libraryDiv.append(book);
}

// create a book element to be appended to to replace
function createBookElement(bookInfo)
{
	const book = bookTemplate.content.cloneNode(true).children[0];

	book.setAttribute('data-key', bookInfo.key);

	for(const [infoType, classes] of [
		['title', '.title'],
		['author', '.author .fill-in'],
		['pageNum', '.pageNum .fill-in'],
		['hasRead', '.hasRead .fill-in'],
	]) // loop over array to get and set classes and info
	{
		book.querySelector(classes).textContent += bookInfo[infoType];
	}

	book.querySelector('.delete').addEventListener('click', (e) =>
	{
		deleteBook(e.target.parentElement);
	});

	book.querySelector('.edit').addEventListener('click', (e) =>
	{
		setBookForEditing(e.target.parentElement);
	});

	return book;
}

// sets book form inputs to empty
function emptyAddBookForm()
{
	for(const input of [...textAndNumInputs, ...readRadioButtons])
	{
		input.value = '';
		input.checked = false;
	}
}

// callback for book form
function addBookFormCallback(e)
{
	for(const input of [...textAndNumInputs, ...readRadioButtons])
	{
		if(!input.validity.valid) return;
	}

	e.preventDefault();

	const bookInfo = new Book(
		titleInput.value || 'Unknown',
		authorInput.value || 'Unknown',
		+pageNumInput.value,
		getRadioButtonValue(readRadioButtons),
	);

	const emptyLibMessage = libraryDiv.querySelector('#emptyLibrary');
	if(emptyLibMessage)
	{
		libraryDiv.removeChild(emptyLibMessage);
	}

	emptyAddBookForm();
	updateLibrary(bookInfo);
	addBookToLibrary(bookInfo);
}

// sets required event listeners
function setEventListeners()
{
	submitBookFormBtn.addEventListener('click', addBookFormCallback);
}

function initialize()
{
	setEventListeners();
	loadLibrary();
}

initialize();
