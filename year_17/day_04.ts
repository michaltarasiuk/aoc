import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2017, day: 4});

const passports = lines.map(l => l.split(/\s/));

const validPassphrasesCount = sum(
  ...passports
    .map(passport => {
      const uniq = new Set(passport);
      return passport.length === uniq.size;
    })
    .map(Number)
);

const validPassphrasesCount2 = sum(
  ...passports
    .map(passport => {
      const uniq = new Set(
        passport.map(([...chars]) => chars.toSorted().join(''))
      );
      return passport.length === uniq.size;
    })
    .map(Number)
);

assert.strictEqual(validPassphrasesCount, 455, 'Part 1 failed');
assert.strictEqual(validPassphrasesCount2, 186, 'Part 2 failed');
