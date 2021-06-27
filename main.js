const libraryDiv = document.querySelector('#library');
const addBookFormInputs = document.querySelectorAll('#addBookFormInput input');
const [titleInput, authorInput, pageNumInput, hasReadBox] = addBookFormInputs;
const submitBookFormBtn = document.querySelector('#addBookBtn');
const bookTemplate = document.querySelector('#bookTemplate > .book');

const myLibrary = [
	{
		title: 'BookA',
		author: 'John Doe',
		pageNum: 342,
		hasRead: false,
	},
	{
		title: 'BookB',
		author: 'Mary Smith',
		pageNum: 254,
		hasRead: true,
	},
	{
		title: 'BookB',
		author: 'John Foe',
		pageNum: 1352,
		hasRead: true,
	},
]; // stores your books and their info

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

	book.querySelector('.title').textContent = bookInfo.title;
	book.querySelector('.author span').textContent += bookInfo.author;
	book.querySelector('.numOfPages span').textContent += bookInfo.pageNum;
	book.querySelector('.hasRead span').textContent += bookInfo.hasRead;

	libraryDiv.append(book);
}

function setEventListeners()
{
	submitBookFormBtn.addEventListener('click', () =>
	{
		const bookInfo = new Book(
			titleInput.value,
			authorInput.value,
			+pageNumInput.value,
			hasReadBox.checked,
		);

		for(const input of addBookFormInputs)
		{
			input.value = '';
			input.checked = false;
		}

		updateLibrary(bookInfo);
		addBookToLibrary(bookInfo);
	});
}

function initialize()
{
	setEventListeners();
	loadLibrary();
}

initialize();
