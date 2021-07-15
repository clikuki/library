import makeid from './makeid.js';

export default class
{	// creates a book
	constructor(title, author, pageNum, hasRead, key)
	{
		this.title = title;
		this.author = author;
		this.pageNum = pageNum;
		this.hasRead = hasRead;
		this.key = key || makeid();
	}

	info()
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
	}
}
