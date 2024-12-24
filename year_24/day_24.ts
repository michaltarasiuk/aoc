import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputParagraphs} from 'lib/input.js';

const [initialValues, gateDescriptions] = await getInputParagraphs({
  year: 2024,
  day: 24,
});

const wireValues = Object.fromEntries(
  initialValues.map(l => l.split(': ')).map(([k, v]) => [k, Number(v)])
);

const gateRe = /^(\w+) (AND|OR|XOR) (\w+) -> (\w+)$/;
const gates = gateDescriptions
  .map(l => gateRe.exec(l) ?? raise('Invalid gate'))
  .map(([, a, op, b, out]) => ({a, op, b, out}));

while (gates.length > 0) {
  const {a, b, op, out} = gates.pop()!;
  if (a in wireValues && b in wireValues) {
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
  } else {
    gates.unshift({a, op, b, out});
  }
}

const zWires = Object.entries(wireValues)
  .filter(([k]) => k.startsWith('z'))
  .sort(([a], [b]) => b.localeCompare(a));

const binaryString = zWires.map(([, v]) => v).join('');
const decimalValue = parseInt(binaryString, 2);

assert.strictEqual(decimalValue, 55114892239566, 'Part 1 failed');
