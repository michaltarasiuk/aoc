import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2017, day: 4});

function hasUniqueWords(words: string[]): boolean {
  return words.length === new Set(words).size;
}

function hasUniqueAnagrams(words: string[]): boolean {
  const normalized = words.map(word => [...word].sort().join(''));
  return words.length === new Set(normalized).size;
}

const passphrases = input.split('\n').map(line => line.split(/\s+/));

const part1 = passphrases.filter(hasUniqueWords);
const part2 = passphrases.filter(hasUniqueAnagrams);

assert.strictEqual(part1.length, 455, 'Part 1 failed');
assert.strictEqual(part2.length, 186, 'Part 2 failed');
