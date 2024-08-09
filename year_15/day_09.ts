import {getInputLines} from 'lib/input';
import {permute} from 'lib/permutate';
import {sum} from 'lib/sum';

const lines = await getInputLines({year: 2015, day: 9});

function parseDistance(distance: string) {
  const distanceRe = /^(\w+) to (\w+) = (\d+)$/;
  const [, a, b, cost] = distance.match(distanceRe)!;

  return {a, b, cost: Number(cost)};
}

const costMap = lines.reduce<{[k: string]: Record<string, number>}>(
  (acc, line) => {
    const {a, b, cost} = parseDistance(line);

    acc[a] ??= {};
    acc[b] ??= {};
    acc[a][b] = cost;
    acc[b][a] = cost;
    return acc;
  },
  {},
);
const costMapKeys = Object.keys(costMap);

function calcRouteCost(cities: string[]) {
  return sum(
    cities.map((city, i) => {
      const dest = cities[i + 1];
      return costMap[city][dest] ?? 0;
    }),
  );
}

const costs = permute(costMapKeys).reduce<number[]>(
  (acc, cities) => acc.concat(calcRouteCost(cities)),
  [],
);

const minCost = Math.min(...costs);
const maxCost = Math.max(...costs);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(minCost).toBe(251);
  });

  test('part 2', () => {
    expect(maxCost).toBe(898);
  });
}
