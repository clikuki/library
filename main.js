const libraryDiv = document.querySelector('#library');
const textAndNumInputs = document.querySelectorAll('#addBookFormInput input');
const [titleInput, authorInput, pageNumInput] = textAndNumInputs;
const readRadioButtons = document.querySelectorAll('#radio input');
const submitBookFormBtn = document.querySelector('#addBookBtn');
const bookTemplate = document.querySelector('#bookTemplate > .book');

const myLibrary = []; // stores your books and their info

function dummyBooks()
{
	const dummyBooksArray = [
		new Book('BookA', 'John Doe', 342, false),
		new Book('BookB', 'Marry Smith', 254, true),
		new Book('BookC', 'John Foe', 1352, true),
	];

	for(const dummyBook of dummyBooksArray)
	{
		updateLibrary(dummyBook);
		addBookToLibrary(dummyBook);
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

	book.setAttribute('data-index', bookInfo.key);
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
			titleInput.value || 'undefined',
			authorInput.value || 'undefined',
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
	});
}

function initialize()
{
	setEventListeners();
	loadLibrary();
	dummyBooks();
}

initialize();
