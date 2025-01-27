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
  const visitedPoints = new Map<string, number>();
  let [x, y, j] = [0, 0, 0];
  for (const [dir, steps] of path) {
    for (let i = 0; i < steps; i++, j++) {
      const moves = {
        R: () => x++,
        L: () => x--,
        U: () => y++,
        D: () => y--,
      };
      moves[dir]();
      if (!visitedPoints.has(`${x},${y}`)) {
        visitedPoints.set(`${x},${y}`, j + 1);
      }
    }
  }
  return visitedPoints;
}

const [wire1Points, wire2Points] = wirePaths
  .map(parseWirePath)
  .map(traceWirePath);

const intersections = [...wire1Points.keys()].filter(p => wire2Points.has(p));

const minDistance = Math.min(
  ...intersections
    .map(p => p.split(',').map(Number))
    .map(([x, y]) => Math.abs(x) + Math.abs(y))
);

const fewestCombinedSteps = Math.min(
  ...intersections.map(p => wire1Points.get(p)! + wire2Points.get(p)!)
);

assert.strictEqual(minDistance, 2427, 'Part 1 failed');
assert.strictEqual(fewestCombinedSteps, 27890, 'Part 2 failed');
