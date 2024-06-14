import {getInput} from 'lib/input';
import {sum} from 'lib/sum';

const input = await getInput({year: 2017, day: 1});

const ns = Array.from(input, Number);

const result = sum(...ns.filter((n, i) => n === ns.at((i + 1) % ns.length)));

const result2 = sum(
	...ns.filter((n, i) => n === ns.at((i + ns.length / 2) % ns.length)),
);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(1203);
	});

	test('part 2', () => {
		expect(result2).toBe(1146);
	});
}
