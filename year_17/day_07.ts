import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2017, day: 7});

const programs = lines
  .map(program => {
    const programRe = /(\w+|\d+)/g;
    return program.match(programRe) ?? raise('Invalid program');
  })
  .map(([name, weight, ...children]) => ({
    name,
    weight: Number(weight),
    children,
  }));

const children = new Set(programs.flatMap(p => p.children));
const root = programs.find(program => !children.has(program.name));

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(root?.name).toBe('rqwgj'));
}
