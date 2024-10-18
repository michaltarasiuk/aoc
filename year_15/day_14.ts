import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2015, day: 14});

function calcFlyTime(totalTime: number, speedTime: number, restTime: number) {
  const cycles = Math.floor(totalTime / (speedTime + restTime));
  const timeLeft = totalTime % (speedTime + restTime);

  return cycles * speedTime + Math.min(speedTime, timeLeft);
}

const TotalTime = 2_503;
const maxDistance = Math.max(
  ...lines
    .map(l => l.matchAll(/-?\d+/g).map(([n]) => Number(n)))
    .map(
      ([speed, speedTime, restTime]) =>
        speed * calcFlyTime(TotalTime, speedTime, restTime)
    )
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(maxDistance).toBe(2640);
  });
}
