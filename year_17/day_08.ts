import assert from 'node:assert';

import {getInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await getInput({year: 2017, day: 8});

type Registers = Record<string, number>;

function evalCond(registers: Registers, cond: string) {
  const condRe = /^(\w+) ([!<>=]=?) (-?\d+)$/;
  const [, reg, op, val] = condRe.exec(cond) ?? raise('Invalid');

  return eval(`${(registers[reg] ??= 0)} ${op} ${val}`);
}

const instructionRe = /^(\w+) (inc|dec) (-?\d+) if (.+)$/;
const registers: Registers = {};

let maxHeldRegister = -Infinity;
for (const l of input.split(/\n/)) {
  const [, reg, op, val, cond] = instructionRe.exec(l) ?? raise('Invalid');
  if (evalCond(registers, cond)) {
    registers[reg] ??= 0;
    registers[reg] += op === 'inc' ? Number(val) : -Number(val);

    maxHeldRegister = Math.max(maxHeldRegister, registers[reg]);
  }
}

const maxFinalRegister = Math.max(...Object.values(registers));

assert.strictEqual(maxFinalRegister, 5966, 'Part 1 failed');
assert.strictEqual(maxHeldRegister, 6347, 'Part 2 failed');
