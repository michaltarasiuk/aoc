import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2025, day: 3});

function findLargestJoltage(bank: number[]) {
  const a = Math.max(...bank.slice(0, bank.length - 1));
  const b = Math.max(...bank.slice(bank.indexOf(a) + 1));
  return Number(String(a) + String(b));
}

const banks = input.split(/\n/).map(([...b]) => b.map(Number));

const totalJoltage = banks.map(findLargestJoltage).reduce((a, b) => a + b, 0);

assert.strictEqual(totalJoltage, 17095, 'Part 1 failed');
