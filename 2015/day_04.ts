import crypto from 'node:crypto';

import {getInput} from 'lib/input';

const key = await getInput({year: 2015, day: 4});

const md5 = (data: crypto.BinaryLike) =>
	crypto.createHash('md5').update(data).digest('hex');

const waitUntilStartsWith = (
	{string, searchString}: {string: string; searchString: string},
	init = 0,
) => {
	let n = init;
	while (!md5(string + n).startsWith(searchString)) n++;
	return n;
};

const result = waitUntilStartsWith({
	string: key,
	searchString: '0'.repeat(5),
});

const result2 = waitUntilStartsWith(
	{string: key, searchString: '0'.repeat(6)},
	result,
);

console.log({
	result,
	result2,
});
