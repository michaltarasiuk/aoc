import {permute} from 'lib/array.js';
import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2015, day: 9});

const distanceMap = lines
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
const cities = Object.keys(distanceMap);

const routeDistances = permute(cities).reduce<number[]>((acc, route) => {
  const totalDistance = sum(
    ...route
      .map((from, i) => [from, route[i + 1]])
      .map(([from, to]) => distanceMap[from][to] ?? 0)
  );
  return acc.concat(totalDistance);
}, []);

const shortestRouteDistance = Math.min(...routeDistances);
const longestRouteDistance = Math.max(...routeDistances);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(shortestRouteDistance).toBe(251);
  });

  test('part 2', () => {
    expect(longestRouteDistance).toBe(898);
  });
}
