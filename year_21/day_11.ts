import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2021, day: 11});

const STEPS = 100;
const THRESHOLD = 9;
const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

let octopuses = input.split(/\n/).map(l => [...l].map(Number));
let flashes = 0;
let firstStepAllFlash: number | undefined;

for (let step = 1; ; step++) {
  octopuses = octopuses.map(l => l.map(v => v + 1));

  const flashed = new Set<string>();
  const stack = octopuses
    .flatMap((l, y) => l.map((_, x) => [x, y] as const))
    .filter(([x, y]) => octopuses[y][x] > THRESHOLD);

  while (stack.length > 0) {
    const [x, y] = stack.pop()!;
    if (flashed.has(`${x},${y}`)) {
      continue;
    }
    flashed.add(`${x},${y}`);
    octopuses[y][x] = 0;
    for (const [i, j] of DIRECTIONS) {
      if (octopuses[y + j]?.[x + i] && ++octopuses[y + j][x + i] > THRESHOLD) {
        stack.push([x + i, y + j]);
      }
    }
  }

  if (step <= STEPS) {
    flashes += flashed.size;
  }
  if (flashed.size === octopuses[0].length * octopuses.length) {
    firstStepAllFlash = step;
    break;
  }
}

assert.strictEqual(flashes, 1644, 'Part 1 failed');
assert.strictEqual(firstStepAllFlash, 229, 'Part 2 failed');
