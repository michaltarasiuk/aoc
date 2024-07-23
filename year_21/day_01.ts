import {getInputInts} from 'lib/input';

const ns = await getInputInts({year: 2021, day: 1});

const increasingMeasurementsCount = ns.reduce(
  (acc, num, i) => (num > ns[i - 1] ? ++acc : acc),
  0,
);
const increasingMeasurementsSumCount = ns.reduce(
  (acc, num, i) => (num > ns[i - 3] ? ++acc : acc),
  0,
);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(increasingMeasurementsCount).toBe(1559);
  });

  test('part 2', () => {
    expect(increasingMeasurementsSumCount).toBe(1600);
  });
}
