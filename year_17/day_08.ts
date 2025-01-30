import assert from 'node:assert';

import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2017, day: 8});

type Registers = Record<string, number>;

function parseInstruction(instruct: string) {
  const instructionRe = /^(\w+) (inc|dec) (-?\d+) if (.+)$/;
  const [, reg, op, val, cond] =
    instructionRe.exec(instruct) ?? raise('Invalid instruction');

  return {reg, op, val: Number(val), cond};
}

function evalCond(registers: Registers, cond: string) {
  const condRe = /^(\w+) ([!<>=]=?) (-?\d+)$/;
  const [, reg, op, val] = condRe.exec(cond) ?? raise('Invalid condition');

  return eval(`${(registers[reg] ??= 0)} ${op} ${val}`);
}

const registers: Registers = {};
let maxHeldRegister = -Infinity;
for (const line of lines) {
  const {reg, op, val, cond} = parseInstruction(line);
  if (evalCond(registers, cond)) {
    registers[reg] ??= 0;
    registers[reg] += op === 'inc' ? val : -val;

    maxHeldRegister = Math.max(maxHeldRegister, registers[reg]);
  }
}
const maxFinalRegister = Math.max(...Object.values(registers));

assert.strictEqual(maxFinalRegister, 5966, 'Part 1 failed');
assert.strictEqual(maxHeldRegister, 6347, 'Part 2 failed');
