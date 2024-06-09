import {getInputCSV} from 'lib/input';

const [instructions] = await getInputCSV({year: 2016, day: 1});

type Direction = 'n' | 'e' | 's' | 'w';

class Coordinates {
	private static state: Record<Direction, number> = {n: 0, e: 0, s: 0, w: 0};

	static set(direction: keyof typeof this.state, steps: number) {
		this.state[direction] += steps;
	}

	static calc() {
		const {n, e, s, w} = this.state;
		return Math.abs(n - s) + Math.abs(e - w);
	}
}

function parseInstruction(instructions: string) {
	const turn = instructions[0];
	const steps = Number(instructions.slice(1));
	return {turn, steps};
}

let direction: Direction = 'n';

for (const instruction of instructions) {
	const {turn, steps} = parseInstruction(instruction);

	if (turn === 'L') {
		direction = (<const>{n: 'w', e: 'n', s: 'e', w: 's'})[direction]!;
	} else if (turn === 'R') {
		direction = (<const>{n: 'e', e: 's', s: 'w', w: 'n'})[direction]!;
	}

	Coordinates.set(direction, steps);
}

console.log(Coordinates.calc());
