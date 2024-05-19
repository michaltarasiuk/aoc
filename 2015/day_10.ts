import { atLeastOne } from "lib/at_least_one";
import { getInput } from "lib/input";
import { raise } from "lib/raise";

const input = await getInput({ year: 2015, day: 10 });

const repeatedDigitsRe = /(?:(\d)\1*)/g;
let result = input;
let count = 0;

while (++count <= 50) {
	const match = result.match(repeatedDigitsRe) ?? raise("no match");

	result = match
		.map(([...digits]) => {
			atLeastOne(digits);
			return digits.length + digits[0];
		})
		.join("");

	if (count === 40 || count === 50) {
		console.log(result.length);
	}
}
