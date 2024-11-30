import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2020, day: 2});

function parsePassword(s: string) {
  const passwordRe = /^(\d+)-(\d+) (\w): (\w+)$/;
  const [, min, max, char, password] =
    s.match(passwordRe) ?? raise('Invalid password');

  return {min: Number(min), max: Number(max), char, password};
}

const passwords = lines.map(parsePassword);

const validPasswordsCount = sum(
  ...passwords
    .map(({min, max, char, password}) => {
      const count = password.split(char).length - 1;
      return count >= min && count <= max;
    })
    .map(Number)
);

const validPasswordsCount2 = sum(
  ...passwords
    .map(({min, max, char, password}) => {
      const minChar = password[min - 1];
      const maxChar = password[max - 1];

      return (minChar === char) !== (maxChar === char);
    })
    .map(Number)
);

assert.strictEqual(validPasswordsCount, 445, 'Part 1 failed');
assert.strictEqual(validPasswordsCount2, 491, 'Part 2 failed');
