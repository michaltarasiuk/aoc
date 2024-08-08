import {getInputLns} from 'lib/input';
import {matchInts} from 'lib/match_ints';

const lns = await getInputLns({year: 2015, day: 14});

function calcDistance(speed: {value: number; time: number}, restTime: number) {
  const FULL_TIME = 2_503;
  const intervals = Math.floor(FULL_TIME / (speed.time + restTime));
  const leftover = FULL_TIME % (speed.time + restTime);

  return (
    speed.value * (intervals * speed.time + Math.min(speed.time, leftover))
  );
}

const maxDistance = Math.max(
  ...lns.map((ln) => {
    const [speedValue, speedTime, restTime] = matchInts(ln);
    return calcDistance(
      {
        value: speedValue,
        time: speedTime,
      },
      restTime,
    );
  }),
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(maxDistance).toBe(2640);
  });
}
