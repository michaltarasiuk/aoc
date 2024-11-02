import {raise} from 'lib/assert.js';
import {getInputLines} from 'lib/input.js';

const lines = await getInputLines({year: 2015, day: 23});

type ProgramState = {
  registers: Record<string, number>;
  instructionPointer: number;
};
type Instruction = (this: ProgramState, ...args: string[]) => number | void;

const instructionSet: Record<string, Instruction> = {
  hlf(register) {
    this.registers[register] /= 2;
  },
  tpl(register) {
    this.registers[register] *= 3;
  },
  inc(register) {
    this.registers[register] += 1;
  },
  jmp(offset) {
    return this.instructionPointer + Number(offset);
  },
  jie(register, offset) {
    if (this.registers[register] % 2 === 0) {
      return this.instructionPointer + Number(offset);
    }
  },
  jio(register, offset) {
    if (this.registers[register] === 1) {
      return this.instructionPointer + Number(offset);
    }
  },
};

function executeProgram(
  registers: ProgramState['registers'],
  ...instructions: string[][]
) {
  let instructionPointer = 0;

  while (instructionPointer < instructions.length) {
    const [name, ...args] = instructions[instructionPointer];
    const instruction = instructionSet[name];

    instructionPointer =
      instruction.call({registers, instructionPointer}, ...args) ??
      instructionPointer + 1;
  }
  return registers;
}

const instructionRe = /(\w+|[+-]\d+)/g;
const parsedInstructions = lines.map(
  line => line.match(instructionRe) ?? raise('Invalid instruction')
);

const initialRegisters = executeProgram({a: 0, b: 0}, ...parsedInstructions);
const modifiedRegisters = executeProgram({a: 1, b: 0}, ...parsedInstructions);

if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test('part 1', () => expect(initialRegisters.b).toBe(184));
  test('part 2', () => expect(modifiedRegisters.b).toBe(231));
}
