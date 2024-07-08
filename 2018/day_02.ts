import {frequencies} from 'lib/frequencies';
import {getInputLns} from 'lib/input';

const lns = await getInputLns({year: 2018, day: 2});

let twos = 0;
let threes = 0;

for (const ln of lns) {
  const counts = new Map(
    Array.from(frequencies(ln), ([char, count]) => [count, char]),
  );

  if (counts.has(2)) twos++;
  if (counts.has(3)) threes++;
}

const result = twos * threes;

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(result).toBe(5880);
  });
}
