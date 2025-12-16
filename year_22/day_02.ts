import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';
import {raise} from '#lib/raise.js';

const input = await fetchInput({year: 2022, day: 2});

const SHAPES_COUNT = 3;
const POINTS = {win: 6, draw: 3, lose: 0};

function getHandShape(char: string) {
  return ('ABCXYZ'.indexOf(char) % SHAPES_COUNT) + 1;
}
function parseRound(round: string) {
  const roundRe = /^([ABC]) ([XYZ])$/;
  const [, them, me] = roundRe.exec(round) ?? raise('Invalid round');

  return [getHandShape(them), getHandShape(me)] as const;
}

function roundOutcome(them: number, me: number) {
  const diff = me - them;
  if (diff === 0) {
    return POINTS.draw;
  } else if (diff === 1 || diff === -2) {
    return POINTS.win;
  } else if (diff === -1 || diff === 2) {
    return POINTS.lose;
  }
  throw new Error('Invalid round outcome');
}

const score = input.split(/\n/).reduce((acc, l) => {
  const [them, me] = parseRound(l);
  return acc + roundOutcome(them, me) + me;
}, 0);

assert.strictEqual(score, 12855, 'Part 1 failed');
