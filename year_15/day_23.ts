import assert from 'node:assert';

import {readInput} from 'lib/input.js';
import {isKeyof} from 'lib/is_keyof.js';
import {raise} from 'lib/raise.js';

const input = await readInput({year: 2015, day: 23});

function execute(
  {...registers}: {a: number; b: number},
  ...instructions: string[][]
) {
  let i = 0;
  outer: while (i < instructions.length) {
    const [operation, ...operands] = instructions[i];
    const reg = operands[0];
    const offset = Number(operands[1]);

    switch (operation) {
      case 'hlf':
        assert(isKeyof(registers, reg));
        registers[reg] /= 2;
        break;
      case 'tpl':
        assert(isKeyof(registers, reg));
        registers[reg] *= 3;
        break;
      case 'inc':
        assert(isKeyof(registers, reg));
        registers[reg] += 1;
        break;
      case 'jmp':
        i += Number(operands[0]);
        continue outer;
      case 'jie':
        assert(isKeyof(registers, reg));
        i += registers[reg] % 2 === 0 ? offset : 1;
        continue outer;
      case 'jio':
        assert(isKeyof(registers, reg));
        i += registers[reg] === 1 ? offset : 1;
        continue outer;
      default:
        raise('Invalid instruction');
    }
    i++;
  }
  return registers;
}

const instructionRe = /(\w+|[+-]\d+)/g;
const instructions = input
  .split(/\n/)
  .map(l => l.match(instructionRe) ?? raise('No match'));

const registers = [
  execute({a: 0, b: 0}, ...instructions),
  execute({a: 1, b: 0}, ...instructions),
];

assert.strictEqual(registers[0].b, 184, 'Part 1 failed');
assert.strictEqual(registers[1].b, 231, 'Part 2 failed');
