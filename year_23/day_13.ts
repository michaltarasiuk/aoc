import assert from 'node:assert';

import {readInput} from 'lib/input.js';

const input = await readInput({year: 2023, day: 13});

function parsePattern(p: string) {
  const rows = p.split(/\n/);
  const cols: string[] = [];
  for (const [...row] of rows) {
    for (const [i, v] of row.entries()) (cols[i] ??= ''), (cols[i] += v);
  }
  return [rows, cols] as const;
}

function calcReflection(lines: string[]) {
  for (const k of lines.keys().drop(1)) {
    const a = lines.slice(0, k).reverse().join('');
    const b = lines.slice(k).join('');
    if (b.startsWith(a) || a.startsWith(b)) {
      return k;
    }
  }
  return 0;
}

const totalReflection = input
  .split(/\n\n/)
  .map(parsePattern)
  .map(([r, c]) => Math.max(calcReflection(r) * 100, calcReflection(c)))
  .reduce((acc, v) => acc + v, 0);

assert.strictEqual(totalReflection, 30705, 'Part 1 failed');
