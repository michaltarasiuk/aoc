import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2017, day: 8});

type Registers = Record<string, number>;

function parseInstruct(instruct: string) {
  const instructRe = /^(\w+) (inc|dec) (-?\d+) if (.+)$/;
  const [, reg, op, val, cond] =
    instructRe.exec(instruct) ?? raise('Invalid instruction');

  return {reg, op, val: Number(val), cond};
}

function evalCond(registers: Registers, cond: string) {
  const conditionRe = /^(\w+) ([!<>=]=?) (-?\d+)$/;
  const [, reg, op, val] = conditionRe.exec(cond) ?? raise('Invalid condition');

  return eval(`${(registers[reg] ??= 0)} ${op} ${val}`);
}

const {registers, maxHeldRegister} = lines.map(parseInstruct).reduce(
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

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(maxFinalRegister).toBe(5966));
  test('part 2', () => expect(maxHeldRegister).toBe(6347));
}
