import {adjacentAt} from 'lib/adjacent_at';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2022, day: 2});

const HAND_SHAPE = [1, 2, 3];
const [ROCK, PAPER, SCISSORS] = HAND_SHAPE;

const [WIN, DRAW, LOSE] = HAND_SHAPE.toReversed();
const POINTS = {
	WIN: 6,
	DRAW: 3,
	LOSE: 0,
};

const THEM_CHARS: Record<string, number> = {
	A: ROCK,
	B: PAPER,
	C: SCISSORS,
};

const ME_CHARS: Record<string, number> = {
	X: ROCK,
	Y: PAPER,
	Z: SCISSORS,
};

function parseLn(ln: string) {
	const roundRe = /^([ABC]) ([XYZ])$/;
	const [, them, me] = roundRe.exec(ln) ?? [];

	return {them: THEM_CHARS[them], me: ME_CHARS[me]};
}

function roundOutcome(them: number, me: number) {
	if (them === me) return POINTS.DRAW;

	const [lose] = adjacentAt(HAND_SHAPE, HAND_SHAPE.indexOf(me));
	return them === lose ? POINTS.WIN : POINTS.LOSE;
}

function roundOutcome2(them: number, me: number) {
	const [lose, beat] = adjacentAt(HAND_SHAPE, HAND_SHAPE.indexOf(them));

	switch (me) {
		case WIN:
			return beat + POINTS.WIN;
		case DRAW:
			return them + POINTS.DRAW;
		case LOSE:
			return lose;
		default:
			throw new Error('Invalid hand shape');
	}
}

const result = lns.reduce((acc, ln) => {
	const {them, me} = parseLn(ln);
	return acc + roundOutcome(them, me) + me;
}, 0);

const result2 = lns.reduce((acc, ln) => {
	const {them, me} = parseLn(ln);
	return acc + roundOutcome2(them, me);
}, 0);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(12855);
	});

	test('part 2', () => {
		expect(result2).toBe(13726);
	});
}
