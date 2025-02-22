import assert from 'node:assert';

import {chunkEvery} from 'lib/chunk_every.js';
import {readInput} from 'lib/input.js';

const input = await readInput({year: 2022, day: 3});

function splitRucksack(rucksack: string) {
  return [
    rucksack.slice(0, rucksack.length / 2),
    rucksack.slice(rucksack.length / 2),
  ] as const;
}

function calcPriority(char: string) {
  const codePoint = char.codePointAt(0)!;

  if (char >= 'a' && char <= 'z') {
    return codePoint - 'a'.codePointAt(0)! + 1;
  } else if (char >= 'A' && char <= 'Z') {
    return codePoint - 'A'.codePointAt(0)! + 27;
  }
  throw new Error(`Invalid char: ${char}`);
}

const lines = input.split(/\n/);

const prioritiesSum = lines.reduce((acc, rucksack) => {
  const [a, b] = splitRucksack(rucksack);
  const [char] = new Set(a).intersection(new Set(b));

  return acc + calcPriority(char);
}, 0);

const prioritiesSum2 = chunkEvery(lines, 3).reduce((acc, [a, b, c]) => {
  const [char] = new Set(a).intersection(new Set(b)).intersection(new Set(c));
  return acc + calcPriority(char);
}, 0);

assert.strictEqual(prioritiesSum, 8153, 'Part 1 failed');
assert.strictEqual(prioritiesSum2, 2342, 'Part 2 failed');
