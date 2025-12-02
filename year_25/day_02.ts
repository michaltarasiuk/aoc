import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2025, day: 2});

function isValidId(id: string) {
  return id.slice(0, id.length / 2) === id.slice(id.length / 2);
}

const ranges = input.split(',').map(r => {
  const [start, end] = r.split('-').map(Number);
  return [start, end] as const;
});

let count = 0;
for (const [start, end] of ranges) {
  for (let i = start; i <= end; i++) {
    const id = String(i);
    if (isValidId(id)) {
      count += i;
    }
  }
}

assert.strictEqual(count, 43952536386, 'Part 1 failed');
