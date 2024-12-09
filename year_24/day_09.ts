import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2024, day: 9});

function calcChecksum(disk: (number | string)[]) {
  return disk.entries().reduce((acc, [i, n]) => {
    if (typeof n === 'number') {
      acc += i * n;
    }
    return acc;
  }, 0);
}

const Space = '.';
const parsed = input
  .split('')
  .map(Number)
  .reduce<(number | string)[]>((acc, n, i) => {
    acc.push(...Array(n).fill(i % 2 === 0 ? i / 2 : Space));
    return acc;
  }, []);

{
  const disk = [...parsed];
  while (true) {
    const i = disk.indexOf(Space);
    const j = disk.findLastIndex(v => typeof v === 'number');
    if (i > j) {
      break;
    }
    [disk[i], disk[j]] = [disk[j], disk[i]];
  }
  assert.strictEqual(calcChecksum(disk), 6446899523367, 'Part 1 failed');
}

{
  const disk = [...parsed];
  const seen = new Set<number>();
  while (true) {
    const j = disk.findLastIndex(n => typeof n === 'number' && !seen.has(n));
    const i = disk.indexOf(disk[j]);
    if (j === -1) {
      break;
    } else {
      seen.add(disk[j] as number);
    }
    const m = disk
      .map(v => (typeof v === 'number' ? '-' : v))
      .join('')
      .matchAll(/\.+/g)
      .find(([m]) => m.length >= j - i + 1);
    if (!m || m.index > i) {
      continue;
    }
    disk.splice(m.index, j - i + 1, ...Array(j - i + 1).fill(disk[i]));
    disk.splice(i, j - i + 1, ...Array(j - i + 1).fill(Space));
  }
  assert.strictEqual(calcChecksum(disk), 6478232739671, 'Part 2 failed');
}
