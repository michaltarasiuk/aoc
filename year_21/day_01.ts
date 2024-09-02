import {getInputInts} from 'lib/input';
import {sum} from 'lib/math';

const ns = await getInputInts({year: 2021, day: 1});

const increasingMeasurementsCount = sum(
  ...ns.map((num, i) => Number(num > ns[i - 1]))
);
const increasingMeasurementsSumCount = sum(
  ...ns.map((num, i) => Number(num > ns[i - 3]))
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
