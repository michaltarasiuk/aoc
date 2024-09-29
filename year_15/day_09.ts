import {permute} from 'lib/array.js';
import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2015, day: 9});

function parseDistance(distance: string) {
  const distanceRe = /^(\w+) to (\w+) = (\d+)$/;
  const [, a, b, cost] = distance.match(distanceRe)!;

  return {a, b, cost: Number(cost)};
}

function calcRouteCost(...route: string[]) {
  return sum(
    ...route.map((from, i) => {
      const to = route[i + 1];
      return costs[from][to] ?? 0;
    })
  );
}

const costs = lines.reduce<{[from: string]: {[to: string]: number}}>(
  (acc, line) => {
    const {a, b, cost} = parseDistance(line);

    (acc[a] ??= {}), (acc[a][b] = cost);
    (acc[b] ??= {}), (acc[b][a] = cost);
    return acc;
  },
  {}
);

const possibleCosts = permute(Object.keys(costs)).reduce<number[]>(
  (acc, route) => acc.concat(calcRouteCost(...route)),
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
