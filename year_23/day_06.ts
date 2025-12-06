import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2023, day: 6});

function countWaysOfBeatRecord(time: number, record: number) {
  let count = 0;
  for (let i = 0; i <= time; i++) {
    if (record < i * (time - i)) count++;
  }
  return count;
}

const [times, distances] = input.split(/\n/);

const parsedTimes = times
  .replace(/^Time:\s+/, '')
  .split(/\s+/)
  .map(Number);

const parsedDistances = distances
  .replace(/^Distance:\s+/, '')
  .split(/\s+/)
  .map(Number);

const waysOfBeatRecordProduct = parsedTimes.reduce(
  (acc, t, i) => acc * countWaysOfBeatRecord(t, parsedDistances[i]),
  1
);

const longRaceWaysOfBeatRecord = countWaysOfBeatRecord(
  Number(parsedTimes.join('')),
  Number(parsedDistances.join(''))
);

assert.strictEqual(waysOfBeatRecordProduct, 140220, 'Part 1 failed');
assert.strictEqual(longRaceWaysOfBeatRecord, 39570185, 'Part 2 failed');
