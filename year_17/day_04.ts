import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2017, day: 4});

function uniqueSortedWords(passphrase: string[]) {
  return new Set(passphrase.map(([...chars]) => chars.sort().join('')));
}

const passports = input.split(/\n/).map(l => l.split(/\s/));

const validPassphrasesCount = passports.filter(
  p => p.length === new Set(p).size
).length;

const validPassphrasesCount2 = passports.filter(
  p => p.length === uniqueSortedWords(p).size
).length;

assert.strictEqual(validPassphrasesCount, 455, 'Part 1 failed');
assert.strictEqual(validPassphrasesCount2, 186, 'Part 2 failed');
