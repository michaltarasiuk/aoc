import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2016, day: 7});

const abbaRe = /(\w)((?!\1)\w)\2\1/;
const squareBracketRe = /\[|\]/;

const result = lns.reduce((acc, ln) => {
	const parts = ln.split(squareBracketRe);
	const {supernets = [], hypernets = []} = Object.groupBy(parts, (_, i) =>
		i % 2 === 0 ? 'supernets' : 'hypernets',
	);

	if (abbaRe.test(supernets.join(' ')) && !abbaRe.test(hypernets.join(' '))) {
		acc++;
	}
	return acc;
}, 0);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(110);
	});
}
