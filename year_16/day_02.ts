import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2016, day: 2});

const KEYPAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

const START_POINT = [1, 1];

const X_BOUND = KEYPAD[0].length - 1;
const Y_BOUND = KEYPAD.length - 1;

function move(x: number, y: number, direction: string) {
  switch (direction) {
    case 'U':
      return [x, Math.max(y - 1, 0)];
    case 'D':
      return [x, Math.min(y + 1, Y_BOUND)];
    case 'L':
      return [Math.max(x - 1, 0), y];
    case 'R':
      return [Math.min(x + 1, X_BOUND), y];
    default:
      throw new Error('Invalid direction');
  }
}

let [x, y] = START_POINT;
let bathroomCode = '';

for (const l of input.split(/\n/)) {
  for (const char of l) {
    [x, y] = move(x, y, char);
  }
  bathroomCode += KEYPAD[y][x];
}

assert.strictEqual(bathroomCode, '19636', 'Part 1 failed');
