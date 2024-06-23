import {getInputInts} from 'lib/input';
import {sum} from 'lib/sum';

const ns = await getInputInts({year: 2019, day: 1});

const result = sum(...ns.map((mass) => Math.floor(mass / 3) - 2));

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(3273715);
	});
}
