import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
import {isKeyOf} from 'lib/predicate.js';

const lines = await getInputLines({year: 2016, day: 12});

function execute(
  registers: Record<'a' | 'b' | 'c' | 'd', number>,
  ...instructions: string[][]
) {
  let instructionPointer = 0;
  while (instructionPointer < instructions.length) {
    const [op, x, y] = instructions[instructionPointer];
    switch (op) {
      case 'cpy':
        assert(isKeyOf(registers, y));
        registers[y] = isKeyOf(registers, x) ? registers[x] : Number(x);
        break;
      case 'inc':
        assert(isKeyOf(registers, x));
        registers[x]++;
        break;
      case 'dec':
        assert(isKeyOf(registers, x));
        registers[x]--;
        break;
      case 'jnz':
        if ((isKeyOf(registers, x) ? registers[x] : Number(x)) !== 0) {
          instructionPointer += Number(y) - 1;
        }
    }
    instructionPointer++;
  }
  return registers;
}

const instructions = lines.map(l => l.split(/\s/));

assert.strictEqual(
  execute({a: 0, b: 0, c: 0, d: 0}, ...instructions).a,
  317993,
  'Part 1 failed'
);
assert.strictEqual(
  execute({a: 0, b: 0, c: 1, d: 0}, ...instructions).a,
  9227647,
  'Part 2 failed'
);
