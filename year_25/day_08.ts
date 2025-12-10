import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';
import {isDefined} from '#lib/is_defined.js';

const input = await fetchInput({year: 2025, day: 8});

const SHORTEST_CONNECTIONS = 1000;
const TOP_CIRCUITS = 3;

const junctionBoxes = input.split(/\n/).map(l => {
  const [x, y, z] = l.split(',').map(Number);
  return {x, y, z};
});

const distances: {i: number; j: number; d: number}[] = [];
for (const i of junctionBoxes.keys()) {
  for (const j of junctionBoxes.keys().drop(i + 1)) {
    const a = junctionBoxes[i];
    const b = junctionBoxes[j];
    distances.push({i, j, d: calcDistance(a, b)});
  }
}

const circuits = junctionBoxes.map((_, i) => new Set([i]));
let snapshotAt1000: typeof circuits = [];
let lastPairXProduct = 0;
for (const [k, {i, j}] of distances.toSorted((a, b) => a.d - b.d).entries()) {
  const circuitI = circuits.find(c => c.has(i));
  const circuitJ = circuits.find(c => c.has(j));
  if (isDefined(circuitI) && isDefined(circuitJ)) {
    if (circuitI !== circuitJ) {
      for (const k of circuitJ) {
        circuitI.add(k);
      }
      circuits.splice(circuits.indexOf(circuitJ), 1);
    }
  }
  if (k === SHORTEST_CONNECTIONS) {
    snapshotAt1000 = structuredClone(circuits);
  }
  if (circuits.length === 1) {
    lastPairXProduct = junctionBoxes[i].x * junctionBoxes[j].x;
    break;
  }
}

const circuitSizeProduct = snapshotAt1000
  .toSorted((a, b) => b.size - a.size)
  .slice(0, TOP_CIRCUITS)
  .reduce((acc, c) => acc * c.size, 1);

assert.strictEqual(circuitSizeProduct, 131150, 'Part 1 failed');
assert.strictEqual(lastPairXProduct, 2497445, 'Part 2 failed');

function calcDistance<T extends (typeof junctionBoxes)[number]>(a: T, b: T) {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
  );
}
