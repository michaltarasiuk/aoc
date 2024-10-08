import {raise} from 'lib/assert.js';
import {getInputInts} from 'lib/input.js';
import {sum} from 'lib/math.js';

const ints = await getInputInts({year: 2020, day: 9});

function isValid(preamble: number[], sum: number) {
  for (const n of preamble) {
    for (const n2 of preamble) {
      if (n + n2 === sum) {
        return true;
      }
    }
  }
  return false;
}

function findInvalid(ns: number[], preambleSize: number) {
  for (let i = preambleSize; i < ns.length; i++) {
    if (!isValid(ns.slice(i - preambleSize, i), ns[i])) {
      return ns[i];
    }
  }
}

function findContiguousSet(ns: number[], value: number) {
  for (let i = 0; i < ns.length; i++) {
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
const invalid = findInvalid(ints, PreambleSize) ?? raise('Invalid not found');

const set = findContiguousSet(ints, invalid) ?? raise('Set not found');
const encryptionWeakness = Math.min(...set) + Math.max(...set);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(invalid).toBe(2089807806);
  });

  test('part 2', () => {
    expect(encryptionWeakness).toBe(245848639);
  });
}
