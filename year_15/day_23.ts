import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2015, day: 23});

const instructionRe = /(\w+|[+-]\d+)/g;
const instructions = lines.map(
  l => l.match(instructionRe) ?? raise('Invalid instruction')
);

const registersSet = [
  {a: 0, b: 0},
  {a: 1, b: 0},
];
for (const registers of registersSet) {
  let pointer = 0;
  while (pointer < instructions.length) {
    const [name, ...args] = instructions[pointer];
    switch (name) {
      case 'hlf':
        assert(args[0] === 'a' || args[0] === 'b');
        registers[args[0]] /= 2;
        pointer++;
        break;
      case 'tpl':
        assert(args[0] === 'a' || args[0] === 'b');
        registers[args[0]] *= 3;
        pointer++;
        break;
      case 'inc':
        assert(args[0] === 'a' || args[0] === 'b');
        registers[args[0]] += 1;
        pointer++;
        break;
      case 'jmp':
        pointer += Number(args[0]);
        break;
      case 'jie':
        assert(args[0] === 'a' || args[0] === 'b');
        if (registers[args[0]] % 2 === 0) {
          pointer += Number(args[1]);
        } else {
          pointer++;
        }
        break;
      case 'jio':
        assert(args[0] === 'a' || args[0] === 'b');
        if (registers[args[0]] === 1) {
          pointer += Number(args[1]);
        } else {
          pointer++;
        }
        break;
      default:
        raise('Invalid instruction');
    }
  }
}

assert.strictEqual(registersSet[0].b, 184, 'Part 1 failed');
assert.strictEqual(registersSet[1].b, 231, 'Part 2 failed');
