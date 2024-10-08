import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2017, day: 8});

type Registers = Record<string, number>;

function parseInstruction(instruction: string) {
  const instructionRe = /^(\w+) (inc|dec) (-?\d+) if (.+)$/;
  const [, reg, op, val, cond] = instructionRe.exec(instruction)!;

  return {reg, op, val: Number(val), cond};
}

function evalCondition(registers: Registers, cond: string) {
  const conditionRe = /^(\w+) ([!<>=]=?) (-?\d+)$/;
  const [, reg, op, val] = conditionRe.exec(cond)!;

  return eval(`${(registers[reg] ??= 0)} ${op} ${val}`);
}

const registers: Registers = {};
let maxHeldRegister = -Infinity;

for (const {reg, op, val, cond} of lines.map(parseInstruction)) {
  if (evalCondition(registers, cond)) {
    registers[reg] ??= 0;
    registers[reg] += op === 'inc' ? val : -val;

    maxHeldRegister = Math.max(maxHeldRegister, registers[reg]);
  }
}

const maxFinalRegister = Math.max(...Object.values(registers));

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(maxFinalRegister).toBe(5966);
  });

  test('part 2', () => {
    expect(maxHeldRegister).toBe(6347);
  });
}
