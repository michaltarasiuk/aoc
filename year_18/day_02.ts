import assert from 'node:assert';

import {frequencies} from 'lib/frequencies.js';
import {readInput} from 'lib/input.js';

const input = await readInput({year: 2018, day: 2});

function mapBoxIdToIndexedChars(boxId: string) {
  return Array.from(boxId, (char, i) => char + `[${i}]`);
}

const boxIds = input.split(/\n/);

let countOfTwos = 0;
let countOfThrees = 0;
for (const boxId of boxIds) {
  const charCounts = new Map(
    frequencies(boxId)
      .entries()
      .map(([char, count]) => [count, char])
  );
  if (charCounts.has(2)) countOfTwos++;
  if (charCounts.has(3)) countOfThrees++;
}

const indexedBoxIds = boxIds.map(mapBoxIdToIndexedChars);

let commonChars = '';
outer: for (const [i, boxA] of indexedBoxIds.entries()) {
  for (const boxB of indexedBoxIds.slice(i + 1)) {
    if (new Set(boxA).difference(new Set(boxB)).size !== 1) {
      continue;
    }
    commonChars = [...new Set(boxA).intersection(new Set(boxB))]
      .map(([char]) => char)
      .join('');
    break outer;
  }
}

const checksum = countOfTwos * countOfThrees;

assert.strictEqual(checksum, 5880, 'Part 1 failed');
assert.strictEqual(commonChars, 'tiwcdpbseqhxryfmgkvjujvza', 'Part 2 failed');
