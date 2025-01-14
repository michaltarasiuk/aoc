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

const {registers, maxHeldRegister} = lines.map(parseInstruction).reduce(
  (acc, {reg, op, val, cond}) => {
    if (evalCond(acc.registers, cond)) {
      acc.registers[reg] ??= 0;
      acc.registers[reg] += op === 'inc' ? val : -val;

      acc.maxHeldRegister = Math.max(acc.maxHeldRegister, acc.registers[reg]);
    }
    return acc;
  },
  {registers: {} as Registers, maxHeldRegister: -Infinity}
);
const maxFinalRegister = Math.max(...Object.values(registers));

assert.strictEqual(maxFinalRegister, 5966, 'Part 1 failed');
assert.strictEqual(maxHeldRegister, 6347, 'Part 2 failed');
