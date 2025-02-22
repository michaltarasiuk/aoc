import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2017, day: 4});

const passports = input.split(/\n/).map(l => l.split(/\s/));

const validPassphrasesCount = passports
  .map(p => Number(p.length === new Set(p).size))
  .reduce((a, b) => a + b);

const validPassphrasesCount2 = passports
  .map(p => {
    const uniq = new Set(p.map(([...chars]) => chars.sort().join('')));
    return Number(p.length === uniq.size);
  })
  .reduce((a, b) => a + b);

assert.strictEqual(validPassphrasesCount, 455, 'Part 1 failed');
assert.strictEqual(validPassphrasesCount2, 186, 'Part 2 failed');
