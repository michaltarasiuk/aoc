import {permute} from 'lib/array.js';
import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2015, day: 9});

const costs = lines
  .map(distance => {
    const distanceRe = /^(\w+) to (\w+) = (\d+)$/;
    const [, a, b, cost] = distance.match(distanceRe)!;

    return {a, b, cost: Number(cost)};
  })
  .reduce<{[from: string]: {[to: string]: number}}>((acc, {a, b, cost}) => {
    acc[a] ??= {};
    acc[b] ??= {};
    acc[a][b] = cost;
    acc[b][a] = cost;
    return acc;
  }, {});

const possibleCosts = permute(Object.keys(costs)).reduce<number[]>(
  (acc, route) => {
    const cost = sum(...route.map((from, i) => costs[from][route[i + 1]] ?? 0));
    return acc.concat(cost);
  },
  []
);

const minCost = Math.min(...possibleCosts);
const maxCost = Math.max(...possibleCosts);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(minCost).toBe(251);
  });

  test('part 2', () => {
    expect(maxCost).toBe(898);
  });
}
