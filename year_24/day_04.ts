import assert from 'node:assert';

import {getInputGrid} from 'lib/input.js';

const lines = await getInputGrid({year: 2024, day: 4});

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
  for (const x of lines.keys()) {
    for (const y of lines[x].keys()) {
      if (!Word.startsWith(lines[x][y])) {
        continue;
      }
      for (const [i, j] of Object.values(Directions)) {
        const wordArray = Array(Word.length)
          .fill(0)
          .map((_, k) => [x + i * k, y + j * k])
          .map(([x, y]) => lines[x]?.[y])
          .filter(Boolean);
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
  for (const x of lines.keys()) {
    for (const y of lines[x].keys()) {
      if (lines[x][y] !== Word[1]) {
        continue;
      }
      const isXMasPattern = [
        [Directions.upLeft, Directions.downRight],
        [Directions.upRight, Directions.downLeft],
      ]
        .map(([[a, b], [c, d]]) => {
          return lines[x + a]?.[y + b] + lines[x + c]?.[y + d];
        })
        .every(([...axis]) => axis.toSorted().join('') === Word[0] + Word[2]);
      if (isXMasPattern) {
        count++;
      }
    }
  }
  assert.strictEqual(count, 1868, 'Part 2 failed');
}
