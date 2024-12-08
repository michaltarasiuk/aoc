import assert from 'node:assert';

import {getInputGrid} from 'lib/input.js';

const grid = await getInputGrid({year: 2024, day: 8});

const antennas = grid
  .keys()
  .reduce<Record<string, [number, number][]>>((acc, y) => {
    grid[y].forEach((frequency, x) => {
      if (/\w/.test(frequency)) {
        acc[frequency] ??= [];
        acc[frequency].push([x, y]);
      }
    });
    return acc;
  }, {});

const antinodes = new Set<string>();
for (const positions of Object.values(antennas)) {
  for (const [x, y] of positions) {
    for (const [x2, y2] of positions) {
      if (x === x2 && y === y2) {
        continue;
      }
      const i = x + (x - x2);
      const j = y + (y - y2);
      if (grid[j]?.[i]) {
        antinodes.add(`${i},${j}`);
      }
    }
  }
}

assert.strictEqual(antinodes.size, 381, 'Part 1 failed');
