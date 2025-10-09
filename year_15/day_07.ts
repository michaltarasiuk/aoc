import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';
import {isDefined} from 'lib/is_defined.js';

const input = await fetchInput({year: 2015, day: 7});

function parseInstruction(instruction: string) {
  return [
    ...(instruction.match(/[A-Z]+/) ?? []),
    ...(instruction.match(/([a-z]|[0-9])+/g) ?? []),
  ];
}
const circuit = input.split(/\n/).reduce<Record<string, string[]>>((acc, l) => {
  const instruction = parseInstruction(l);
  const dest = instruction.pop();
  if (isDefined(dest)) {
    acc[dest] = instruction;
  }
  return acc;
}, {});

function calcSignalOrParse(s: string, cache: Map<string, number>): number {
  const parsed = Number(s);
  if (Number.isNaN(parsed)) {
    return cache.get(s) ?? cache.set(s, calcSignal(s, cache)).get(s)!;
  }
  return parsed;
}
function calcSignal(dest: string, cache = new Map<string, number>()): number {
  if (!(dest in circuit)) {
    throw new Error(`No destination for "${dest}"`);
  }
  const [gate, a, b] = circuit[dest];
  switch (gate) {
    case 'AND':
      return calcSignalOrParse(a, cache) & calcSignalOrParse(b, cache);
    case 'OR':
      return calcSignalOrParse(a, cache) | calcSignalOrParse(b, cache);
    case 'LSHIFT':
      return calcSignalOrParse(a, cache) << calcSignalOrParse(b, cache);
    case 'RSHIFT':
      return calcSignalOrParse(a, cache) >> calcSignalOrParse(b, cache);
    case 'NOT':
      return ~calcSignalOrParse(a, cache);
    default:
      return calcSignalOrParse(gate, cache);
  }
}

const wireASignal = calcSignal('a');
const finalWireASignal = calcSignal('a', new Map([['b', wireASignal]]));

assert.strictEqual(wireASignal, 46065, 'Part 1 failed');
assert.strictEqual(finalWireASignal, 14134, 'Part 2 failed');
