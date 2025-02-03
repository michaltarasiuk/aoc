import assert from 'node:assert';

import {getInput} from 'lib/input.js';

const input = await getInput({year: 2017, day: 7});

const programs = input.split(/\n/).map(l => {
  const [name, weight, ...children] = l.match(/(\w+|\d+)/g)!;
  return {name, weight: Number(weight), children};
});

const children = new Set(programs.flatMap(p => p.children));
const root = programs.find(p => !children.has(p.name));

assert.strictEqual(root?.name, 'rqwgj', 'Part 1 failed');
