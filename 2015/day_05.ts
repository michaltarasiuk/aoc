import { add } from "lib/add";
import { getInputLines } from "lib/get_input";

const lns = await getInputLines({
	year: 2015,
	day: 5,
});

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

	console.log(add(...lns.map(isNiceString)));
}

{
	const containsPairOfAnyTwoLetters = (string: string) =>
		/(?:.*(\w{2}).*)\1/.test(string);

	const containsRepeatingLetterWithOneBetween = (string: string) =>
		/(\w)\w\1/.test(string);

	const isNiceString = (string: string) =>
		containsPairOfAnyTwoLetters(string) &&
		containsRepeatingLetterWithOneBetween(string);

	console.log(add(...lns.map(isNiceString)));
}
