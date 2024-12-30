import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2015, day: 5});

const niceStringsCount = lines
  .map(l => {
    const hasAtLeastThreeVowels = /(.*[aeuio].*){3}/.test(l);
    const hasDoubleLetter = /(?:(\w)\1+)/.test(l);
    const hasNoForbiddenSubstrings = !/ab|cd|pq|xy/.test(l);

    return Number(
      hasAtLeastThreeVowels && hasDoubleLetter && hasNoForbiddenSubstrings
    );
  })
  .reduce((a, b) => a + b);

const niceStringsCount2 = lines
  .map(l => {
    const hasPairOfTwoLetters = /(\w{2}).*\1/.test(l);
    const hasRepeatingLetter = /(\w)\w\1/.test(l);

    return Number(hasPairOfTwoLetters && hasRepeatingLetter);
  })
  .reduce((a, b) => a + b);

assert.strictEqual(niceStringsCount, 238, 'Part 1 failed');
assert.strictEqual(niceStringsCount2, 69, 'Part 2 failed');
