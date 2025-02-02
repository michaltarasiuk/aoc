import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2020, day: 2});

const passwordRe = /^(\d+)-(\d+) (\w): (\w+)$/;
const passwords = lines.map(l => {
  const [, min, max, char, password] = passwordRe.exec(l) ?? [];
  return {min: Number(min), max: Number(max), char, password};
});

const validPasswordsCount = passwords
  .map(({min, max, char, password}) => {
    const count = password.split(char).length - 1;
    return count >= min && count <= max;
  })
  .reduce((acc, cond) => acc + Number(cond), 0);

const validPasswordsCount2 = passwords
  .map(({min, max, char, password}) => {
    const minChar = password[min - 1];
    const maxChar = password[max - 1];

    return (minChar === char) !== (maxChar === char);
  })
  .reduce((acc, cond) => acc + Number(cond), 0);

assert.strictEqual(validPasswordsCount, 445, 'Part 1 failed');
assert.strictEqual(validPasswordsCount2, 491, 'Part 2 failed');
