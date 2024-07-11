import {getInputInts} from 'lib/input';
import {sum} from 'lib/sum';

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

const result = sum(...ns);
const result2 = findFirstFrequencyReachesTwice(...ns);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(result).toBe(522);
  });

  test('part 2', () => {
    expect(result2).toBe(73364);
  });
}
