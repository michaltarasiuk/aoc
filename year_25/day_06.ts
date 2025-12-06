import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';
import {transpose} from '#lib/transpose.js';

const input = await fetchInput({year: 2025, day: 6});

const lines = input.split(/\n/);

{
  const rows = lines.map(l => l.trim().split(/\s+/));
  const cols = transpose(rows);
  assert.strictEqual(calcGrandTotal(cols), 6343365546996, 'Part 1 failed');
}

{
  const rows = lines.map(l => l.split(''));
  const cols: string[][] = [[]];
  for (const c of transpose(rows).reverse()) {
    const value = c.slice(0, -1).join('').trim();
    const operator = c.at(-1);
    if (value === '') {
      cols.push([]);
    } else {
      cols.at(-1)?.push(value);
      if (operator === '+' || operator === '*') {
        cols.at(-1)?.push(operator);
      }
    }
  }
  assert.strictEqual(calcGrandTotal(cols), 11136895955912, 'Part 1 failed');
}

function calcGrandTotal(cols: string[][]) {
  return cols
    .map(c => c.slice(0, -1).join(c.at(-1)))
    .map(e => eval(e))
    .filter(v => typeof v === 'number')
    .reduce((acc, v) => acc + v, 0);
}
