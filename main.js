const libraryDiv = document.querySelector('#library');
const textAndNumInputs = document.querySelectorAll('#addBookFormInput input');
const [titleInput, authorInput, pageNumInput] = textAndNumInputs;
const readRadioButtons = document.querySelectorAll('#radio input');
const submitBookFormBtn = document.querySelector('#addBookBtn');
const bookTemplate = document.querySelector('#bookTemplate > .book');
const editBookTemplate = document.querySelector('#editTemplate > .book');

let myLibrary = []; // stores your books and their info

function dummyBooks()
{
	const dummyBooksArray = [
		new Book('BookA', 'John Doe', 342, false),
		new Book('BookB', 'Marry Smith', 254, true),
		new Book('BookC', 'John Foe', 1352, false),
	];

	for(const dummyBook of dummyBooksArray)
	{
		updateLibrary(dummyBook);
		addBookToLibrary(dummyBook);
	}
}

// TODO: Add book editing
// sets book ready for editing
function setBookForEditing(bookToEdit)
{
	const editableBook = editBookTemplate.cloneNode(true);
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

	libraryDiv.replaceChild(editableBook, bookToEdit);
}

// changes book values
function confirmEdit(editedBook)
{
	const title = editedBook.querySelector('.title input').value;
	const author = editedBook.querySelector('.author input').value;
	const pageNum = editedBook.querySelector('.pageNum input').value;
	const key = editedBook.getAttribute('data-key');

	const hasReadRadioBtns = editedBook.querySelectorAll('.title input');
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
	myLibrary = myLibrary.map((book) =>
	{
		if(book.key === bookInfo.key)
		{
			book.title = bookInfo.title;
			book.author = bookInfo.author;
			book.pageNum = bookInfo.pageNum;
			book.hasRead = bookInfo.hasRead;
		}

		return book;
	});
}

// removes book from dom and list
function deleteBook(bookToDelete)
{
	const key = bookToDelete.getAttribute('data-key');

	bookToDelete.remove();

	for(const [index, book] of Object.entries(myLibrary))
	{
		if(book.key === key)
		{
			myLibrary.splice(index, 1);
			return;
		}
	}
}

// get values from 2 radio btns
function getRadioButtonValue(radioBtns)
{
	console.log(radioBtns, readRadioButtons);

	if(readRadioButtons[0].checked) return true;
	if(readRadioButtons[1].checked) return false;
}

// push a book to myLibrary/array
function addBookToLibrary(bookInfo)
{
	myLibrary.push(bookInfo);
}

// called at startup to load books from memory
function loadLibrary()
{
	for(const book of myLibrary)
	{
		updateLibrary(book);
	}
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
	const book = bookTemplate.cloneNode(true);

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

// set add book form inputs to empty
function emptyAddBookForm()
{
	for(const input of textAndNumInputs)
	{
		input.value = '';
		input.checked = false;
	}
}

// sets required event listeners
function setEventListeners()
{
	submitBookFormBtn.addEventListener('click', () =>
	{
		const bookInfo = new Book(
			titleInput.value || 'Unknown',
			authorInput.value || 'Unknown',
			+pageNumInput.value,
			getRadioButtonValue(readRadioButtons),
		);

		emptyAddBookForm();
		updateLibrary(bookInfo);
		addBookToLibrary(bookInfo);
	});
}

function initialize()
{
	setEventListeners();
	loadLibrary();
	dummyBooks();
}

initialize();
