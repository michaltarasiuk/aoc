import assert from 'node:assert';

import {getInputInts} from 'lib/input.js';

const [start, end] = await getInputInts(
  {year: 2019, day: 4},
  {negative: false}
);

let part1PasswordsCount = 0;
let part2PasswordsCount = 0;
for (let i = start; i <= end; i++) {
  const s = String(i);
  if (!(s === [...s].sort().join(''))) {
    continue;
  }
  const groups = s.match(/(\d)\1+/g);
  if (groups === null) {
    continue;
  }
  part1PasswordsCount++;
  if (groups.some(g => g.length === 2)) {
    part2PasswordsCount++;
  }
}

assert.strictEqual(part1PasswordsCount, 1686, 'Part 1 failed');
assert.strictEqual(part2PasswordsCount, 1145, 'Part 2 failed');
