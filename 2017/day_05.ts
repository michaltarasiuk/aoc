import {getInputInts} from 'lib/input';

const ints = await getInputInts({year: 2017, day: 5});

let offset = 0;
let steps = 0;

while (offset < ints.length) {
	offset += ints[offset]++;
	steps++;
}

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(steps).toBe(373160);
	});
}
