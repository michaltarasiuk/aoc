import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2024, day: 9});

const disk = input
  .split('')
  .map(Number)
  .reduce<(number | string)[]>((acc, n, i) => {
    acc.push(...Array(n).fill(i % 2 === 0 ? i / 2 : '.'));
    return acc;
  }, []);

while (true) {
  const i = disk.indexOf('.');
  const j = disk.findLastIndex(v => typeof v === 'number');
  if (i > j) {
    break;
  }
  [disk[i], disk[j]] = [disk[j], disk[i]];
}

let checksum = 0;
for (const [i, n] of disk.entries()) {
  if (typeof n === 'number') {
    checksum += i * n;
  } else {
    break;
  }
}

assert.strictEqual(checksum, 6446899523367, 'Part 1 failed');
