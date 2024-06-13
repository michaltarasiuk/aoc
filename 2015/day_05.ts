import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2015, day: 5});

function sum(...vals: boolean[]) {
	// @ts-expect-error -- Non-string values are coerced to numbers.
	return vals.reduce((acc, val) => acc + val, 0);
}

function isNiceString(string: string) {
	const hasAtLeastThreeVowels = /(.*[aeuio].*){3}/.test(string);
	const hasRepeatedLetters = /(?:(\w)\1+)/.test(string);
	const hasNotForbiddenStrings = !/ab|cd|pq|xy/.test(string);

	return (
		hasAtLeastThreeVowels && hasRepeatedLetters && hasNotForbiddenStrings
	);
}

function isNiceString2(string: string) {
	const hasPairOfAnyTwoLetters = /(?:.*(\w{2}).*)\1/.test(string);
	const hasRepeatedLetterWithOneLetterBetween = /(\w)\w\1/.test(string);

	return hasPairOfAnyTwoLetters && hasRepeatedLetterWithOneLetterBetween;
}

const result = sum(...lns.map(isNiceString));
const result2 = sum(...lns.map(isNiceString2));

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(238);
	});

	test('part 2', () => {
		expect(result2).toBe(69);
	});
}
