import assert from 'node:assert';

import {z} from 'zod';

import {fetchInput} from '#lib/input.js';
import {raise} from '#lib/raise.js';

const input = await fetchInput({year: 2016, day: 9});

const markerGroupsSchema = z.object({
  length: z.string().transform(Number),
  repeatCount: z.string().transform(Number),
});
const markerRe = /\((?<length>\d+)x(?<repeatCount>\d+)\)/g;

let decompressed = input;
let exec: RegExpExecArray | null = null;
while ((exec = markerRe.exec(decompressed))) {
  const {0: match, groups, index = raise('Invalid index')} = exec;
  const {length, repeatCount} = markerGroupsSchema.parse(groups);

  const marked = decompressed.slice(
    index + match.length,
    index + match.length + length
  );

  decompressed = [...decompressed]
    .toSpliced(index, match.length + length, marked.repeat(repeatCount))
    .join('');
  markerRe.lastIndex = index + marked.length * repeatCount;
}

assert.strictEqual(decompressed.length, 107035, 'Part 1 failed');
