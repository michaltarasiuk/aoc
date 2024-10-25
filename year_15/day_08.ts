import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2015, day: 8});

const codeLengths = lines.map(({length}) => length);

const memoryLengths = (<string[]>eval(`[${lines.join()}]`)).map(
  ({length}) => length
);
const part1Result = sum(...codeLengths) - sum(...memoryLengths);

const encodedLengths = lines.map(line => JSON.stringify(line).length);
const part2Result = sum(...encodedLengths) - sum(...codeLengths);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(part1Result).toBe(1350);
  });

  test('part 2', () => {
    expect(part2Result).toBe(2085);
  });
}
