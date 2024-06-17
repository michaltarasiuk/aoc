import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2016, day: 2});

const KEYPAD = [
	['1', '2', '3'],
	['4', '5', '6'],
	['7', '8', '9'],
];

function move(x: number, y: number, direction: string) {
	switch (direction) {
		case 'U':
			return [x, Math.max(y - 1, 0)];
		case 'D':
			return [x, Math.min(y + 1, 2)];
		case 'L':
			return [Math.max(x - 1, 0), y];
		case 'R':
			return [Math.min(x + 1, 2), y];
		default:
			throw new Error('Invalid direction');
	}
}

let [x, y] = [1, 1];
let result = '';

for (const ln of lns) {
	for (const char of ln) {
		[x, y] = move(x, y, char);
	}
	result += KEYPAD[y][x];
}

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe('19636');
	});
}
