import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';
import {isKeyOf} from 'lib/predicate.js';

const lines = await getInputLines({year: 2015, day: 23});

const instructions = lines.map(
  l => l.match(/(\w+|[+-]\d+)/g) ?? raise('Invalid instruction')
);

function executeInstructions(registers: {a: number; b: number}) {
  let instructionPointer = 0;
  while (instructionPointer < instructions.length) {
    const [operation, ...operands] = instructions[instructionPointer];
    const reg = operands[0];
    const offset = Number(operands[1]);

    switch (operation) {
      case 'hlf':
        assert(isKeyOf(registers, reg));
        registers[reg] /= 2;
        instructionPointer++;
        break;
      case 'tpl':
        assert(isKeyOf(registers, reg));
        registers[reg] *= 3;
        instructionPointer++;
        break;
      case 'inc':
        assert(isKeyOf(registers, reg));
        registers[reg] += 1;
        instructionPointer++;
        break;
      case 'jmp':
        instructionPointer += Number(operands[0]);
        break;
      case 'jie':
        assert(isKeyOf(registers, reg));
        instructionPointer += registers[reg] % 2 === 0 ? offset : 1;
        break;
      case 'jio':
        assert(isKeyOf(registers, reg));
        instructionPointer += registers[reg] === 1 ? offset : 1;
        break;
      default:
        raise('Invalid instruction');
    }
  }
}

const initialRegisters = [
  {a: 0, b: 0},
  {a: 1, b: 0},
];
initialRegisters.forEach(executeInstructions);

assert.strictEqual(initialRegisters[0].b, 184, 'Part 1 failed');
assert.strictEqual(initialRegisters[1].b, 231, 'Part 2 failed');
