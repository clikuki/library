function getRandomInt(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);

	const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

	return randomInt;
}

export default (length = getRandomInt(10, 30)) =>
{
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;

	let result = '';
	for (let i = 0; i < length; i++)
	{
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
};
