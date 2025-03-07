import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2024, day: 16});

const StartTile = 'S';
const EndTile = 'E';
const Wall = '#';

const InitialFacing = 1;
const Directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function getStartTileCoords(grid: string[][]) {
  for (const y of grid.keys()) {
    const x = grid[y].indexOf(StartTile);
    if (x !== -1) return [x, y] as const;
  }
  throw new Error('Start tile not found');
}
function toCacheKey(...params: [dir: number, x: number, y: number]) {
  return params.join();
}
function parseCacheKey(cacheKey: string) {
  const cacheKeyRe = /^(\d),(\d+),(\d+)$/;
  const [, dir, x, y] = cacheKeyRe.exec(cacheKey) ?? raise('Invalid cache key');
  return [Number(dir), Number(x), Number(y)] as const;
}

const grid = input.split(/\n/).map(([...l]) => l);

const stack = new Map([
  [toCacheKey(InitialFacing, ...getStartTileCoords(grid)), 0],
]);
const visted = new Set<string>();

outer: while (stack.size > 0) {
  const {cacheKey, score} = stack
    .entries()
    .map(([cacheKey, score]) => ({cacheKey, score}))
    .reduce((acc, v) => (v.score < acc.score ? v : acc));
  stack.delete(cacheKey);
  if (visted.has(cacheKey)) {
    continue;
  } else {
    visted.add(cacheKey);
  }
  const [dir, x, y] = parseCacheKey(cacheKey);
  for (const direction of Directions) {
    const [i, j] = [x + direction[0], y + direction[1]];
    if (grid[j][i] === Wall) {
      continue;
    } else if (grid[j][i] === EndTile) {
      assert.strictEqual(score + 1, 160624, 'Part 1 failed');
      break outer;
    } else {
      const newDir = Directions.indexOf(direction);
      const newCacheKey = toCacheKey(newDir, i, j);
      const newScore = score + 1 + (newDir !== dir ? 1_000 : 0);
      if (!stack.has(newCacheKey) || stack.get(newCacheKey)! > newScore) {
        stack.set(newCacheKey, newScore);
      }
    }
  }
}
