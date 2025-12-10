import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2025, day: 9});

const redTiles = input.split(/\n/).map(l => {
  const [x, y] = l.split(',').map(Number);
  return {x, y};
});

let largestArea = -Infinity;
for (const i of redTiles.keys()) {
  for (const j of redTiles.keys().drop(i + 1)) {
    const a = redTiles[i];
    const b = redTiles[j];
    largestArea = Math.max(largestArea, calcArea(a, b));
  }
}

assert.strictEqual(largestArea, 4777967538, 'Part 1 failed');

function calcArea<T extends (typeof redTiles)[number]>(a: T, b: T) {
  return (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);
}
