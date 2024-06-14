import {getInputNumbers} from 'lib/input';

const ns = await getInputNumbers({year: 2020, day: 1});

const seen = new Set();
let result = 0;
let result2 = 0;

for (const n of ns) {
	const diff = 2020 - n;
	if (seen.has(diff)) {
		result = n * diff;
		break;
	}
	seen.add(n);
}

outer: for (const n of ns) {
	for (const n2 of ns) {
		const diff = 2020 - n - n2;
		if (seen.has(diff)) {
			result2 = n * n2 * diff;
			break outer;
		}
		seen.add(n);
	}
}

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(482811);
	});

	test('part 2', () => {
		expect(result2).toBe(193171814);
	});
}
