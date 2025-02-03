import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await getInput({year: 2020, day: 2});

const passwordRe = /^(\d+)-(\d+) (\w): (\w+)$/;
const passwords = input.split(/\n/).map(l => {
  const [, min, max, char, password] = passwordRe.exec(l) ?? raise('Invalid');
  return {min: Number(min), max: Number(max), char, password};
});

const validPasswordsCount = passwords
  .map(({min, max, char, password}) => {
    const count = password.split(char).length - 1;
    return count >= min && count <= max;
  })
  .map(Number)
  .reduce((a, b) => a + b);

const validPasswordsCount2 = passwords
  .map(({min, max, char, password}) => {
    const minChar = password[min - 1];
    const maxChar = password[max - 1];
    return (minChar === char) !== (maxChar === char);
  })
  .map(Number)
  .reduce((a, b) => a + b);

assert.strictEqual(validPasswordsCount, 445, 'Part 1 failed');
assert.strictEqual(validPasswordsCount2, 491, 'Part 2 failed');
