import {permute} from 'lib/array';
import {getInputLines} from 'lib/input';
import {sum} from 'lib/math';

const lines = await getInputLines({year: 2015, day: 9});

function parseDistance(distance: string) {
  const distanceRe = /^(\w+) to (\w+) = (\d+)$/;
  const [, a, b, cost] = distance.match(distanceRe)!;

  return {a, b, cost: Number(cost)};
}

function calcRouteCost(
  costs: Record<string, Record<string, number>>,
  route: string[]
) {
  return sum(
    ...route.map((city, i) => {
      const dest = route[i + 1];
      return costs[city][dest] ?? 0;
    })
  );
}

const costs = lines.reduce<{[k: string]: Record<string, number>}>(
  (acc, line) => {
    const {a, b, cost} = parseDistance(line);

    (acc[a] ??= {}), (acc[a][b] = cost);
    (acc[b] ??= {}), (acc[b][a] = cost);
    return acc;
  },
  {}
);

const allRouteCosts = permute(Object.keys(costs)).reduce<number[]>(
  (acc, route) => acc.concat(calcRouteCost(costs, route)),
  []
);

const minCost = Math.min(...allRouteCosts);
const maxCost = Math.max(...allRouteCosts);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(minCost).toBe(251);
  });

  test('part 2', () => {
    expect(maxCost).toBe(898);
  });
}
