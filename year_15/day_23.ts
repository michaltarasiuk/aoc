import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2015, day: 23});

type Registers = Record<string, number>;

const instructionMap: Record<
  string,
  (registers: Registers, pointer: number, ...args: string[]) => number | void
> = {
  hlf(registers, _pointer, register) {
    registers[register] /= 2;
  },
  tpl(registers, _pointer, register) {
    registers[register] *= 3;
  },
  inc(registers, _pointer, register) {
    registers[register] += 1;
  },
  jmp(_registers, pointer, offset) {
    return pointer + Number(offset);
  },
  jie(registers, pointer, register, offset) {
    if (registers[register] % 2 === 0) {
      return pointer + Number(offset);
    }
  },
  jio(registers, pointer, register, offset) {
    if (registers[register] === 1) {
      return pointer + Number(offset);
    }
  },
};

const instructionRe = /(\w+|[+-]\d+)/g;
const instructions = lines.map(
  l => l.match(instructionRe) ?? raise('Invalid instruction')
);

const registersSet: Registers[] = [
  {a: 0, b: 0},
  {a: 1, b: 0},
];
for (const registers of registersSet) {
  let pointer = 0;
  while (pointer < instructions.length) {
    const [name, ...args] = instructions[pointer];
    pointer = instructionMap[name](registers, pointer, ...args) ?? pointer + 1;
  }
}

assert.strictEqual(registersSet[0].b, 184, 'Part 1 failed');
assert.strictEqual(registersSet[1].b, 231, 'Part 2 failed');
