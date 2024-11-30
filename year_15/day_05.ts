import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2015, day: 5});

const niceStringsCount = sum(
  ...lines.map(s => {
    const hasAtLeastThreeVowels = /(.*[aeuio].*){3}/.test(s);
    const hasDoubleLetter = /(?:(\w)\1+)/.test(s);
    const hasNoForbiddenSubstrings = !/ab|cd|pq|xy/.test(s);

    return Number(
      hasAtLeastThreeVowels && hasDoubleLetter && hasNoForbiddenSubstrings
    );
  })
);
const niceStringsCount2 = sum(
  ...lines.map(s => {
    const hasPairOfTwoLetters = /(\w{2}).*\1/.test(s);
    const hasRepeatingLetter = /(\w)\w\1/.test(s);

    return Number(hasPairOfTwoLetters && hasRepeatingLetter);
  })
);

assert.strictEqual(niceStringsCount, 238, 'Part 1 failed');
assert.strictEqual(niceStringsCount2, 69, 'Part 2 failed');
