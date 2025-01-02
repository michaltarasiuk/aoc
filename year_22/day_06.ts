import assert from 'node:assert/strict';

import {getInput} from 'lib/input.js';
import {uniq} from 'lib/iterable.js';
import {isDefined} from 'lib/predicate.js';

const input = await getInput({year: 2022, day: 6});

function findMarkerEndIndex([...chars]: string, markerLength: number) {
  const markerStartIndex = chars
    .keys()
    .find(i => uniq(input.slice(i, i + markerLength)).length === markerLength);

  return isDefined(markerStartIndex) ? markerStartIndex + markerLength : -1;
}

assert.strictEqual(findMarkerEndIndex(input, 4), 1343, 'Part 1 failed');
assert.strictEqual(findMarkerEndIndex(input, 14), 2193, 'Part 2 failed');
