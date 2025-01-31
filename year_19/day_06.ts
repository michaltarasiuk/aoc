import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2019, day: 6});

function countOrbits(orbits: Map<string, string>, satellite: string) {
  let count = 0;
  while ((satellite = orbits.get(satellite)!)) {
    count++;
  }
  return count;
}

const orbitRe = /^(.*)\)(.*)$/;
const orbits = new Map(
  lines.map(l => {
    const [, center, satellite] = orbitRe.exec(l) ?? raise('Invalid orbit');
    return [satellite, center];
  })
);

const totalOrbits = orbits
  .keys()
  .reduce((acc, satellite) => acc + countOrbits(orbits, satellite), 0);

assert.strictEqual(totalOrbits, 253104, 'Part 1 failed');
