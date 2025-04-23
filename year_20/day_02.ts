import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2020, day: 2});

const passwordRe = /^(\d+)-(\d+) (\w): (\w+)$/;
const passwords = input.split(/\n/).map(l => {
  const [, min, max, char, password] =
    passwordRe.exec(l) ?? raise('Invalid password');
  return {min: Number(min), max: Number(max), char, password};
});

const validPasswordsCount = passwords
  .map(({min, max, char, password}) => {
    const count = password.split(char).length - 1;
    return Number(count >= min && count <= max);
  })
  .reduce((a, b) => a + b);

const validPasswordsCount2 = passwords
  .map(({min, max, char, password}) => {
    const minChar = password[min - 1];
    const maxChar = password[max - 1];
    return Number((minChar === char) !== (maxChar === char));
  })
  .reduce((a, b) => a + b);

assert.strictEqual(validPasswordsCount, 445, 'Part 1 failed');
assert.strictEqual(validPasswordsCount2, 491, 'Part 2 failed');
