import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {permute} from 'lib/permute.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2015, day: 9});

const lines = input.split(/\n/);
const distancesMap = lines
  .map(l => {
    const distanceRe = /^(\w+) to (\w+) = (\d+)$/;
    const [, a, b, distance] = l.match(distanceRe) ?? raise('Invalid distance');
    return [a, b, Number(distance)] as const;
  })
  .reduce<{[from: string]: {[to: string]: number}}>((acc, [a, b, cost]) => {
    acc[a] ??= {};
    acc[b] ??= {};
    acc[a][b] = cost;
    acc[b][a] = cost;
    return acc;
  }, {});

const distances = [
  ...permute(Object.keys(distancesMap)).map(route =>
    route.slice(1).reduce((acc, to, i) => acc + distancesMap[route[i]][to], 0)
  ),
];

assert.strictEqual(Math.min(...distances), 251, 'Part 1 failed');
assert.strictEqual(Math.max(...distances), 898, 'Part 2 failed');
