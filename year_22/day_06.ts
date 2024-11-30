import assert from 'node:assert/strict';

import {getInput} from 'lib/input.js';
import {uniq} from 'lib/iterable.js';

const input = await getInput({year: 2022, day: 6});

function findLastIndexOfMarker([...chars]: string, length: number) {
  for (const i of chars.keys()) {
    const lastIndex = i + length;
    const marker = uniq(input.slice(i, lastIndex));

    if (marker.length === length) {
      return lastIndex;
    }
  }
  return -1;
}

const lastIndex = findLastIndexOfMarker(input, 4);
const lastIndex2 = findLastIndexOfMarker(input, 14);

assert.strictEqual(lastIndex, 1343, 'Part 1 failed');
assert.strictEqual(lastIndex2, 2193, 'Part 2 failed');
