import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2015, day: 5});

function sum(...vals: boolean[]) {
	// @ts-expect-error -- Non-string values are coerced to numbers.
	return vals.reduce((acc, val) => acc + val, 0);
}

{
	const containsAtLeastThreeVowels = (string: string) =>
		/(.*[aeuio].*){3}/.test(string);

	const containsRepeatedLetters = (string: string) =>
		/(?:(\w)\1+)/.test(string);

	const containsAllowedSubstrings = (string: string) =>
		!/ab|cd|pq|xy/.test(string);

	const isNiceString = (string: string) =>
		containsAtLeastThreeVowels(string) &&
		containsRepeatedLetters(string) &&
		containsAllowedSubstrings(string);

	console.log(sum(...lns.map(isNiceString)));
}

{
	const containsPairOfAnyTwoLetters = (string: string) =>
		/(?:.*(\w{2}).*)\1/.test(string);

	const containsRepeatingLetterWithOneBetween = (string: string) =>
		/(\w)\w\1/.test(string);

	const isNiceString = (string: string) =>
		containsPairOfAnyTwoLetters(string) &&
		containsRepeatingLetterWithOneBetween(string);

	console.log(sum(...lns.map(isNiceString)));
}
