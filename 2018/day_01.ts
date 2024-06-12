import {getInputNumbers} from 'lib/input';
import {sum} from 'lib/sum';

const ns = await getInputNumbers({year: 2018, day: 1});

function findFirstFrequencyReachesTwice(...ns: number[]) {
	let frequency = 0;
	const frequencies = new Set<number>();

	while (true) {
		for (const n of ns) {
			frequency += n;

			if (frequencies.has(frequency)) {
				return frequency;
			}
			frequencies.add(frequency);
		}
	}
}

const result = sum(...ns);
const result2 = findFirstFrequencyReachesTwice(...ns);

console.log({result, result2});
