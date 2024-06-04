import {getInputNumbers} from 'lib/input';

const numbers = await getInputNumbers({year: 2020, day: 1});

const seen = new Set();

let result = 0;
let result2 = 0;

for (const num of numbers) {
	const diff = 2020 - num;
	if (seen.has(diff)) {
		result = num * diff;
		break;
	}
	seen.add(num);
}

loop: for (const num of numbers) {
	for (const num2 of numbers) {
		const diff = 2020 - num - num2;
		if (seen.has(diff)) {
			result2 = num * num2 * diff;
			break loop;
		}
		seen.add(num);
	}
}

console.log({result, result2});
