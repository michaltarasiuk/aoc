import {getInputLines} from 'lib/input.js';
import {sum} from 'lib/math.js';

const lines = await getInputLines({year: 2017, day: 2});

function findDivisiblePair(...ns: number[]) {
  for (const n of ns) {
    for (const m of ns) {
      if (n !== m && n % m === 0) {
        return n / m;
      }
    }
  }
}

const rows = lines.map(l => l.split('\t').map(Number));

const spreadsheetChecksum = sum(
  ...rows.map(row => Math.max(...row) - Math.min(...row))
);
const rowsSum = sum(...rows.map(row => findDivisiblePair(...row) ?? 0));

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(spreadsheetChecksum).toBe(44216));
  test('part 2', () => expect(rowsSum).toBe(320));
}
