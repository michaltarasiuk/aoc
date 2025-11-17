import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await fetchInput({year: 2019, day: 6});

type OrbitGraph = Record<string, Set<string>>;

function calcOrbitCount(orbits: Map<string, string>, satellite: string) {
  let count = 0;
  while ((satellite = orbits.get(satellite)!)) {
    count++;
  }
  return count;
}

function findMinimumTransfers(
  orbitGraph: OrbitGraph,
  start = 'YOU',
  end = 'SAN'
) {
  const stack = [{node: start, distance: -1}];
  const visited = new Set<string>([start]);
  while (stack.length > 0) {
    const {node, distance} = stack.shift()!;
    for (const next of orbitGraph[node]) {
      if (next === end) {
        return distance;
      } else if (!visited.has(next)) {
        stack.push({node: next, distance: distance + 1});
        visited.add(next);
      }
    }
  }
  throw raise('Path not found');
}

const orbitRe = /^(.*)\)(.*)$/;
const orbits = new Map(
  input.split(/\n/).map(l => {
    const [, center, satellite] = orbitRe.exec(l) ?? raise('Invalid orbit');
    return [satellite, center];
  })
);

const orbitGraph = orbits
  .entries()
  .reduce<OrbitGraph>((acc, [satellite, center]) => {
    (acc[satellite] ??= new Set()).add(center);
    (acc[center] ??= new Set()).add(satellite);
    return acc;
  }, {});

const totalOrbitCount = orbits
  .keys()
  .reduce((acc, satellite) => acc + calcOrbitCount(orbits, satellite), 0);

const minimumTransfers = findMinimumTransfers(orbitGraph);

assert.strictEqual(totalOrbitCount, 253104, 'Part 1 failed');
assert.strictEqual(minimumTransfers, 499, 'Part 2 failed');
