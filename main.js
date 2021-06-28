const libraryDiv = document.querySelector('#library');
const textAndNumInputs = document.querySelectorAll('#addBookFormInput input');
const [titleInput, authorInput, pageNumInput] = textAndNumInputs;
const readRadioButtons = document.querySelectorAll('#radio input');
const submitBookFormBtn = document.querySelector('#addBookBtn');
const bookTemplate = document.querySelector('#bookTemplate > .book');
const editBookTemplate = document.querySelector('#editTemplate > .book');

const myLibrary = []; // stores your books and their info

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
function setBookForEditing(bookToEdit)
{
	const editableBook = editBookTemplate.cloneNode(true);
	let [, title, author, pageNum, hasRead] = bookToEdit.children;

	// get title
	title = title.textContent;

	[author, pageNum, hasRead] = [author, pageNum, hasRead].map((variable) =>
	{ // split string from ': ' and trim to get the other values
		[, variable] = variable.textContent.split(': ');
		return variable.trim();
	});

	editableBook.setAttribute('data-key', 'key');
	editableBook.querySelector('.title').textContent = title;
	editableBook.querySelector('.author input').value += author;
	editableBook.querySelector('.pageNum input').value += pageNum;

	const radioBtns = editableBook.querySelectorAll('.hasRead input');
	switch(hasRead)
	{ // turn hasRead into a boolean
		case 'true':
			radioBtns[0].checked = true;
			break;

		case 'false':
			radioBtns[1].checked = true;
			break;

		default:
			break;
	}

	libraryDiv.append(editableBook);
}

// function editBookInfo(bookToEdit)
// {
// 	const key = bookToEdit.getAttribute('data-key');

// 	console.log(bookToEdit, key);
// }

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

function getRadioButtonValue()
{
	if(readRadioButtons[0].checked) return true;
	if(readRadioButtons[1].checked) return false;
}

function addBookToLibrary(bookInfo)
{
	myLibrary.push(bookInfo);
}

function loadLibrary()
{
	for(const book of myLibrary)
	{
		updateLibrary(book);
	}
}

function updateLibrary(bookInfo)
{
	const book = bookTemplate.cloneNode(true);

	book.setAttribute('data-key', bookInfo.key);
	book.querySelector('.title').textContent = bookInfo.title;
	book.querySelector('.author .fill-in').textContent += bookInfo.author;
	book.querySelector('.pageNum .fill-in').textContent += bookInfo.pageNum;
	book.querySelector('.hasRead .fill-in').textContent += bookInfo.hasRead;

	book.querySelector('.delete').addEventListener('click', (e) =>
	{
		deleteBook(e.target.parentElement);
	});

	book.querySelector('.edit').addEventListener('click', (e) =>
	{
		setBookForEditing(e.target.parentElement);
	});

	libraryDiv.append(book);
}

function makeBook()
{
	const bookInfo = new Book(
		titleInput.value || 'Unknown',
		authorInput.value || 'Unknown',
		+pageNumInput.value,
		getRadioButtonValue(),
	);

	for(const input of textAndNumInputs)
	{
		input.value = '';
		input.checked = false;
	}

	updateLibrary(bookInfo);
	addBookToLibrary(bookInfo);
}

function setEventListeners()
{
	submitBookFormBtn.addEventListener('click', makeBook);
}

function initialize()
{
	setEventListeners();
	loadLibrary();
	dummyBooks();
}

initialize();
