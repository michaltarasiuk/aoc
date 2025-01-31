import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {isDefined} from 'lib/predicate.js';

const lines = await getInputLines({year: 2019, day: 6});

function countOrbits(orbits: Map<string, string>, satellite: string): number {
  const orbit = orbits.get(satellite);
  if (!isDefined(orbit)) {
    return 0;
  }
  return 1 + countOrbits(orbits, orbit);
}

const orbitRe = /^(.*)\)(.*)$/;
const orbits = new Map<string, string>(
  lines.map(l => {
    const [, center, satellite] = orbitRe.exec(l) ?? raise('Invalid orbit');
    return [satellite, center];
  })
);

const totalOrbits = orbits
  .keys()
  .reduce((acc, satellite) => acc + countOrbits(orbits, satellite), 0);

assert.strictEqual(totalOrbits, 253104, 'Part 1 failed');
