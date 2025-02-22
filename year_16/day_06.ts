import assert from 'node:assert';

import {frequencies} from 'lib/frequencies.js';
import {readInput} from 'lib/input.js';

const input = await readInput({year: 2016, day: 6});

function decodeMessage(
  cols: string[][],
  compareFn = (a: number, b: number) => a - b
) {
  return cols.reduce((decodedMessage, columnChars) => {
    const charFrequencies = frequencies(columnChars);
    const [[mostFrequentChar]] = charFrequencies
      .entries()
      .toArray()
      .sort((a, b) => compareFn(a[1], b[1]));

    return decodedMessage + mostFrequentChar;
  }, '');
}

const cols: string[][] = [];
for (const [...l] of input.split('\n')) {
  for (const [k, v] of l.entries()) {
    (cols[k] ??= []).push(v);
  }
}

const mostFrequentMessage = decodeMessage(cols, (a, b) => b - a);
const leastFrequentMessage = decodeMessage(cols);

assert.strictEqual(mostFrequentMessage, 'cyxeoccr', 'Part 1 failed');
assert.strictEqual(leastFrequentMessage, 'batwpask', 'Part 2 failed');
