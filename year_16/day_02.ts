import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2016, day: 2});

const keypad = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

const X_BOUND = keypad[0].length - 1;
const Y_BOUND = keypad.length - 1;

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

const startPoint = [1, 1];

let [x, y] = startPoint;
let bathroomCode = '';

for (const l of input.split(/\n/)) {
  for (const char of l) {
    [x, y] = move(x, y, char);
  }
  bathroomCode += keypad[y][x];
}

assert.strictEqual(bathroomCode, '19636', 'Part 1 failed');
