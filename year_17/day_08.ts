import assert from 'node:assert';

import {fetchInput} from '#lib/input.js';
import {raise} from '#lib/raise.js';

const input = await fetchInput({year: 2017, day: 8});

const registers: Record<string, number> = {};
let maxEverSeen = -Infinity;
for (const l of input.split(/\n/)) {
  const {register, operation, value, condition} = parseInstruction(l);
  const expression = `${(registers[condition.register] ??= 0)} ${condition.operation} ${condition.value}`;
  if (!eval(expression)) {
    continue;
  }
  registers[register] ??= 0;
  registers[register] += operation === 'inc' ? Number(value) : -Number(value);

  maxEverSeen = Math.max(maxEverSeen, registers[register]);
}

const maxFinal = Math.max(...Object.values(registers));

assert.strictEqual(maxFinal, 5966, 'Part 1 failed');
assert.strictEqual(maxEverSeen, 6347, 'Part 2 failed');

function parseCondition(c: string) {
  const conditionRe = /^(\w+) ([!<>=]=?) (-?\d+)$/;
  const [, register, operation, value] =
    conditionRe.exec(c) ?? raise('Invalid condition');
  return {
    register,
    operation,
    value,
  };
}

function parseInstruction(i: string) {
  const instructionRe = /^(\w+) (inc|dec) (-?\d+) if (.+)$/;
  const [, register, operation, value, condition] =
    instructionRe.exec(i) ?? raise('Invalid instruction');
  return {
    register,
    operation,
    value,
    condition: parseCondition(condition),
  };
}
