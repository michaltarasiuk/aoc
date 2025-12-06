import assert from 'node:assert/strict';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2022, day: 6});

function findMarkerEndIndex([...chars]: string, markerLength: number) {
  const markerStartIndex = chars.findIndex((_, i) => {
    const marker = new Set(input.slice(i, i + markerLength));
    return marker.size === markerLength;
  });
  if (markerStartIndex === -1) {
    return -1;
  }
  return markerStartIndex + markerLength;
}

assert.strictEqual(findMarkerEndIndex(input, 4), 1343, 'Part 1 failed');
assert.strictEqual(findMarkerEndIndex(input, 14), 2193, 'Part 2 failed');
