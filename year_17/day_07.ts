import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2017, day: 7});

const programRe = /(\w+|\d+)/g;
const programs = lines.map(l => {
  const [name, weight, ...children] = l.match(programRe) ?? raise('No match');
  return {name, weight: Number(weight), children};
});

const childrenSet = new Set(programs.flatMap(program => program.children));
const root = programs.find(program => !childrenSet.has(program.name));

assert.strictEqual(root?.name, 'rqwgj', 'Part 1 failed');
