import assert from 'node:assert';

import {permute} from 'lib/array.js';
import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2015, day: 9});

type CostMap = {[from: string]: {[to: string]: number}};

function calcRouteCost(costMap: CostMap, ...route: string[]) {
  return route
    .map((from, i) => costMap[from][route[i + 1]] ?? 0)
    .reduce((a, b) => a + b);
}

const costMap = lines
  .map(l => {
    const distanceRe = /^(\w+) to (\w+) = (\d+)$/;
    const [, a, b, cost] = l.match(distanceRe) ?? raise('Invalid distance');
    return [a, b, Number(cost)] as const;
  })
  .reduce<CostMap>((acc, [a, b, cost]) => {
    acc[a] ??= {};
    acc[b] ??= {};
    acc[a][b] = cost;
    acc[b][a] = cost;
    return acc;
  }, {});

const costs = permute(Object.keys(costMap)).reduce<number[]>(
  (acc, route) => acc.concat(calcRouteCost(costMap, ...route)),
  []
);
const minCost = Math.min(...costs);
const maxCost = Math.max(...costs);

assert.strictEqual(minCost, 251, 'Part 1 failed');
assert.strictEqual(maxCost, 898, 'Part 2 failed');
