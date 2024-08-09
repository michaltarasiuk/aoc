import {getInputLines} from 'lib/input';

const lines = await getInputLines({year: 2017, day: 2});

function parseRow(row: string) {
  return row.split('\t').map(Number);
}

const spreadsheetChecksum = lines.reduce((acc, line) => {
  const ns = parseRow(line);
  return acc + Math.max(...ns) - Math.min(...ns);
}, 0);

const rowsSum = lines.reduce((acc, line) => {
  const ns = parseRow(line);

  for (const n of ns) {
    for (const m of ns) {
      if (n !== m && n % m === 0) {
        return acc + n / m;
      }
    }
  }
  return acc;
}, 0);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(spreadsheetChecksum).toBe(44216);
  });

  test('part 2', () => {
    expect(rowsSum).toBe(320);
  });
}
