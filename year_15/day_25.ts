import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2015, day: 25});

const [row, col] = input.match(/\d+/g)?.map(Number) ?? raise('Invalid input');

const StartingCode = 20151125;
const Multiplier = 252533;
const Modulo = 33554393;

let code = StartingCode;
for (let i = 0; i < ((row + col) * (row + col - 1)) / 2 - row; i++) {
  code = (code * Multiplier) % Modulo;
}

assert.strictEqual(code, 9132360, 'Part 1 failed');
