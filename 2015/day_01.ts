import {getInput} from '../lib/get_input';

const input = await getInput({
	year: 2015,
	day: 1,
});

let floor = 0;
let basement: number | null = null;

for (const [idx, char] of Object.entries(input)) {
	switch (char) {
		case '(':
			floor++;
			break;
		case ')':
			floor--;
			break;
		default:
			throw new Error('unknown char');
	}

	if (floor === -1) basement ??= Number(idx) + 1;
}

console.log({
	floor,
	basement,
});
