import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
import {multiply} from 'lib/math.js';
import {parseNumbers} from 'lib/parse.js';

const lines = await getInputLines({year: 2023, day: 6});

function countWaysOfBeatRecord(time: number, record: number) {
  let count = 0;
  for (let i = 0; i <= time; i++) {
    const distance = i * (time - i);
    if (distance > record) {
      count++;
    }
  }
  return count;
}

const [times, distances] = lines.map(l => parseNumbers(l, {negative: false}));

const waysOfBeatRecordProduct = multiply(
  ...times.map((time, i) => countWaysOfBeatRecord(time, distances[i]))
);
const longRaceWaysOfBeatRecord = countWaysOfBeatRecord(
  Number(times.join('')),
  Number(distances.join(''))
);

assert.strictEqual(waysOfBeatRecordProduct, 140220, 'Part 1 failed');
assert.strictEqual(longRaceWaysOfBeatRecord, 39570185, 'Part 2 failed');
