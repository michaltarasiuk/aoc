import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2017, day: 2});

function parseRow(row: string) {
	return row.split('\t').map(Number);
}

const result = lns.reduce((acc, ln) => {
	const ns = parseRow(ln);
	return acc + Math.max(...ns) - Math.min(...ns);
}, 0);

const result2 = lns.reduce((acc, ln) => {
	const ns = parseRow(ln);

	for (const n of ns) {
		for (const m of ns) {
			if (n !== m && n % m === 0) {
				return acc + n / m;
			}
		}
	}
	return acc;
}, 0);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(44216);
	});

	test('part 2', () => {
		expect(result2).toBe(320);
	});
}
