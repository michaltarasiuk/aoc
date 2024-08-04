import {extractInts} from 'lib/extract_ints';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2015, day: 14});

function calcDistance(speed: number, speedTime: number, restTime: number) {
  const FULL_TIME = 2_503;
  const intervals = Math.floor(FULL_TIME / (speedTime + restTime));
  const leftover = FULL_TIME % (speedTime + restTime);

  return speed * (intervals * speedTime + Math.min(speedTime, leftover));
}

const maxDistance = Math.max(
  ...lns.map((ln) => {
    const [speed, speedTime, restTime] = extractInts(ln);
    return calcDistance(speed, speedTime, restTime);
  }),
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(maxDistance).toBe(2640);
  });
}
