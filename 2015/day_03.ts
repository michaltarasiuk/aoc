import {getInput} from 'lib/input';
import {uniq} from 'lib/uniq';

const input = await getInput({year: 2015, day: 3});

function createPos() {
	let x = 0;
	let y = 0;

	return {
		toString() {
			return `${x},${y}`;
		},
		set(char: string) {
			x += char === '>' ? 1 : char === '<' ? -1 : 0;
			y += char === '^' ? 1 : char === 'v' ? -1 : 0;

			return this;
		},
	};
}

function getResult() {
	const santa = createPos();
	const houses = uniq(
		Array.from(input, (char) => santa.set(char).toString()),
	);

	return houses.length;
}

function getResult2() {
	const santas = [createPos(), createPos()];
	const houses = uniq(
		Array.from(input, (char, i) => santas[i % 2].set(char).toString()),
	);

	return houses.length;
}

const result = getResult();
const result2 = getResult2();

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(2565);
	});

	test('part 2', () => {
		expect(result2).toBe(2639);
	});
}
