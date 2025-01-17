import assert from 'node:assert';

import {getInputLines} from 'lib/input.js';
import {isKeyOf} from 'lib/predicate.js';

const lines = await getInputLines({year: 2016, day: 12});

function execute(
  registers: Record<'a' | 'b' | 'c' | 'd', number>,
  ...instructions: string[][]
) {
  let i = 0;
  while (i < instructions.length) {
    const [op, x, y] = instructions[i];
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
          i += Number(y) - 1;
        }
    }
    i++;
  }
  return registers;
}

const instructions = lines.map(l => l.split(/\s/));

const registersPart1 = execute({a: 0, b: 0, c: 0, d: 0}, ...instructions);
const registersPart2 = execute({a: 0, b: 0, c: 1, d: 0}, ...instructions);

assert.strictEqual(registersPart1.a, 317993, 'Part 1 failed');
assert.strictEqual(registersPart2.a, 9227647, 'Part 2 failed');
