import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2024, day: 8});

type AntennaPositions = Record<string, [x: number, y: number][]>;

function* createAntennaPairs(antennas: AntennaPositions) {
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

const grid = input.split(/\n/).map(([...l]) => l);

const antennaPositions = grid.keys().reduce<AntennaPositions>((acc, y) => {
  grid[y].forEach((frequency, x) => {
    if (/\w/.test(frequency)) {
      acc[frequency] ??= [];
      acc[frequency].push([x, y]);
    }
  });
  return acc;
}, {});

const antinodes = new Set<string>();
for (const [x1, y1, x2, y2] of createAntennaPairs(antennaPositions)) {
  const i = x1 + (x1 - x2);
  const j = y1 + (y1 - y2);
  if (grid[j]?.[i]) {
    antinodes.add(`${i},${j}`);
  }
}

const antinodes2 = new Set<string>();
for (const [x1, y1, x2, y2] of createAntennaPairs(antennaPositions)) {
  antinodes2.add(`${x1},${y1}`);
  let i = x1 + (x1 - x2);
  let j = y1 + (y1 - y2);
  while (grid[j]?.[i]) {
    antinodes2.add(`${i},${j}`);
    i += x1 - x2;
    j += y1 - y2;
  }
}

assert.strictEqual(antinodes.size, 381, 'Part 1 failed');
assert.strictEqual(antinodes2.size, 1184, 'Part 2 failed');
