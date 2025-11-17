import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2021, day: 8});

function parseEntry(e: string) {
  const [uniqueSignalPatterns, fourDigitOutputs] = e
    .split(' | ')
    .map(v => v.split(/\s/));
  assert(new Set(uniqueSignalPatterns).size === uniqueSignalPatterns.length);
  assert(fourDigitOutputs.length === 4);
  return [uniqueSignalPatterns, fourDigitOutputs];
}

const UniqSegments = [2, 4, 3, 7];

const easyDigitCount = input
  .split(/\n/)
  .map(parseEntry)
  .reduce((acc, [, fourDigitOutputs]) => {
    return fourDigitOutputs
      .map(output => UniqSegments.includes(output.length))
      .map(Number)
      .reduce((a, b) => a + b, acc);
  }, 0);

assert.strictEqual(easyDigitCount, 519, 'Part 1 failed');
