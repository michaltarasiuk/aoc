import assert from 'node:assert';

import {getInputInts} from 'lib/input.js';

const jumpOffsets = await getInputInts({year: 2017, day: 5});

function countStepsToExit(
  [...offsets]: number[],
  updateOffset = (offsets: number[], index: number) => offsets[index]++
) {
  let steps = 0;
  let currentIndex = 0;
  while (currentIndex < offsets.length) {
    currentIndex += updateOffset(offsets, currentIndex);
    steps++;
  }
  return steps;
}

const part1Result = countStepsToExit(jumpOffsets);
const part2Result = countStepsToExit(jumpOffsets, (offsets, i) =>
  offsets[i] >= 3 ? offsets[i]-- : offsets[i]++
);

assert.strictEqual(part1Result, 373160, 'Part 1 failed');
assert.strictEqual(part2Result, 26395586, 'Part 2 failed');
