import {permute} from 'lib/array.js';
import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2015, day: 9});

type Costs = {[city: string]: Record<string, number>};

function parseDistance(distance: string) {
  const distanceRe = /^(\w+) to (\w+) = (\d+)$/;
  const [, a, b, cost] = distance.match(distanceRe)!;

  return {a, b, cost: Number(cost)};
}

function calcRouteCost(costs: Costs, ...route: string[]) {
  return sum(
    ...route.map((city, i) => {
      const dest = route[i + 1];
      return costs[city][dest] ?? 0;
    })
  );
}

const costs = lines.reduce<Costs>((acc, line) => {
  const {a, b, cost} = parseDistance(line);

  (acc[a] ??= {}), (acc[a][b] = cost);
  (acc[b] ??= {}), (acc[b][a] = cost);
  return acc;
}, {});
const cities = Object.keys(costs);

const possibleCosts = permute(cities).reduce<number[]>(
  (acc, route) => acc.concat(calcRouteCost(costs, ...route)),
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
