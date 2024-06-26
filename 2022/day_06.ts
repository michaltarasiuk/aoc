import {getInput} from 'lib/input';

const input = await getInput({year: 2022, day: 6});

function findLastIndexOfFirstMarker(markerSize: number) {
	let lastIndex: number | undefined = undefined;

	for (const i of Array.from(input, (_, i) => i)) {
		const marker = new Set(input.slice(i, i + markerSize));

		if (marker.size === markerSize) {
			lastIndex = i + markerSize;
			break;
		}
	}
	return lastIndex;
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
