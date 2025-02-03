import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2023, day: 6});

function countWaysOfBeatRecord(time: number, record: number) {
  let count = 0;
  for (let i = 0; i <= time; i++) {
    if (i * (time - i) > record) {
      count++;
    }
  }
  return count;
}

const [times, distances] = input
  .split(/\n/)
  .map(l => (l.match(/\d+/g) ?? []).map(Number));

const waysOfBeatRecordProduct = times
  .map((time, i) => countWaysOfBeatRecord(time, distances[i]))
  .reduce((a, b) => a * b, 1);

const longRaceWaysOfBeatRecord = countWaysOfBeatRecord(
  Number(times.join('')),
  Number(distances.join(''))
);

assert.strictEqual(waysOfBeatRecordProduct, 140220, 'Part 1 failed');
assert.strictEqual(longRaceWaysOfBeatRecord, 39570185, 'Part 2 failed');
