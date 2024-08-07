import {assertHasOwn} from 'lib/assert_has_own';
import {getInputLns} from 'lib/input';

const instructions = await getInputLns({year: 2015, day: 23});

const registers: Record<string, number> = {a: 0, b: 0};
let offset = 0;

const instructs: Record<string, (...payload: string[]) => number | void> = {
  hlf(register) {
    registers[register] /= 2;
  },
  tpl(register) {
    registers[register] *= 3;
  },
  inc(register) {
    registers[register] += 1;
  },
  jmp(away) {
    return offset + Number(away);
  },
  jie(register, away) {
    if (registers[register] % 2 === 0) {
      return offset + Number(away);
    }
  },
  jio(register, away) {
    if (registers[register] === 1) {
      return offset + Number(away);
    }
  },
};

while (offset < instructions.length) {
  const instructionRe = /(\w+|[+-]\d+)/g;
  const [action, ...payload] = instructions[offset].match(instructionRe)!;

  assertHasOwn(instructs, action);
  const instruct = instructs[action];

  offset = instruct(...payload) ?? offset + 1;
}

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(registers.b).toBe(184);
  });
}
