import { getInput } from "lib/input";

const input = await getInput({ year: 2015, day: 10 });

const repeatedDigitsRe = /(?:(\d)\1*)/g;
let result = input;
let count = 0;

while (++count <= 50) {
	const match = result.match(repeatedDigitsRe) ?? [];

	result = match
		.map(([...digits]) => {
			return digits.length + digits[0];
		})
		.join("");

	if (count === 40 || count === 50) {
		console.log(result.length);
	}
}
