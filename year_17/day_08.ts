import assert from 'node:assert';

import {fetchInput} from 'lib/input.js';
import {raise} from 'lib/raise.js';

const input = await fetchInput({year: 2017, day: 8});

const condRe = /^(\w+) ([!<>=]=?) (-?\d+)$/;
const instructionRe = /^(\w+) (inc|dec) (-?\d+) if (.+)$/;

const registers: Record<string, number> = {};
let maxHeldRegister = -Infinity;
for (const l of input.split(/\n/)) {
  const [, reg, op, val, cond] = instructionRe.exec(l) ?? raise('No line');
  const [, condReg, condOp, condVal] = condRe.exec(cond) ?? raise('No cond');
  if (!eval(`${(registers[condReg] ??= 0)} ${condOp} ${condVal}`)) {
    continue;
  }
  registers[reg] ??= 0;
  registers[reg] += op === 'inc' ? Number(val) : -Number(val);

  maxHeldRegister = Math.max(maxHeldRegister, registers[reg]);
}

const maxFinalRegister = Math.max(...Object.values(registers));

assert.strictEqual(maxFinalRegister, 5966, 'Part 1 failed');
assert.strictEqual(maxHeldRegister, 6347, 'Part 2 failed');
