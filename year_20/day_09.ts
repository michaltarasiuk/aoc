import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2020, day: 9});

function isSumOfTwoNumbers(preamble: number[], target: number) {
  return preamble.some(n => preamble.some(n2 => n !== n2 && n + n2 === target));
}
function findFirstInvalidNumber(ns: number[], preambleLength: number) {
  for (let i = preambleLength; i < ns.length; i++) {
    if (!isSumOfTwoNumbers(ns.slice(i - preambleLength, i), ns[i])) {
      return ns[i];
    }
  }
  throw new Error('Invalid number not found');
}

function findContiguousSetSummingTo(ns: number[], target: number) {
  for (const i of ns.keys()) {
    const contiguousSet: number[] = [];
    for (const n of ns.slice(i)) {
      contiguousSet.push(n);
      if (contiguousSet.reduce((a, b) => a + b) === target) {
        return contiguousSet;
      }
    }
  }
  throw new Error('Contiguous set not found');
}

const PreambleLength = 25;

const ns = input.split(/\n/).map(Number);

const firstInvalidNumber = findFirstInvalidNumber(ns, PreambleLength);

const contiguousSet = findContiguousSetSummingTo(ns, firstInvalidNumber);
const encryptionWeakness =
  Math.min(...contiguousSet) + Math.max(...contiguousSet);

assert.strictEqual(firstInvalidNumber, 2089807806, 'Part 1 failed');
assert.strictEqual(encryptionWeakness, 245848639, 'Part 2 failed');
