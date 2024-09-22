import {getInputInts} from 'lib/input.js';

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

function findFirstInvalid(ns: number[], preambleSize: number) {
  for (let i = preambleSize; i < ns.length; i++) {
    if (!isValid(ns.slice(i - preambleSize, i), ns[i])) {
      return ns[i];
    }
  }
}

const PREAMBLE_SIZE = 25;
const invalid = findFirstInvalid(ints, PREAMBLE_SIZE);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(invalid).toBe(2089807806);
  });
}
