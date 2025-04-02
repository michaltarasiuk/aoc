import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const expenseReport = await readInput({year: 2020, day: 1});

function hasSumOf2020(...entries: number[]) {
  return entries.reduce((acc, entry) => acc + entry, 0) === 2020;
}

const expenses = expenseReport.split(/\n/).map(Number);

let productOfTwoEntries = 1;
let productOfThreeEntries = 1;
for (const entry1 of expenses) {
  for (const entry2 of expenses) {
    if (hasSumOf2020(entry1, entry2)) {
      productOfTwoEntries = entry1 * entry2;
      break;
    }
    for (const entry3 of expenses) {
      if (hasSumOf2020(entry1, entry2, entry3)) {
        productOfThreeEntries = entry1 * entry2 * entry3;
        break;
      }
    }
  }
}

assert.strictEqual(productOfTwoEntries, 482811, 'Part 1 failed');
assert.strictEqual(productOfThreeEntries, 193171814, 'Part 2 failed');
