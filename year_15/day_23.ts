import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2015, day: 23});

type Program = {registers: Record<string, number>; offset: number};
type Instruct = (this: Program, ...payload: string[]) => number | void;

const instructMap: Record<string, Instruct> = {
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

function executeProgram(
  registers: Program['registers'],
  ...instructs: string[][]
) {
  let offset = 0;

  while (offset < instructs.length) {
    const [name, ...payload] = instructs[offset];
    const instruct = instructMap[name];

    offset = instruct.call({registers, offset}, ...payload) ?? offset + 1;
  }
  return registers;
}

const instructs = lines.map((l): string[] => l.match(/(\w+|[+-]\d+)/g)!);

const registers = executeProgram({a: 0, b: 0}, ...instructs);
const registers2 = executeProgram({a: 1, b: 0}, ...instructs);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;

  test('part 1', () => {
    expect(registers.b).toBe(184);
  });

  test('part 2', () => {
    expect(registers2.b).toBe(231);
  });
}
