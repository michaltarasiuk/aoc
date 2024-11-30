import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2017, day: 7});

const programRe = /(\w+|\d+)/g;
const programs = lines
  .map(program => program.match(programRe) ?? raise('Invalid program'))
  .map(([name, weight, ...children]) => ({
    name,
    weight: Number(weight),
    children,
  }));

const children = new Set(programs.flatMap(p => p.children));
const root = programs.find(program => !children.has(program.name));

assert.strictEqual(root?.name, 'rqwgj', 'Part 1 failed');
