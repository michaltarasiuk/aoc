import {atLeastOne} from '../lib/at_least_one';
import {getInput} from '../lib/get_input';

let input = await getInput({
	year: 2015,
	day: 10,
});

let result = input;
let count = 0;

while (++count <= 50) {
	const match = result.match(/(?:(\d)\1*)/g);
	if (!match) break;

	result = match
		.map(([...digits]) => {
			atLeastOne(digits);
			return digits.length + digits[0];
		})
		.join('');

	if (count === 40 || count === 50) {
		console.log(result.length);
	}
}
