import {getInputLines} from 'lib/input.js';
import {extractInts} from 'lib/parse.js';

const lines = await getInputLines({year: 2015, day: 14});

function calcFlyTime(total: number, time: number, rest: number) {
  const cycle = Math.floor(total / (time + rest));
  const remaining = total % (time + rest);

  return cycle * time + Math.min(time, remaining);
}

const TOTAL_TIME = 2_503;

const winningReindeer = Math.max(
  ...lines
    .map(extractInts)
    .map(([speed, time, rest]) => speed * calcFlyTime(TOTAL_TIME, time, rest))
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(winningReindeer).toBe(2640);
  });
}
