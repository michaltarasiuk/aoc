import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2024, day: 4});

type Coords = readonly [number, number];

const TargetWord = 'XMAS';
const PartialWord = 'MAS';

const Directions = {
  right: [0, 1],
  down: [1, 0],
  downRight: [1, 1],
  downLeft: [1, -1],
  left: [0, -1],
  up: [-1, 0],
  upLeft: [-1, -1],
  upRight: [-1, 1],
} satisfies Record<string, Coords>;
const LDiagonal = [Directions.upLeft, Directions.downRight] as const;
const RDiagonal = [Directions.upRight, Directions.downLeft] as const;

function* getCoords(grid: string[][]) {
  for (const y of grid.keys()) {
    for (const x of grid[y].keys()) {
      yield [x, y] as const;
    }
  }
}
function findWord(grid: string[][], [x, y]: Coords, [i, j]: Coords) {
  let word = grid[y][x];
  while (grid[y + j]?.[x + i] === (TargetWord[word.length] ?? '')) {
    word += grid[(y += j)][(x += i)];
  }
  return word;
}

const grid = input.split(/\n/).map(([...l]) => l);

const count = getCoords(grid)
  .filter(([x, y]) => grid[y][x] === TargetWord[0])
  .reduce((acc, [x, y]) => {
    Object.values(Directions).forEach(
      ([i, j]) => findWord(grid, [x, y], [i, j]) === TargetWord && acc++
    );
    return acc;
  }, 0);

const count2 = getCoords(grid)
  .filter(([x, y]) => grid[y][x] === PartialWord[1])
  .reduce((acc, [x, y]) => {
    const l = LDiagonal.map(([i, j]) => grid[y + j]?.[x + i] ?? '');
    const r = RDiagonal.map(([i, j]) => grid[y + j]?.[x + i] ?? '');
    const formsXMAS = [l.toSorted().join(''), r.toSorted().join('')].every(
      w => w === PartialWord[0] + PartialWord[2]
    );
    return acc + Number(formsXMAS);
  }, 0);

assert.strictEqual(count, 2447, 'Part 1 failed');
assert.strictEqual(count2, 1868, 'Part 2 failed');
