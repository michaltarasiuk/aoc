import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2024, day: 25});

const SCHEMATIC_SIZE = 5;
const FILLED = '#';

function getHeights(schematic: string[]) {
  const heights = Array(SCHEMATIC_SIZE).fill(0);
  for (let i = 1; i < schematic.length - 1; i++) {
    for (let j = 0; j < schematic[i].length; j++) {
      if (schematic[i][j] === FILLED) {
        heights[j]++;
      }
    }
  }
  return heights;
}
function overlaps(lockHeights: number[], keyHeights: number[]) {
  return lockHeights.some(
    (lockHeight, i) => lockHeight + keyHeights[i] > SCHEMATIC_SIZE
  );
}

const schematics = input.split(/\n\n/).map(p => p.split(/\n/));
const {locks = [], keys = []} = Object.groupBy(schematics, schematic =>
  new RegExp(`^${FILLED}{${SCHEMATIC_SIZE}}$`).test(schematic[0])
    ? 'locks'
    : 'keys'
);

let validPairsCount = 0;
for (const lockHeights of locks.map(getHeights)) {
  for (const keyHeights of keys.map(getHeights)) {
    if (!overlaps(lockHeights, keyHeights)) {
      validPairsCount++;
    }
  }
}

assert.strictEqual(validPairsCount, 3344, 'Part 1 failed');
