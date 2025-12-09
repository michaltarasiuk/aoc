import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';
import {isDefined} from '#lib/is_defined.js';

const input = await fetchInput({year: 2025, day: 8});

const ShortestConnections = 1000;
const TopCircuits = 3;

const junctionBoxes = input.split(/\n/).map(l => {
  const [x, y, z] = l.split(',').map(Number);
  return {x, y, z};
});

const distances: [i: number, j: number, d: number][] = [];
for (const i of junctionBoxes.keys()) {
  for (const j of junctionBoxes.keys().drop(i + 1)) {
    const a = junctionBoxes[i];
    const b = junctionBoxes[j];
    distances.push([i, j, calcDistance(a, b)]);
  }
}

const circuits: Set<number>[] = [];
const sortedDistances = distances.toSorted((a, b) => a[2] - b[2]);
for (const [i, j] of sortedDistances.slice(0, ShortestConnections)) {
  const circuitI = circuits.find(c => c.has(i));
  const circuitJ = circuits.find(c => c.has(j));
  if (isDefined(circuitI) && isDefined(circuitJ)) {
    if (circuitI !== circuitJ) {
      for (const k of circuitJ) {
        circuitI.add(k);
      }
      circuits.splice(circuits.indexOf(circuitJ), 1);
    }
  } else if (circuitI) {
    circuitI.add(j);
  } else if (circuitJ) {
    circuitJ.add(i);
  } else {
    circuits.push(new Set([i, j]));
  }
}

const circuitSizeProduct = circuits
  .toSorted((a, b) => b.size - a.size)
  .slice(0, TopCircuits)
  .reduce((acc, c) => acc * c.size, 1);

assert.strictEqual(circuitSizeProduct, 131150, 'Part 1 failed');

function calcDistance<T extends (typeof junctionBoxes)[number]>(a: T, b: T) {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
  );
}
