import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2025, day: 2});

function isValidId(id: string, m = '') {
  let end = 0;
  while (end++ !== Math.floor(id.length / 2)) {
    const sequence = id.slice(0, end);
    if (new RegExp(`^(${sequence}){2,${m}}$`).test(id)) {
      return true;
    }
  }
  return false;
}

const ranges = input.split(',').map(r => {
  const [start, end] = r.split('-');
  return {start: Number(start), end: Number(end)};
});

let count = 0;
let count2 = 0;
for (const r of ranges) {
  for (let i = r.start; i <= r.end; i++) {
    const id = String(i);
    if (isValidId(id, '2')) {
      count += i;
    }
    if (isValidId(id)) {
      count2 += i;
    }
  }
}

assert.strictEqual(count, 43952536386, 'Part 1 failed');
assert.strictEqual(count2, 54486209192, 'Part 2 failed');
