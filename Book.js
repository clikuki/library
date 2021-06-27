function Book(title, author, pageNum, hasRead)
{	// creates a book
	this.title = title;
	this.author = author;
	this.pageNum = pageNum;
	this.hasRead = hasRead;
	this.key = makeid(getRandomInt(10, 30));
}

function getRandomInt(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);

	const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

	return randomInt;
}

function makeid(length)
{
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;

	let result = '';
	for (let i = 0; i < length; i++)
	{
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
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
