import {getInputLines} from 'lib/input';
import {multiply} from 'lib/math';
import {joinNumbers} from 'lib/number';
import {extractUints} from 'lib/parse';

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

const [times, distances] = lines.map(extractUints);

const waysOfBeatRecordProduct = multiply(
  ...times.map((time, i) => {
    const record = distances[i];
    return countWaysOfBeatRecord(time, record);
  })
);

const longRaceWaysOfBeatRecord = countWaysOfBeatRecord(
  joinNumbers(...times),
  joinNumbers(...distances)
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(waysOfBeatRecordProduct).toBe(140220);
  });

  test('part 2', () => {
    expect(longRaceWaysOfBeatRecord).toBe(39570185);
  });
}
