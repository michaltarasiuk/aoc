import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2015, day: 8});

const ns = lines.map(({length}) => length);

const ns2 = (<string[]>eval(`[${lines.join()}]`)).map(({length}) => length);
const stringLiteralMemoryDiff = sum(...ns) - sum(...ns2);

const ns3 = lines.map(l => JSON.stringify(l).length);
const stringLiteralMemoryDiff2 = sum(...ns3) - sum(...ns);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(stringLiteralMemoryDiff).toBe(1350);
  });

  test('part 2', () => {
    expect(stringLiteralMemoryDiff2).toBe(2085);
  });
}
