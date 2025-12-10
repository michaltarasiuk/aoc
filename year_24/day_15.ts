import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2024, day: 15});

const ROBOT = '@';
const BOX = 'O';
const EMPTY = '.';

const directions = {
  '^': [0, -1],
  '>': [1, 0],
  'v': [0, 1],
  '<': [-1, 0],
};

const [a, b] = input.split(/\n\n/).map(p => p.split(/\n/));

const warehouse = a.map(l => [...l]);
const moves = b.flatMap(l => [...l]);

let [robotX, robotY] = (() => {
  for (const y of warehouse.keys()) {
    const x = warehouse[y].indexOf(ROBOT);
    if (x !== -1) return [x, y] as const;
  }
  throw new Error('Robot not found');
})();

for (const move of moves) {
  const [dx, dy] = directions[move as keyof typeof directions];
  const [newX, newY] = [robotX + dx, robotY + dy];
  if ([BOX, EMPTY].includes(warehouse[newY][newX])) {
    if (warehouse[newY][newX] === BOX) {
      let i = 1;
      while (warehouse[newY + i * dy][newX + i * dx] === BOX) {
        i++;
      }
      if (warehouse[newY + i * dy][newX + i * dx] !== EMPTY) {
        continue;
      }
      for (let j = 1; j <= i; j++) {
        warehouse[newY + j * dy][newX + j * dx] = BOX;
      }
    }
    [warehouse[robotY][robotX], warehouse[newY][newX]] = [EMPTY, ROBOT];
    [robotX, robotY] = [newX, newY];
  }
}

const sum = warehouse
  .keys()
  .flatMap(y => warehouse[y].keys().map(x => [x, y] as const))
  .filter(([x, y]) => warehouse[y][x] === BOX)
  .reduce((acc, [x, y]) => acc + x + 100 * y, 0);

assert.strictEqual(sum, 1430536, 'Part 1 failed');
