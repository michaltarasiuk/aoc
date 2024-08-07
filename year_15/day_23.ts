import {assertHasOwn} from 'lib/assert_has_own';
import {getInputLns} from 'lib/input';

const instructions = await getInputLns({year: 2015, day: 23});

type Registers = Record<string, number>;
type Instruct = (
  this: {registers: Registers; offset: number},
  ...payload: string[]
) => number | void;

const instructs: Record<string, Instruct> = {
  hlf(register) {
    this.registers[register] /= 2;
  },
  tpl(register) {
    this.registers[register] *= 3;
  },
  inc(register) {
    this.registers[register] += 1;
  },
  jmp(away) {
    return this.offset + Number(away);
  },
  jie(register, away) {
    if (this.registers[register] % 2 === 0) {
      return this.offset + Number(away);
    }
  },
  jio(register, away) {
    if (this.registers[register] === 1) {
      return this.offset + Number(away);
    }
  },
};

function executeProgram(registers: Registers = {a: 0, b: 0}) {
  let offset = 0;

  while (offset < instructions.length) {
    const instructionRe = /(\w+|[+-]\d+)/g;
    const [action, ...payload] = instructions[offset].match(instructionRe)!;

    assertHasOwn(instructs, action);
    const instruct = instructs[action];

    offset = instruct.call({registers, offset}, ...payload) ?? offset + 1;
  }
  return registers;
}

const registers = executeProgram();
const registers2 = executeProgram({a: 1, b: 0});

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(registers.b).toBe(184);
  });

  test('part 2', () => {
    expect(registers2.b).toBe(231);
  });
}
