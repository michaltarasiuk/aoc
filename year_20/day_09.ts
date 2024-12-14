import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputIntegers} from 'lib/input.js';
import {sum} from 'lib/math.js';

const ns = await getInputIntegers({year: 2020, day: 9});

function isValid(preamble: number[], sum: number) {
  return preamble.some(n => preamble.some(n2 => n !== n2 && n + n2 === sum));
}
function findInvalid(ns: number[], preambleSize: number) {
  for (let i = preambleSize; i < ns.length; i++) {
    if (!isValid(ns.slice(i - preambleSize, i), ns[i])) {
      return ns[i];
    }
  }
}

function findContiguousSet(ns: number[], value: number) {
  for (const i of ns.keys()) {
    const set: number[] = [];

    for (const n of ns.slice(i)) {
      set.push(n);
      if (sum(...set) === value) {
        return set;
      }
    }
  }
}

const PreambleSize = 25;
const invalid = findInvalid(ns, PreambleSize) ?? raise('Invalid not found');
const set = findContiguousSet(ns, invalid) ?? raise('Set not found');
const encryptionWeakness = Math.min(...set) + Math.max(...set);

assert.strictEqual(invalid, 2089807806, 'Part 1 failed');
assert.strictEqual(encryptionWeakness, 245848639, 'Part 2 failed');
