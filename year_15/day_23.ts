import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2015, day: 23});

const instructionRe = /(\w+|[+-]\d+)/g;
const instructions = lines.map(
  l => l.match(instructionRe) ?? raise('Invalid instruction')
);

const initialRegisters = [
  {a: 0, b: 0},
  {a: 1, b: 0},
];
for (const registers of initialRegisters) {
  let instructionPointer = 0;
  while (instructionPointer < instructions.length) {
    const [operation, ...operands] = instructions[instructionPointer];
    switch (operation) {
      case 'hlf':
        assert(operands[0] === 'a' || operands[0] === 'b');
        registers[operands[0]] /= 2;
        instructionPointer++;
        break;
      case 'tpl':
        assert(operands[0] === 'a' || operands[0] === 'b');
        registers[operands[0]] *= 3;
        instructionPointer++;
        break;
      case 'inc':
        assert(operands[0] === 'a' || operands[0] === 'b');
        registers[operands[0]] += 1;
        instructionPointer++;
        break;
      case 'jmp':
        instructionPointer += Number(operands[0]);
        break;
      case 'jie':
        assert(operands[0] === 'a' || operands[0] === 'b');
        if (registers[operands[0]] % 2 === 0) {
          instructionPointer += Number(operands[1]);
        } else {
          instructionPointer++;
        }
        break;
      case 'jio':
        assert(operands[0] === 'a' || operands[0] === 'b');
        if (registers[operands[0]] === 1) {
          instructionPointer += Number(operands[1]);
        } else {
          instructionPointer++;
        }
        break;
      default:
        raise('Invalid instruction');
    }
  }
}

assert.strictEqual(initialRegisters[0].b, 184, 'Part 1 failed');
assert.strictEqual(initialRegisters[1].b, 231, 'Part 2 failed');
