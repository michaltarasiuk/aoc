import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';
import {raise} from '#lib/raise.js';

const input = await fetchInput({year: 2024, day: 24});

const [initialValues, gateDescriptions] = input
  .split(/\n\n/)
  .map(p => p.split(/\n/));

const wireValues = Object.fromEntries(
  initialValues.map(l => l.split(': ')).map(([k, v]) => [k, Number(v)])
);

const gateRe = /^(\w+) (AND|OR|XOR) (\w+) -> (\w+)$/;
const gates = gateDescriptions.map(l => {
  const [, a, op, b, out] = gateRe.exec(l) ?? raise('Invalid gate');
  return {a, op, b, out};
});

while (gates.length > 0) {
  const {a, b, op, out} = gates.shift()!;
  if (!(Object.hasOwn(wireValues, a) && Object.hasOwn(wireValues, b))) {
    gates.push({a, op, b, out});
    continue;
  }
  switch (op) {
    case 'AND':
      wireValues[out] = wireValues[a] & wireValues[b];
      break;
    case 'OR':
      wireValues[out] = wireValues[a] | wireValues[b];
      break;
    case 'XOR':
      wireValues[out] = wireValues[a] ^ wireValues[b];
      break;
    default:
      throw new Error('Invalid operator');
  }
}

const zWires = Object.entries(wireValues)
  .filter(([k]) => k.startsWith('z'))
  .sort(([a], [b]) => b.localeCompare(a));

const binaryString = zWires.map(([, v]) => v).join('');
const decimalValue = Number.parseInt(binaryString, 2);

assert.strictEqual(decimalValue, 55114892239566, 'Part 1 failed');
