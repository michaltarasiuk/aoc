import {getInputLines} from 'lib/input.js';
import {frequencies} from 'lib/iterable.js';

const lines = await getInputLines({year: 2018, day: 2});

let twos = 0;
let threes = 0;
for (const l of lines) {
  const counts = new Map(
    Array.from(frequencies(l), ([char, count]) => [count, char])
  );

  if (counts.has(2)) twos++;
  if (counts.has(3)) threes++;
}

const checksum = twos * threes;

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(checksum).toBe(5880);
  });
}
