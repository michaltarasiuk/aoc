import {getInputInts} from 'lib/input';

const ints = await getInputInts({year: 2017, day: 5});

function stepsToExit(
	[...ints]: number[],
	jump: (ints: number[], offset: number) => number,
) {
	let offset = 0;
	let steps = 0;

	while (offset < ints.length) {
		offset += jump(ints, offset);
		steps++;
	}
	return steps;
}

const result = stepsToExit(ints, (ints, offset) => ints[offset]++);
const result2 = stepsToExit(ints, (ints, offset) =>
	ints[offset] >= 3 ? ints[offset]-- : ints[offset]++,
);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(373160);
	});

	test('part 2', () => {
		expect(result2).toBe(26395586);
	});
}
