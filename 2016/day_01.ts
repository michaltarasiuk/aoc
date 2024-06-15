import {adjacentAt} from 'lib/adjacent_at';
import {getInputCSV} from 'lib/input';

const [instructions] = await getInputCSV({year: 2016, day: 1});

function parseInstruction(instruction: string) {
	const instructionRe = /([LR])(\d+)/;
	const [, turn, steps] = instruction.match(instructionRe) ?? [];

	return {turn, steps: Number(steps)};
}

type Direction = 'n' | 'e' | 's' | 'w';

class Coordinates {
	static state: Record<Direction, number> = {n: 0, e: 0, s: 0, w: 0};

	static set(direction: Direction, steps: number) {
		this.state[direction] += steps;
	}

	static calcDistance() {
		const {n, e, s, w} = this.state;
		return Math.abs(n - s) + Math.abs(e - w);
	}
}

const directions = Object.keys(Coordinates.state) as Direction[];
let direction = directions.at(0)!;

for (const instruction of instructions) {
	const {turn, steps} = parseInstruction(instruction);
	const [left, right] = adjacentAt(directions, directions.indexOf(direction));

	direction = turn === 'L' ? left : right;
	Coordinates.set(direction, steps);
}

const result = Coordinates.calcDistance();

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(273);
	});
}
