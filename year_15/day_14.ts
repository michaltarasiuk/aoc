import {getInputLines} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';

const lines = await getInputLines({year: 2015, day: 14});

function calcFlyTime(totalTime: number, speedTime: number, restTime: number) {
  const cycles = Math.floor(totalTime / (speedTime + restTime));
  const timeLeft = totalTime % (speedTime + restTime);

  return cycles * speedTime + Math.min(speedTime, timeLeft);
}

const TOTAL_TIME = 2_503;
const maxDistance = lines
  .map(extractInts)
  .reduce((acc, [speed, speedTime, restTime]) => {
    const distance = speed * calcFlyTime(TOTAL_TIME, speedTime, restTime);
    return Math.max(acc, distance);
  }, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(maxDistance).toBe(2640);
  });
}
