import {getInput} from 'lib/input';

const input = await getInput({year: 2022, day: 6});

const MARKER_SIZE = 4;
let result: number;

for (const i of Array.from(input, (_, i) => i)) {
	if (new Set(input.slice(i, i + MARKER_SIZE)).size === MARKER_SIZE) {
		result = i + MARKER_SIZE;
		break;
	}
}

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(1343);
	});
}
