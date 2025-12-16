import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';
import {raise} from '#lib/raise.js';

const input = await fetchInput({year: 2024, day: 16});

const START_TILE = 'S';
const END_TILE = 'E';
const WALL = '#';

const INITIAL_FACING = 1;
const DIRECTIONS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function getStartTileCoords(grid: string[][]) {
  for (const y of grid.keys()) {
    const x = grid[y].indexOf(START_TILE);
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

const grid = input.split(/\n/).map(l => [...l]);

const stack = new Map([
  [toCacheKey(INITIAL_FACING, ...getStartTileCoords(grid)), 0],
]);
const visited = new Set<string>();

outer: while (stack.size > 0) {
  const {cacheKey, score} = stack
    .entries()
    .map(([cacheKey, score]) => ({cacheKey, score}))
    .reduce((acc, v) => (v.score < acc.score ? v : acc));
  stack.delete(cacheKey);
  if (visited.has(cacheKey)) {
    continue;
  } else {
    visited.add(cacheKey);
  }
  const [dir, x, y] = parseCacheKey(cacheKey);
  for (const direction of DIRECTIONS) {
    const [i, j] = [x + direction[0], y + direction[1]];
    if (grid[j][i] === WALL) {
      continue;
    } else if (grid[j][i] === END_TILE) {
      assert.strictEqual(score + 1, 160624, 'Part 1 failed');
      break outer;
    } else {
      const newDir = DIRECTIONS.indexOf(direction);
      const newCacheKey = toCacheKey(newDir, i, j);
      const newScore = score + 1 + (newDir !== dir ? 1_000 : 0);
      if (!stack.has(newCacheKey) || stack.get(newCacheKey)! > newScore) {
        stack.set(newCacheKey, newScore);
      }
    }
  }
}
