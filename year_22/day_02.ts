import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2022, day: 2});

const SHAPES_COUNT = 3;
const POINTS = {WIN: 6, DRAW: 3, LOSE: 0};

function getHandShape(char: string) {
  return ('ABCXYZ'.indexOf(char) % SHAPES_COUNT) + 1;
}

function parseRound(round: string) {
  const roundRe = /^([ABC]) ([XYZ])$/;
  const [, them, me] = roundRe.exec(round)!;

  return [getHandShape(them), getHandShape(me)] as const;
}

function roundOutcome(them: number, me: number) {
  const diff = me - them;

  if (diff === 0) {
    return POINTS.DRAW;
  } else if (diff === 1 || diff === -2) {
    return POINTS.WIN;
  } else if (diff === -1 || diff === 2) {
    return POINTS.LOSE;
  }
  throw new Error('Invalid round outcome');
}

const score = lines.reduce((acc, line) => {
  const [them, me] = parseRound(line);
  return acc + roundOutcome(them, me) + me;
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(score).toBe(12855);
  });
}
