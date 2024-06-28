import {getInput} from 'lib/input';

const input = await getInput({year: 2022, day: 6});

function findLastIndexOfFirstMarker(markerSize: number) {
	let result: number | undefined = undefined;

	for (const i of Array.from(input, (_, i) => i)) {
		if (new Set(input.slice(i, i + markerSize)).size === markerSize) {
			result = i + markerSize;
			break;
		}
	}
	return result;
}

const result = findLastIndexOfFirstMarker(4);
const result2 = findLastIndexOfFirstMarker(14);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(1343);
	});

	test('part 2', () => {
		expect(result2).toBe(2193);
	});
}
