import assert from 'node:assert';

import {getInputParagraphs} from 'lib/input.js';

const schematics = await getInputParagraphs({year: 2024, day: 25});

const SchematicSize = 5;
const Filled = '#';

function getHeights(schematic: string[]) {
  const heights = Array(SchematicSize).fill(0);
  for (let i = 1; i < schematic.length - 1; i++) {
    for (let j = 0; j < schematic[i].length; j++) {
      if (schematic[i][j] === Filled) {
        heights[j]++;
      }
    }
  }
  return heights;
}
function overlaps(lockHeights: number[], keyHeights: number[]) {
  return lockHeights.some(
    (lockHeight, i) => lockHeight + keyHeights[i] > SchematicSize
  );
}

const {locks = [], keys = []} = Object.groupBy(schematics, schematic =>
  new RegExp(`^${Filled}{${SchematicSize}}$`).test(schematic[0])
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
