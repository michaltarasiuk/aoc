import assert from 'node:assert';

import {chunkEvery} from 'lib/chunk_every.js';
import {frequencies} from 'lib/frequencies.js';
import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2019, day: 8});

const Wide = 25;
const Tall = 6;

const layers = chunkEvery(chunkEvery(input, Wide), Tall);
const layerWithFewestZeros = layers
  .map(l => frequencies(l.flat()))
  .reduce((acc, l) => (acc.get('0')! < l.get('0')! ? acc : l));

const ones = layerWithFewestZeros.get('1')!;
const twos = layerWithFewestZeros.get('2')!;

assert.strictEqual(ones * twos, 2032, 'Part 1 failed');
