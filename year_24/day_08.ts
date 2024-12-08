import assert from 'node:assert';

import {getInputGrid} from 'lib/input.js';

const grid = await getInputGrid({year: 2024, day: 8});

type Antennas = Record<string, [number, number][]>;

function* createAntennaPairs(antennas: Antennas) {
  for (const positions of Object.values(antennas)) {
    for (const [x1, y1] of positions) {
      for (const [x2, y2] of positions) {
        if (x1 === x2 && y1 === y2) {
          continue;
        }
        yield [x1, y1, x2, y2];
      }
    }
  }
}

const antennas = grid.keys().reduce<Antennas>((acc, y) => {
  grid[y].forEach((frequency, x) => {
    if (/\w/.test(frequency)) {
      acc[frequency] ??= [];
      acc[frequency].push([x, y]);
    }
  });
  return acc;
}, {});

const antinodesPart1 = new Set<string>();
for (const [x1, y1, x2, y2] of createAntennaPairs(antennas)) {
  const i = x1 + (x1 - x2);
  const j = y1 + (y1 - y2);
  if (grid[j]?.[i]) {
    antinodesPart1.add(`${i},${j}`);
  }
}

const antinodesPart2 = new Set<string>();
for (const [x1, y1, x2, y2] of createAntennaPairs(antennas)) {
  antinodesPart2.add(`${x1},${y1}`);
  let i = x1 + (x1 - x2);
  let j = y1 + (y1 - y2);
  while (grid[j]?.[i]) {
    antinodesPart2.add(`${i},${j}`);
    i += x1 - x2;
    j += y1 - y2;
  }
}

assert.strictEqual(antinodesPart1.size, 381, 'Part 1 failed');
assert.strictEqual(antinodesPart2.size, 1184, 'Part 2 failed');
