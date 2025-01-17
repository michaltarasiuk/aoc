import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {isKeyOf} from 'lib/predicate.js';

const lines = await getInputLines({year: 2015, day: 23});

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
        assert(isKeyOf(registers, reg));
        registers[reg] /= 2;
        break;
      case 'tpl':
        assert(isKeyOf(registers, reg));
        registers[reg] *= 3;
        break;
      case 'inc':
        assert(isKeyOf(registers, reg));
        registers[reg] += 1;
        break;
      case 'jmp':
        i += Number(operands[0]);
        continue outer;
      case 'jie':
        assert(isKeyOf(registers, reg));
        i += registers[reg] % 2 === 0 ? offset : 1;
        continue outer;
      case 'jio':
        assert(isKeyOf(registers, reg));
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
const instructions = lines.map(
  l => l.match(instructionRe) ?? raise('No match')
);
const registers = [
  execute({a: 0, b: 0}, ...instructions),
  execute({a: 1, b: 0}, ...instructions),
];

assert.strictEqual(registers[0].b, 184, 'Part 1 failed');
assert.strictEqual(registers[1].b, 231, 'Part 2 failed');
