import {extractInts} from 'lib/extract_ints';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2015, day: 14});

const FULL_TIME = 2_503;

function calcDistance(speed: number, speedTime: number, restTime: number) {
  const timeChunk = speedTime + restTime;
  const fullChunks = Math.floor(FULL_TIME / timeChunk);
  const remainTime = FULL_TIME % timeChunk;

  return speed * (fullChunks * speedTime + Math.min(speedTime, remainTime));
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
