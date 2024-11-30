import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2017, day: 2});

function findDivisiblePair(...ns: number[]) {
  for (const n of ns) {
    for (const m of ns) {
      if (n !== m && n % m === 0) {
        return n / m;
      }
    }
  }
}

const rows = lines.map(l => l.split('\t').map(Number));

const spreadsheetChecksum = rows
  .map(row => Math.max(...row) - Math.min(...row))
  .reduce((a, b) => a + b);
const rowsSum = rows
  .map(row => findDivisiblePair(...row) ?? 0)
  .reduce((a, b) => a + b);

assert.strictEqual(spreadsheetChecksum, 44216, 'Part 1 failed');
assert.strictEqual(rowsSum, 320, 'Part 2 failed');
