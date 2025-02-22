import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2019, day: 3});

function parseWirePath(path: string) {
  return path.matchAll(/([RLUD])(\d+)/g).map(([, dir, distance]) => {
    assert(dir === 'R' || dir === 'L' || dir === 'U' || dir === 'D');
    return [dir, Number(distance)] as const;
  });
}

function traceWirePath(path: ReturnType<typeof parseWirePath>) {
  const visiteCoords = new Map<string, number>();
  let [x, y, steps] = [0, 0, 0];
  for (const [dir, distance] of path) {
    for (let i = 0; i < distance; i++, steps++) {
      const move = {
        R: () => x++,
        L: () => x--,
        U: () => y++,
        D: () => y--,
      };
      move[dir]();
      if (!visiteCoords.has(`${x},${y}`)) {
        visiteCoords.set(`${x},${y}`, steps + 1);
      }
    }
  }
  return visiteCoords;
}

const [wire1Coords, wire2Coords] = input
  .split(/\n/)
  .map(parseWirePath)
  .map(traceWirePath);

const intersections = [...wire1Coords.keys()].filter(p => wire2Coords.has(p));

const manhattanDistances = intersections
  .map(p => p.split(',').map(Number))
  .map(([x, y]) => Math.abs(x) + Math.abs(y));

const totalSteps = intersections.map(
  p => wire1Coords.get(p)! + wire2Coords.get(p)!
);

assert.strictEqual(Math.min(...manhattanDistances), 2427, 'Part 1 failed');
assert.strictEqual(Math.min(...totalSteps), 27890, 'Part 2 failed');
