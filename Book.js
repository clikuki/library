function Book (title, author, numOfPages, hasRead)
{	// creates a book
	this.title = title;
	this.author = author;
	this.numOfPages = numOfPages;
	this.hasRead = hasRead;
}

Book.prototype.info = function()
{ 	// when called, will return a string based on its properties
	let infoStr = `${this.title} by ${this.author}, ${this.numOfPages} pages, `;

	if(this.hasRead) 
	{
		infoStr += 'has been read';
	}
	else
	{
		infoStr += 'not read yet';
	}

	return infoStr;
}
