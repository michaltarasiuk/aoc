import {getInputInts} from 'lib/input.js';
import {sum} from 'lib/math.js';

const ns = await getInputInts({year: 2018, day: 1});

function findFirstFrequencyReachesTwice(...ns: number[]) {
  const frequencies = new Set<number>();
  let frequency = 0;

  while (true) {
    for (const n of ns) {
      frequency += n;

      if (frequencies.has(frequency)) {
        return frequency;
      }
      frequencies.add(frequency);
    }
  }
}

const frequency = sum(...ns);
const firstFrequencyReachesTwice = findFirstFrequencyReachesTwice(...ns);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(frequency).toBe(522);
  });

  test('part 2', () => {
    expect(firstFrequencyReachesTwice).toBe(73364);
  });
}
