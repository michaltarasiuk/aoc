import assert from 'node:assert';

import {getInputGrid} from 'lib/input.js';

const grid = await getInputGrid({year: 2024, day: 4});

const Directions = {
  right: [0, 1],
  down: [1, 0],
  downRight: [1, 1],
  downLeft: [1, -1],
  left: [0, -1],
  up: [-1, 0],
  upLeft: [-1, -1],
  upRight: [-1, 1],
};

{
  const Word = 'XMAS';
  let count = 0;
  for (const y of grid.keys()) {
    for (const x of grid[y].keys()) {
      if (!Word.startsWith(grid[y][x])) {
        continue;
      }
      for (const [i, j] of Object.values(Directions)) {
        const wordArray = Array(Word.length)
          .fill(0)
          .flatMap((_, k) => grid[y + i * k]?.[x + j * k] ?? []);
        if (wordArray.join('') === Word) {
          count++;
        }
      }
    }
  }
  assert.strictEqual(count, 2447, 'Part 1 failed');
}

{
  const Word = 'MAS';
  let count = 0;
  for (const y of grid.keys()) {
    for (const x of grid[y].keys()) {
      if (grid[y][x] !== Word[1]) {
        continue;
      }
      const isXMasPattern = [
        [Directions.upLeft, Directions.downRight],
        [Directions.upRight, Directions.downLeft],
      ]
        .map(([[a, b], [c, d]]) => grid[y + a]?.[x + b] + grid[y + c]?.[x + d])
        .every(([...axis]) => axis.toSorted().join('') === Word[0] + Word[2]);
      if (isXMasPattern) {
        count++;
      }
    }
  }
  assert.strictEqual(count, 1868, 'Part 2 failed');
}
