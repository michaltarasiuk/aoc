import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';

const lines = await getInputLines({year: 2023, day: 6});

function countWaysOfBeatRecord(time: number, record: number) {
  let count = 0;
  for (let i = 0; i <= time; i++) {
    if (i * (time - i) > record) {
      count++;
    }
  }
  return count;
}

const [times, distances] = lines.map(l => extractInts(l, {negative: false}));

const waysOfBeatRecordProduct = times
  .map((time, i) => countWaysOfBeatRecord(time, distances[i]))
  .reduce((a, b) => a * b, 1);

const longRaceWaysOfBeatRecord = countWaysOfBeatRecord(
  Number(times.join('')),
  Number(distances.join(''))
);

assert.strictEqual(waysOfBeatRecordProduct, 140220, 'Part 1 failed');
assert.strictEqual(longRaceWaysOfBeatRecord, 39570185, 'Part 2 failed');
