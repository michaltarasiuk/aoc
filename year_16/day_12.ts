import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {isKeyof} from 'lib/is_keyof.js';

const input = await readInput({year: 2016, day: 12});

function execute(
  {...registers}: Record<'a' | 'b' | 'c' | 'd', number>,
  ...instructions: string[][]
) {
  let i = 0;
  while (i < instructions.length) {
    const [op, x, y] = instructions[i];
    switch (op) {
      case 'cpy':
        assert(isKeyof(registers, y));
        registers[y] = isKeyof(registers, x) ? registers[x] : Number(x);
        break;
      case 'inc':
        assert(isKeyof(registers, x));
        registers[x]++;
        break;
      case 'dec':
        assert(isKeyof(registers, x));
        registers[x]--;
        break;
      case 'jnz':
        if ((isKeyof(registers, x) ? registers[x] : Number(x)) !== 0) {
          i += Number(y) - 1;
        }
    }
    i++;
  }
  return registers;
}

const instructions = input.split(/\n/).map(l => l.split(/\s/));

const registersPart1 = execute({a: 0, b: 0, c: 0, d: 0}, ...instructions);
const registersPart2 = execute({a: 0, b: 0, c: 1, d: 0}, ...instructions);

assert.strictEqual(registersPart1.a, 317993, 'Part 1 failed');
assert.strictEqual(registersPart2.a, 9227647, 'Part 2 failed');
