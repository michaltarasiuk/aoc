import {getInputLines} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';

const lines = await getInputLines({year: 2015, day: 14});

function calcFlyTime(totalTime: number, speedTime: number, restTime: number) {
  const cycle = Math.floor(totalTime / (speedTime + restTime));
  const remaining = totalTime % (speedTime + restTime);

  return cycle * speedTime + Math.min(speedTime, remaining);
}

const TOTAL_TIME = 2_503;

let distance = -Infinity;
for (const [speed, speedTime, restTime] of lines.map(extractInts)) {
  distance = Math.max(
    distance,
    speed * calcFlyTime(TOTAL_TIME, speedTime, restTime)
  );
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(distance).toBe(2640);
  });
}
