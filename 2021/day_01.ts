import {getInputNumbers} from 'lib/input';

const ns = await getInputNumbers({year: 2021, day: 1});

const result = ns.reduce((acc, num, i) => (num > ns[i - 1] ? ++acc : acc), 0);

const result2 = ns.reduce((acc, num, i) => (num > ns[i - 3] ? ++acc : acc), 0);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(1559);
	});

	test('part 2', () => {
		expect(result2).toBe(1600);
	});
}
