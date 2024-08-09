import {getInputLines} from 'lib/input';
import {raise} from 'lib/raise';

const reindeers = await getInputLines({year: 2015, day: 14});

function parseReindeer(reindeer: string) {
  const reindeerRe =
    /^\w+ can fly (\d+) km\/s for (\d+) seconds?, but then must rest for (\d+) seconds?\.$/;
  const [, ...groups] = reindeer.match(reindeerRe) ?? raise('Invalid reindeer');
  const [speed, time, rest] = groups.map(Number);

  return {speed, time, rest};
}

function calcFlyTime({time, rest}: {time: number; rest: number}) {
  const TOTAL_TIME = 2_503;
  const cycle = Math.floor(TOTAL_TIME / (time + rest));
  const remaining = TOTAL_TIME % (time + rest);

  return cycle * time + Math.min(time, remaining);
}

let winningReindeer: number | undefined;

for (const reindeer of reindeers) {
  const {speed, time, rest} = parseReindeer(reindeer);
  const distanceTraveled = speed * calcFlyTime({time, rest});

  winningReindeer = Math.max(winningReindeer ?? 0, distanceTraveled);
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(winningReindeer).toBe(2640);
  });
}
