import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2021, day: 11});

const Steps = 100;
const Threshold = 9;
const Directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

let flashes = 0;
let octopuses = input.split(/\n/).map(([...l]) => l.map(Number));

for (let step = 1; step <= Steps; step++) {
  octopuses = octopuses.map(l => l.map(v => v + 1));

  const flashed = new Set<string>();
  const stack = octopuses
    .flatMap((l, y) => l.map((v, x) => [v, x, y] as const))
    .filter(([v]) => v > Threshold);

  while (stack.length > 0) {
    const [, x, y] = stack.pop()!;
    if (flashed.has(`${x},${y}`)) {
      continue;
    }
    flashed.add(`${x},${y}`);
    octopuses[y][x] = 0;
    for (const [i, j] of Directions) {
      if (octopuses[y + j]?.[x + i] && ++octopuses[y + j][x + i] > Threshold) {
        stack.push([octopuses[y + j][x + i], x + i, y + j]);
      }
    }
  }
  flashes += flashed.size;
}

assert.strictEqual(flashes, 1644, 'Part 1 failed');
