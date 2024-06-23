import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2016, day: 7});

function parseLn(ln: string) {
	const squareBracketRe = /\[|\]/;
	const parts = ln.split(squareBracketRe);

	return Object.groupBy(parts, (_, i) =>
		i % 2 === 0 ? 'supernets' : 'hypernets',
	);
}

const abbaRe = /(\w)((?!\1)\w)\2\1/;

const result = lns.reduce((acc, ln) => {
	const {supernets = [], hypernets = []} = parseLn(ln);

	if (abbaRe.test(supernets.join()) && !abbaRe.test(hypernets.join())) {
		acc++;
	}
	return acc;
}, 0);

const abaRe = /^supernets: .*(\w)((?!\1)\w)\1.*, hypernets: .*\2\1\2.*$/;

const result2 = lns.reduce((acc, ln) => {
	const {supernets = [], hypernets = []} = parseLn(ln);
	const ip = `supernets: ${supernets}, hypernets: ${hypernets}`;

	return acc + +abaRe.test(ip);
}, 0);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(110);
	});

	test('part 2', () => {
		expect(result2).toBe(242);
	});
}
