import {getInputCSV} from 'lib/input';

const [instructions] = await getInputCSV({year: 2016, day: 1});

function parseInstruction(instruction: string) {
	const instructionRe = /([LR])(\d+)/;
	const match = instruction.match(instructionRe);

	if (!match) {
		throw new Error(
			`Invalid instruction: "${instruction}". Expected format: 'L' or 'R' followed by a number.`,
		);
	}

	return {turn: match[1], steps: Number(match[2])};
}

type Direction = 'n' | 'e' | 's' | 'w';

class Coordinates {
	private static state: Record<Direction, number> = {n: 0, e: 0, s: 0, w: 0};

	static set(direction: Direction, steps: number) {
		this.state[direction] += steps;
	}

	static calcDistance() {
		const {n, e, s, w} = this.state;
		return Math.abs(n - s) + Math.abs(e - w);
	}
}

let direction: Direction = 'n';

for (const instruction of instructions) {
	const {turn, steps} = parseInstruction(instruction);

	if (turn === 'L') {
		direction = (<const>{n: 'w', e: 'n', s: 'e', w: 's'})[direction];
	} else if (turn === 'R') {
		direction = (<const>{n: 'e', e: 's', s: 'w', w: 'n'})[direction];
	}

	Coordinates.set(direction, steps);
}

console.log(Coordinates.calcDistance());
