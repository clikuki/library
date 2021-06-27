function Book(title, author, pageNum, hasRead)
{	// creates a book
	this.title = title;
	this.author = author;
	this.pageNum = pageNum;
	this.hasRead = hasRead;
}

Book.prototype.info = function info()
{ 	// when called, will return a string based on its properties
	let infoStr = `${this.title} by ${this.author}, ${this.pageNum} pages, `;

	if(this.hasRead)
	{
		infoStr += 'has been read';
	}
	else
	{
		infoStr += 'not read yet';
	}

	return infoStr;
};
