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

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(waysOfBeatRecordProduct).toBe(140220));
  test('part 2', () => expect(longRaceWaysOfBeatRecord).toBe(39570185));
}
