import {adjacentAt} from 'lib/adjacent_at';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2022, day: 2});

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const HAND_SHAPE = [ROCK, PAPER, SCISSORS];

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
	if (them === me) return 3;

	const beat = adjacentAt(HAND_SHAPE, HAND_SHAPE.indexOf(me))[1];
	return them === beat ? 0 : 6;
}

const result = lns.reduce((acc, ln) => {
	const {them, me} = parseLn(ln);
	return acc + roundOutcome(them, me) + me;
}, 0);

if (import.meta.vitest) {
	const {test, expect} = import.meta.vitest;

	test('part 1', () => {
		expect(result).toBe(12855);
	});
}
