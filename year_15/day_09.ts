import assert from 'node:assert';

import {permute} from 'lib/array.js';
import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2015, day: 9});

const distanceRe = /^(\w+) to (\w+) = (\d+)$/;
const routeCostMap = lines
  .map(l => {
    const [, a, b, cost] = l.match(distanceRe) ?? raise('Invalid distance');
    return [a, b, Number(cost)] as const;
  })
  .reduce<{[from: string]: {[to: string]: number}}>((acc, [a, b, cost]) => {
    acc[a] ??= {};
    acc[b] ??= {};
    acc[a][b] = cost;
    acc[b][a] = cost;
    return acc;
  }, {});

const costs: number[] = [];
for (const route of permute(Object.keys(routeCostMap))) {
  const cost = route
    .map((from, i) => routeCostMap[from][route[i + 1]] ?? 0)
    .reduce((a, b) => a + b);
  costs.push(cost);
}

assert.strictEqual(Math.min(...costs), 251, 'Part 1 failed');
assert.strictEqual(Math.max(...costs), 898, 'Part 2 failed');
