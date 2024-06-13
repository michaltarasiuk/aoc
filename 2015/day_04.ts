import crypto from 'node:crypto';

import {getInput} from 'lib/input';

const key = await getInput({year: 2015, day: 4});

function md5(data: crypto.BinaryLike) {
	return crypto.createHash('md5').update(data).digest('hex');
}

function waitUntilStartsWith(
	{string, searchString}: {string: string; searchString: string},
	init = 0,
) {
	let n = init;
	while (!md5(string + n).startsWith(searchString)) n++;
	return n;
}

const result = waitUntilStartsWith({
	string: key,
	searchString: '0'.repeat(5),
});

const result2 = waitUntilStartsWith(
	{string: key, searchString: '0'.repeat(6)},
	result,
);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(346386);
	});

	test('part 2', () => {
		expect(result2).toBe(9958218);
	});
}
