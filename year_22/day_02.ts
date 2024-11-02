import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2022, day: 2});

const ShapesCount = 3;
const Points = {WIN: 6, DRAW: 3, LOSE: 0};

function getHandShape(char: string) {
  return ('ABCXYZ'.indexOf(char) % ShapesCount) + 1;
}

function parseRound(round: string) {
  const roundRe = /^([ABC]) ([XYZ])$/;
  const [, them, me] = roundRe.exec(round) ?? raise('Invalid round');

  return [getHandShape(them), getHandShape(me)] as const;
}

function roundOutcome(them: number, me: number) {
  const diff = me - them;

  if (diff === 0) {
    return Points.DRAW;
  } else if (diff === 1 || diff === -2) {
    return Points.WIN;
  } else if (diff === -1 || diff === 2) {
    return Points.LOSE;
  }
  throw new Error('Invalid round outcome');
}

const score = lines.reduce((acc, l) => {
  const [them, me] = parseRound(l);
  return acc + roundOutcome(them, me) + me;
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(score).toBe(12855));
}
