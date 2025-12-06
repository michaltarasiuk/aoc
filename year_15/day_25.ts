import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';
import {raise} from '#lib/raise.js';

const input = await fetchInput({year: 2015, day: 25});

const InitialCode = 20151125;
const Multiplier = 252533;
const Modulo = 33554393;

const inputRe = /Enter the code at row (\d+), column (\d+)/;
const inputMatch = input.match(inputRe) ?? raise('Invalid input');

const row = Number(inputMatch[1]);
const col = Number(inputMatch[2]);

let code = InitialCode;
for (let i = 0; i < ((row + col) * (row + col - 1)) / 2 - row; i++) {
  code = (code * Multiplier) % Modulo;
}

assert.strictEqual(code, 9132360, 'Part 1 failed');
