import {getInput} from 'lib/input';

const input = await getInput({year: 2015, day: 3});

function createPos() {
	let x = 0;
	let y = 0;

	return {
		toString() {
			return `${x},${y}`;
		},
		set(char: string) {
			switch (char) {
				case '>':
					x++;
					break;
				case '<':
					x--;
					break;
				case '^':
					y++;
					break;
				case 'v':
					y--;
					break;
				default:
					throw new Error('Unknown char');
			}
			return this;
		},
	};
}

function getResult() {
	const santa = createPos();
	const houses = new Set();

	for (const char of input) {
		const v = santa.set(char).toString();
		houses.add(v);
	}

	return houses.size;
}

function getResult2() {
	const santa = createPos();
	const robotSanta = createPos();
	const houses = new Set();

	for (const [idx, char] of Object.entries(input)) {
		if (Number(idx) % 2) {
			const house = robotSanta.set(char).toString();
			houses.add(house);
		} else {
			const house = santa.set(char).toString();
			houses.add(house);
		}
	}

	return houses.size;
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
