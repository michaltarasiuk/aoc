import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';

const input = await fetchInput({year: 2017, day: 7});

function parseProgram(p: string) {
  const [name, weight, ...children] = p.match(/(\w+|\d+)/g)!;
  return {name, weight: Number(weight), children};
}

const programs = input.split(/\n/).map(parseProgram);

const children = new Set(programs.flatMap(p => p.children));
const root = programs.find(p => !children.has(p.name));

assert.strictEqual(root?.name, 'rqwgj', 'Part 1 failed');
