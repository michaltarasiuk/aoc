import {getInputInts} from 'lib/input.js';
import {sum} from 'lib/math.js';

const ns = await getInputInts({year: 2019, day: 1});

const fuelRequirementsSum = sum(...ns.map(n => Math.floor(n / 3) - 2));

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(fuelRequirementsSum).toBe(3273715));
}
