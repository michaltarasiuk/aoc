import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const wirePaths = await getInputLines({year: 2019, day: 3});

function parseWirePath(path: string) {
  return path.matchAll(/([RLUD])(\d+)/g).map(([, dir, steps]) => {
    assert(dir === 'R' || dir === 'L' || dir === 'U' || dir === 'D');
    return [dir, Number(steps)] as const;
  });
}

function traceWirePath(path: ReturnType<typeof parseWirePath>) {
  const visitedPoints = new Set<string>();
  let x = 0;
  let y = 0;
  for (const [dir, steps] of path) {
    for (let i = 0; i < steps; i++) {
      switch (dir) {
        case 'R':
          x++;
          break;
        case 'L':
          x--;
          break;
        case 'U':
          y++;
          break;
        case 'D':
          y--;
          break;
      }
      visitedPoints.add(`${x},${y}`);
    }
  }
  return visitedPoints;
}

const [wire1Points, wire2Points] = wirePaths
  .map(parseWirePath)
  .map(traceWirePath);

let closestDistance = Infinity;
for (const point of wire1Points.intersection(wire2Points)) {
  const [x, y] = point.split(',').map(Number);
  closestDistance = Math.min(closestDistance, Math.abs(x) + Math.abs(y));
}

assert.strictEqual(closestDistance, 2427, 'Part 1 failed');
