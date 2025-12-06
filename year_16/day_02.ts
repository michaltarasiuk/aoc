import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2016, day: 2});

const Keypad = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

const XBound = Keypad[0].length - 1;
const YBound = Keypad.length - 1;

function move(x: number, y: number, direction: string) {
  switch (direction) {
    case 'U':
      return [x, Math.max(y - 1, 0)];
    case 'D':
      return [x, Math.min(y + 1, YBound)];
    case 'L':
      return [Math.max(x - 1, 0), y];
    case 'R':
      return [Math.min(x + 1, XBound), y];
    default:
      throw new Error('Invalid direction');
  }
}

const StartPoint = [1, 1];

let [x, y] = StartPoint;
let bathroomCode = '';

for (const l of input.split(/\n/)) {
  for (const char of l) {
    [x, y] = move(x, y, char);
  }
  bathroomCode += Keypad[y][x];
}

assert.strictEqual(bathroomCode, '19636', 'Part 1 failed');
