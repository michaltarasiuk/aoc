import {getInputLines} from 'lib/input';
import {matchInts} from 'lib/ints';

const reindeers = await getInputLines({year: 2015, day: 14});

function calcFlyTime(total: number, time: number, rest: number) {
  const cycle = Math.floor(total / (time + rest));
  const remaining = total % (time + rest);

  return cycle * time + Math.min(time, remaining);
}

const TOTAL_TIME = 2_503;
let winningReindeer = -Infinity;

for (const reindeer of reindeers) {
  const [speed, time, rest] = matchInts(reindeer);
  const distance = speed * calcFlyTime(TOTAL_TIME, time, rest);

  winningReindeer = Math.max(winningReindeer, distance);
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(winningReindeer).toBe(2640);
  });
}
