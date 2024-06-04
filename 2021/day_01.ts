import {getInputNumbers} from 'lib/input';

const numbers = await getInputNumbers({year: 2021, day: 1});

let result = 0;

for (const [idx, num] of numbers.entries()) {
	if (idx === 0) continue;
	if (num > numbers[idx - 1]) {
		result++;
	}
}

console.log(result);
