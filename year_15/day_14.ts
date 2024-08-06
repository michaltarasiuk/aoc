import {extractInts} from 'lib/extract_ints';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2015, day: 14});

function calcDistance([speed, time]: [number, number], rest: number) {
  const FULL_TIME = 2_503;
  const intervals = Math.floor(FULL_TIME / (time + rest));
  const leftover = FULL_TIME % (time + rest);

  return speed * (intervals * time + Math.min(time, leftover));
}

const maxDistance = Math.max(
  ...lns.map((ln) => {
    const [speed, time, rest] = extractInts(ln);
    return calcDistance([speed, time], rest);
  }),
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(maxDistance).toBe(2640);
  });
}
