import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2024, day: 9});

type DiskElement = number | string;

const SPACE = '.';

function calcChecksum(disk: DiskElement[]) {
  let sum = 0;
  for (const [i, n] of disk.entries()) {
    if (typeof n === 'number') {
      sum += i * n;
    }
  }
  return sum;
}

function computeDisk([...disk]: DiskElement[]) {
  while (true) {
    const i = disk.indexOf(SPACE);
    const j = disk.findLastIndex(v => typeof v === 'number');
    if (i > j) {
      break;
    }
    [disk[i], disk[j]] = [disk[j], disk[i]];
  }
  return calcChecksum(disk);
}

function computeDiskByFiles([...disk]: DiskElement[]) {
  const visited = new Set<number>();
  while (true) {
    const j = disk.findLastIndex(n => typeof n === 'number' && !visited.has(n));
    const i = disk.indexOf(disk[j]);
    if (j === -1) {
      break;
    } else {
      visited.add(disk[j] as number);
    }
    const m = disk
      .map(v => (typeof v === 'number' ? '_' : v))
      .join('')
      .matchAll(new RegExp(`\\${SPACE}+`, 'g'))
      .find(([m]) => m.length >= j - i + 1);
    if (!m || m.index > i) {
      continue;
    }
    disk.splice(m.index, j - i + 1, ...Array(j - i + 1).fill(disk[i]));
    disk.splice(i, j - i + 1, ...Array(j - i + 1).fill(SPACE));
  }
  return calcChecksum(disk);
}

const disk = [...input].flatMap((n, i) =>
  Array<DiskElement>(Number(n)).fill(i % 2 === 0 ? i / 2 : SPACE)
);

assert.strictEqual(computeDisk(disk), 6446899523367, 'Part 1 failed');
assert.strictEqual(computeDiskByFiles(disk), 6478232739671, 'Part 2 failed');
