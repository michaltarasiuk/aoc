import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2017, day: 4});

function uniqueSortedWords(passphrase: string[]) {
  return new Set(passphrase.map(([...chars]) => chars.sort().join('')));
}

const passports = input.split(/\n/).map(l => l.split(/\s/));

const validPassphrases = passports.filter(p => p.length === new Set(p).size);
const validPassphrases2 = passports.filter(
  p => p.length === uniqueSortedWords(p).size
);

assert.strictEqual(validPassphrases.length, 455, 'Part 1 failed');
assert.strictEqual(validPassphrases2.length, 186, 'Part 2 failed');
