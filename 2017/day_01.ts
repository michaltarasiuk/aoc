import {getInput} from 'lib/input';
import {sum} from 'lib/sum';

const input = await getInput({year: 2017, day: 1});

const ns = Array.from(input, Number);

const result = sum(
	...ns.filter((n, idx) => n === ns.at((idx + 1) % ns.length)),
);

const result2 = sum(
	...ns.filter((n, idx) => n === ns.at((idx + ns.length / 2) % ns.length)),
);

console.log({result, result2});
