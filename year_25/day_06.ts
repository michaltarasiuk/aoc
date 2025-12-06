import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2025, day: 6});

const rows = input.split(/\n/).map(l => l.trim().split(/\s+/));

const cols: string[][] = [];
for (const r of rows) {
  for (const [i, v] of r.entries()) {
    cols[i] ??= [];
    cols[i].push(v);
  }
}

const totalSum = cols
  .map(c => c.slice(0, -1).join(c.at(-1)))
  .map(e => eval(e))
  .filter(v => typeof v === 'number')
  .reduce((acc, v) => acc + v, 0);

assert.strictEqual(totalSum, 6343365546996, 'Part 1 failed');
