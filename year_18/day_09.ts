import assert from 'node:assert';

import {chunkEvery} from '#lib/chunk_every.js';
import {frequencies} from '#lib/frequencies.js';
import {fetchInput} from '#lib/input.js';

const input = await fetchInput({year: 2019, day: 8});

const WIDE = 25;
const TALL = 6;

const layers = chunkEvery(chunkEvery(input, WIDE), TALL);
const layerWithFewestZeros = layers
  .map(l => frequencies(l.flat()))
  .reduce((acc, l) => (acc.get('0')! < l.get('0')! ? acc : l));

const ones = layerWithFewestZeros.get('1')!;
const twos = layerWithFewestZeros.get('2')!;

assert.strictEqual(ones * twos, 2032, 'Part 1 failed');
