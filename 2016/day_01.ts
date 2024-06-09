import {assertKeyIn} from 'lib/assert_key_in';
import {getInputCSV} from 'lib/input';

const [instructions] = await getInputCSV({year: 2016, day: 1});

let direction = 'n';
const coordinates = {n: 0, e: 0, s: 0, w: 0};

for (const instruction of instructions) {
	const turn = instruction[0];
	const steps = Number(instruction.slice(1));

	if (turn === 'L') {
		direction = {n: 'w', w: 's', s: 'e', e: 'n'}[direction]!;
	} else {
		direction = {n: 'e', e: 's', s: 'w', w: 'n'}[direction]!;
	}

	assertKeyIn(coordinates, direction);
	coordinates[direction] += steps;
}

const {n, e, s, w} = coordinates;
console.log(Math.abs(n - s) + Math.abs(e - w));
