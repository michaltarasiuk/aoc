import {getInputNumbers} from 'lib/input';

const ns = await getInputNumbers({year: 2021, day: 1});

let result = 0;

for (const [idx, num] of ns.entries()) {
	if (idx === 0) continue;
	if (num > ns[idx - 1]) {
		result++;
	}
}

console.log(result);
