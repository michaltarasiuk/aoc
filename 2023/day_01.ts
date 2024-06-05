import {atLeastOne} from 'lib/at_least_one';
import {getInputLns} from 'lib/input';
import {sum} from 'lib/sum';

const lns = await getInputLns({year: 2023, day: 1});

const result = sum(
	...lns.map((ln) => {
		const matchArray = Array.from(ln.matchAll(/\d/g)).flat();
		atLeastOne(matchArray);

		return Number(matchArray.at(0)! + matchArray.at(-1)!);
	}),
);

console.log(result);
