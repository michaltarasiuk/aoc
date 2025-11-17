import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2017, day: 5});

function countStepsToExit(
  [...jumps]: number[],
  updateJump = (jumps: number[], i: number) => jumps[i]++
) {
  let steps = 0;
  let position = 0;
  while (position < jumps.length) {
    steps++;
    position += updateJump(jumps, position);
  }
  return steps;
}

const jumpOffsets = input.split(/\n/).map(Number);

const part1Steps = countStepsToExit(jumpOffsets);
const part2Steps = countStepsToExit(jumpOffsets, (jumps, i) =>
  jumps[i] >= 3 ? jumps[i]-- : jumps[i]++
);

assert.strictEqual(part1Steps, 373160, 'Part 1 failed');
assert.strictEqual(part2Steps, 26395586, 'Part 2 failed');
