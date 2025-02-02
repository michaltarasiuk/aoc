import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2017, day: 7});

const programs = lines.map(l => {
  const [name, weight, ...children] =
    l.match(/(\w+|\d+)/g) ?? raise(`Invalid program: ${l}`);
  return {name, weight: Number(weight), children};
});

const childrenSet = new Set(programs.flatMap(p => p.children));
const root = programs.find(({name}) => !childrenSet.has(name));

assert.strictEqual(root?.name, 'rqwgj', 'Part 1 failed');
