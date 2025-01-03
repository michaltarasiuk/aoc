import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2017, day: 4});

const passports = lines.map(l => l.split(/\s/));

const validPassphrasesCount = passports
  .map(passport => Number(passport.length === new Set(passport).size))
  .reduce((a, b) => a + b);

const validPassphrasesCount2 = passports
  .map(passport => {
    const uniq = new Set(passport.map(([...chars]) => chars.sort().join('')));
    return Number(passport.length === uniq.size);
  })
  .reduce((a, b) => a + b);

assert.strictEqual(validPassphrasesCount, 455, 'Part 1 failed');
assert.strictEqual(validPassphrasesCount2, 186, 'Part 2 failed');
