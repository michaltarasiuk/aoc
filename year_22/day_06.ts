import assert from 'node:assert/strict';

import {readInput} from 'lib/input.js';
import {isDefined} from 'lib/is_defined.js';

const input = await readInput({year: 2022, day: 6});

function findMarkerEndIndex([...chars]: string, markerLength: number) {
  const markerStartIndex = chars
    .keys()
    .find(i => new Set(input.slice(i, i + markerLength)).size === markerLength);
  return isDefined(markerStartIndex) ? markerStartIndex + markerLength : -1;
}

assert.strictEqual(findMarkerEndIndex(input, 4), 1343, 'Part 1 failed');
assert.strictEqual(findMarkerEndIndex(input, 14), 2193, 'Part 2 failed');
