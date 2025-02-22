import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2023, day: 6});

function countWaysOfBeatRecord(time: number, record: number) {
  let count = 0;
  for (let i = 0; i <= time; i++) {
    if (record < i * (time - i)) count++;
  }
  return count;
}

const lines = input.split(/\n/);
const [times, distances] = lines.map(l => l.match(/\d+/g)!.map(Number));

const waysOfBeatRecordProduct = times
  .entries()
  .reduce((acc, [i, t]) => acc * countWaysOfBeatRecord(t, distances[i]), 1);

const longRaceWaysOfBeatRecord = countWaysOfBeatRecord(
  Number(times.join('')),
  Number(distances.join(''))
);

assert.strictEqual(waysOfBeatRecordProduct, 140220, 'Part 1 failed');
assert.strictEqual(longRaceWaysOfBeatRecord, 39570185, 'Part 2 failed');
