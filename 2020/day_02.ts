import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2020, day: 2});

function parseLn(ln: string) {
	const lineRe = /^(\d+)-(\d+) (\w): (\w+)$/;
	const [, min, max, char, password] = ln.match(lineRe) ?? [];

	return {min: Number(min), max: Number(max), char, password};
}

const result = lns.reduce((acc, ln) => {
	const {min, max, char, password} = parseLn(ln);
	const count = password.split(char).length - 1;

	if (count >= min && count <= max) {
		acc++;
	}
	return acc;
}, 0);

const result2 = lns.reduce((acc, ln) => {
	const {min, max, char, password} = parseLn(ln);
	const a = password[min - 1] === char;
	const b = password[max - 1] === char;

	if (a !== b) {
		acc++;
	}
	return acc;
}, 0);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(445);
	});

	test('part 2', () => {
		expect(result2).toBe(491);
	});
}
